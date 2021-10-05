import firebase from 'firebase/app'
import 'firebase/firestore'

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBDDSgopNCKorq75jcyksNSYXFOZ_gwZqY',
  authDomain: 'swarmplus.firebaseapp.com',
  databaseURL: 'https://swarmplus.firebaseio.com',
  projectId: 'swarmplus',
  storageBucket: 'swarmplus.appspot.com',
  messagingSenderId: '467829541317',
  appId: '1:467829541317:web:b043b5717f36d61f',
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

export type CollectionRef = firebase.firestore.CollectionReference
export type DocumentRef = firebase.firestore.DocumentReference
export type Query = firebase.firestore.Query
