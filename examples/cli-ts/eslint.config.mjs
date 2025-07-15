import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  { ignores: ['**/dist/**', '**/node_modules/**'] },
  js.configs.recommended,
  ts.configs.recommended,
  { languageOptions: { globals: globals.node } },
  {
    files: ['*.config.{js,cjs,mjs}', '.lintstagedrc.cjs', '.prettierrc.cjs'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
