"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useTranslations } from "next-intl";

export default function GuestInfoForm({ guestInfo, setGuestInfo }) {
  const user = useAuthStore((state) => state.user);
  const t = useTranslations("events.guestForm");

  useEffect(() => {
    if (user) {
      const fullName = user.displayName || user.fullName || "";
      const [firstName, lastName] = fullName.trim().split(" ");
      setGuestInfo((prev) => ({
        ...prev,
        firstName: firstName || prev.firstName || "",
        lastName: lastName || prev.lastName || "",
        email: user.email || prev.email || "",
      }));
    }
  }, [user, setGuestInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
      <input
        type="text"
        name="firstName"
        value={guestInfo.firstName || ""}
        onChange={handleChange}
        placeholder={t("firstName")}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="text"
        name="lastName"
        value={guestInfo.lastName || ""}
        onChange={handleChange}
        placeholder={t("lastName")}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="email"
        name="email"
        value={guestInfo.email || ""}
        onChange={handleChange}
        placeholder={t("email")}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="date"
        name="eventDate"
        value={guestInfo.eventDate || ""}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="number"
        name="guests"
        min={1}
        value={guestInfo.guests || ""}
        onChange={handleChange}
        placeholder={t("guests")}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
    </form>
  );
}
