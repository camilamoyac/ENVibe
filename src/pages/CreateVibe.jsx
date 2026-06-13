import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css"

import { fetchFromAPI } from "../utilities/fetchFromAPI";
import { Videos } from "./Music"

const CreateVibe = () => {

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!selectedActivity || !selectedMood) return;

    console.log(
      `${selectedMood?.name || "None"} music for ${selectedActivity}`
    );

  }, [selectedActivity, selectedMood]);

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
          <button className="generate-btn">
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