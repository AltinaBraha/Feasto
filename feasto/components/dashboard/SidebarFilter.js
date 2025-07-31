import { useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import {
  ChevronDown,
  ChevronUp,
  Package,
  ClipboardList,
  CalendarHeart,
  LogOut,
  Utensils,
} from "lucide-react";

export default function SidebarFilter({ current, setFilter }) {
  const logout = useAuthStore((state) => state.logout);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showReservationsDropdown, setShowReservationsDropdown] =
    useState(false);

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

        <div>
          <button
            onClick={() => {
              setShowReservationsDropdown((prev) => !prev);
            }}
            className={`w-full flex items-center justify-between px-4 py-2 rounded font-medium transition border ${
              current === "reservations" || current === "event-reservations"
                ? "border-orange-500 text-white"
                : "border-transparent hover:border-gray-500 text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Reservations
            </span>
            {showReservationsDropdown ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showReservationsDropdown && (
            <div className="ml-4 mt-2 space-y-2">
              <button
                onClick={() => setFilter("reservations")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("reservations")}`}
              >
                Table
              </button>
              <button
                onClick={() => setFilter("event-reservations")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("event-reservations")}`}
              >
                Event
              </button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              setShowMenuDropdown((prev) => !prev);
            }}
            className={`w-full flex items-center justify-between px-4 py-2 rounded font-medium transition border ${
              current?.startsWith("menu")
                ? "border-orange-500 text-white"
                : "border-transparent hover:border-gray-500 text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <Utensils className="w-5 h-5" /> Menu
            </span>
            {showMenuDropdown ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showMenuDropdown && (
            <div className="ml-4 mt-2 space-y-2">
              <button
                onClick={() => setFilter("menu-food")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("menu-food")}`}
              >
                Food
              </button>
              <button
                onClick={() => setFilter("menu-drinks")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("menu-drinks")}`}
              >
                Drinks
              </button>
              <button
                onClick={() => setFilter("menu-desserts")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("menu-desserts")}`}
              >
                Desserts
              </button>
              <button
                onClick={() => setFilter("menu-add")}
                className={`block w-full text-left px-4 py-1 rounded transition ${isActive("menu-add")}`}
              >
                Add Dessert
              </button>
            </div>
          )}
        </div>
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
