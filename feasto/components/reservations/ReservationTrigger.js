"use client";

import { useState } from "react";
import ReservationPopup from "./ReservationPopup";

export default function ReservationTrigger({ guests, date, time }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openPopup}
        className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
      >
        Book Now
      </button>

      {isOpen && (
        <ReservationPopup
          guests={guests}
          date={date}
          time={time}
          onClose={closePopup}
        />
      )}
    </>
  );
}
