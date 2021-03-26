const OFF = 0
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    indent: [ERROR, 2, { SwitchCase: 1 }],
    'linebreak-style': [ERROR, 'unix'],
    curly: [ERROR, 'all'],
    'jsx-quotes': [ERROR, 'prefer-double'],
    quotes: [ERROR, 'single', { allowTemplateLiterals: true }],
    semi: [ERROR, 'never'],
    'arrow-parens': [ERROR, 'as-needed'],
    'require-await': ERROR,
    'capitalized-comments': [
      'error',
      'always',
      { ignoreConsecutiveComments: true }
    ],
    'arrow-body-style': [ERROR, 'as-needed'],
    'no-implicit-coercion': ERROR,
    'react/react-in-jsx-scope': OFF,
    'react/prop-types': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-member-accessibility': OFF,
    '@typescript-eslint/member-delimiter-style': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        argsIgnorePattern: '^_'
      }
    ],
    'no-console': [
      ERROR,
      {
        allow: ['warn', 'error']
      }
    ]
  }
}
