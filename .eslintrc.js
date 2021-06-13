module.exports = {
  extends: ['@react-native-community'],
  globals: {
    __DEV__: true,
  },
  env: {
    jest: true,
  },
  plugins: ['import', 'unused-imports'],
  rules: {
    'sort-imports': 0,
    'import/order': [2, {'alphabetize': {'order': 'asc'}}],
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};
