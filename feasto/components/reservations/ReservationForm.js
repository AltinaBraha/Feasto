"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ClientToast from "@/lib/ui/ClientToast";
import { createReservation } from "@/app/api/reservations";
import { convertTo24Hour } from "@/utils/time";
import { timeSlots } from "@/constants/time";
import ReservationModal from "@/components/reservations/ReservationModal";
import { useTranslations } from "next-intl";

export default function ReservationForm() {
  const t = useTranslations("ReservationForm");

  const [people, setPeople] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("12:00 am");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleBookingClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  // const handleReservationSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!name.trim() || !email.trim()) {
  //     toast.error(t("errors.fillNameEmail"));
  //     return;
  //   }

  //   setShowModal(true);
  // };

  const handleReservationSubmit = async (tableNumber) => {
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in both name and email.");
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
        table: tableNumber,
      };

      await createReservation(newReservation);

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: t("email.subject"),
          text: t("email.text", { name, people, date, time }),
        }),
      });

      toast.success(t("success.submitted"));
      setShowModal(false);
      setName("");
      setEmail("");
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

          <div className="text-sm text-white mt-8 text-center opacity-80">
            {t("poweredBy")}
          </div>
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
        />
      )}

      <ClientToast />
    </>
  );
}
