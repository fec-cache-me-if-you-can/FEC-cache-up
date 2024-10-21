import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import configAirbnb from 'eslint-config-airbnb';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import testingLibrary from 'eslint-plugin-testing-library';

export default [
  {
    files: [
      '**/client/src/**/*.{js,mjs,cjs,jsx}',
      '**/server/**/*.{js,mjs,cjs,jsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...configAirbnb.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      semi: ['error', 'always'],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'prettier/prettier': [
        'error',
        {
          indent: ['error', 2],
          singleQuote: true,
        },
      ],
    },
  },
  { // extra config for testing-library 
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
    ...testingLibrary.configs['flat/dom'],
    plugins: {
      'testing-library': testingLibrary,
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
      ...testingLibrary.configs['flat/dom'].rules,
    },
  },
];
