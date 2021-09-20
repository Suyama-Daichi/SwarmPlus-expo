import { CLIENT_ID, CLIENT_SECRET } from '@env'

const REDIRECT_URI = 'https://site.swarmplus.net/oauth/'

export const config = () => {
  return { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI }
}
