import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import "../styles/SavedVibes.css";
import Navbar from "../components/Nav";

function SavedVibes() {
  const [vibes, setVibes] = useState([]);
  const navigate = useNavigate();

    const formatDate = (timestamp) => {
        if (!timestamp) return "Unknown date";

        const date = timestamp.toDate(); // Firestore Timestamp → JS Date

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
        const vibesRef = collection(
            db,
            "users",
            user.uid,
            "vibes"
        );

        const q = query(
            vibesRef,
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const vibeList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setVibes(vibeList);
        } catch (error) {
        console.error(error);
        }
    });

    return () => unsubscribe();
    }, []);

  return (
    <div className="saved-vibes">
        <Navbar />

      <h1>My Saved Vibes</h1>

      <div className="saved-vibes-grid">
        {vibes.map((vibe) => (
            <div
                key={vibe.id}
                className="vibe-card"
                style={{
                background: `linear-gradient(
                  135deg,
                  ${vibe.colors[0]},
                  ${vibe.colors[1]}
                )`
              }}
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
                })}>

                <h2> {vibe.moodIcon} {vibe.mood} {vibe.activity} </h2>
                <h3>{vibe.playlistName}</h3>
                <p className="vibe-date"> Saved on {formatDate(vibe.createdAt)}</p>
            </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <span className="ev-muted">© 2026 ENVibe · CSE 499</span>
      </footer>
    </div>
  );
}

export default SavedVibes;