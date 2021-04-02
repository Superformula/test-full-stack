const OFF = 0
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
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
    'object-curly-spacing': OFF,
    'no-implicit-coercion': ERROR,
    'react/react-in-jsx-scope': OFF,
    'react/prop-types': OFF,
    '@typescript-eslint/explicit-function-return-type': ERROR,
    '@typescript-eslint/explicit-member-accessibility': [ERROR],
    '@typescript-eslint/no-use-before-define': ERROR,
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],
    '@typescript-eslint/prefer-ts-expect-error': ERROR,
    '@typescript-eslint/prefer-optional-chain': ERROR,
    '@typescript-eslint/no-unnecessary-type-constraint': ERROR,
    '@typescript-eslint/object-curly-spacing': [
      ERROR,
      'always',
      {
        arraysInObjects: false
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      ERROR,
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        }
      }
    ],
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
