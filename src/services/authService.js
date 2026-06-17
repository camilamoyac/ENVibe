import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

/*
  ─────────────────────────────────────────────
  AUTH SERVICE (FIREBASE WRAPPER)
  ─────────────────────────────────────────────
  This file centralizes all Firebase authentication logic.

  Purpose:
  - Keeps auth logic separate from UI components
  - Makes authentication reusable across the app
  - Improves code organization and maintainability
*/

/*
  Registers a new user using Firebase Authentication.
  Returns a Promise from Firebase.
*/
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/*
  Logs in an existing user using Firebase Authentication.
*/
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/*
  Logs out the currently authenticated user.
*/
export const logoutUser = () => {
  return signOut(auth);
};