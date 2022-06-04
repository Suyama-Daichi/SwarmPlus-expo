
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import Constants from 'expo-constants';

const firebaseConstants = Constants.manifest?.web?.config?.firebase

const firebaseConfig = {
  // プロジェクトに合わせて変更してね
  apiKey: firebaseConstants?.apiKey,
  authDomain: firebaseConstants?.authDomain,
  projectId: firebaseConstants?.projectId,
  storageBucket: firebaseConstants?.storageBucket,
  messagingSenderId: firebaseConstants?.messagingSenderId,
  appId: firebaseConstants?.appId,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore()
export const storage = getStorage()
export const auth = getAuth()

export default app