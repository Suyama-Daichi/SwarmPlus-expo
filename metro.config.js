// NOTE: firebase v9が使えない時の対処(Expoの修正待ち)
// https://github.com/thysultan/stylis/issues/233#issuecomment-1000648356
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')
const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.sourceExts.push('cjs')
module.exports = defaultConfig