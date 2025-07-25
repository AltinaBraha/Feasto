export default function ReservationCard({ reservation, onConfirm, onReject }) {
  const { id, name, email, people, date, time, table, status } = reservation;

  const isReserved = status === "confirmed" || status === "rejected";

  return (
    <div
      className={`relative shadow-md rounded p-4 mb-4 transition ${
        isReserved ? "bg-gray-500 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Ikona X në tavolinë nëse është e rezervuar */}
      {isReserved && (
        <span className="absolute top-2 right-2 text-white text-2xl font-bold">
          ×
        </span>
      )}

      <h3 className="text-lg font-bold">{name || "No Name"}</h3>
      <p className="text-gray-300">{email || "No Email"}</p>
      <p>Guests: {people || "-"}</p>
      <p>
        Date & Time:{" "}
        <span className="font-medium">
          {date || "N/A"} {time ? `at ${time}` : ""}
        </span>
      </p>
      <p>
        Table:{" "}
        <span
          className={`font-semibold ${
            isReserved ? "text-white" : "text-orange-600"
          }`}
        >
          {table || "-"}
        </span>
      </p>

      {/* Butonat shfaqen vetëm nëse rezervimi është pending */}
      {!isReserved && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => id && onConfirm(reservation)}
            className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition"
            disabled={!id}
          >
            Confirm
          </button>
          <button
            onClick={() => id && onReject(id)}
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
            disabled={!id}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
