import { analytics } from '@/libs/firebase'

/**
 * setUserId
 * @param {string} userId
 */
export const setUserId = (userId: string) => {
  analytics.setUserId(userId)
  console.info('Analytics', { userId })
}

/**
 * logEvent プロパティなし
 * @param {string} name
 */
export const logEvent = (eventName: string) => {
  analytics.logEvent(eventName)
  console.info('Analytics', { eventName })
}
/**
 * logEvent プロパティあり
 * @param {string} name
 * @param {object} props
 */
export const setCurrentScreen = (screenName: string, props: { [k: string]: string }) => {
  analytics.logEvent('screen_view', { screen_name: screenName, props })
  console.info('Analytics', { screen_name: screenName, props })
}

/**
 * setUserProperties
 * @param {object} properties
 */
export const setUserProperties = (properties: { [k: string]: string }) => {
  analytics.setUserProperties(properties)
  console.info('Analytics', { properties })
}
