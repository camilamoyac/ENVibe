import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjJawaOGxssQoc3PuBy7ArlzB45Zu-TXg",
  authDomain: "envibe-d047e.firebaseapp.com",
  projectId: "envibe-d047e",
  storageBucket: "envibe-d047e.firebasestorage.app",
  messagingSenderId: "578224372629",
  appId: "1:578224372629:web:fc586a648fc610153a549c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);