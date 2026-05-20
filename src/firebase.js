// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjJawaOGxssQoc3PuBy7ArlzB45Zu-TXg",
  authDomain: "envibe-d047e.firebaseapp.com",
  projectId: "envibe-d047e",
  storageBucket: "envibe-d047e.firebasestorage.app",
  messagingSenderId: "578224372629",
  appId: "1:578224372629:web:fc586a648fc610153a549c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);