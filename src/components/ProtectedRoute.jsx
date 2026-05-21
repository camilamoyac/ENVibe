import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null = not logged in, object = logged in
    });
    return () => unsubscribe();
  }, []);

  // Still checking auth state — show nothing (or a spinner)
  if (user === undefined) {
    return <div className="auth-loading">Loading...</div>;
  }

  // Not logged in — redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in — render the protected page
  return children;
}