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
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleBookingClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Please fill in both name and email.");
      return;
    }

    try {
      const res = await fetch(
        "https://6877a749dba809d901f05d20.mockapi.io/reservations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
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
      ></div>
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

        <form className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-4">
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
            onClick={handleBookingClick}
            className="bg-[#f16123] text-white py-3 px-8 rounded mt-6 lg:mt-8 hover:bg-orange-600 transition"
          >
            BOOK NOW
          </button>
        </form>

        <div className="text-sm text-white mt-8 text-center opacity-80">
          *Powered by OpenTable
        </div>
      </div>
      {/* Modal */}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white py-12 px-8 rounded-md w-full max-w-sm flex flex-col items-center text-center shadow-2xl">
            <h3 className="text-orange-600 text-sm font-medium tracking-wide uppercase mb-2">
              Online Reservation
            </h3>
            <h5 className="text-2xl font-serif font-semibold tracking-wide mb-10">
              Enter Your Info
            </h5>

            <form
              onSubmit={handleReservationSubmit}
              className="w-full flex flex-col items-center gap-6"
            >
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none text-center py-2 placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 focus:outline-none text-center py-2 placeholder-gray-500"
              />

              <div className="flex gap-4 w-full mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#d35400] text-white py-3 hover:bg-orange-600 transition uppercase tracking-wide rounded"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
