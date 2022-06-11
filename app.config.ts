import { ExpoConfig } from '@expo/config'
import appJson from './app.json'
import packageJson from './package.json'
import 'dotenv/config'

const releaseBranch = process.env.RELEASE_BRANCH

const common = {
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
}

const commonIos = {
  usesAppleSignIn: true,
  buildNumber: appJson.expo.ios.buildNumber,
  infoPlist: {
    CFBundleDevelopmentRegion: 'ja_JP',
    NSPhotoLibraryUsageDescription:
      'プロフィール写真をアップロードするためにフォトライブラリを使用します',
  },
  config: {
    usesNonExemptEncryption: false,
  },
}

module.exports = (): ExpoConfig | undefined => {
  switch (releaseBranch) {
    case 'production':
      return {
        icon: './assets/images/icon.png',
        ...common,
        name: 'swarm-plus',
        slug: 'swarm-plus',
        ios: { ...commonIos, bundleIdentifier: 'jp.symdit.swarm-plus' },
        android: {
          package: 'com.donchan.swarmplus',
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
          releaseChannel: 'develop',
        },
      } as ExpoConfig
    case 'develop':
      return {
        ...common,
        name: 'swarm-plus',
        slug: 'swarm-plus',
        icon: './assets/images/icon.png',
        ios: { ...commonIos, bundleIdentifier: 'jp.symdit.swarm-plus-dev' },
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
          releaseChannel: 'develop',
        },
      } as ExpoConfig
  }
}
