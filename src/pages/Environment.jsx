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
    <div
      className={`environment ${mood.name.toLowerCase()}`}
    >
      <div className="overlay">
        <h1>
          {mood.icon} {mood.name}
        </h1>

        <h2>{activity}</h2>

        <h3>{playlist.data.name}</h3>

        <p>{playlist.data.description}</p>

        <iframe
          src={playlistUrl}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media"
          loading="lazy"
          title="Spotify Playlist"
        />
      </div>
    </div>
  );
}

export default Environment