import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { fetchFromAPI } from "../utilities/fetchFromAPI";
import "../App.css";
import "../styles/CreateVibe.css";
import Navbar from "../components/Nav";

/*
  ─────────────────────────────────────────────
  MOOD CONFIGURATION DATA
  ─────────────────────────────────────────────
  Each mood defines:
  - name: displayed label
  - colors: gradient background used in UI
  - description: shown in preview section
  - icon: visual emoji representation
*/
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

/*
  ─────────────────────────────────────────────
  ACTIVITY OPTIONS
  ─────────────────────────────────────────────
  Each activity includes an image used in the selection grid.
*/
const activities = [
  { name: "Reading",     image: "/activities/reading.jpg" },
  { name: "Studying",    image: "/activities/studying.jpg" },
  { name: "Working out", image: "/activities/workingout.jpg" },
  { name: "Meditating",  image: "/activities/meditating.jpg" },
  { name: "Cooking",     image: "/activities/cooking.jpg" },
  { name: "Cleaning",    image: "/activities/cleaning.jpg" }
];

/*
  Activities that require instrumental music only.
  Used to adjust playlist query generation.
*/
const instrumentalActivities = ["Reading", "Studying", "Meditating"];

const CreateVibe = () => {
  const navigate = useNavigate();

  // User selections
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  // Loading state for API request
  const [loading, setLoading] = useState(false);

  /*
    ─────────────────────────────────────────────
    GENERATE VIBE (CORE FEATURE)
    ─────────────────────────────────────────────
    1. Validates user selections
    2. Builds Spotify search query based on mood + activity
    3. Calls external API for playlist search
    4. Navigates to Environment page with selected data
  */
  async function handleGenerate() {
    if (!selectedActivity || !selectedMood) {
      alert("Please select a mood and activity");
      return;
    }

    setLoading(true);

    try {
      const isInstrumental = instrumentalActivities.includes(selectedActivity);

      // Build search query dynamically based on context
      const query = isInstrumental
        ? `${selectedMood.name} ${selectedActivity} instrumental playlist`
        : `${selectedMood.name} ${selectedActivity} playlist`;

      // Fetch playlists from external API (Spotify wrapper)
      const data = await fetchFromAPI("search/", {
        q: query,
        type: "playlists"
      });

      // Handle empty results
      if (!data.playlists?.items?.length) {
        alert("No playlists found for this vibe. Try a different combination!");
        return;
      }

      const playlist = data.playlists.items[0];

      // Navigate to immersive environment page with selected vibe data
      navigate("/environment", {
        state: {
          mood: selectedMood,
          activity: selectedActivity,
          playlist
        }
      });

    } catch (err) {
      console.error("Failed to fetch playlist:", err);

      // Handle API-specific error vs generic error
      if (err.response?.status === 500) {
        alert("Spotify is temporarily unavailable. Please wait a few seconds and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      {/* Reusable navigation component */}
      <Navbar />

      <h1>Create a Vibe</h1>

      <div className="create">

        {/* ─────────────────────────────
            LEFT PANEL: USER SELECTIONS
        ───────────────────────────── */}
        <div className="selection">

          {/* Mood selection grid */}
          <h2>Choose a Mood</h2>
          <div className="mood-grid">
            {moods.map((mood) => (
              <div
                key={mood.name}
                className={`mood-card ${selectedMood?.name === mood.name ? "selected" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${mood.colors[0]}, ${mood.colors[1]})`
                }}
                onClick={() => setSelectedMood(mood)}
              >
                <h3>{mood.name}</h3>
              </div>
            ))}
          </div>

          {/* Activity selection grid */}
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

          {/* Generate button triggers playlist search */}
          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Finding your vibe…" : "GENerate"}
          </button>
        </div>

        {/* ─────────────────────────────
            RIGHT PANEL: LIVE PREVIEW
        ───────────────────────────── */}
        <div className="preview">
          <h2>Preview</h2>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              marginTop: "20px",
              background: selectedMood
                ? `linear-gradient(135deg, ${selectedMood.colors[0]}, ${selectedMood.colors[1]})`
                : "#333",
              color: "white"
            }}
          >
            {/* Conditional preview display */}
            {selectedActivity && selectedMood ? (
              <div className="preview-text">
                <h2>
                  {selectedMood.icon} {selectedMood.name} {selectedActivity}
                </h2>

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

      {/* ── Footer ── */}
      <footer className="home-footer">
        <span className="ev-muted">© 2026 ENVibe · CSE 499</span>
      </footer>
    </section>
  );
};

export default CreateVibe;