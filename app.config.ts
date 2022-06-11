import { ExpoConfig } from '@expo/config'
import appJson from './app.json'
import packageJson from './package.json'
import 'dotenv/config'

const releaseBranch = process.env.RELEASE_BRANCH

/* 動的パラーメーター */
const dynamicConfig = {
  version: packageJson.version,
  ios: {
    buildNumber: appJson.expo.ios.buildNumber,
  },
}

const common = {
  name: 'Swarm-Plus',
  slug: 'Swarm-Plus',
  owner: 'suyama-daichi',
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
  ios: {
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
}

module.exports = (): ExpoConfig => {
  switch (releaseBranch) {
    case 'production':
      return {
        ...dynamicConfig,
        ...common,
        icon: './assets/images/icon.png',
        ios: {
          bundleIdentifier: 'jp.symdit.swarm-plus',
          googleServicesFile: './GoogleService-Info-Production.plist',
        },
        web: {
          config: {
            firebase: {
              apiKey: process.env.FB_API_KEY,
              authDomain: process.env.FB_AUTH_DOMAIN,
              databaseURL: process.env.FB_DATABASE_URL,
              projectId: process.env.FB_PROJECT_ID,
              storageBucket: process.env.FB_STORAGE_BUKET,
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
            redirect_uri: process.env.REDIECT_URI,
          },
          releaseChannel: 'develop',
        },
      } as ExpoConfig
    case 'develop':
      return {
        ...dynamicConfig,
        ...common,
        icon: './assets/images/icon.png',
        ios: {
          bundleIdentifier: 'jp.symdit.expo-swarm-plus',
          googleServicesFile: './GoogleService-Info-Development.plist',
        },
        web: {
          config: {
            firebase: {
              apiKey: process.env.FB_API_KEY,
              authDomain: process.env.FB_AUTH_DOMAIN,
              databaseURL: process.env.FB_DATABASE_URL,
              projectId: process.env.FB_PROJECT_ID,
              storageBucket: process.env.FB_STORAGE_BUKET,
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
            redirect_uri: process.env.REDIECT_URI,
          },
          releaseChannel: 'develop',
        },
      } as ExpoConfig
  }
}
