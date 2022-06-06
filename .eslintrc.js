module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest/globals': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@cspell/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'jest',
    '@cspell'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    // React 17に対する設定
    'react/react-in-jsx-scope': 'off',
    // カンマの後にスペースを入れる
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    // オブジェクトの{}内側にスペースを入れる
    'object-curly-spacing': ['error', 'always'],
    // 配列の[]の内側にスペースを入れる
    'array-bracket-spacing': ['error', 'never'],
    // 1行あたりの最大文字列長(現在auto fixできない)
    'max-len': ['error', { 'code': 100 }]
  }
}
