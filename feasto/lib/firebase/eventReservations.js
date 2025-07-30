import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const COLLECTION_NAME = "eventReservations";

export const createEventReservation = async (data) => {
  const ref = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(ref, {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const updateEventReservationStatus = async (id, newStatus) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status: newStatus });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const subscribeToEventReservations = (callback) => {
  return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(reservations);
  });
};
