module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@cspell/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest', '@cspell'],
  rules: {
    // console.logは警告する
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    // React 17に対する設定
    'react/react-in-jsx-scope': 'off',
    // カンマの後にスペースを入れる
    'comma-spacing': ['error', { before: false, after: true }],
    // ケツカンマ
    'comma-dangle': [
      'error',
      {
        functions: 'never',
        imports: 'only-multiline',
        arrays: 'only-multiline',
        objects: 'only-multiline',
      },
    ],
    // オブジェクトの{}内側にスペースを入れる
    'object-curly-spacing': ['error', 'always'],
    // 配列の[]の内側にスペースを入れる
    'array-bracket-spacing': ['error', 'never'],
    // 1行あたりの最大文字列長(現在auto fixできない)
    'max-len': [
      'error',
      { code: 100, ignoreTemplateLiterals: true, ignoreStrings: true, ignoreUrls: true },
    ],
    // 末尾に半角・全角スペースをつけない
    'no-trailing-spaces': ['error'],
    // TSの重複ルールをオフ
    'react/prop-types': 'off',
    // NG: { prop }, OK: {prop} にするルール
    'react/jsx-curly-spacing': [
      'warn',
      { when: 'never', attributes: { allowMultiline: true }, children: true },
    ],
    // =の後のスペースは無し
    'react/jsx-equals-spacing': ['warn', 'never'],
    // NG: <View/>, OK: <View /> にするルール
    'react/jsx-tag-spacing': 'warn',
    // コンポーネントが複数行の場合の()で囲む
    'react/jsx-wrap-multilines': [
      'warn',
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens-new-line',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
    },
  ],
}
