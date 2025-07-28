import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

const RESERVATIONS_COLLECTION = "reservations";
const RES_COUNTER_DOC = doc(db, "counters", "reservations");

const getNextReservationNumber = async () => {
  return await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(RES_COUNTER_DOC);
    if (!counterDoc.exists()) {
      transaction.set(RES_COUNTER_DOC, { lastReservationNumber: 1 });
      return 1;
    }
    const newNumber = (counterDoc.data().lastReservationNumber || 0) + 1;
    transaction.update(RES_COUNTER_DOC, { lastReservationNumber: newNumber });
    return newNumber;
  });
};

export const getReservations = async () => {
  const snapshot = await getDocs(collection(db, RESERVATIONS_COLLECTION));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.reservationNumber || 0) - (b.reservationNumber || 0));
};

export const createReservation = async (reservationData) => {
  const reservationNumber = await getNextReservationNumber();
  const reservationId = reservationNumber.toString();

  const tables = Array.isArray(reservationData.tables)
    ? reservationData.tables
    : reservationData.table
      ? [reservationData.table]
      : [];

  const docRef = doc(db, RESERVATIONS_COLLECTION, reservationId);
  await setDoc(docRef, {
    ...reservationData,
    tables,
    reservationNumber,
    status: reservationData.status || "pending",
    createdAt: serverTimestamp(),
  });

  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const updateReservationStatus = async (id, newStatus) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  await updateDoc(docRef, { status: newStatus });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const deleteReservation = async (id) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  await deleteDoc(docRef);
  return { id };
};

export const subscribeToReservations = (callback) => {
  return onSnapshot(collection(db, RESERVATIONS_COLLECTION), (snapshot) => {
    const reservations = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => (a.reservationNumber || 0) - (b.reservationNumber || 0));
    callback(reservations);
  });
};

export const resetReservationCounter = async () => {
  await setDoc(RES_COUNTER_DOC, { lastReservationNumber: 0 });
};
