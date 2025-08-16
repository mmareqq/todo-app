import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
   { ignores: ['dist', '**/*.test.js'] },

   // JS + React
   {
      files: ['**/*.{js,jsx}'],
      languageOptions: {
         ecmaVersion: 'latest',
         globals: globals.browser,
         parserOptions: {
            ecmaFeatures: { jsx: true },
            sourceType: 'module',
         },
      },
      settings: { react: { version: '18.3' } },
      plugins: {
         react,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
      },
      rules: {
         ...js.configs.recommended.rules,
         ...react.configs.recommended.rules,
         ...react.configs['jsx-runtime'].rules,
         ...reactHooks.configs.recommended.rules,
         'react/jsx-no-target-blank': 'off',
         'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
         ],
         'react/prop-types': 'off',
         'no-unused-vars': 'warn',
      },
   },

   // TypeScript + React
   {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            project: './tsconfig.json',
            ecmaVersion: 'latest',
            sourceType: 'module',
         },
      },
      plugins: {
         '@typescript-eslint': tsPlugin,
      },
      rules: {
         ...tsPlugin.configs.recommended.rules,
         'no-unused-vars': 'off',
         '@typescript-eslint/no-unused-vars': ['warn'],
      },
   },
];
