"use client";

import { FaSearch, FaTimesCircle } from "react-icons/fa";

export default function SearchBar({ placeholder, value, onChange, className }) {
  return (
    <div className={`${className} relative`}>
      <FaSearch className="absolute left-5 top-3.5 text-gray-400 text-lg" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-14 pr-12 py-3 rounded-full border border-gray-300 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
        value={value}
        onChange={onChange}
      />
      {value && (
        <FaTimesCircle
          className="absolute right-4 top-3.5 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => onChange({ target: { value: "" } })}
        />
      )}
    </div>
  );
}
