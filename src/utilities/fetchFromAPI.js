import axios from "axios";

const BASE_URL = "https://spotify23.p.rapidapi.com";

const options = {
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
    "Content-Type": "application/json"
  }
};

// Generic fetch — pass endpoint + params
// e.g. fetchFromAPI("search/", { q: "Cozy music for Reading", type: "tracks" })
export const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
      ...options,
      params: {
        numberOfTopResults: 5,
        ...params
      }
    });
    return data;
  } catch (err) {
    console.error("Spotify API error:", err.message);
    throw err;
  }
};

// Ready-made: search tracks by mood + activity
// e.g. searchVibeMusic("Cozy", "Reading")
export const searchVibeMusic = async (mood, activity) => {
  const query = `${mood} music for ${activity}`;
  return fetchFromAPI("search/", {
    q: query,
    type: "tracks",
    limit: 10
  });
};

// Ready-made: get a playlist's tracks by playlist ID
export const getPlaylistTracks = async (playlistId) => {
  return fetchFromAPI("playlist_tracks/", {
    id: playlistId,
    limit: 20
  });
};