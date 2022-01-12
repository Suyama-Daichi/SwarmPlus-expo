import { ExpoConfig } from '@expo/config'
import 'dotenv/config'
import KEYS from './keys.json'

const commonConfig: ExpoConfig = {
  name: 'SwarmPlus',
  slug: 'SwarmPlus',
  scheme: 'swarmplus',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  primaryColor: '#FFB049',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    buildNumber: '1',
    bundleIdentifier: 'com.donchan.SwarmPlus',
  },
  android: {
    versionCode: 3,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.symdit.swarmplus',
    permissions: [],
    config: {
      googleMaps: {
        apiKey: KEYS.common.GOOGLE_API_KEY,
      },
    },
  },
}

module.exports = (): ExpoConfig => {
  if (process.env.APP_ENV === 'production') {
    return {
      ...commonConfig,
      name: 'SwarmPlus',
      web: {
        config: {
          firebase: {
            apiKey: KEYS.production.FB_API_KEY,
            authDomain: KEYS.production.FB_AUTH_DOMAIN,
            projectId: KEYS.production.FB_PROJECT_ID,
            storageBucket: KEYS.production.FB_STORAGE_BUCKET,
            messagingSenderId: KEYS.production.FB_MESSAGING_SENDER_ID,
            appId: KEYS.production.FB_APP_ID,
          },
        },
        favicon: './assets/images/favicon.png',
      },
      extra: {
        apiUrl: 'https://localhost:3000/api',
        amplitudeKey: KEYS.production.AMPLITUDE_KEY,
        CLIENT_ID: KEYS.common.CLIENT_ID,
        CLIENT_SECRET: KEYS.common.CLIENT_SECRET,
      },
    }
  } else if (process.env.APP_ENV === 'dev-client') {
    return {
      ...commonConfig,
      name: 'Expo DevClient(SwarmPlus)',
      web: {
        config: {
          firebase: {
            apiKey: KEYS.development.FB_API_KEY,
            authDomain: KEYS.development.FB_AUTH_DOMAIN,
            projectId: KEYS.development.FB_PROJECT_ID,
            storageBucket: KEYS.development.FB_STORAGE_BUCKET,
            messagingSenderId: KEYS.development.FB_MESSAGING_SENDER_ID,
            appId: KEYS.development.FB_APP_ID,
          },
        },
        favicon: './assets/images/favicon.png',
      },
      extra: {},
    }
  } else {
    return {
      ...commonConfig,
      name: 'SwarmPlus (Development)',
      web: {
        config: {
          firebase: {
            apiKey: KEYS.development.FB_API_KEY,
            authDomain: KEYS.development.FB_AUTH_DOMAIN,
            projectId: KEYS.development.FB_PROJECT_ID,
            storageBucket: KEYS.development.FB_STORAGE_BUCKET,
            messagingSenderId: KEYS.development.FB_MESSAGING_SENDER_ID,
            appId: KEYS.development.FB_APP_ID,
          },
        },
        favicon: './assets/images/favicon.png',
      },
      extra: {
        apiUrl: 'https://localhost:3000/api',
        amplitudeKey: KEYS.development.AMPLITUDE_KEY,
        CLIENT_ID: KEYS.common.CLIENT_ID,
        CLIENT_SECRET: KEYS.common.CLIENT_SECRET,
      },
    }
  }
}
