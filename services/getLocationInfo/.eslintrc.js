module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    env: {
      es6: true,
      node: true,
      jest: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      curly: ['error', 'all'],
      'no-return-await': ['error'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-multi-spaces': ['error'],
      'no-trailing-spaces': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': [
        'error',
        { anonymous: 'never', asyncArrow: 'always', named: 'never' },
      ],
      'max-params': ['error', 4],
      'comma-dangle': ['warn', 'never'],
      camelcase: ['warn'],
      'no-var': ['error'],
    },
  };
  