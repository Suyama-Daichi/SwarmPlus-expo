import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import fs from '@react-native-firebase/firestore'
import analytics from '@react-native-firebase/analytics'

export const firestore = fs()
export const Analytics = analytics()

export type CollectionRef = firebase.firestore.CollectionReference
export type DocumentRef = firebase.firestore.DocumentReference
export type Query = firebase.firestore.Query
