"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Smile } from "lucide-react";

export default function TopRewardBanner({ email }) {
  const [reservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    const checkReservations = async () => {
      if (!email) return;

      try {
        const q = query(
          collection(db, "eventReservations"),
          where("email", "==", email)
        );
        const snapshot = await getDocs(q);
        setReservationCount(snapshot.size);
      } catch (error) {
        console.error("Error loading reservation count:", error);
      }
    };

    checkReservations();
  }, [email]);

  if (!email || reservationCount === 0) return null;

  return (
    <div className="w-full bg-green-600 text-white py-3 px-6 text-center text-sm font-medium flex items-center justify-center gap-2">
      <Smile className="w-4 h-4" />
      <span>
        Welcome back! You have made {reservationCount} reservation
        {reservationCount > 1 ? "s" : ""} with us — thank you for your loyalty!
      </span>
    </div>
  );
}
