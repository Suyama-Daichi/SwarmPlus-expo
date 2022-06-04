module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@native-base/icons': '@native-base/icons/lib',
          },
          extensions: ['.ts', '.tsx'],
        },
      ],
    ],
  }
}
