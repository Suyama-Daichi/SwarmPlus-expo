import { genCustomToken } from '@/service/functions'
import { auth } from '@/service/firebase'
import { signInWithCustomToken as firebaseSignin, signOut, User } from 'firebase/auth'

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
export const signOutAuth = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (auth.currentUser?.isAnonymous) return
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('sign out')
        // resolve(true)
      })
      .catch((error) => {
        console.log('error')
        // console.error(error)
        // reject(error)
      })
  })
}

// /** IDトークンを取得する(Claim含む) */
// export const getIdToken = async () => {
//   const idToken = await auth.currentUser?.getIdTokenResult(true)
//   return idToken
// }
