import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth' 

const firebaseConfig = {
    apiKey: "AIzaSyB178K_pzzRP9r_FPK6SUBz7PAYkFYaw3Q",
    authDomain: "course-scheduler-assistant.firebaseapp.com",
    projectId: "course-scheduler-assistant",
    storageBucket: "course-scheduler-assistant.appspot.com",
    messagingSenderId: "534990705553",
    appId: "1:534990705553:web:4519a7514dfd4714e5c030"
  }

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }