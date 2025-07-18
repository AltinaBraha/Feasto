"use client";
import { useState } from "react";
import { toast } from 'react-toastify';


const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour < 12 ? "am" : "pm";
  const formattedHour = (((hour + 11) % 12) + 1).toString();
  return `${formattedHour}:${minute} ${period}`;
});

export default function ReservationForm() {
  const [people, setPeople] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("12:00 am");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      "https://6877a749dba809d901f05d20.mockapi.io/reservations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Guest",
          email: "guest@feasto.com",
          people: Number(people),
          dateTime: `${date} ${time}`,
          status: "pending",
        }),
      }
    );

    if (!res.ok) throw new Error("Reservation failed");

    toast.success("Reservation submitted! We will confirm shortly.");
  } catch (err) {
    toast.error("Failed to submit reservation. Try again.");
  }
};

  return (
    <section  id="reservation-form" className="relative py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/img/booking-bg.jpg")`,
        }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}
      </div>

      {/* Content above background */}
      <div className="relative z-10">
        <div className="text-center text-white mb-12">
          <h3 className="text-orange-500 text-lg font-medium tracking-wide mb-2">
            ONLINE RESERVATION
          </h3>
          <h2 className="text-5xl font-serif font-semibold tracking-wide">
            BOOK A TABLE
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-4"
        >
          <div className="flex flex-col w-[200px] text-white">
            <label className="text-sm mb-1">Guests</label>
            <select
              className="bg-transparent border-b border-white py-2 focus:outline-none"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            >
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={i + 1} className="text-black">
                  {i + 1} Person{i > 0 && "s"}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-[200px] text-white">
            <label className="text-sm mb-1">Date</label>
            <input
              type="date"
              className="bg-transparent border-b border-white py-2 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-[200px] text-white">
            <label className="text-sm mb-1">Time</label>
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
            type="submit"
            className="bg-[#f16123] text-white py-3 px-8 rounded mt-6 lg:mt-8 hover:bg-orange-600 transition"
          >
            BOOK NOW
          </button>
        </form>

        <div className="text-sm text-white mt-8 text-center opacity-80">
          *Powered by OpenTable
        </div>
      </div>
    </section>
  );
}
