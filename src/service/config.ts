import { CLIENT_ID, CLIENT_SECRET, OAUTH_TOKEN } from '@env'

const REDIRECT_URI = 'https://samplewebapp-b6524.web.app/login'

export const config = () => {
  return { CLIENT_ID, CLIENT_SECRET, OAUTH_TOKEN, REDIRECT_URI }
}
