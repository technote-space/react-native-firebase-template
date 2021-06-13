module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    __DEV__: true,
  },
  env: {
    jest: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'camelcase': [
      'error',
      {
        'properties': 'always',
      },
    ],
    'quotes': [
      'error',
      'single',
      'avoid-escape',
    ],
    'key-spacing': [
      'error',
      {
        'singleLine': {
          'beforeColon': false,
          'afterColon': true,
        },
        'multiLine': {
          'beforeColon': false,
          'afterColon': true,
        },
      },
    ],
    // "no-magic-numbers": [
    //   "error",
    //   {
    //     "ignoreArrayIndexes": true
    //   }
    // ],
    'eqeqeq': 'error',
    'block-scoped-var': 'error',
    'complexity': [
      'error',
      {
        'maximum': 20,
      },
    ],
    'curly': 'error',
    'default-case': 'error',
    'dot-location': [
      'error',
      'property',
    ],
    'guard-for-in': 'error',
    'no-eval': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true,
      },
    ],
    'id-length': [
      'error',
      {
        'min': 2,
        'properties': 'never',
        'exceptions': [
          '$',
          'e',
          '_',
        ],
      },
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'space-before-function-paren': [
      'error',
      'never',
    ],
    'space-before-blocks': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'arrow-body-style': 'off',
    'arrow-spacing': 'error',
    'strict': [
      'error',
    ],
    'semi': [
      'error',
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        'extendDefaults': true,
        'types': {
          '{}': false,
        },
      },
    ],
    'react/prop-types': 'off',
    'sort-imports': 0,
    'import/order': [
      2, {
        'alphabetize': { 'order': 'asc' },
        'groups': ['type', 'builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: { '@typescript-eslint/no-var-requires': ['off'] },
    },
  ],
};
