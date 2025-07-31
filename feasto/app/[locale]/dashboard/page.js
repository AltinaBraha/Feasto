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
import ReservationCardEvent from "@/components/events/reservation/ReservationCardEvent";
import { updateEventReservationStatus } from "@/lib/firebase/eventReservations";
import foodMenu from "@/data/food.json";
import drinkMenu from "@/data/drinks.json";
import { fetchDesserts } from "@/lib/firebase/fetchDesserts";
import emailjs from "@emailjs/browser";
import AddDessertForm from "@/components/dashboard/AddDessertForm";
import MenuCardsDashboard from "@/components/dashboard/MenuCardsDashboard";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [eventReservations, setEventReservations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [desserts, setDesserts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchDesserts().then(setDesserts);

    const unsubReservations = onSnapshot(
      collection(db, "reservations"),
      (snapshot) => {
        const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const filtered = all.filter((r) => r.status !== "rejected");
        filtered.sort((a, b) =>
          a.status === b.status ? 0 : a.status === "pending" ? -1 : 1
        );
        setReservations(filtered);
        setCurrentPage(1);
      },
      (err) => {
        console.error("Reservations error:", err);
        toast.error("Failed to load reservations");
      }
    );

    const unsubOrders = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setCurrentPage(1);
      },
      (err) => {
        console.error("Orders error:", err);
        toast.error("Failed to load orders");
      }
    );

    const unsubEventReservations = onSnapshot(
      collection(db, "eventReservations"),
      (snapshot) => {
        const events = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sorted = events.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEventReservations(sorted);
        setCurrentPage(1);
      },
      (err) => {
        console.error("Event reservations error:", err);
        toast.error("Failed to load event reservations");
      }
    );

    return () => {
      unsubReservations();
      unsubOrders();
      unsubEventReservations();
    };
  }, []);

  const markReady = async (id) => {
    try {
      await updateOrder(id, { status: "ready" });
      toast.success(`Order #${id} marked as ready`);
    } catch (err) {
      console.error("Mark ready error:", err);
      toast.error("Failed to mark order ready");
    }
  };

  const handleConfirmReservation = async (reservation) => {
    try {
      if (reservation.eventType) {
        await updateEventReservationStatus(reservation.id, "confirmed");
      } else {
        await updateReservationStatus(reservation.id, "confirmed");
      }

      if (reservation.email) {
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
      }

      toast.success(`Reservation #${reservation.id} confirmed and email sent`);
    } catch (err) {
      console.error("Confirm reservation error:", err);
      toast.error("Failed to confirm reservation");
    }
  };

  const rejectReservation = async (reservation) => {
    try {
      if (reservation.eventType) {
        await updateEventReservationStatus(reservation.id, "rejected");
      } else {
        await updateReservationStatus(reservation.id, "rejected");
      }

      if (reservation.email) {
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

      toast.success(`Reservation #${reservation.id} rejected and email sent`);
    } catch (err) {
      console.error("Reject reservation error:", err);
      toast.error("Failed to reject reservation");
    }
  };

  const removeReservationCard = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    setEventReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredOrders =
    filter === "all"
      ? orders.filter(
          (o) =>
            o.status !== "ready" &&
            o.items?.some((i) =>
              i.name?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      : orders.filter(
          (o) =>
            o.type === filter &&
            o.status !== "ready" &&
            o.items?.some((i) =>
              i.name?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedReservations = reservations.slice(indexOfFirst, indexOfLast);
  const paginatedOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const paginatedEvents = eventReservations.slice(indexOfFirst, indexOfLast);

  let totalItems = 0;
  if (filter === "reservations") {
    totalItems = reservations.length;
  } else if (filter === "event-reservations") {
    totalItems = eventReservations.length;
  } else if (filter?.startsWith("menu")) {
    totalItems =
      filter === "menu-food"
        ? foodMenu.length
        : filter === "menu-drinks"
        ? drinkMenu.length
        : filter === "menu-desserts"
        ? desserts.length
        : 0;
  } else {
    totalItems = filteredOrders.length;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <ProtectedDashboard>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <SidebarFilter current={filter} setFilter={setFilter} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 pt-8">
          {filter !== "reservations" &&
            filter !== "event-reservations" &&
            !filter.startsWith("menu") && (
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
                  className="w-full md:w-1/3 pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
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
                    onReject={() => rejectReservation(res)}
                    onRemove={removeReservationCard}
                  />
                ))
              : filter === "event-reservations"
              ? paginatedEvents.map((event) => (
                  <ReservationCardEvent
                    key={event.id}
                    reservation={event}
                    onConfirm={handleConfirmReservation}
                    onReject={() =>
                      rejectReservation({
                        id: event.id,
                        eventType: event.eventType || "event",
                      })
                    }
                    onRemove={removeReservationCard}
                  />
                ))
              : filter?.startsWith("menu")
              ? null
              : paginatedOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={markReady}
                  />
                ))}
          </div>

          {filter?.startsWith("menu") && (
            <div>
              <h1 className="text-2xl font-bold mb-4 capitalize">
                {filter === "menu-food"
                  ? "Food Menu"
                  : filter === "menu-drinks"
                  ? "Drink Menu"
                  : filter === "menu-desserts"
                  ? "Dessert Menu"
                  : ""}
              </h1>
              {filter === "menu-add" ? (
                <AddDessertForm onSuccess={() => fetchDesserts().then(setDesserts)} />
              ) : (
                <MenuCardsDashboard
                  filter={filter}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  desserts={desserts}
                />
              )}
            </div>
          )}

          {filter !== "menu-add" && (
            <div className="mt-6 flex justify-center items-center gap-4">
              <button
                onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  currentPage < totalPages && setCurrentPage((p) => p + 1)
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
        <ClientToast />
      </div>
    </ProtectedDashboard>
  );
}
