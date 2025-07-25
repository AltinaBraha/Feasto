"use client";

import { useState } from "react";
import TableGrid from "./TableGrid";
import ReservationForm from "./ReservationForm";

export default function ReservationPopup({ guests, date, time, onClose }) {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          Zgjidh Tavolinën
        </h2>

        <p className="text-sm text-center mb-6 text-gray-600">
          Ju po rezervoni për <strong>{guests}</strong> persona më{" "}
          <strong>{date}</strong> në <strong>{time}</strong>.
        </p>

        <TableGrid
          date={date}
          time={time}
          guests={guests}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />

        {selectedTable && (
          <div className="mt-6 border-t pt-4">
            <ReservationForm
              guests={guests}
              date={date}
              time={time}
              table={selectedTable}
              onClose={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}
