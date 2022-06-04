import { auth } from '@/libs/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as FBSignOut,
  AuthProvider
} from 'firebase/auth'

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
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
  console.log({ user })
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
  console.log(user)
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
  console.log(user)
  return user
}

export const getSessionUser = () => {
  const { currentUser: user } = auth
  console.log(user)
  return user
}

export const signOut = async () => {
  await FBSignOut(auth)
}
