/* ESLint strict React + TS */
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  settings: {},
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  },
  ignorePatterns: ["dist/"]
};
