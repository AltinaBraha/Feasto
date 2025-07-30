"use client";

import Link from "next/link";
import { MdAccountCircle, MdFavorite } from "react-icons/md";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { usePathname } from "next/navigation";

export default function UserDropdown({ logout, t }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const basePath = `/${locale}/my-account`;

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded text-sm z-50">
      <div className="flex flex-col py-2">
        <Link
          href={`${basePath}`}
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
        >
          <MdAccountCircle size={16} />
          {t("menu.myAccount") || "My Account"}
        </Link>

        <Link
          href={`${basePath}/reservations`}
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
        >
          <IoMdCalendar size={16} />
          {t("menu.reservations") || "Reservations"}
        </Link>

        <Link
          href={`${basePath}/orders`}
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
        >
          <FaClipboardList size={16} />
          {t("menu.orders") || "Orders"}
        </Link>

        <Link
          href={`${basePath}/favorites`}
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
        >
          <MdFavorite size={16} />
          {t("menu.favorites") || "Favorites"}
        </Link>

        <Link
          href={`${basePath}/settings`}
          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 gap-2"
        >
          <FiSettings size={16} />
          {t("menu.settings") || "Settings"}
        </Link>

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
