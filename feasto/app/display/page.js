"use client";
import { useEffect, useState } from "react";

export default function DisplayScreen() {
  const [readyOrders, setReadyOrders] = useState([]);

  const fetchReady = async () => {
    const res = await fetch(
      "https://6877a749dba809d901f05d20.mockapi.io/orders?status=ready"
    );
    const data = await res.json();
    setReadyOrders(data);
  };

  useEffect(() => {
    const interval = setInterval(fetchReady, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Order Ready</h1>
      <div className="flex gap-6 text-5xl font-mono">
        {readyOrders.map((order) => (
          <div key={order.id} className="bg-green-600 px-6 py-4 rounded shadow">
            #{order.id}
          </div>
        ))}
      </div>
    </div>
  );
}
