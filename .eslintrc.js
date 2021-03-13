module.exports = {
  env: {
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks', 'react-native', 'prettier', 'import'],
  parserOptions: {
    version: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  rules: {
    curly: ['error', 'multi-line'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'index', 'sibling']],
        'newlines-between': 'ignore',
      },
    ],
  },
}
