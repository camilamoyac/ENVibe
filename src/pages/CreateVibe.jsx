import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/CreateVibe.css";
import Navbar from "../components/Nav";
import { fetchFromAPI } from "../utilities/fetchFromAPI";


const moods = [
  {
    name: "Cozy",
    colors: ["#84592b", "#e8d1a7", "#1a2f0b"],
    description: "Warm earthy tones and soft ambient music.",
    icon: "☕"
  },
  {
    name: "Focused",
    colors: ["#404959", "#b2b9ce", "#c5db9e"],
    description: "Clean visuals and distraction-free sound.",
    icon: "🧠"
  },
  {
    name: "Energetic",
    colors: ["#e56d49", "#89a561", "#0D3B66"],
    description: "Bright colors and upbeat motivation.",
    icon: "⚡"
  },
  {
    name: "Romantic",
    colors: ["#c87d87", "#f0c4cb", "#561D25"],
    description: "Soft colors, heartfelt melodies, and a dreamy atmosphere.",
    icon: "🌹"
  },
  {
    name: "Relaxed",
    colors: ["#71713b", "#e2dcd0", "#333a39"],
    description: "Gentle colors and calming ambience.",
    icon: "🌿"
  },
  {
    name: "Intense",
    colors: ["#1d0302", "#c70f06", "#f78349"],
    description: "Bold visuals, powerful energy, and an immersive atmosphere.",
    icon: "🔥"
  }
];

const activities = [
  { name: "Reading",     image: "/activities/reading.jpg" },
  { name: "Studying",    image: "/activities/studying.jpg" },
  { name: "Working out", image: "/activities/workingout.jpg" },
  { name: "Meditating",  image: "/activities/meditating.jpg" },
  { name: "Cooking",     image: "/activities/cooking.jpg" },
  { name: "Cleaning",    image: "/activities/cleaning.jpg" }
];

const instrumentalActivities = ["Reading", "Studying", "Meditating"];

const CreateVibe = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMood, setSelectedMood]         = useState(null);
  const [loading, setLoading]                   = useState(false);

  async function handleGenerate() {
    if (!selectedActivity || !selectedMood) {
      alert("Please select a mood and activity");
      return;
    }
    setLoading(true);
    try {
      const isInstrumental = instrumentalActivities.includes(selectedActivity);
      const query = isInstrumental
        ? `${selectedMood.name} ${selectedActivity} instrumental playlist`
        : `${selectedMood.name} ${selectedActivity} playlist`;
      const data = await fetchFromAPI(query);
      if (!data.playlists?.items?.length) {
        alert("No playlists found for this vibe. Try a different combination!");
        return;
      }

      const playlist = data.playlists.items[0];

      navigate("/environment", {
        state: { mood: selectedMood, activity: selectedActivity, playlist }
      });
    } catch (err) {
      console.error("Failed to fetch playlist:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      {/* ── Nav ── */}
      <nav className="ev-nav">
        <Link to="/">
          <img src="/logo.png" alt="ENVibe" className="ev-logo" />
        </Link>
        <ul className="ev-nav-links">
          <li><Link to="/saved-vibes" className="ev-link">My Saved Vibes</Link></li>
          <li><Link to="/logout" className="ev-link">Logout</Link></li>
        </ul>
      </nav>

      <h1>Create a Vibe</h1>

      <div className="create">
        {/* ── Left: Selection ── */}
        <div className="selection">
          <h2>Choose a Mood</h2>
          <div className="mood-grid">
            {moods.map((mood) => (
              <div
                key={mood.name}
                className={`mood-card ${selectedMood?.name === mood.name ? "selected" : ""}`}
                style={{ background: `linear-gradient(135deg, ${mood.colors[0]}, ${mood.colors[1]}, ${mood.colors[2]})` }}
                onClick={() => setSelectedMood(mood)}
              >
                <h3>{mood.name}</h3>
              </div>
            ))}
          </div>

          <h2>Pick an Activity</h2>
          <div className="activity-grid">
            {activities.map((activity) => (
              <div
                key={activity.name}
                className={`activity-card ${selectedActivity === activity.name ? "selected" : ""}`}
                style={{ backgroundImage: `url(${activity.image})` }}
                onClick={() => setSelectedActivity(activity.name)}
              >
                <div className="activity-overlay">
                  <h3>{activity.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? "Finding your vibe…" : "GENerate"}
          </button>
        </div>

        {/* ── Right: Preview ── */}
        <div className="preview">
          <h2>Preview</h2>
          <div style={{
            padding: "20px", borderRadius: "12px", marginTop: "20px",
            background: selectedMood
              ? `linear-gradient(135deg, ${selectedMood.colors[0]}, ${selectedMood.colors[1]}, ${selectedMood.colors[2]})`
              : "#333",
            color: "white"
          }}>
            {selectedActivity && selectedMood ? (
              <div className="preview-text">
                <h2>{selectedMood.icon} {selectedMood.name} {selectedActivity}</h2>
                <p>{selectedMood.description}</p>
                <p style={{ marginTop: "1rem", opacity: 0.8 }}>
                  Hit GENerate to enter your environment!
                </p>
              </div>
            ) : (
              <p>Select an activity and mood to create your ENVibe.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <span className="ev-muted">© 2026 ENVibe · CSE 499</span>
      </footer>
    </section>
  );
};

export default CreateVibe;