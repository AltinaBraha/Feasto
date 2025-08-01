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
  query,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "eventReservations";

const getPreviousEventReservationCount = async (email) => {
  const q = query(collection(db, COLLECTION_NAME), where("email", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.length;
};

export const createEventReservation = async (data) => {
  const ref = collection(db, COLLECTION_NAME);

  const pastCount = await getPreviousEventReservationCount(data.email);
  const isEligibleForDiscount = pastCount >= 2;
  const discount = isEligibleForDiscount ? 15 : 0;

  const total = data.total || 0;
  const finalPrice = total * (1 - discount / 100);

  const docRef = await addDoc(ref, {
    ...data,
    discount,
    finalPrice,
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
