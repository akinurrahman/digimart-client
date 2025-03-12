import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Code style and best practices
      "no-console": ["warn", { allow: ["warn", "error"] }], // Allow warn and error logs, but warn about others
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn on unused variables, but allow _ prefixed ones
      "no-empty-function": "warn", // Warn on empty functions
      "prefer-const": "warn", // Prefer const over let when the variable is never reassigned
      "no-debugger": "warn", // Warn on debugger statements
      "consistent-return": "error", // Enforce consistent return statements in functions
      "array-callback-return": "error", // Ensure array methods have return statements
      "no-duplicate-imports": "error", // Disallow duplicate imports
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/*", "components/*"], // Prevent relative imports from root for better code organization
        },
      ],

      // Security & Performance
      "no-eval": "error", // Disallow usage of eval()
      "no-new-func": "error", // Disallow usage of new Function()
      "no-with": "error", // Disallow usage of with statements

      // Code readability & maintainability
      "prefer-arrow-callback": "warn", // Prefer arrow functions for callbacks
      "arrow-parens": ["error", "as-needed"], // Enforce using parentheses only when necessary
      camelcase: "error", // Enforce camelCase naming convention
      "no-else-return": "error", // Prevent unnecessary else blocks after return
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ], // Limit file length to 300 lines for better readability

      // TypeScript-specific
      "@typescript-eslint/no-explicit-any": "warn", // Warn when using `any` type in TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "warn", // Require explicit return types on functions and class methods
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Warn for unused vars in TypeScript, allowing _ prefix for unused args

      // Next.js-specific
      "react/jsx-uses-react": "off", // React 18 automatically imports React, so no need to enable this rule
      "react/react-in-jsx-scope": "off", // Same as above
      "next/no-img-element": "warn", // Warn on usage of <img> element (use <Image> instead)
      "jsx-a11y/alt-text": "error", // Ensure images have alt text for accessibility

      // Accessibility
      "jsx-a11y/anchor-is-valid": "warn", // Ensure anchor tags are valid (e.g., href is defined)
      "jsx-a11y/label-has-associated-control": [
        "warn",
        {
          assert: "either",
        },
      ], // Ensure labels have associated controls
    },
  },
];

export default eslintConfig;
