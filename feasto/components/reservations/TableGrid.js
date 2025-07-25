"use client";

import { useEffect, useState } from "react";
import { getAvailableTables } from "@/lib/firestore/tables";

export default function TableGrid({
  date,
  time,
  guests,
  selectedTable,
  setSelectedTable,
}) {
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tables = await getAvailableTables(date, time, guests);
        setAvailableTables(tables);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setAvailableTables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [date, time, guests]);

  if (loading) {
    return (
      <p className="text-center text-gray-600">Duke ngarkuar tavolinat...</p>
    );
  }

  if (availableTables.length === 0) {
    return (
      <p className="text-center text-red-500">
        Nuk ka tavolina të lira për këtë orar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-center">
      {availableTables.map((table) => {
        const isSelected = selectedTable === table.id;

        return (
          <button
            key={table.id}
            className={`p-4 rounded-lg border text-center font-semibold
              ${isSelected ? "bg-orange-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}
            `}
            onClick={() => setSelectedTable(table.id)}
          >
            Tavolina #{table.id}
            <br />
            <span className="text-sm font-normal">{table.seats} ulëse</span>
          </button>
        );
      })}
    </div>
  );
}
