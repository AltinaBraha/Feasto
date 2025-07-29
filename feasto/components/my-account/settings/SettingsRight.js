"use client";

import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

export default function SettingsRight({ user }) {
  const [location, setLocation] = useState(user.location || "");

  return (
    <section className="md:col-span-1 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-5 space-x-2 text-orange-600">
        <HiLocationMarker className="w-5 h-5" />
        <h2 className="text-xl font-bold text-gray-900">Delivery Location</h2>
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 resize-none
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder="Enter your delivery address"
        rows={6}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <p className="mt-3 text-sm text-gray-500 italic">We'll use this address for your food delivery.</p>
    </section>
  );
}
