import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";
import "../styles/CreateVibe.css";
import Navbar from "../components/Nav";

import { searchVibeMusic } from "../utilities/fetchFromAPI";
// import { Videos } from "./Videos"

const moods = [
  { name: "Cozy", colors: ["#84592b", "#e8d1a7"], description: "Warm earthy tones and soft ambient music.", icon: "☕" },
  { name: "Focused", colors: ["#404959", "#b2b9ce"], description: "Clean visuals and distraction-free sound.", icon: "🧠" },
  { name: "Energetic", colors: ["#e56d49", "#89a561"], description: "Bright colors and upbeat motivation.", icon: "⚡" },
  { name: "Romantic", colors: ["#c87d87", "#f0c4cb"], description: "Soft colors, heartfelt melodies, and a dreamy atmosphere.", icon: "🌹" },
  { name: "Relaxed", colors: ["#71713b", "#e2dcd0"], description: "Gentle colors and calming ambience.", icon: "🌿" },
  { name: "Intense", colors: ["#1d0302", "#c70f06"], description: "Bold visuals, powerful energy, and an immersive atmosphere.", icon: "🔥" }
];

const activities = ["Reading", "Studying", "Working out", "Meditating", "Cooking", "Cleaning"];

const CreateVibe = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [apiError, setApiError] = useState("");

  async function handleGenerate() {
    if (!selectedActivity || !selectedMood) return;
    setLoadingTracks(true);
    setTracks([]);
    setApiError("");
    try {
      const data = await searchVibeMusic(selectedMood.name, selectedActivity);
      console.log("API response:", data); // ← debug: check console for response shape
      const items = data?.tracks?.items || [];
      console.log("Tracks found:", items.length, items);
      if (items.length === 0) {
        setApiError("No tracks returned — check console for API response shape.");
      }
      setTracks(items);
    } catch (err) {
      console.error("Failed to fetch tracks:", err);
      setApiError(`API error: ${err.message}`);
    } finally {
      setLoadingTracks(false);
    }
  }

  async function handleSaveVibe() {
    if (!selectedActivity || !selectedMood) {
      setSaveStatus("error");
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    setSaveStatus("saving");
    try {
      await addDoc(collection(db, "vibes"), {
        uid: user.uid,
        activity: selectedActivity,
        mood: selectedMood.name,
        moodIcon: selectedMood.icon,
        moodColors: selectedMood.colors,
        moodDescription: selectedMood.description,
        tracks: tracks.map(t => ({
          name: t.data?.name || "",
          artist: t.data?.artists?.items?.[0]?.profile?.name || "",
          uri: t.data?.uri || ""
        })),
        createdAt: serverTimestamp()
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setSaveStatus("error");
    }
  }

  return (
    <section>
      <Navbar />

      <h1>Create a Vibe</h1>

      <div className="create">
        <div className="selection">
          <h2>Pick an Activity</h2>
          <div className="activity-grid">
            {activities.map((activity) => (
              <div
                key={activity}
                className={`activity-card ${selectedActivity === activity ? "selected" : ""}`}
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
                className={`mood-card ${selectedMood?.name === mood.name ? "selected" : ""}`}
                style={{ background: `linear-gradient(135deg, ${mood.colors[0]}, ${mood.colors[1]})` }}
                onClick={() => setSelectedMood(mood)}
              >
                <h3>{mood.name}</h3>
              </div>
            ))}
          </div>

          <button className="generate-btn" onClick={handleGenerate}>
            GENerate
          </button>
        </div>

        <div className="preview">
          <h2>Preview</h2>
          <div style={{
            padding: "20px", borderRadius: "12px", marginTop: "20px",
            background: selectedMood
              ? `linear-gradient(135deg, ${selectedMood.colors[0]}, ${selectedMood.colors[1]})`
              : "#333",
            color: "white"
          }}>
            {selectedActivity && selectedMood ? (
              <div className="preview-text">
                <h2>{selectedMood.icon} {selectedMood.name} {selectedActivity}</h2>
                <p>{selectedMood.description}</p>

                {/* ── Track results ── */}
                {loadingTracks && <p style={{ marginTop: "1rem" }}>Finding tracks…</p>}

                {/* ── API error message ── */}
                {apiError && (
                  <p style={{ marginTop: "1rem", color: "#ff65fa", fontSize: "0.9rem" }}>
                    ⚠️ {apiError}
                  </p>
                )}

                {tracks.length > 0 && (
                  <div style={{ marginTop: "1rem", textAlign: "left" }}>
                    <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>🎵 Tracks for your vibe:</p>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {tracks.map((t, i) => {
                        const name = t.data?.name || "Unknown";
                        const artist = t.data?.artists?.items?.[0]?.profile?.name || "Unknown artist";
                        const spotifyUrl = `https://open.spotify.com/track/${t.data?.id}`;
                        return (
                          <li key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                            <a href={spotifyUrl} target="_blank" rel="noreferrer"
                              style={{ color: "azure", textDecoration: "none" }}>
                              🎵 {name} — <span style={{ opacity: 0.8 }}>{artist}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {!loadingTracks && tracks.length === 0 && !apiError && (
                  <p style={{ marginTop: "1rem", opacity: 0.7 }}>
                    Hit GENerate to find music for your vibe!
                  </p>
                )}

                {/* ── Save Vibe button ── */}
                <button
                  className="generate-btn"
                  onClick={handleSaveVibe}
                  disabled={saveStatus === "saving"}
                  style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}
                >
                  {saveStatus === "saving" ? "Saving…"
                    : saveStatus === "saved" ? "✓ Vibe Saved!"
                    : saveStatus === "error" ? "Select mood & activity first"
                    : "💾 Save Vibe"}
                </button>
              </div>
            ) : (
              <p>Select an activity and mood to create your ENVibe.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateVibe;