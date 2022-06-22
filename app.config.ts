import { ExpoConfig } from '@expo/config'
import appJson from './app.json'
import packageJson from './package.json'
import 'dotenv/config'

const releaseChannel = process.env.RELEASE_BRANCH

const name = () => {
  if (releaseChannel === 'develop') return 'swarm-plus-dev'
  if (releaseChannel === 'production') return 'swarm-plus'
  return 'swarm-plus'
}
const bundleId = () => {
  if (releaseChannel === 'develop') return 'jp.symdit.swarm-plus-dev'
  if (releaseChannel === 'production') return 'jp.symdit.swarm-plus'
  return 'jp.symdit.swarm-plus-dev'
}

module.exports = (): ExpoConfig => {
  return {
    version: packageJson.version,
    orientation: 'portrait',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    name: name(),
    slug: name(),
    icon: './assets/images/icon.png',
    ios: {
      buildNumber: appJson.expo.ios.buildNumber,
      bundleIdentifier: bundleId(),
      usesAppleSignIn: true,
      infoPlist: {
        CFBundleDevelopmentRegion: 'ja_JP',
        NSPhotoLibraryUsageDescription:
          'プロフィール写真をアップロードするためにフォトライブラリを使用します',
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: 'com.donchan.swarmplus-dev',
    },
    web: {
      config: {
        firebase: {
          apiKey: process.env.FB_API_KEY,
          authDomain: process.env.FB_AUTH_DOMAIN,
          databaseURL: process.env.FB_DATABASE_URL,
          projectId: process.env.FB_PROJECT_ID,
          storageBucket: process.env.FB_STORAGE_BUCKET,
          messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
          appId: process.env.FB_APP_ID,
          measurementId: process.env.FB_MEASUREMENT_ID,
        },
      },
    },
    extra: {
      supabase: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      },
      foursquare: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
      },
      releaseChannel: releaseChannel,
    },
  }
}
