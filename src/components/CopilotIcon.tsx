import Spinner from "./Spinner";

import type { CopilotStatus } from "@/client";

import { assertNever } from "@/utils/tools";

export interface CopilotIconProps {
  status: CopilotStatus | "Disabled";
  textColor: string;
  style?: preact.JSX.CSSProperties;
}

/**
 * Icon of Copilot, change according to status.
 * @returns
 */
const CopilotIcon: FC<CopilotIconProps> = ({ status, style, textColor }) => {
  return (
    <div
      style={{
        height: "50%",
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}>
      {(() => {
        if (status === "InProgress") return <Spinner color={textColor} />;
        if (status === "Normal")
          return (
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "100%", width: "100%" }}>
              <path
                d="M6.25 9a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 6.25 9Zm4.25.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z"
                fill={textColor}
              />
              <path
                d="M7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .572-.053 1.147-.254 1.655l.168.838.066.033A2.75 2.75 0 0 1 16 9.736V11c0 .24-.086.438-.156.567-.073.131-.16.253-.259.366-.18.21-.404.413-.605.58a10.19 10.19 0 0 1-.792.597l-.015.01-.006.004-.028.018a8.849 8.849 0 0 1-.456.281c-.307.177-.749.41-1.296.642C11.296 14.528 9.756 15 8 15c-1.756 0-3.296-.472-4.387-.935a12.28 12.28 0 0 1-1.296-.641 8.849 8.849 0 0 1-.456-.281l-.028-.02-.006-.003-.015-.01a10.593 10.593 0 0 1-.792-.596 5.264 5.264 0 0 1-.605-.58 2.133 2.133 0 0 1-.259-.367A1.189 1.189 0 0 1 0 11V9.736a2.75 2.75 0 0 1 1.52-2.46l.067-.033.167-.838C1.553 5.897 1.5 5.322 1.5 4.75c0-.87.127-1.77.693-2.485.579-.733 1.494-1.124 2.724-1.26 1.206-.134 2.262.034 2.944.765ZM3 7.824v4.261c.02.013.043.025.065.038.264.152.65.356 1.134.562.972.412 2.307.815 3.801.815 1.494 0 2.83-.403 3.8-.815.412-.174.813-.375 1.2-.6v-4.26l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.06-.328-2.71-.991A3.233 3.233 0 0 1 8 6.266c-.144.269-.321.52-.54.743C6.81 7.672 5.896 8 4.75 8c-.652 0-1.236-.082-1.726-.291L3 7.824Zm6.237-5.031c-.204.218-.359.678-.242 1.614.091.726.303 1.23.618 1.553.299.304.784.54 1.638.54.922 0 1.28-.199 1.442-.38.179-.2.308-.578.308-1.37 0-.765-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298Zm-2.472 0c-.193-.207-.637-.414-1.681-.298-1.02.114-1.48.404-1.713.7-.247.313-.37.79-.37 1.555 0 .792.129 1.17.308 1.37.162.181.52.38 1.442.38.854 0 1.339-.236 1.638-.54.315-.323.527-.827.618-1.553.117-.936-.038-1.396-.242-1.614Z"
                fill={textColor}
              />
            </svg>
          );
        if (status === "Warning")
          return (
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "100%", width: "100%" }}>
              <path
                d="M7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .463-.035.929-.155 1.359a6.015 6.015 0 0 0-1.398-.616c.034-.195.053-.439.053-.743 0-.766-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298-.204.218-.359.678-.242 1.614.06.479.172.86.332 1.158a6.014 6.014 0 0 0-2.92 2.144C5.926 7.904 5.372 8 4.75 8c-.652 0-1.237-.082-1.727-.291L3 7.824v4.261c.02.013.043.025.065.038a10.83 10.83 0 0 0 2.495 1.035c.21.629.522 1.21.916 1.726a11.883 11.883 0 0 1-2.863-.819 12.28 12.28 0 0 1-1.296-.641 8.849 8.849 0 0 1-.456-.281l-.028-.02-.006-.003-.015-.01a10.593 10.593 0 0 1-.792-.596 5.264 5.264 0 0 1-.605-.58 2.133 2.133 0 0 1-.259-.367A1.189 1.189 0 0 1 0 11V9.736a2.75 2.75 0 0 1 1.52-2.46l.067-.033.167-.838C1.553 5.897 1.5 5.322 1.5 4.75c0-.87.127-1.77.693-2.485.579-.733 1.494-1.124 2.724-1.26 1.206-.134 2.262.034 2.944.765ZM6.765 2.793c-.193-.207-.637-.414-1.681-.298-1.02.114-1.48.404-1.713.7-.247.313-.37.79-.37 1.555 0 .792.129 1.17.308 1.37.162.181.52.38 1.442.38.854 0 1.339-.236 1.638-.54.315-.323.527-.827.618-1.553.117-.936-.038-1.396-.242-1.614Z"
                fill={textColor}
              />
              <path
                d="M8.498 14.81v.001a4.5 4.5 0 1 1 5.503-7.12 4.5 4.5 0 0 1-5.503 7.119ZM10.5 8.75V11a.75.75 0 0 0 1.5 0V8.75a.75.75 0 0 0-1.5 0Zm.75 5.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill={textColor}
              />
            </svg>
          );
        if (status === "Disabled")
          return (
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "100%", width: "100%" }}>
              <path
                d="M.865 2.759v.001l14.82 10.722a.755.755 0 0 0 .188.1.751.751 0 0 1-1.063 1.025l-1.415-1.024c-.274.147-.613.315-1.008.482C11.296 14.528 9.756 15 8 15c-1.756 0-3.296-.473-4.387-.934a11.947 11.947 0 0 1-1.654-.859l-.098-.065-.028-.018-.006-.004-.015-.01a10.19 10.19 0 0 1-.792-.597 5.145 5.145 0 0 1-.605-.58 2.185 2.185 0 0 1-.259-.366A1.193 1.193 0 0 1 0 11V9.736a2.75 2.75 0 0 1 1.52-2.46l.067-.033.167-.838c-.175-.442-.238-.936-.251-1.434L.31 4.107a.75.75 0 0 1 .555-1.348ZM7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .572-.053 1.147-.254 1.655l.168.838.066.033A2.75 2.75 0 0 1 16 9.736V11c0 .24-.086.438-.156.567a1.59 1.59 0 0 1-.075.125L13 9.688V7.824l-.023-.115c-.49.21-1.075.291-1.727.291-.22 0-.43-.012-.633-.036L6.824 5.22c.082-.233.143-.503.182-.813.117-.936-.038-1.396-.242-1.614-.193-.207-.637-.414-1.681-.298-.707.079-1.144.243-1.424.434l-1.251-.905c.58-.579 1.422-.899 2.51-1.02 1.205-.133 2.26.035 2.943.766ZM4.75 8c-.652 0-1.237-.081-1.727-.291L3 7.825v4.26c.387.225.788.426 1.2.6.97.412 2.306.815 3.8.815 1.494 0 2.829-.403 3.801-.815.076-.033.15-.065.22-.097L5.594 7.934A5.158 5.158 0 0 1 4.75 8Zm4.486-5.207c-.204.218-.359.678-.242 1.614.091.726.303 1.23.618 1.553.299.304.784.54 1.638.54.922 0 1.28-.199 1.442-.38.179-.2.308-.578.308-1.37 0-.765-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298Z"
                fill={textColor}
              />
            </svg>
          );
        assertNever(status);
      })()}
    </div>
  );
};

export default CopilotIcon;
