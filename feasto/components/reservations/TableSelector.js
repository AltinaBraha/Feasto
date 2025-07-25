"use client";

import { useEffect, useState } from "react";
import { getAvailableTables } from "@/lib/firestore/tables";

export default function TableSelector({
  date,
  time,
  people,
  selectedTable,
  setSelectedTable,
}) {
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date || !time || !people) return;

    const fetchTables = async () => {
      setLoading(true);
      try {
        const tables = await getAvailableTables(date, time, Number(people));
        setAvailableTables(tables);
      } catch (err) {
        console.error("Failed to fetch tables:", err);
        setAvailableTables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [date, time, people]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-center mb-4">
        Zgjedh tavolinën
      </h3>

      {loading ? (
        <p className="text-center text-gray-500">Duke ngarkuar tavolinat...</p>
      ) : availableTables.length === 0 ? (
        <p className="text-center text-red-500">
          Asnjë tavolinë e lirë nuk u gjet për këtë kohë.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {availableTables.map((table) => (
            <button
              key={table.id}
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-lg font-semibold transition ${
                selectedTable === table.id
                  ? "bg-orange-500 text-white border-orange-600"
                  : "bg-white text-black hover:bg-orange-100"
              }`}
              onClick={() => setSelectedTable(table.id)}
            >
              {table.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
