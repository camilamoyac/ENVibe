import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../utilities/fetchFromAPI";
import "../App.css";
import "../styles/CreateVibe.css";

// import { fetchFromAPI } from "../utilities/fetchFromAPI";
// import { Videos } from "./Videos"

const moods = [
  {
    name: "Cozy",
    colors: ["#84592b", "#e8d1a7"],
    description: "Warm earthy tones and soft ambient music.",
    icon: "☕"
  },
  {
    name: "Focused",
    colors: ["#404959", "#b2b9ce"],
    description: "Clean visuals and distraction-free sound.",
    icon: "🧠"
  },
  {
    name: "Energetic",
    colors: ["#e56d49", "#89a561"],
    description: "Bright colors and upbeat motivation.",
    icon: "⚡"
  },
  {
    name: "Romantic",
    colors: ["#c87d87", "#f0c4cb"],
    description: "Soft colors, heartfelt melodies, and a dreamy atmosphere.",
    icon: "🌹"
  },
  {
    name: "Relaxed",
    colors: ["#71713b", "#e2dcd0"],
    description: "Gentle colors and calming ambience.",
    icon: "🌿"
  },
  {
    name: "Intense",
    colors: ["#1d0302", "#c70f06"],
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
      const query =
        `${selectedMood.name} ${selectedActivity} instrumental playlist`;
      console.log("Searching:", query);
      const data = await fetchFromAPI(query);
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
    }
  };

  return (
    <section>
      <nav>
        <ul className="home-nav">
          <li><a href="./Home.jsx"></a><img src="logo.png" alt="ENVibe logo" width={150}/></li>
          <li><a href="./Login.jsx"></a>Login</li>
        </ul>
      </nav>

      <h1>Create a Vibe</h1>

      <div className="create">

        <div className="selection">
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
    </section>
  );
}

export default CreateVibe