import * as Amplitude from 'expo-analytics-amplitude'
import { AMPLITUDE_KEY } from '@env'

Amplitude.initializeAsync

void Amplitude.initializeAsync(AMPLITUDE_KEY)
/**
 * setUserId
 * @param {string} userId
 */
export const setUserId = async (userId: string) => {
  await Amplitude.setUserIdAsync(userId)
  console.info('Analytics', { userId })
}

/**
 * logEvent プロパティなし
 * @param {string} name
 */
export const logEvent = async (eventName: string) => {
  await Amplitude.logEventAsync(eventName)
  console.info('Analytics', { eventName })
}
/**
 * logEvent プロパティあり
 * @param {string} name
 * @param {object} props
 */
export const setCurrentScreen = async (screenName: string, props: { [k: string]: string }) => {
  await Amplitude.logEventWithPropertiesAsync(screenName, props)
  console.info('Analytics', { screenName, props })
}

/**
 * setUserProperties
 * @param {object} properties
 */
export const setUserProperties = async (properties: { [k: string]: string }) => {
  await Amplitude.setUserPropertiesAsync(properties)
  console.info('Analytics', { properties })
}
