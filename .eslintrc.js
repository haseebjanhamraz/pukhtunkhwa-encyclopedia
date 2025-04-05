module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/no-unescaped-entities": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
}
