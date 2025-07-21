"use client";

export default function ReservationModal({
  onClose,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="bg-white py-12 px-6 sm:px-8 rounded-md w-full max-w-sm flex flex-col items-center text-center shadow-2xl">
        <h3 className="text-orange-600 text-sm font-medium tracking-wide uppercase mb-2">
          Online Reservation
        </h3>
        <h5 className="text-2xl font-serif font-semibold tracking-wide mb-10">
          Enter Your Info
        </h5>
        <form
          onSubmit={onSubmit}
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
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 bg-gray-300 text-gray-800 py-3 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[#d35400] text-white py-3 hover:bg-orange-600 transition uppercase tracking-wide rounded"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
