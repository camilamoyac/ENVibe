import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/SavedVibes.css";

function SavedVibes() {
  const [vibes, setVibes] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
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

        {/* ── Nav ── */}
      <nav className="ev-nav">
        <Link to="/">
          <img src="/logo.png" alt="ENVibe" className="ev-logo" />
        </Link>
        <ul className="ev-nav-links">
          <li><Link to="/createVibe" className="ev-link">Create Vibe</Link></li>
          <li><button onClick={handleLogout} className="ev-link">Logout </button></li>
        </ul>
      </nav>

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