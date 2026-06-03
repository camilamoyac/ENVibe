import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const COLLECTION = "playlists";

// Save a playlist to Firestore
export const savePlaylist = async (playlist) => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to save a playlist.");

  const docRef = await addDoc(collection(db, COLLECTION), {
    ...playlist,
    userId: user.uid,
    savedAt: new Date().toISOString(),
  });

  return docRef.id;
};

// Get all playlists for the logged-in user
export const getPlaylists = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Delete a playlist by id
export const deletePlaylist = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id));
};