import { genCustomToken } from '@/service/functions'
import { getAuth, signInWithCustomToken as firebaseSignin } from 'firebase/auth'

export const signInWithCustomToken = async (token: string) => {
  const auth = getAuth()
  const userCredential = await firebaseSignin(auth, token).catch((e) => {
    throw new Error(e)
  })
  return userCredential
}

/** カスタムトークンを取得 */
export const getCustomToken = async (uid: string) => {
  const customToken = await genCustomToken({ uid: uid })
  return customToken
}
