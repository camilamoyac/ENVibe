import { Link } from "react-router-dom";
//import "../styles/CreateVibe.css";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="ev-page">
      {/* ── Nav ── */}
      <nav className="ev-nav">
        <img src="/logo.png" alt="ENVibe" className="ev-logo" />
        <ul className="ev-nav-links">
          <li><Link to="/login" className="ev-link">Login</Link></li>
          <li><Link to="/register" className="ev-btn" style={{ fontSize: "1rem", padding: "0.5rem 1.25rem" }}>Sign Up</Link></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <p className="home-eyebrow">Your music. Your mood. Your vibe.</p>
          <h1 className="ev-h1">Welcome to ENVibe</h1>
          <p className="home-tagline">
            Tell us how you're feeling and what you're doing. We'll build your
            perfect digital environment.
          </p>
          <div className="home-cta-group">
            <Link to="/createVibe" className="ev-btn">Create a Vibe</Link>
            <Link to="/login" className="ev-btn-ghost">Log In</Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="home-how">
        <h2 className="ev-h2" style={{ textAlign: "center", marginBottom: "2rem" }}>
          How it works
        </h2>
        <div className="home-steps">
          {[
            { emoji: "🎭", title: "Pick your mood", desc: "Choose how you're feeling right now." },
            { emoji: "🏃", title: "Pick an activity", desc: "Tell us what you're up to." },
            { emoji: "🎵", title: "Get your environment", desc: "We generate the perfect vibe for you." },
          ].map((step, i) => (
            <div className="ev-card home-step-card" key={i}>
              <span className="home-step-emoji">{step.emoji}</span>
              <h3 className="home-step-title">{step.title}</h3>
              <p className="ev-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <span className="ev-muted">© 2026 ENVibe · CSE 499</span>
      </footer>
    </div>
  );
}