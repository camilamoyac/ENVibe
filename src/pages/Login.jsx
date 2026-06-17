import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/General.css";
import "../styles/Login.css";

/*
  ─────────────────────────────────────────────
  LOGIN PAGE
  ─────────────────────────────────────────────
  Handles user authentication using Firebase Auth.

  Features:
  - Email/password login form
  - Error handling for invalid credentials
  - Loading state during authentication
  - Redirects user after successful login
*/

export default function Login() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state (error + loading feedback)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
    ─────────────────────────────────────────────
    HANDLE LOGIN SUBMISSION
    ─────────────────────────────────────────────
    1. Prevents page reload
    2. Clears previous errors
    3. Attempts Firebase authentication
    4. Redirects user on success
    5. Handles errors and resets loading state
  */
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase authentication request
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect user to main app flow after login
      navigate("/create-vibe");

    } catch (err) {
      // User-friendly error message (avoid exposing Firebase errors)
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ev-page auth-page">

      {/* ─────────────────────────────
          SIMPLE NAV BAR (PUBLIC VIEW)
      ───────────────────────────── */}
      <nav className="ev-nav">
        <Link to="/">
          <img src="/logo.png" alt="ENVibe" className="ev-logo" />
        </Link>
      </nav>

      {/* ─────────────────────────────
          LOGIN FORM CONTAINER
      ───────────────────────────── */}
      <main className="auth-main">
        <div className="auth-card">

          {/* Page title + description */}
          <h1
            className="ev-h1"
            style={{ fontSize: "2rem", marginBottom: "0.25rem" }}
          >
            Welcome back
          </h1>

          <p className="ev-muted" style={{ marginBottom: "1.5rem" }}>
            Log in to pick up where you left off.
          </p>

          {/* ─────────────────────────────
              LOGIN FORM
          ───────────────────────────── */}
          <form className="ev-form" onSubmit={handleLogin}>

            {/* Email input */}
            <div>
              <label className="ev-label" htmlFor="email">
                Email
              </label>

              <input
                id="email"
                className="ev-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div>
              <label className="ev-label" htmlFor="password">
                Password
              </label>

              <input
                id="password"
                className="ev-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error message display */}
            {error && <p className="ev-error">{error}</p>}

            {/* Submit button with loading state */}
            <button
              className="ev-btn"
              type="submit"
              disabled={loading}
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              {loading ? "Logging in…" : "Log In"}
            </button>
          </form>

          {/* Divider between login and register */}
          <div className="ev-divider" style={{ margin: "1.25rem 0" }} />

          {/* Link to registration page */}
          <p className="ev-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="ev-link"
              style={{ color: "#c084fc" }}
            >
              Sign up free
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}