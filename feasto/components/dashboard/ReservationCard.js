export default function ReservationCard({
  reservation,
  onConfirm,
  onReject,
  onRemove,
}) {
  const { id, name, email, people, date, time, table, status } = reservation;
  const isReserved = status === "confirmed" || status === "rejected";

  return (
    <div
      className={`relative rounded-lg p-5 mb-4 transition flex flex-col justify-between h-56 ${
        isReserved ? "bg-gray-200 text-gray-800" : "bg-white text-gray-900"
      }`}
    >
      {isReserved && (
        <button
          onClick={() => onRemove && onRemove(id)}
          className="absolute top-2 right-2 text-gray-600 text-xl font-bold hover:text-red-600"
        >
          ×
        </button>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-bold">{name || "No Name"}</h3>
        <p className="text-sm text-gray-700">{email || "No Email"}</p>
        <p className="text-sm">Guests: {people || "-"}</p>
        <p className="text-sm">
          Date & Time:{" "}
          <span className="font-medium">
            {date || "N/A"} {time ? `at ${time}` : ""}
          </span>
        </p>
        <p className="text-sm">
          Table:{" "}
          <span className="font-semibold text-orange-600">{table || "-"}</span>
        </p>
      </div>

      {!isReserved && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => id && onConfirm(reservation)}
            className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition"
            disabled={!id}
          >
            Confirm
          </button>
          <button
            onClick={() => id && onReject(id)}
            className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
            disabled={!id}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
