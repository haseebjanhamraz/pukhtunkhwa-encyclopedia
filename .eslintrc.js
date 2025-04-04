module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["react", "@typescript-eslint", "tailwindcss"],
  rules: {
    "@next/next/no-head-element": "error",
    "react/no-unescaped-entities": "error",
    "react-hooks/exhaustive-deps": "warn",
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-contradicting-classname": "error",
    "tailwindcss/enforces-shorthand": "warn",
    "tailwindcss/no-unnecessary-arbitrary-value": "warn",
  },
}
