import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/CreateVibe.css";

/*
  ─────────────────────────────────────────────
  NAVBAR COMPONENT
  ─────────────────────────────────────────────
  Reusable navigation bar used across authenticated pages.

  Features:
  - Navigation between main app pages
  - Active link highlighting based on current route
  - Logout functionality using Firebase Auth
*/

export default function Navbar() {
  const navigate = useNavigate();

  // Provides current route information for active link styling
  const location = useLocation();

  /*
    Handles user logout:
    - Signs out from Firebase Auth
    - Redirects user to login page
  */
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

      {/* App logo → redirects to home */}
      <Link to="/">
        <img src="/logo.png" alt="ENVibe" className="ev-logo" />
      </Link>

      {/* Navigation links */}
      <ul className="ev-nav-links">

        {/* Create Vibe page link (active styling applied dynamically) */}
        <li>
          <Link
            to="/create-vibe"
            className={
              location.pathname === "/create-vibe"
                ? "ev-link active"
                : "ev-link"
            }
          >
            Create Vibe
          </Link>
        </li>

        {/* Saved Vibes page link (active styling applied dynamically) */}
        <li>
          <Link
            to="/saved-vibes"
            className={
              location.pathname === "/saved-vibes"
                ? "ev-link active"
                : "ev-link"
            }
          >
            My Saved Vibes
          </Link>
        </li>

        {/* Logout button (not a Link because it triggers auth action) */}
        <li>
          <button
            className="ev-btn-ghost"
            onClick={handleLogout}
            style={{
              fontSize: "1rem",
              padding: "0.4rem 1.1rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </li>

      </ul>
    </nav>
  );
}