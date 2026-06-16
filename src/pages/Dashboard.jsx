import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "../components/Nav.jsx";
import "../App.css";
import "../styles/CreateVibe.css";

export default function Dashboard() {
  return (
    <div className="ev-page">
      <Navbar />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1 className="ev-h1">Dashboard</h1>
        <p className="ev-muted" style={{ marginTop: "0.5rem" }}>
          Coming soon  your saved vibes and history will appear here.
        </p>
      </main>
    </div>
  );
}