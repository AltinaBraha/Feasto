"use client";

export default function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-orange-500 text-lg">{icon}</span>
      <span className="text-gray-800 font-medium">
        <strong className="text-gray-900">{label}:</strong> {value}
      </span>
    </div>
  );
}
