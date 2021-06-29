import { CLIENT_ID, CLIENT_SECRET } from '@env'

const REDIRECT_URI = 'https://www.notion.so/SwarmPlus-39fc44e0c5554e7584f6b66e3d1db29d'

export const config = () => {
  return { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI }
}
