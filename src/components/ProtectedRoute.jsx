import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

/*
  ─────────────────────────────────────────────
  PROTECTED ROUTE COMPONENT
  ─────────────────────────────────────────────
  Purpose:
  Restricts access to certain routes unless the user is authenticated.

  How it works:
  - Listens to Firebase Auth state
  - Shows loading state while checking auth
  - Redirects unauthenticated users to login
  - Renders protected content if user is logged in
*/

export default function ProtectedRoute({ children }) {
  /*
    user state:
    - undefined → still checking authentication state
    - null → not logged in
    - object → logged in user
  */
  const [user, setUser] = useState(undefined);

  /*
    ─────────────────────────────────────────────
    AUTH STATE LISTENER
    ─────────────────────────────────────────────
    Subscribes to Firebase authentication changes
    and updates local state accordingly.
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  /*
    While Firebase is checking authentication status,
    we avoid rendering anything to prevent flicker.
  */
  if (user === undefined) {
    return <div className="auth-loading">Loading...</div>;
  }

  /*
    If user is not authenticated, redirect to login page.
    "replace" prevents going back to protected route via browser back button.
  */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /*
    If authenticated, render protected page content.
  */
  return children;
}