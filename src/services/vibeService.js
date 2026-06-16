import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const saveVibe = async ({
  mood,
  moodIcon,
  colors,

  activity,

  playlistId,
  playlistName,
}) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  return addDoc(
  collection(db, "users", user.uid, "vibes"),
  {
    mood,
    moodIcon,
    colors,

    activity,

    playlistId,
    playlistName,

    createdAt: serverTimestamp(),
  }
);
};