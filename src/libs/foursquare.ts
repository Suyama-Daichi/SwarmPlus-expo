import Constants from 'expo-constants'
const foursquareCredential = Constants.manifest?.extra?.foursquare

export const foursquareConfig = {
  CLIENT_ID: foursquareCredential.client_id,
  CLIENT_SECRET: foursquareCredential.client_secret,
  REDIRECT_URI: foursquareCredential.redirect_uri,
  params: {
    v: '20211123',
    locale: 'ja',
    mode: 'swarm',
  },
}
