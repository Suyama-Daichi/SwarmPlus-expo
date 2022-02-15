import { genCustomToken } from '@/service/functions'
import { auth } from '@/service/firebase'
import {
  onAuthStateChanged,
  signInWithCustomToken as firebaseSignin,
  signOut,
  User,
} from 'firebase/auth'

export const signInWithCustomToken = async (token: string) => {
  const userCredential = await firebaseSignin(auth, token).catch((e) => {
    throw new Error(e)
  })
  return userCredential
}

/** カスタムトークンを取得 */
export const getCustomToken = async (uid: string, accessToken: string) => {
  const customToken = await genCustomToken({ uid: uid, accessToken })
  return customToken
}

/** ログイン状態を取得 */
export const fetchAuthUser = async (): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user || undefined)
      },
      (e) => reject(e)
    )
  })
}

/** FirebaseAuthenticationからサインアウト */
export const signOutAuth = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('sign out')
    })
    .catch((error) => {
      console.error(error)
      // An error happened.
    })
}
