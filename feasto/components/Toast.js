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
    <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 bg-black text-white px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded shadow-xl animate-fade-in">
      {message}
    </div>
  );
}
