// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { files: ['**/*.{ts, tsx, js}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
    globals: {
      process: 'readonly',
    },
  },
  {
    ignores: ['node_modules', 'dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  eslintPluginPrettierRecommended,
];
