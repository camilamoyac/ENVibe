import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};