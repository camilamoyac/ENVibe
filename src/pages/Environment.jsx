import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { saveVibe } from "../services/vibeService";
import "../styles/Environment.css";

/*
  ─────────────────────────────────────────────
  ENVIRONMENT PAGE
  ─────────────────────────────────────────────
  This page renders the immersive "ENVibe" experience:
  - Dynamic gradient background based on mood
  - Animated particle system (CSS spans)
  - Embedded Spotify playlist
  - Controls to save or navigate between vibes

  Data is passed via React Router state from CreateVibe page.
*/

function Environment() {
  const { state } = useLocation();

  /*
    Guard clause:
    If user navigates directly without selecting a vibe,
    we prevent crashes and show fallback UI.
  */
  if (!state) {
    return <h1>No vibe selected</h1>;
  }

  /*
    Destructure vibe data passed from previous page
  */
  const { mood, activity, playlist, playlistId, playlistName } = state;

  /*
    Extract Spotify playlist ID safely.
    Supports both:
    - direct playlistId
    - API response format (playlist.data.uri)
  */
  const finalPlaylistId =
    playlistId || playlist?.data?.uri?.split(":")[2] || null;

  /*
    Spotify embed URL used inside iframe player
  */
  const playlistUrl = `https://open.spotify.com/embed/playlist/${finalPlaylistId}`;

  /*
    Fallback display name if API structure differs
  */
  const displayPlaylistName =
    playlistName || playlist?.data?.name || "Spotify Playlist";

  /*
    ─────────────────────────────────────────────
    SAVE VIBE FUNCTION
    ─────────────────────────────────────────────
    Stores the current vibe configuration in Firestore
    under the user's saved collection.
  */
  const handleSaveVibe = async () => {
    try {
      await saveVibe({
        mood: mood.name,
        moodIcon: mood.icon,
        colors: mood.colors,
        activity,
        playlistId: finalPlaylistId,
        playlistName: playlist.data.name,
      });

      alert("Vibe saved!");
    } catch (error) {
      console.error(error);
      alert("Could not save vibe.");
    }
  };

  return (
    /*
      Main environment container:
      - Uses CSS variables for dynamic gradient theming
      - Background colors are derived from selected mood
    */
    <div
      className="background environment"
      style={{
        "--color1": mood.colors[0],
        "--color2": mood.colors[1],
        "--color3": mood.colors[2],
      }}
    >

      {/* ─────────────────────────────
          PARTICLE BACKGROUND ELEMENTS
          (CSS-based animated spans)
      ───────────────────────────── */}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      {/* ─────────────────────────────
          CONTROL PANEL (Hover UI)
          Shows playlist + navigation controls
      ───────────────────────────── */}
      <div className="hover-zone">

        <div className="hover-hint">
          ▲ Controls
        </div>

        <div className="hover-panel">

          {/* Mood + activity display */}
          <div className="panel-text">
            <h1>
              {mood.icon} {mood.name} {activity} Environment
            </h1>

            <h2>
              Now Playing: {displayPlaylistName}
            </h2>
          </div>

          {/* Spotify embedded player */}
          <div className="spotify-player">
            <iframe
              src={playlistUrl}
              width="350"
              height="83"
              allow="autoplay; clipboard-write; encrypted-media"
              loading="lazy"
              title="Spotify Playlist"
            />
          </div>

          {/* Action buttons and navigation */}
          <div className="buttons">

            {/* Save current vibe to Firestore */}
            <button onClick={handleSaveVibe} className="ev-btn">
              Save Vibe
            </button>

            {/* Navigation links for flow control */}
            <ul className="ev-nav-links">
              <li>
                <Link to="/create-vibe" className="ev-link">
                  New Vibe
                </Link>
              </li>

              <li>
                <Link to="/saved-vibes" className="ev-link">
                  My Saved Vibes
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Environment;