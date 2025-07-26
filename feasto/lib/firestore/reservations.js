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

/**
 * Merr numrin radhor të ardhshëm për rezervimet.
 */
const getNextReservationNumber = async () => {
  return await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(RES_COUNTER_DOC);
    if (!counterDoc.exists()) {
      transaction.set(RES_COUNTER_DOC, { lastReservationNumber: 1 });
      return 1;
    }
    const newNumber = counterDoc.data().lastReservationNumber + 1;
    transaction.update(RES_COUNTER_DOC, { lastReservationNumber: newNumber });
    return newNumber;
  });
};

/**
 * Merr të gjitha rezervimet, të renditura sipas numrit radhor.
 */
export const getReservations = async () => {
  const snapshot = await getDocs(collection(db, RESERVATIONS_COLLECTION));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.reservationNumber || 0) - (b.reservationNumber || 0));
};

/**
 * Krijon një rezervim të ri me ID numerike (1, 2, 3...).
 */
export const createReservation = async (reservationData) => {
  const reservationNumber = await getNextReservationNumber();
  const reservationId = reservationNumber.toString(); // ID numerike

  const docRef = doc(db, RESERVATIONS_COLLECTION, reservationId);
  await setDoc(docRef, {
    ...reservationData,
    reservationNumber,
    status: reservationData.status || "pending",
    createdAt: serverTimestamp(),
  });

  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

/**
 * Përditëson një rezervim ekzistues.
 */
export const updateReservationStatus = async (id, newStatus) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  await updateDoc(docRef, { status: newStatus });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

/**
 * Fshin një rezervim.
 */
export const deleteReservation = async (id) => {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id);
  await deleteDoc(docRef);
  return { id };
};

/**
 * Listener real-time për rezervimet.
 */
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

/**
 * Opsionale: Reseton counter në 0 (vetëm për testim).
 */
export const resetReservationCounter = async () => {
  await setDoc(RES_COUNTER_DOC, { lastReservationNumber: 0 });
};
