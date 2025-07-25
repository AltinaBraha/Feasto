// app/api/reservations.js
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ✅ Add a new reservation
export const createReservation = async (reservationData) => {
  try {
    const docRef = await addDoc(
      collection(db, "reservations"),
      reservationData
    );
    return { id: docRef.id, ...reservationData };
  } catch (error) {
    console.error("Failed to create reservation:", error);
    throw error;
  }
};

// ✅ Get reservations for a specific date and time
export const getReservationsByDateTime = async (date, time) => {
  try {
    const q = query(
      collection(db, "reservations"),
      where("date", "==", date),
      where("time", "==", time)
    );

    const snapshot = await getDocs(q);
    const reservations = snapshot.docs.map((doc) => doc.data());
    return reservations;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error;
  }
};
