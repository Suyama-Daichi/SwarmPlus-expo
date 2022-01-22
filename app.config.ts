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
    bundleIdentifier: 'com.symdit.SwarmPlus',
  },
  android: {
    versionCode: 4,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.symdit.swarmplus',
    permissions: [],
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_API_KEY,
      },
    },
  },
}

module.exports = (): ExpoConfig => {
  if (process.env.APP_ENV === 'production') {
    const android = { ...commonConfig.android }
    const ios = { ...commonConfig.ios }
    android.googleServicesFile = './google-services-production.json'
    ios.googleServicesFile = './GoogleService-Info-production.plist'
    return {
      ...commonConfig,
      name: 'SwarmPlus',
      android,
      ios,
      plugins: ['@react-native-firebase/app'],
      extra: {
        apiUrl: 'https://localhost:3000/api',
        amplitudeKey: process.env.AMPLITUDE_KEY,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    }
  } else if (process.env.APP_ENV === 'dev-client') {
    const android = { ...commonConfig.android }
    const ios = { ...commonConfig.ios }
    android.googleServicesFile = './google-services-production.json'
    ios.googleServicesFile = './GoogleService-Info-development.plist'
    return {
      ...commonConfig,
      name: 'Expo DevClient(SwarmPlus)',
      android,
      ios,
      plugins: ['@react-native-firebase/app'],
      extra: {},
    }
  } else {
    const android = { ...commonConfig.android }
    const ios = { ...commonConfig.ios }
    android.googleServicesFile = './google-services-production.json'
    ios.googleServicesFile = './GoogleService-Info-development.plist'
    return {
      ...commonConfig,
      name: 'SwarmPlus (Development)',
      android,
      ios,
      plugins: ['@react-native-firebase/app'],
      extra: {
        apiUrl: 'https://localhost:3000/api',
        amplitudeKey: process.env.AMPLITUDE_KEY,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    }
  }
}
