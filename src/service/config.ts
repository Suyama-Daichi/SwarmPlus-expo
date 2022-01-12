import Constants from 'expo-constants'

const REDIRECT_URI = 'https://site.swarmplus.net/oauth/'

export const config = () => {
  const { CLIENT_ID, CLIENT_SECRET } = Constants.manifest?.extra
  return { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI }
}
