import { Analytics } from '@/service/firebase'
import * as Amplitude from 'expo-analytics-amplitude'
import Constants from 'expo-constants'

Amplitude.initializeAsync(Constants.manifest?.extra.amplitudeKey)
/**
 * setUserId
 * @param {string} userId
 */
export const setUserId = (userId: string) => {
  Amplitude.setUserIdAsync(userId)
  Analytics.setUserId(userId)
  console.info('Analytics', { userId })
}

/**
 * logEvent プロパティなし
 * @param {string} name
 */
export const logEvent = (eventName: string) => {
  Amplitude.logEventAsync(eventName)
  Analytics.logEvent(eventName)
  console.info('Analytics', { eventName })
}
/**
 * logEvent プロパティあり
 * @param {string} name
 * @param {object} props
 */
export const setCurrentScreen = (screenName: string, props: { [k: string]: string }) => {
  Amplitude.logEventWithPropertiesAsync(screenName, props)
  Analytics.logEvent('screen_view', { screenName, props })
  console.info('Analytics', { screenName, props })
}

/**
 * setUserProperties
 * @param {object} properties
 */
export const setUserProperties = (properties: { [k: string]: string }) => {
  Amplitude.setUserPropertiesAsync(properties)
  Analytics.setUserProperties(properties)
  console.info('Analytics', { properties })
}
