import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/General.css";
import "../styles/Login.css";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("That email is already registered. Try logging in.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ev-page auth-page">
      {/* Nav */}
      <nav className="ev-nav">
        <Link to="/">
          <img src="/logo.png" alt="ENVibe" className="ev-logo" />
        </Link>
      </nav>

      {/* Card */}
      <main className="auth-main">
        <div className="auth-card">
          <h1 className="ev-h1" style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>
            Create your account
          </h1>
          <p className="ev-muted" style={{ marginBottom: "1.5rem" }}>
            Free forever. No credit card needed.
          </p>

          <form className="ev-form" onSubmit={handleRegister}>
            <div>
              <label className="ev-label" htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                className="ev-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="ev-label" htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                className="ev-input"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="ev-label" htmlFor="reg-confirm">Confirm password</label>
              <input
                id="reg-confirm"
                className="ev-input"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            </div>

            {password.length > 0 && (
              <div className="reg-strength">
                <div
                  className="reg-strength-bar"
                  data-strength={
                    password.length < 6 ? "weak"
                    : password.length < 10 ? "ok"
                    : "strong"
                  }
                />
                <span className="ev-muted" style={{ fontSize: "0.85rem" }}>
                  {password.length < 6 ? "Too short"
                    : password.length < 10 ? "Good"
                    : "Strong ✓"}
                </span>
              </div>
            )}

            {error && <p className="ev-error">{error}</p>}

            <button className="ev-btn" type="submit" disabled={loading}
              style={{ width: "100%", marginTop: "0.5rem" }}>
              {loading ? "Creating account…" : "Sign Up"}
            </button>
          </form>

          <div className="ev-divider" style={{ margin: "1.25rem 0" }} />

          <p className="ev-muted">
            Already have an account?{" "}
            <Link to="/login" className="ev-link" style={{ color: "#c084fc" }}>
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}