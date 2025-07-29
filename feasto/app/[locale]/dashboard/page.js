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
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
        setCurrentPage(1);
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
        setCurrentPage(1);
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

  // 🔍 Filter orders based on filter + search
  const filteredOrders =
    filter === "all"
      ? orders
          .filter(
            (o) =>
              o.status !== "ready" &&
              o.items?.some((item) =>
                item.name?.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
          .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0))
      : orders
          .filter(
            (o) =>
              o.type === filter &&
              o.status !== "ready" &&
              o.items?.some((item) =>
                item.name?.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
          .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedReservations = reservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginatedOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems =
    filter === "reservations" ? reservations.length : filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <ProtectedDashboard>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <SidebarFilter current={filter} setFilter={setFilter} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 pt-8">
          {/* 🔍 Search input */}
          {filter !== "reservations" && (
            <div className="mb-6 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by food name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3 pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filter === "reservations"
              ? paginatedReservations.map((res) => (
                  <ReservationCard
                    key={res.id}
                    reservation={res}
                    onConfirm={handleConfirmReservation}
                    onReject={rejectReservation}
                    onRemove={removeReservationCard}
                  />
                ))
              : paginatedOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={markReady}
                  />
                ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
        <ClientToast />
      </div>
    </ProtectedDashboard>
  );
}
