"use client";
import { useState } from "react";
import WaiterDashboard from "../dashboard/page";

export default function StaffLogin() {
  const [pin, setPin] = useState("");
  const [granted, setGranted] = useState(false);

  const handleLogin = () => {
    if (pin === "staf") {
      setGranted(true);
    } else {
      alert("PIN i gabuar");
    }
  };

  if (granted) return <WaiterDashboard />;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/bg-login.jpg")`,
      }}
    >
      <div className="border-2 border-orange-500 p-8 rounded-lg shadow-lg w-full max-w-sm text-center text-white bg-transparent">
        <img
          src="/img/logo.png"
          alt="Logo"
          className="mx-auto mb-6 w-40 h-40 object-contain"
        />

        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-white/50 text-black placeholder:text-black/50 text-center outline-none"
        />

        <button
          onClick={handleLogin}
          className="bg-orange-500/60 text-white font-semibold w-full py-2 rounded transition hover:bg-orange-500/80"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
