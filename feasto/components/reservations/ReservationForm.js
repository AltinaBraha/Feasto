"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ClientToast from "@/lib/ui/ClientToast";
import { createReservation } from "@/lib/firebase/reservations";
import { getAvailableTables } from "@/lib/firebase/tables";
import { convertTo24Hour } from "@/utils/time";
import { timeSlots } from "@/constants/time";
import ReservationModal from "@/components/reservations/ReservationModal";
import { useTranslations } from "next-intl";

export default function ReservationForm() {
  console.log("ReservationForm loaded");

  const t = useTranslations("ReservationForm");

  const [people, setPeople] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("12:00 am");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTables, setSelectedTables] = useState([]);

  /**
   * Kontrollon nëse ka tavolina të mjaftueshme para hapjes së modalit.
   */
  const handleBookingClick = async (e) => {
    e.preventDefault();
    try {
      const availableTables = await getAvailableTables(
        date,
        convertTo24Hour(time),
        Number(people)
      );

      const totalFreeSeats = availableTables.reduce(
        (sum, t) => sum + t.seats,
        0
      );

      if (totalFreeSeats < Number(people)) {
        toast.error(
          `Nuk ka tavolina të mjaftueshme për ${people} persona në këtë datë dhe orë.`
        );
        return; // Mos hap modalin
      }

      setShowModal(true); // Hap modal vetëm nëse ka kapacitet
    } catch (error) {
      console.error("Error checking tables:", error);
      toast.error("Nuk mund të kontrollohen tavolinat për momentin.");
    }
  };

  /**
   * Submition i rezervimit.
   */
  const handleReservationSubmit = async (tablesArray) => {
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in both name and email.");
      return;
    }
    if (!tablesArray || tablesArray.length === 0) {
      toast.error("Zgjedh të paktën një tavolinë.");
      return;
    }

    const selectedDateTime = new Date(`${date} ${convertTo24Hour(time)}`);
    if (selectedDateTime < new Date()) {
      toast.error(t("errors.pastTime"));
      return;
    }

    try {
      const newReservation = {
        name,
        email,
        people: Number(people),
        date,
        time: convertTo24Hour(time),
        status: "pending",
        tables: tablesArray,
      };

      await createReservation(newReservation);

      toast.success(t("success.submitted"));
      setShowModal(false);
      setName("");
      setEmail("");
      setSelectedTables([]);
    } catch (err) {
      console.error(err);
      toast.error(t("errors.submitFailed"));
    }
  };

  return (
    <>
      <section id="reservation-form" className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/booking-bg.jpg")`,
          }}
        ></div>

        <div className="relative z-10">
          <div className="text-center text-white mb-12">
            <h3 className="text-orange-500 text-lg font-medium tracking-wide mb-2">
              {t("onlineReservation")}
            </h3>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-wide">
              {t("bookATable")}
            </h2>
          </div>

          <form className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center items-center gap-4">
            <div className="flex flex-col w-full sm:w-[200px] text-white">
              <label className="text-sm mb-1">{t("guests")}</label>
              <select
                className="bg-transparent border-b border-white py-2 focus:outline-none"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={i + 1} className="text-black">
                    {i + 1} {i === 0 ? t("person") : t("people")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full sm:w-[200px] text-white">
              <label className="text-sm mb-1">{t("date")}</label>
              <input
                type="date"
                className="bg-transparent border-b border-white py-2 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full sm:w-[200px] text-white">
              <label className="text-sm mb-1">{t("time")}</label>
              <select
                className="bg-transparent border-b border-white py-2 focus:outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {timeSlots.map((slot, i) => (
                  <option key={i} value={slot} className="text-black">
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleBookingClick}
              className="bg-[#f16123] text-white py-3 px-8 rounded mt-6 md:mt-8 hover:bg-orange-600 transition"
            >
              {t("bookNow")}
            </button>
          </form>
        </div>
      </section>

      {showModal && (
        <ReservationModal
          onClose={() => setShowModal(false)}
          onSubmit={handleReservationSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          date={date}
          time={convertTo24Hour(time)}
          people={people}
          selectedTables={selectedTables}
          setSelectedTables={setSelectedTables}
        />
      )}

      <ClientToast />
    </>
  );
}
