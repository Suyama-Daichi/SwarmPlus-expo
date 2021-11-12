import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import * as FirebaseCore from 'expo-firebase-core'
// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

type EnvObj = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}
const env = FirebaseCore.DEFAULT_WEB_APP_OPTIONS as EnvObj
// Initialize Firebase
const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  databaseURL: env.databaseURL,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId,
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

export type CollectionRef = firebase.firestore.CollectionReference
export type DocumentRef = firebase.firestore.DocumentReference
export type Query = firebase.firestore.Query
