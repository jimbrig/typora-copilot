import * as path from "@modules/path";

import type { Completion, CompletionResult, CopilotClient } from "./client";
import type { ResponsePromise } from "./client/general-client";
import { logger } from "./logging";
import type { Position } from "./types/lsp";
import { Observable } from "./utils/observable";

/**
 * Options for {@link CompletionTaskManager}.
 */
export interface CompletionTaskManagerOptions {
  workspaceFolder: string;
  activeFilePathname: string;
}

/**
 * A manager for GitHub Copilot completion tasks that makes sure exactly one completion task is
 * active at a time.
 */
export default class CompletionTaskManager {
  public workspaceFolder: string;
  public activeFilePathname: string;

  private _state: "idle" | "requesting" | "pending" = "idle";

  private activeRequest:
    | (ResponsePromise<CompletionResult> & { cleanup?: Observable<"accepted" | "rejected"> })
    | null = null;

  constructor(
    private copilot: CopilotClient,
    options: CompletionTaskManagerOptions,
  ) {
    this.workspaceFolder = options.workspaceFolder;
    this.activeFilePathname = options.activeFilePathname;
  }

  get state(): "idle" | "requesting" | "pending" {
    return this._state;
  }

  rejectCurrentIfExist(): void {
    if (this.activeRequest) {
      if (this.activeRequest.status === "pending") this.activeRequest.cancel();
      this.activeRequest.cleanup?.next("rejected");
      this.activeRequest = null;
    }
    this._state = "idle";
    if (this.copilot.status === "InProgress") this.copilot.status = "Normal";
  }

  start(
    position: Position,
    {
      onCompletion,
    }: {
      /**
       * Callback invoked when a task completion is received.
       *
       * This can optionally return an {@linkcode Observable} representing a cleanup action.
       * The observable will be:
       * - Subscribed to initially for internal cleanup.
       * - Triggered later by the class itself when a new task starts, or by external triggers
       *   (e.g., the user manually invoking `.next()` for cleanup).
       */
      onCompletion?: (completion: Completion) => Observable<"accepted" | "rejected"> | void;
    },
  ): void {
    if (this.activeRequest) {
      if (this.activeRequest.status === "pending") this.activeRequest.cancel();
      this.activeRequest.cleanup?.next("rejected");
    }

    this._state = "requesting";

    const request = this.copilot.request.getCompletions({
      position,
      languageId: "markdown",
      path: this.activeFilePathname,
      relativePath:
        this.workspaceFolder ?
          path.relative(this.workspaceFolder, this.activeFilePathname)
        : this.activeFilePathname,
    });
    this.activeRequest = request;

    request
      .then(({ cancellationReason, completions }): void => {
        if (this.activeRequest !== request) {
          // The request has been cancelled or a new task has started since this task was started,
          // so we should ignore this task's completion
          return;
        }

        if (cancellationReason || completions.length === 0) {
          if (this.copilot.status === "InProgress") this.copilot.status = "Normal";
          this._state = "idle";
          return;
        }

        this._state = "pending";

        const completion = completions[0]!;

        const cleanup = onCompletion?.(completion) ?? new Observable<"accepted" | "rejected">();
        cleanup.subscribeOnce((acceptedOrRejected) => {
          if (acceptedOrRejected === "accepted") {
            this.copilot.notification.notifyAccepted({ uuid: completion.uuid });
            logger.debug("Accepted completion");
          } else {
            this.copilot.notification.notifyRejected({ uuids: [completion.uuid] });
            logger.debug("Rejected completion", completion.uuid);
          }
          this._state = "idle";
          if (this.activeRequest === request) this.activeRequest = null;
        });
        this.activeRequest.cleanup = cleanup;
      })
      .catch(() => {
        if (this.activeRequest !== request) {
          // The request has been cancelled or a new task has started since this task was started,
          // so we should ignore this task's completion
          return;
        }

        this._state = "idle";
        this.activeRequest = null;
      });
  }
}
