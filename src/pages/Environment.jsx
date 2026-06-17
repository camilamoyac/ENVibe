import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { saveVibe } from "../services/vibeService";
import "../styles/Environment.css";

function Environment() {
  const { state } = useLocation();

  if (!state) {
    return <h1>No vibe selected</h1>;
  }

  const { mood, activity, playlist, playlistId, playlistName } = state;

  const finalPlaylistId = playlistId || playlist?.data?.uri?.split(":")[2] || null;

  const playlistUrl = `https://open.spotify.com/embed/playlist/${finalPlaylistId}`;

  const displayPlaylistName = playlistName || playlist?.data?.name || "Spotify Playlist";

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
    <div className="background environment" style={{ "--color1": mood.colors[0],"--color2": mood.colors[1], "--color3": mood.colors[2] }}>
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

        <div className="hover-zone">
            <div className="hover-hint">
            ▲ Controls
            </div>
            <div className="hover-panel">
                <div className="panel-text">
                    <h1>{mood.icon} {mood.name} {activity} Environment</h1>
                    <h2>Now Playing: {displayPlaylistName}</h2>
                </div>
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
                <div className="buttons">
                    <button onClick={handleSaveVibe} className="ev-btn">Save Vibe</button>
                    <ul className="ev-nav-links">
                    <li><Link to="/create-vibe" className="ev-link">New Vibe</Link></li>
                    <li><Link to="/saved-vibes" className="ev-link">My Saved Vibes</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Environment