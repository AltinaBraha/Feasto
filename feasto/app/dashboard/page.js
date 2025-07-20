"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SidebarFilter from "@/components/dashboard/SidebarFilter";
import OrderCard from "@/components/dashboard/OrderCard";
import ReservationCard from "@/components/dashboard/ReservationCard";
import ClientOnlyToast from "@/components/ClientToast";
import { fetchOrders, deleteOrder } from "@/app/api/orders";
import {
  fetchReservations,
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
          fetchOrders(),
          fetchReservations(),
        ]);
        setOrders(ordersData);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      console.error("Error confirming reservation:", err);
      toast.error("Failed to confirm reservation.");
    }
  };

  const rejectReservation = async (id) => {
    try {
      await updateReservationStatus(id, "rejected");
      toast.success(`Reservation #${id} rejected`);
    } catch (err) {
      console.error("Error rejecting reservation:", err);
      toast.error("Failed to reject reservation.");
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.type === filter);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SidebarFilter current={filter} setFilter={setFilter} />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {filter === "reservations"
            ? "Reservations"
            : `Orders ${filter !== "all" ? `(${filter})` : ""}`}
        </h1>

        {filter === "reservations" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservations.map((res) => (
              <ReservationCard
                key={res.id}
                reservation={res}
                onConfirm={confirmReservation}
                onReject={rejectReservation}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} onMarkReady={markReady} />
            ))}
          </div>
        )}
      </main>

      <ClientOnlyToast />
    </div>
  );
}
