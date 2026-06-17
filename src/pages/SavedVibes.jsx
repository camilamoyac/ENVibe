import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/SavedVibes.css";
import Navbar from "../components/Nav";

/*
  ─────────────────────────────────────────────
  SAVED VIBES PAGE
  ─────────────────────────────────────────────
  Purpose:
  - Fetches user-specific saved vibes from Firestore
  - Displays them in a visual grid
  - Allows navigation back into the ENVibe environment
  - Ensures user is authenticated before access
*/

function SavedVibes() {
  const [vibes, setVibes] = useState([]);
  const navigate = useNavigate();

  /*
    Formats Firestore timestamp into readable date string
  */
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";

    const date = timestamp.toDate(); // Firestore Timestamp → JS Date

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /*
    ─────────────────────────────────────────────
    FETCH SAVED VIBES (AUTH-AWARE)
    ─────────────────────────────────────────────
    1. Listens for authentication state changes
    2. Redirects to login if user is not authenticated
    3. Queries Firestore for user's saved vibes
    4. Orders results by most recent (createdAt desc)
    5. Stores results in local state
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Reference to user's vibes subcollection
        const vibesRef = collection(db, "users", user.uid, "vibes");

        // Query vibes ordered by creation date (newest first)
        const q = query(vibesRef, orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);

        // Convert Firestore docs into usable JS objects
        const vibeList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVibes(vibeList);

      } catch (error) {
        console.error("Failed to fetch saved vibes:", error);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="saved-vibes">

      {/* Reusable navigation bar */}
      <Navbar />

      <h1>My Saved Vibes</h1>

      {/* ─────────────────────────────
          VIBES GRID
      ───────────────────────────── */}
      <div className="saved-vibes-grid">
        {vibes.map((vibe) => (
          <div
            key={vibe.id}
            className="vibe-card"

            /*
              Dynamic gradient background based on saved mood colors
            */
            style={{
              background: `linear-gradient(
                135deg,
                ${vibe.colors[0]},
                ${vibe.colors[1]}
              )`,
            }}

            /*
              Clicking a vibe restores it in Environment page
            */
            onClick={() =>
              navigate("/environment", {
                state: {
                  mood: {
                    name: vibe.mood,
                    icon: vibe.moodIcon,
                    colors: vibe.colors,
                  },
                  activity: vibe.activity,
                  playlistId: vibe.playlistId,
                  playlistName: vibe.playlistName,
                },
              })
            }
          >
            {/* Main vibe info */}
            <h2>
              {vibe.moodIcon} {vibe.mood} {vibe.activity}
            </h2>

            <h3>{vibe.playlistName}</h3>

            {/* Saved date display */}
            <p className="vibe-date">
              Saved on {formatDate(vibe.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────
          FOOTER
      ───────────────────────────── */}
      <footer className="home-footer">
        <span className="ev-muted">
          © 2026 ENVibe · CSE 499
        </span>
      </footer>
    </div>
  );
}

export default SavedVibes;