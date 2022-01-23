import { genCustomToken } from '@/service/functions'
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken as firebaseSignin,
  signOut,
  User,
} from 'firebase/auth'

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

/** ログイン状態を取得 */
export const fetchAuthUser = async (): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
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
  const auth = getAuth()
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
