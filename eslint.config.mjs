import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['src/**/*.{ts,tsx,js}'], // Restrict linting to only TS/TSX files in src
  },
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
  },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      semi: ['error', 'always'],
      'prettier/prettier': [
        'error',
        { semi: true, singleQuote: true, endOfLine: 'lf' },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'dist/'], // Ensure dist is ignored
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  eslintPluginPrettierRecommended,
];
