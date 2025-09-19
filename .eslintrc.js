module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "@typescript-eslint/recommended", "prettier"],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  env: {
    node: true,
    jest: true,
  },
};
