import { initializeApp } from 'firebase/app'
import { CollectionReference, DocumentReference } from 'firebase/firestore'
import 'firebase/storage'
import { getFunctions } from 'firebase/functions'
// Optionally import the services that you want to use
//import { ..., getAuth } from 'firebase/auth';
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import fs from '@react-native-firebase/firestore'
import analytics from '@react-native-firebase/analytics'
import Constants from 'expo-constants'
import { getAuth } from '@firebase/auth'

type EnvObj = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

const env = Constants.manifest?.extra?.FIREBASE as EnvObj
// Initialize Firebase
const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId,
}

const app = initializeApp(firebaseConfig)

export const functions = getFunctions(app)
export const firestore = fs()
export const auth = getAuth(app)
export const Analytics = analytics()
export type CollectionRef = CollectionReference
export type DocumentRef = DocumentReference
