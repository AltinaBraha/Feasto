// lib/firestore/reservations.js
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

/**
 * Krijon një rezervim të ri në Firestore.
 * Kontrollon nëse tavolina është e lirë për datën dhe orën e caktuar.
 */
export const createReservation = async (data) => {
  if (!data || !data.table || !data.date || !data.time) {
    console.error("createReservation: Missing required data", data);
    throw new Error("Missing required reservation data");
  }

  const reservationsRef = collection(db, "reservations");

  // Kontrollo nëse tavolina është tashmë e rezervuar për këtë datë dhe orë
  const q = query(
    reservationsRef,
    where("table", "==", Number(data.table)),
    where("date", "==", data.date)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    console.warn(
      `Table ${data.table} is already reserved on ${data.date} at ${data.time}`
    );
    throw new Error("This table is already reserved at that time.");
  }

  // Nëse është e lirë, shto rezervimin
  const res = await addDoc(reservationsRef, {
    ...data,
    table: Number(data.table),
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
  });

  return res.id;
};

/**
 * Merr të gjitha rezervimet, ose vetëm për një datë të caktuar.
 * Nuk përdor orderBy për të shmangur nevojën e indeksit.
 */
export const getReservations = async (selectedDate = null) => {
  try {
    const reservationsRef = collection(db, "reservations");

    const q = selectedDate
      ? query(reservationsRef, where("date", "==", selectedDate))
      : reservationsRef;

    const snapshot = await getDocs(q);

    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sortim sipas date dhe pastaj time (në JS)
    return reservations.sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};

/**
 * Merr një rezervim specifik sipas ID-së.
 */
export const getReservationById = async (id) => {
  if (!id) throw new Error("Reservation ID is required");
  const reservationRef = doc(db, "reservations", id);
  const snapshot = await getDoc(reservationRef);
  if (!snapshot.exists()) {
    throw new Error("Reservation not found");
  }
  return { id: snapshot.id, ...snapshot.data() };
};

/**
 * Përditëson statusin e një rezervimi: confirmed | rejected.
 */
export const updateReservationStatus = async (id, status) => {
  if (!id || typeof id !== "string") {
    console.error("updateReservationStatus: Invalid ID", id);
    throw new Error("Invalid reservation ID");
  }

  if (!status) {
    console.error("updateReservationStatus: Missing status");
    throw new Error("Missing status for reservation update");
  }

  const reservationRef = doc(db, "reservations", id);
  await updateDoc(reservationRef, { status });
};

/**
 * Fshin një rezervim nga Firestore.
 */
export const deleteReservation = async (id) => {
  if (!id) throw new Error("Reservation ID is required");
  await deleteDoc(doc(db, "reservations", id));
};
