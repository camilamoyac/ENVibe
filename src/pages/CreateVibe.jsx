import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../utilities/fetchFromAPI";
import "../App.css";
import "../styles/CreateVibe.css";

const moods = [
  {
    name: "Cozy",
    colors: ["#84592b", "#e8d1a7", "#093824"],
    description: "Warm earthy tones and soft ambient music.",
    icon: "☕"
  },
  {
    name: "Focused",
    colors: ["#404959", "#b2b9ce", "#CBE896"],
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
    colors: ["#71713b", "#e2dcd0", "#3A3335"],
    description: "Gentle colors and calming ambience.",
    icon: "🌿"
  },
  {
    name: "Intense",
    colors: ["#1d0302", "#c70f06", "#FBBD5A"],
    description: "Bold visuals, powerful energy, and an immersive atmosphere.",
    icon: "🔥"
  }
];

const activities = [
  "Reading",
  "Studying",
  "Working out",
  "Meditating",
  "Cooking",
  "Cleaning"
];

const CreateVibe = () => {

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const generateVibe = async () => {
    if (!selectedMood || !selectedActivity) {
      alert("Please select a mood and activity");
      return;
    }

    try {
      const instrumentalActivities = [
        "Reading",
        "Studying",
        "Meditating"
      ];

      const query = instrumentalActivities.includes(selectedActivity)
        ? `${selectedMood.name} ${selectedActivity} instrumental playlist`
        : `${selectedMood.name} ${selectedActivity} playlist`;
      console.log("Searching:", query);
      const data = await fetchFromAPI(query);
      if (!data.playlists?.items?.length) {
        alert("No playlists found for this vibe.");
        return;
      }
      const playlist = data.playlists.items[0];

      navigate("/environment", {
        state: {
          mood: selectedMood,
          activity: selectedActivity,
          playlist
        }
      });

    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      alert("Something went wrong while generating your vibe. Please try again.");
    }
  };

  return (
    <section>
      {/* ── Nav ── */}
      <nav className="ev-nav">
        <Link to="/">
          <img src="/logo.png" alt="ENVibe" className="ev-logo" />
        </Link>
        <ul className="ev-nav-links">
          <li><Link to="/saved" className="ev-link">My Saved Vibes</Link></li>
          <li><Link to="/logout" className="ev-link">Logout</Link></li>
        </ul>
      </nav>

      <h1>Create a Vibe</h1>

      <div className="create">

        <div className="selection">

          <h2>Choose a Mood</h2>
          <div className="mood-grid">
          {moods.map((mood) => (
            <div
              key={mood.name}
              className={`mood-card ${
                  selectedMood === mood.name ? "selected" : ""
                }`}
              style={{
                background: `linear-gradient(
                  135deg,
                  ${mood.colors[0]},
                  ${mood.colors[1]}
                )`
              }}
              onClick={() =>
                setSelectedMood(mood)
              }
            >
              <h3>{mood.name}</h3>
            </div>
          ))}
          </div>

          <h2>Pick an Activity</h2>
          <div className="activity-grid">
            {activities.map((activity) => (
              <div
                key={activity}
                className={`activity-card ${
                  selectedActivity === activity ? "selected" : ""
                }`}
                onClick={() => setSelectedActivity(activity)}
              >
                <h3>{activity}</h3>
              </div>
            ))}
          </div>
          
          <button className="generate-btn" onClick={generateVibe}>
            GENerate
          </button>
        </div>
        
        <div className="preview">
          <h2>Preview</h2>
            <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              marginTop: "20px",
              background: selectedMood
                ? `linear-gradient(
                    135deg,
                    ${selectedMood.colors[0]},
                    ${selectedMood.colors[1]}
                  )`
                : "#333",
              color: "white"
            }}>
            {selectedActivity && selectedMood ? (
              <div className="preview-text">
                <h2>
                  {selectedMood.icon} {selectedMood.name} {selectedActivity}
                </h2>
                <p>{selectedMood.description}</p>
                <p>
                  Music recommendation ready:
                  <br />
                  "{selectedMood.name} music for {selectedActivity}"
                </p>
              </div>
            ) : (
              <p>Select an activity and mood to create your ENVibe.</p>
            )}
          </div>
        </div>
  
      </div>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <span className="ev-muted">© 2026 ENVibe · CSE 499</span>
      </footer>
    </section>
  );
}

export default CreateVibe