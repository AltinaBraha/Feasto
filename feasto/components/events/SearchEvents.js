"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchEvents({ onMatch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const val = searchInput.toLowerCase().trim();

    const keywords = {
      catering: ["catering", "food", "buffet", "service", "menu"],
      weddings: ["wedding", "marriage", "bride", "groom", "ceremony"],
      "private-celebration": [
        "birthday",
        "party",
        "graduation",
        "celebration",
        "private",
      ],
    };

    let matchedId = null;

    for (const [key, words] of Object.entries(keywords)) {
      if (words.some((w) => val.includes(w))) {
        matchedId = key;
        break;
      }
    }

    if (matchedId) {
      onMatch(matchedId);
    } else {
      alert("No matching event found. Try: birthday, wedding, food...");
    }

    setSearchInput("");
  };

  return (
    <div className="flex justify-center mb-12">
      <div className="flex w-full max-w-md items-center rounded-full border border-orange-400 overflow-hidden px-4">
        <Search className="w-5 h-5 text-orange-500" />
        <input
          type="text"
          placeholder="Search events… (e.g. birthday, wedding)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-3 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-[#dd5903] text-white px-6 py-2 text-sm font-semibold uppercase hover:bg-orange-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
