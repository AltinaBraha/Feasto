"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

export default function SummaryFooter({ guestInfo, selections, eventType }) {
  const { decoration, menu, music } = selections;

  // Llogarit çmimin bazuar në eventType
  const baseTotal =
    (eventType !== "catering" ? decoration?.price || 0 : 0) +
    (eventType !== "catering" ? music?.price || 0 : 0) +
    (menu?.price || 0) * (guestInfo.guests || 0);

  // Kontroll nëse të dhënat janë të kompletuara
  const isReady =
    guestInfo.firstName &&
    guestInfo.lastName &&
    guestInfo.eventDate &&
    guestInfo.guests > 0 &&
    menu &&
    (eventType === "catering" || (decoration && music));

  const handleSubmit = async () => {
    if (!isReady) {
      toast.error("Please complete all required fields and selections.");
      return;
    }

    const data = {
      eventType,
      ...guestInfo,
      decoration: eventType === "catering" ? null : decoration,
      music: eventType === "catering" ? null : music,
      menu,
      totalPrice: baseTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "eventReservations"), data);
      toast.success("Reservation submitted successfully!");
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error("Failed to submit reservation. Try again.");
    }
  };

  return (
    <footer className="w-full px-6 py-6  bg-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
      <div className="text-lg font-bold text-gray-800">
        Total Price:{" "}
        <span className="text-orange-600">€{baseTotal.toFixed(2)}</span>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!isReady}
        className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Reservation
      </button>
    </footer>
  );
}
