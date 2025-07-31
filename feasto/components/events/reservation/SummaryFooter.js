"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function SummaryFooter({
  guestInfo,
  setGuestInfo,
  selections,
  setSelections,
  eventType,
}) {
  const t = useTranslations("events.summaryFooter");

  const { decoration, menu } = selections ?? {};
  const numberOfGuests = parseInt(guestInfo.guests) || 0;

  const totalPrice =
    (menu?.price || 0) * numberOfGuests + (decoration?.price || 0);

  const isComplete =
    guestInfo.firstName &&
    guestInfo.lastName &&
    guestInfo.email &&
    guestInfo.eventDate &&
    numberOfGuests > 0 &&
    menu &&
    decoration;

  const handleSubmit = async () => {
    if (!isComplete) {
      toast.error(t("errorIncomplete"));
      return;
    }

    const reservationData = {
      ...guestInfo,
      eventType,
      menu,
      decoration,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "eventReservations"), reservationData);
      toast.success(t("success"));

      setGuestInfo({
        firstName: "",
        lastName: "",
        email: "",
        eventDate: "",
        guests: "",
      });

      setSelections({
        menu: null,
        decoration: null,
        activeCategory: "menu",
      });
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error(t("errorSubmit"));
    }
  };

  return (
    <footer className="w-full px-6 py-6 bg-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
      <div className="text-lg font-bold text-gray-800">
        {t("total")}:{" "}
        <span className="text-orange-600">€{totalPrice.toFixed(2)}</span>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t("submit")}
      </button>
    </footer>
  );
}
