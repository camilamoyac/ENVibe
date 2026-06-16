import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/CreateVibe.css";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <nav className="ev-nav">
      <Link to="/createVibe">
        <img src="/logo.png" alt="ENVibe" className="ev-logo" />
      </Link>
      <ul className="ev-nav-links">
        <li><Link to="/createVibe" className="ev-link">Create Vibe</Link></li>
        <li><Link to="/saved" className="ev-link">Saved</Link></li>
        <li>
          <button className="ev-btn-ghost" onClick={handleLogout}
            style={{ fontSize: "1rem", padding: "0.4rem 1.1rem", cursor: "pointer" }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}