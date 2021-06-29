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
}

/**
 * logEvent プロパティなし
 * @param {string} name
 */
export const logEvent = async (eventName: string) => {
  await Amplitude.logEventAsync(eventName)
}
/**
 * logEvent プロパティあり
 * @param {string} name
 * @param {object} props
 */
export const logEventWithProps = async (eventName: string, props: { [k: string]: string }) => {
  await Amplitude.logEventWithPropertiesAsync(eventName, props)
}

/**
 * setUserProperties
 * @param {object} properties
 */
export const setUserProperties = async (properties: { [k: string]: string }) => {
  await Amplitude.setUserPropertiesAsync(properties)
}
