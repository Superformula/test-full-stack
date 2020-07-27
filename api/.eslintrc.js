module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
    '@typescript-eslint/no-var-requires': [0],
    '@typescript-eslint/no-explicit-any': [0],
  },
  settings: {},
}
