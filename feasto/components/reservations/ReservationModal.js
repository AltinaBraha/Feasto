"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { convertTo24Hour } from "@/utils/time";

// Restore the hardcoded tables array
const tables = [
  { id: 1, seats: 2 },
  { id: 2, seats: 2 },
  { id: 3, seats: 2 },
  { id: 4, seats: 2 },
  { id: 5, seats: 4 },
  { id: 6, seats: 4 },
  { id: 7, seats: 4 },
  { id: 8, seats: 6 },
  { id: 9, seats: 6 },
];

import { useTranslations } from "next-intl";

export default function ReservationModal({
  onClose,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
}) {
  const t = useTranslations("ReservationModal");

  date,
  time,
  people,
}) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservedTables, setReservedTables] = useState([]);
  const [loading, setLoading] = useState(true);
  // Remove tables state and fetchTables useEffect

  useEffect(() => {
    if (!date || !time) return;

    const formattedTime = convertTo24Hour(time);
    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("date", "==", date));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reservations = snapshot.docs.map((doc) => doc.data());

        // Gjej tavolinat e rezervuara për këtë datë (jo më për orë specifike)
        const reservedForDate = reservations
          .filter((res) => ["pending", "confirmed"].includes(res.status))
          .map((res) => Number(res.table));

        setReservedTables(reservedForDate);

        const suitableTables = tables.filter(
          (t) => t.seats >= parseInt(people)
        );

        const freeTables = suitableTables.filter(
          (t) => !reservedForDate.includes(t.id)
        );

        // Nëse tavolina e zgjedhur më parë është zënë, zgjedh e para të lirë
        if (!freeTables.some((t) => t.id === selectedTable)) {
          setSelectedTable(freeTables.length > 0 ? freeTables[0].id : null);
        }

        if (freeTables.length === 0) {
          toast.error("No available tables for this date.");
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error fetching reservations:", error);
        toast.error("Failed to load tables.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [date, time, people, selectedTable]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!selectedTable) {
      toast.error("No available tables to book.");
      return;
    }

    onSubmit(selectedTable);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="bg-white py-10 px-6 sm:px-8 rounded-md w-full max-w-sm flex flex-col items-center text-center shadow-2xl">
        <h3 className="text-orange-600 text-sm font-medium tracking-wide uppercase mb-2">
          {t("onlineReservation")}
        </h3>
        <h5 className="text-2xl font-serif font-semibold tracking-wide mb-10">
          {t("enterYourInfo")}
        </h5>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading tables...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-6"
          >
            <input
              type="text"
              placeholder={t("placeholders.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none text-center py-2 placeholder-gray-500"
            />
            <input
              type="email"
              placeholder={t("placeholders.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none text-center py-2 placeholder-gray-500"
            />

            <div className="w-full">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Select a Table:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {tables
                  .filter((t) => t.seats >= parseInt(people))
                  .map((table) => {
                    const isReserved = reservedTables.includes(table.id);
                    return (
                      <button
                        type="button"
                        key={table.id}
                        disabled={isReserved}
                        onClick={() =>
                          !isReserved && setSelectedTable(table.id)
                        }
                        className={`relative py-2 px-4 border rounded transition ${
                          isReserved
                            ? "bg-gray-500 text-white cursor-not-allowed"
                            : selectedTable === table.id
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                        }`}
                      >
                        {isReserved && (
                          <span className="absolute top-1 right-1 text-white text-lg font-bold">
                            ×
                          </span>
                        )}
                        Table {table.id} ({table.seats})
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/2 bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
              >
                {t("buttons.cancel")}
              </button>
              <button
                type="submit"
                className="w-full sm:w-1/2 bg-[#d35400] text-white py-3 hover:bg-orange-600 transition uppercase tracking-wide rounded"
              >
                {t("buttons.bookNow")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
