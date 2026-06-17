import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/CreateVibe.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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
      <Link to="/">
        <img src="/logo.png" alt="ENVibe" className="ev-logo" />
      </Link>
      <ul className="ev-nav-links">
        <li><Link to="/create-vibe" className={location.pathname === "/create-vibe" ? "ev-link active" : "ev-link"}>Create Vibe</Link></li>
        <li><Link to="/saved-vibes" className={location.pathname === "/saved-vibes" ? "ev-link active" : "ev-link"}>My Saved Vibes</Link></li>
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