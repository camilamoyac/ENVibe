import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/CreateVibe.css";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
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
            Welcome back
          </h1>
          <p className="ev-muted" style={{ marginBottom: "1.5rem" }}>
            Log in to pick up where you left off.
          </p>

          <form className="ev-form" onSubmit={handleLogin}>
            <div>
              <label className="ev-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="ev-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="ev-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="ev-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="ev-error">{error}</p>}

            <button className="ev-btn" type="submit" disabled={loading}
              style={{ width: "100%", marginTop: "0.5rem" }}>
              {loading ? "Logging in…" : "Log In"}
            </button>
          </form>

          <div className="ev-divider" style={{ margin: "1.25rem 0" }} />

          <p className="ev-muted">
            Don't have an account?{" "}
            <Link to="/register" className="ev-link" style={{ color: "#c084fc" }}>
              Sign up free
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}