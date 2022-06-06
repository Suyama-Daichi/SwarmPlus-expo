import { auth, functions } from '@/libs/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FBSignOut,
  AuthProvider,
  signInWithCustomToken as firebaseSignin,
} from 'firebase/auth'
import { httpsCallable } from '@firebase/functions'

export const signInWithProvider = async (provider: AuthProvider) => {
  const user = await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      return user
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
  return user
}

export const signInWithEmail = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  return user
}

export const signUpWithEmail = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  return user
}

export const getSessionUser = () => {
  const { currentUser: user } = auth
  return user
}

export const signOut = async () => {
  await FBSignOut(auth)
}

export const signInWithCustomToken = async (token: string) => {
  const userCredential = await firebaseSignin(auth, token).catch((e) => {
    throw new Error(e)
  })
  return userCredential
}

/** カスタムトークンを生成する関数定義 */
const genCustomToken = httpsCallable<{ uid: string; accessToken: string }, { customToken: string }>(
  functions,
  'auth-genCustomToken'
)

/** カスタムトークンを取得 */
export const getCustomToken = async (uid: string, accessToken: string) => {
  const customToken = await genCustomToken({ uid: uid, accessToken })
  return customToken
}
