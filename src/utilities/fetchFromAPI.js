import axios from "axios";

/*
  ─────────────────────────────────────────────
  SPOTIFY API SERVICE (RAPIDAPI WRAPPER)
  ─────────────────────────────────────────────
  This file handles all external API requests to Spotify
  via RapidAPI (spotify23 endpoint).

  Purpose:
  - Centralize all API logic in one place
  - Avoid repeating request configuration in components
  - Provide reusable functions for music search features
*/

const BASE_URL = "https://spotify23.p.rapidapi.com";

/*
  Shared request configuration for RapidAPI
  Includes authentication headers and API host info
*/
const options = {
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

/*
  ─────────────────────────────────────────────
  GENERIC API FETCH FUNCTION
  ─────────────────────────────────────────────
  Used as the base function for all Spotify API calls.

  Parameters:
  - endpoint: API route (e.g. "search/", "playlist_tracks/")
  - params: query parameters for request
*/
export const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
      ...options,
      params: {
        numberOfTopResults: 5, // default limit for results
        ...params,
      },
    });

    return data;

  } catch (err) {
    console.error("Spotify API error:", err.message);
    throw err;
  }
};

/*
  ─────────────────────────────────────────────
  SEARCH MUSIC BY VIBE
  ─────────────────────────────────────────────
  Generates a search query based on mood + activity.
*/
export const searchVibeMusic = async (mood, activity) => {
  const query = `${mood} music for ${activity}`;

  return fetchFromAPI("search/", {
    q: query,
    type: "tracks",
    limit: 10,
  });
};

/*
  ─────────────────────────────────────────────
  GET PLAYLIST TRACKS
  ─────────────────────────────────────────────
  Fetches tracks from a specific Spotify playlist ID.
*/
export const getPlaylistTracks = async (playlistId) => {
  return fetchFromAPI("playlist_tracks/", {
    id: playlistId,
    limit: 20,
  });
};