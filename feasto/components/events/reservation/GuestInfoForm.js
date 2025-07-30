"use client";

import { useState } from "react";

export default function GuestInfoForm({ guestInfo, setGuestInfo }) {
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
        placeholder="First Name"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="text"
        name="lastName"
        value={guestInfo.lastName || ""}
        onChange={handleChange}
        placeholder="Last Name"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="email"
        name="email"
        value={guestInfo.email || ""}
        onChange={handleChange}
        placeholder="Email"
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
        placeholder="Guests"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
    </form>
  );
}
