import { ExpoConfig } from '@expo/config'
import 'dotenv/config'

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
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.symdit.swarmplus',
    config: {
      googleMaps: process.env.FB_API_KEY,
    },
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
      },
    },
    favicon: './assets/images/favicon.png',
  },
}

module.exports = (): ExpoConfig => {
  if (process.env.APP_ENV === 'production') {
    return {
      ...commonConfig,
      name: 'SwarmPlus',
      extra: {
        apiUrl: 'https://production.com/api',
      },
    }
  } else if (process.env.APP_ENV === 'staging') {
    return {
      ...commonConfig,
      name: 'SwarmPlus (Staging)',
      extra: {
        apiUrl: 'https://staging.com/api',
      },
    }
  } else {
    return {
      ...commonConfig,
      name: 'SwarmPlus (Development)',
      extra: {
        apiUrl: 'https://localhost:3000/api',
      },
    }
  }
}
