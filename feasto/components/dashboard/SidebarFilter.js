"use client";

import { useAuth } from "@/auth/AuthContext";

export default function SidebarFilter({ current, setFilter }) {
  const types = ["all", "delivery", "dine-in", "reservations"];
  const { logout } = useAuth();

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-black text-white p-6 space-y-6 flex flex-col justify-between min-h-screen">
      <div className="space-y-4">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`w-full text-left px-4 py-2 rounded font-medium transition ${
              current === type
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            {type === "all"
              ? "All Orders"
              : type === "reservations"
                ? "Reservations"
                : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition"
      >
        Sign Out
      </button>
    </aside>
  );
}
