import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
   {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            project: './tsconfig.eslint.json',
            tsconfigRootDir: __dirname,
            ecmaVersion: 'latest',
            sourceType: 'module',
         },
      },
      plugins: {
         '@typescript-eslint': tsPlugin,
         react,
         'react-hooks': reactHooks,
      },
      rules: {
         ...tsPlugin.configs.recommended.rules,
         ...react.configs.recommended.rules,
         ...reactHooks.configs.recommended.rules,
         '@typescript-eslint/no-unused-vars': 'warn',
         'no-unused-vars': 'off',
         'react/prop-types': 'off',
         'react/react-in-jsx-scope': 'off',
      },
      settings: { react: { version: 'detect' } },
   },
];
