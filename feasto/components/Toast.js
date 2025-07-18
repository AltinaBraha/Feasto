"use client";
import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded shadow-xl animate-fade-in">
      {message}
    </div>
  );
}
