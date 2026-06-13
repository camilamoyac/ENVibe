import { useState, useEffect } from "react";
import { getPlaylists, deletePlaylist } from "../services/storageService";

export default function SavedPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deletePlaylist(id);
    setPlaylists(await getPlaylists());
  };

  if (loading) return <p style={{ color: "white" }}>Loading playlists...</p>;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Saved Playlists</h2>
        {playlists.length === 0 ? (
          <p style={{ color: "#888" }}>No saved playlists yet.</p>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <h3>{playlist.name || "Untitled Playlist"}</h3>
              <p>Mood: {playlist.mood || "—"}</p>
              <p>Saved: {new Date(playlist.savedAt).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(playlist.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}