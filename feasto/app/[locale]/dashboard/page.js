"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProtectedDashboard from "@/auth/ProtectedDashboard";
import SidebarFilter from "@/components/dashboard/SidebarFilter";
import OrderCard from "@/components/dashboard/OrderCard";
import ReservationCard from "@/components/dashboard/ReservationCard";
import ClientOnlyToast from "@/components/ClientToast";
import { deleteOrder } from "@/app/api/orders";
import { sendConfirmationEmail } from "@/components/dashboard/ClientEmailSender";
import { sendRejectionEmail } from "@/components/dashboard/ClientEmailRejectionSender";

// import { fetchOrders, deleteOrder } from "@/app/api/orders";
import {
  getReservations,
  updateReservationStatus,
} from "@/lib/firestore/reservations";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import emailjs from "@emailjs/browser";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Listener për rezervimet real-time
    const unsubReservations = onSnapshot(
      collection(db, "reservations"),
      (snapshot) => {
        const reservationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationsList);
      },
      (error) => {
        console.error("Error fetching reservations:", error);
        toast.error("Failed to load reservations.");
      }
    );

    // Listener për porositë real-time (nëse janë në Firestore)
    const unsubOrders = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders.");
      }
    );

    return () => {
      unsubReservations();
      unsubOrders();
    };
  }, []);

  const markReady = async (id) => {
    try {
      await deleteOrder(id);
      toast.success(`Order #${id} marked as ready and removed`);
    } catch (error) {
      console.error("DELETE error:", error);
      toast.error("Failed to delete order.");
    }
  };

  const handleConfirmReservation = async (reservation) => {
    try {
      await updateReservationStatus(reservation.id, "confirmed");

      // Dërgo email konfirmimi
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // Use the correct template ID variable
        {
          to_name: reservation.name,
          to_email: reservation.email,
          date: reservation.date,
          time: reservation.time,
          table: reservation.table,
          people: reservation.people,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success(`Reservation #${reservation.id} confirmed and email sent`);
    } catch (err) {
      console.error("Error confirming reservation:", err);
      toast.error("Failed to confirm reservation.");
    }
  };

  const rejectReservation = async (id) => {
    try {
      await updateReservationStatus(id, "rejected");
      const reservation = reservations.find((r) => r.id === id);
      if (reservation) {
        // Dërgo email refuzimi
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_REJECT_TEMPLATE_ID,
          {
            to_name: reservation.name,
            to_email: reservation.email,
            date: reservation.date,
            time: reservation.time,
            table: reservation.table,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      }
      toast.success(`Reservation #${id} rejected and email sent`);
    } catch (err) {
      console.error("Error rejecting reservation:", err);
      toast.error("Failed to reject reservation.");
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.type === filter);

  return (
    <ProtectedDashboard>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <SidebarFilter current={filter} setFilter={setFilter} />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
            {filter === "reservations"
              ? "Reservations"
              : `Orders ${filter !== "all" ? `(${filter})` : ""}`}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filter === "reservations"
              ? reservations.map((res) => (
                  <ReservationCard
                    key={res.id}
                    reservation={res}
                    onConfirm={handleConfirmReservation}
                    onReject={rejectReservation}
                  />
                ))
              : filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={markReady}
                  />
                ))}
          </div>
        </main>

        <ClientOnlyToast />
      </div>
    </ProtectedDashboard>
  );
}
