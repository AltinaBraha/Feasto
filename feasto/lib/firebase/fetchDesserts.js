import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

export const fetchDesserts = async () => {
  const querySnapshot = await getDocs(collection(db, "Desserts"));
  const desserts = [];
  querySnapshot.forEach((doc) => {
    desserts.push({ id: doc.id, name: doc.id, ...doc.data() });
  });
  return desserts;
};

export const updateDessert = async (id, data) => {
  const dessertRef = doc(db, "Desserts", id); // ensure collection name matches Firebase
  await updateDoc(dessertRef, data);
};

export const deleteDessert = async (id) => {
  const dessertRef = doc(db, "Desserts", id); // ensure collection name matches Firebase
  await deleteDoc(dessertRef);
};
