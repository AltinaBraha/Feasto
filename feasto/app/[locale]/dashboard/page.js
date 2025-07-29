"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProtectedDashboard from "@/auth/ProtectedDashboard";
import SidebarFilter from "@/components/dashboard/SidebarFilter";
import OrderCard from "@/components/dashboard/OrderCard";
import ReservationCard from "@/components/dashboard/ReservationCard";
import ClientToast from "@/lib/ui/ClientToast";
import { updateOrder } from "@/lib/firebase/orders";
import { updateReservationStatus } from "@/lib/firebase/reservations";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import emailjs from "@emailjs/browser";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const unsubReservations = onSnapshot(
      collection(db, "reservations"),
      (snapshot) => {
        const allReservations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const activeReservations = allReservations.filter(
          (r) => r.status !== "rejected"
        );

        activeReservations.sort((a, b) => {
          if (a.status === b.status) return 0;
          return a.status === "pending" ? -1 : 1;
        });

        setReservations(activeReservations);
      },
      (error) => {
        console.error("Error fetching reservations:", error);
        toast.error("Failed to load reservations.");
      }
    );

    const unsubOrders = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
      await updateOrder(id, { status: "ready" });
      toast.success(`Order #${id} marked as ready`);
    } catch (error) {
      console.error("UPDATE error:", error);
      toast.error("Failed to mark order as ready.");
    }
  };

  const handleConfirmReservation = async (reservation) => {
    try {
      await updateReservationStatus(reservation.id, "confirmed");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
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

  const removeReservationCard = (id) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  const filteredOrders =
    filter === "all"
      ? orders
          .filter((o) => o.status !== "ready")
          .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0))
      : orders
          .filter((o) => o.type === filter && o.status !== "ready")
          .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));

  return (
    <ProtectedDashboard>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <SidebarFilter current={filter} setFilter={setFilter} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filter === "reservations"
              ? reservations.map((res) => (
                  <ReservationCard
                    key={res.id}
                    reservation={res}
                    onConfirm={handleConfirmReservation}
                    onReject={rejectReservation}
                    onRemove={removeReservationCard}
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
        <ClientToast />
      </div>
    </ProtectedDashboard>
  );
}
