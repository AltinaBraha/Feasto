"use client";
import { useState } from "react";

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

      alert("Reservation successful!");
      setShowModal(false);
      setName("");
      setEmail("");
    } catch (err) {
      alert("Failed to reserve. Try again.");
    }
  };

  return (
    <section className="relative py-20">
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Enter Your Info
            </h2>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
