"use client";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import RewardProgress from "./RewardProgress";
import { Gift, PartyPopper } from "lucide-react";

export default function SummaryFooter({
  guestInfo,
  setGuestInfo,
  selections,
  setSelections,
  eventType,
}) {
  const t = useTranslations("events.summaryFooter");

  const [pastReservations, setPastReservations] = useState([]);
  const [emailChecked, setEmailChecked] = useState(false);

  const { decoration, menu } = selections ?? {};
  const numberOfGuests = parseInt(guestInfo.guests) || 0;

  const basePrice =
    (menu?.price || 0) * numberOfGuests + (decoration?.price || 0);
  const hasDiscount = emailChecked && pastReservations.length >= 2;
  const discountedPrice = hasDiscount ? basePrice * 0.85 : basePrice;

  const isComplete =
    guestInfo.firstName &&
    guestInfo.lastName &&
    guestInfo.email &&
    guestInfo.eventDate &&
    numberOfGuests > 0 &&
    menu &&
    decoration;

  useEffect(() => {
    const checkPreviousReservations = async () => {
      if (!guestInfo.email) {
        setEmailChecked(false);
        setPastReservations([]);
        return;
      }

      const snapshot = await getDocs(collection(db, "eventReservations"));
      const all = snapshot.docs.map((doc) => doc.data());
      const filtered = all.filter((res) => res.email === guestInfo.email);
      setPastReservations(filtered);
      setEmailChecked(true);
    };

    checkPreviousReservations();
  }, [guestInfo.email]);

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
      totalPrice: discountedPrice,
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

      setEmailChecked(false);
      setPastReservations([]);
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error(t("errorSubmit"));
    }
  };

  return (
    <footer className="w-full px-6 py-6 bg-white shadow-md">
      {emailChecked && hasDiscount && (
        <div className="w-full flex justify-center mb-2 text-green-700 font-medium text-sm">
          <PartyPopper className="w-4 h-4 mr-2" />
          You’re getting a 15% discount for being a loyal guest!
        </div>
      )}

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Gift className="w-5 h-5 text-orange-600" />
          {t("total")}:
          {hasDiscount && (
            <span className="ml-2 line-through text-gray-500">
              €{basePrice.toFixed(2)}
            </span>
          )}
          <span className="ml-2 text-orange-600">
            €{discountedPrice.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("submit")}
        </button>
      </div>

      <RewardProgress pastReservations={pastReservations} />
    </footer>
  );
}
