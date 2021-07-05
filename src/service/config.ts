import { CLIENT_ID, CLIENT_SECRET } from '@env'

const REDIRECT_URI = 'https://samplewebapp-b6524.web.app/'

export const config = () => {
  return { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI }
}
