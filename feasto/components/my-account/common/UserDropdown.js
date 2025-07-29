"use client";

import { MdAccountCircle, MdFavorite } from "react-icons/md";
import { FiSettings, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";

export default function UserDropdown({ logout, t }) {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded text-sm z-50">
      <div className="flex flex-col py-2">
        <button
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
          type="button"
        >
          <MdAccountCircle size={16} />
          {t("menu.myAccount") || "My Account"}
        </button>

        <button
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
          type="button"
        >
          <IoMdCalendar size={16} />
          {t("menu.reservations") || "Reservations"}
        </button>

        <button
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
          type="button"
        >
          <FaClipboardList size={16} />
          {t("menu.orders") || "Orders"}
        </button>

        <button
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
          type="button"
        >
          <MdFavorite size={16} />
          {t("menu.favorites") || "Favorites"}
        </button>

        <button
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
          type="button"
        >
          <FiSettings size={16} />
          {t("menu.settings") || "Settings"}
        </button>

        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 gap-2"
          type="button"
        >
          <FiLogOut size={16} />
          {t("menu.logout") || "Logout"}
        </button>
      </div>
    </div>
  );
}
