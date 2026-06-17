import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
  ─────────────────────────────────────────────
  FIREBASE INITIALIZATION
  ─────────────────────────────────────────────
  This file initializes the Firebase app and exports
  shared services used throughout the project:

  - Authentication (Firebase Auth)
  - Database (Firestore)
*/

const firebaseConfig = {
  apiKey: "AIzaSyCjJawaOGxssQoc3PuBy7ArlzB45Zu-TXg",
  authDomain: "envibe-d047e.firebaseapp.com",
  projectId: "envibe-d047e",
  storageBucket: "envibe-d047e.firebasestorage.app",
  messagingSenderId: "578224372629",
  appId: "1:578224372629:web:fc586a648fc610153a549c",
};

/*
  Initialize Firebase app instance
*/
const app = initializeApp(firebaseConfig);

/*
  Export Firebase services for use across the app
*/
export const auth = getAuth(app);
export const db = getFirestore(app);