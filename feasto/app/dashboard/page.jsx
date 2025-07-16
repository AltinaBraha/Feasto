"use client";
import { useEffect, useState } from "react";

export default function WaiterDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch(
      "https://6877a749dba809d901f05d20.mockapi.io/orders?type=order-here"
    );
    const data = await res.json();
    setOrders(data);
  };

  const markReady = async (id) => {
    await fetch(`https://6877a749dba809d901f05d20.mockapi.io/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "ready" }),
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Orders (Order Here)</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 mb-3 rounded shadow flex justify-between"
        >
          <div>
            <h2 className="font-semibold">Order #{order.id}</h2>
            <ul className="list-disc list-inside">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.qty}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-medium">Total: ${order.total}</p>
          </div>
          {order.status === "pending" && (
            <button
              onClick={() => markReady(order.id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Mark as Ready
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
