import { genCustomToken } from '@/service/functions'
import { auth } from '@/service/firebase'
import { signInWithCustomToken as firebaseSignin, signOut } from 'firebase/auth'

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
