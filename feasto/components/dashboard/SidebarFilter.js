"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import {
  ChevronDown,
  ChevronUp,
  Package,
  ClipboardList,
  CalendarHeart,
  LogOut,
} from "lucide-react";

export default function SidebarFilter({ current, setFilter }) {
  const logout = useAuthStore((state) => state.logout);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);

  const isActive = (type) =>
    current === type
      ? "border border-orange-500 text-white"
      : "hover:border hover:border-gray-500 text-gray-300";

  return (
    <aside className="w-full md:w-64 lg:w-62 bg-black text-white p-6 flex flex-col justify-between min-h-screen shadow-xl">
      <div className="space-y-4">
        <div>
          <button
            onClick={() => {
              setFilter("all");
              setShowOrdersDropdown((prev) => !prev);
            }}
            className={`w-full flex items-center justify-between px-4 py-2 rounded font-medium transition border ${
              current === "all" ||
              current === "delivery" ||
              current === "dine-in"
                ? "border-orange-500 text-white"
                : "border-transparent hover:border-gray-500 text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <Package className="w-5 h-5" /> Orders
            </span>
            {showOrdersDropdown ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showOrdersDropdown && (
            <div className="ml-4 mt-2 space-y-2">
              <button
                onClick={() => setFilter("delivery")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("delivery")}`}
              >
                Delivery
              </button>
              <button
                onClick={() => setFilter("dine-in")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("dine-in")}`}
              >
                Dine-in
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setFilter("reservations")}
          className={`w-full flex items-center gap-2 px-4 py-2 rounded font-medium transition border ${isActive("reservations")}`}
        >
          <ClipboardList className="w-5 h-5" /> Table Reservations
        </button>

        <button
          onClick={() => setFilter("event-reservations")}
          className={`w-full flex items-center gap-2 px-4 py-2 rounded font-medium transition border ${isActive("event-reservations")}`}
        >
          <CalendarHeart className="w-5 h-5" /> Event Reservations
        </button>
      </div>

      <div className="pt-6 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 justify-center bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded font-semibold transition"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
