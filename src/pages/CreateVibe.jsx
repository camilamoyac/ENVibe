import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css"

// import { fetchFromAPI } from "../utilities/fetchFromAPI";
// import { Videos } from "./Videos"

const moods = [
  {
    name: "Cozy",
    colors: ["#84592b", "#e8d1a7"]
  },
  {
    name: "Focused",
    colors: ["#404959", "#828daf"]
  },
  {
    name: "Energetic",
    colors: ["#e56d49", "#89a561"]
  },
  {
    name: "Romantic",
    colors: ["#c87d87", "#f0c4cb"]
  },
  {
    name: "Relaxed",
    colors: ["#71713b", "#e2dcd0"]
  },
  {
    name: "Intense",
    colors: ["#210100", "#8c0902"]
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

  useEffect(() => {
    if (!selectedActivity || !selectedMood) return;

    console.log(
      `${selectedMood?.name || "None"} music for ${selectedActivity}`
    );

  }, [selectedActivity, selectedMood]);

  return (
    
    <section>
      <div>
        <h1>Create a Vibe</h1>
      </div>

      <nav className="home-nav">
        <img src="#" alt="Logo" />
        <p className="login">Login</p>
      </nav>

      <h2>Pick an Activity</h2>
      {activities.map((activity) => (
        <button
          key={activity}
          onClick={() =>
            setSelectedActivity(activity)
          }
        >
          {activity}
        </button>
      ))}

      <h2>Choose a Mood</h2>

      {moods.map((mood) => (
        <button
          key={mood.name}
          onClick={() =>
            setSelectedMood(mood)
          }
        >
          {mood.name}
        </button>
      ))}
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
        }}
      >
        <h2>Preview</h2>

        <p>Activity: {selectedActivity || "None"}</p>

        <p>Mood: {selectedMood?.name || "None"}</p>

        <p>
          Search Query:
          {selectedMood && selectedActivity
            ? `${selectedMood?.name} music for ${selectedActivity}`
            : "Select options"}
        </p>

        <p>Results: {videos.length}</p>

      </div>
    </section>
  );
}

export default CreateVibe