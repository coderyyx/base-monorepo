import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  js.configs.recommended,
  ts.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  globalIgnores(['**/dist/**']),
  {
    files: ['*.config.{js,cjs,mjs}', '.lintstagedrc.cjs', '.prettierrc.cjs'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
