import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

/*
  ─────────────────────────────────────────────
  SAVE VIBE SERVICE (FIRESTORE)
  ─────────────────────────────────────────────
  This function handles saving a "vibe" object
  into the authenticated user's Firestore collection.

  Each vibe includes:
  - Mood information (name, icon, colors)
  - Activity selected by user
  - Playlist metadata (Spotify ID + name)
  - Timestamp of creation
*/

/*
  Saves a generated vibe to Firestore under:
  users/{userId}/vibes/{vibeId}
*/
export const saveVibe = async ({
  mood,
  moodIcon,
  colors,
  activity,
  playlistId,
  playlistName,
}) => {
  const user = auth.currentUser;

  // Ensure user is authenticated before writing to Firestore
  if (!user) {
    throw new Error("User not logged in");
  }

  // Create new document in user's vibes subcollection
  return addDoc(
    collection(db, "users", user.uid, "vibes"),
    {
      mood,
      moodIcon,
      colors,
      activity,
      playlistId,
      playlistName,

      // Server-generated timestamp ensures consistency across clients
      createdAt: serverTimestamp(),
    }
  );
};