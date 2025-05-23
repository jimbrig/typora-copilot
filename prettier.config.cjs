// @ts-check

/** @satisfies {import("prettier").Config} */
const config = {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  experimentalTernaries: true,
  plugins: ["prettier-plugin-packagejson"],
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
};

module.exports = config;
