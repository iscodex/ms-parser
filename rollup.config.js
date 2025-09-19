import typescript from "@rollup/plugin-typescript";

export default [
  // CommonJS build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      typescript({
        typescript: require("typescript"),
        tsconfig: "tsconfig.json",
      }),
    ],
  },
  // ES Module build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      typescript({
        typescript: require("typescript"),
        tsconfig: "tsconfig.json",
      }),
    ],
  },
];
