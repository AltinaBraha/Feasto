"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchOrders as getOrders, deleteOrder } from "@/app/api/orders";
import {
  fetchReservations as getReservations,
  updateReservationStatus,
} from "@/app/api/reservations";

export default function WaiterDashboard() {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ordersData, reservationsData] = await Promise.all([
          getOrders(),
          getReservations(),
        ]);
        setOrders(ordersData);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
        setOrders([]);
        setReservations([]);
      }
    };

    const interval = setInterval(fetchAll, 3000);
    fetchAll();
    return () => clearInterval(interval);
  }, []);

  const markReady = async (id) => {
    try {
      await deleteOrder(id);
      toast.success(`Order #${id} marked as ready and removed`);
    } catch (error) {
      toast.error("Failed to delete order.");
      console.error("DELETE error:", error);
    }
  };

  const confirmReservation = async (id) => {
    try {
      await updateReservationStatus(id, "confirmed");
      toast.success(`Reservation #${id} confirmed`);
    } catch (err) {
      console.error("Gabim gjatë konfirmimit të rezervimit:", err);
      toast.error("Failed to confirm reservation.");
    }
  };

  const rejectReservation = async (id) => {
    try {
      await updateReservationStatus(id, "rejected");
      toast.success(`Reservation #${id} rejected`);
    } catch (err) {
      console.error("Gabim gjatë refuzimit të rezervimit:", err);
      toast.error("Failed to reject reservation.");
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.type === filter);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold text-orange-500">Filter Orders</h2>
        {["all", "take-away", "order-here", "reservations"].map((type) => (
          <button
            key={type}
            className={`block w-full text-left px-4 py-2 rounded ${
              filter === type ? "bg-orange-500" : "hover:bg-gray-800"
            }`}
            onClick={() => setFilter(type)}
          >
            {type === "all"
              ? "All Orders"
              : type === "reservations"
              ? "Show Reservations"
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {filter === "reservations"
            ? "Reservations"
            : `Orders ${filter !== "all" ? `(${filter})` : ""}`}
        </h1>

        {filter === "reservations" ? (
          reservations.length === 0 ? (
            <p className="text-gray-600">No reservations found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {reservations.map((res, index) => (
                <div
                  key={res?.id ?? `res-${index}`}
                  className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Reservation #{res.id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Guests: {res.people}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date & Time: {res.dateTime}
                    </p>
                    <p className="text-sm text-gray-600">Email: {res.email}</p>
                    <p className="text-sm text-gray-600">Name: {res.name}</p>
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        res.status === "confirmed"
                          ? "text-green-600"
                          : res.status === "rejected"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      Status: {res.status}
                    </p>
                  </div>
                  {res.status === "pending" && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => confirmReservation(res.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => rejectReservation(res.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : filteredOrders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order, index) => (
              <div
                key={order?.id ?? `order-${index}`}
                className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, i) => (
                        <li key={i}>
                          {item.name} x {item.qty}
                        </li>
                      ))
                    ) : (
                      <li className="italic text-gray-500">No items</li>
                    )}
                  </ul>
                  <p className="mt-3 font-medium text-orange-600">
                    Total: ${order.total}
                  </p>
                  <p className="text-sm text-gray-600">Type: {order.type}</p>
                  <p
                    className={`text-sm font-semibold mt-1 ${
                      order.status === "ready"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
                {order.status === "pending" && (
                  <div className="mt-4">
                    <button
                      onClick={() => markReady(order.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
                    >
                      Mark as Ready
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
