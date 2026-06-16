import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/Environment.css";

function Environment() {
  const { state } = useLocation();

  if (!state) {
    return <h1>No vibe selected</h1>;
  }

  const { mood, activity, playlist } = state;
  console.log("Playlist:", playlist);

  const playlistId =
    playlist.data.uri.split(":")[2];

  const playlistUrl =
    `https://open.spotify.com/embed/playlist/${playlistId}`;

    console.log(playlist);

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
                    <h2>Now Playing: {playlist.data.name}</h2>
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
                    <button className="ev-btn">Save Vibe</button>
                    <ul className="ev-nav-links">
                    <li><Link to="/createVibe" className="ev-link">New Vibe</Link></li>
                    <li><Link to="/home" className="ev-link">Home</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Environment