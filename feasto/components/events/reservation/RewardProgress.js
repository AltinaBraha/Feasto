"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RewardProgress({ email }) {
  const [reservationCount, setReservationCount] = useState(null);

  useEffect(() => {
    const checkReservationCount = async () => {
      if (!email) return;

      try {
        const q = query(
          collection(db, "eventReservations"),
          where("email", "==", email)
        );
        const snapshot = await getDocs(q);
        setReservationCount(snapshot.size);
      } catch (error) {
        console.error("Error checking reservations:", error);
        setReservationCount(null);
      }
    };

    checkReservationCount();
  }, [email]);

  if (reservationCount === null || reservationCount >= 2) return null;

  return (
    <p className="text-sm text-blue-600 font-medium mt-2">
      🎯 Book {2 - reservationCount} more event
      {reservationCount === 1 ? "" : "s"} to earn a 15% discount!
    </p>
  );
}
