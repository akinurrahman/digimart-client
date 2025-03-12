import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Create ESLint config extending Next.js default and TypeScript settings
const eslintConfig = [
  // Extend the default Next.js core-web-vitals and TypeScript ESLint configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Error on unused variables (e.g., unused imports, variables in functions)
      "@typescript-eslint/no-unused-vars": "error",
      // Warn on usage of 'any' type (instead of error, just a warning)
      "@typescript-eslint/no-explicit-any": "warn",
      // Warn on usage of console.log (allow console.warn and console.error)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Error if there are circular dependencies in imports
      "import/no-cycle": "error",
    },
  },
];

export default eslintConfig;
