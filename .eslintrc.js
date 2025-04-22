module.exports = {
  root: true,
  env: {
    commonjs: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', '@rkristelijn/mui'],
  rules: {
    'no-var': 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportDeclaration[source.value="react"] ImportDefaultSpecifier',
        message:
          'Default React import is not needed since React 17. Use named imports instead, e.g., import { useState } from "react"',
      },
      {
        selector: 'TSQualifiedName[left.name="React"]',
        message: 'Use named imports instead of React namespace, e.g., import { FC } from "react" instead of React.FC',
      },
    ],
    '@rkristelijn/mui/sort-sx-keys': 'error',
    '@rkristelijn/mui/prefer-named-imports': 'error',
    '@rkristelijn/mui/no-literal-colors': 'error',
    '@rkristelijn/mui/no-grid-alias': 'error',
    '@rkristelijn/mui/no-single-child-in-grid': 'error',
    '@rkristelijn/mui/no-single-child-in-stack': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
