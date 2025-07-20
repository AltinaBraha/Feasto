export default function ReservationCard({ reservation, onConfirm, onReject }) {
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Reservation #{reservation.id}
        </h2>
        <p className="text-sm text-gray-600">Guests: {reservation.people}</p>
        <p className="text-sm text-gray-600">
          Date & Time: {reservation.dateTime}
        </p>
        <p className="text-sm text-gray-600">Email: {reservation.email}</p>
        <p className="text-sm text-gray-600">Name: {reservation.name}</p>
        <p
          className={`text-sm font-semibold mt-1 ${
            reservation.status === "confirmed"
              ? "text-green-600"
              : reservation.status === "rejected"
              ? "text-red-600"
              : "text-blue-600"
          }`}
        >
          Status: {reservation.status}
        </p>
      </div>
      {reservation.status === "pending" && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onConfirm(reservation.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
          >
            Confirm
          </button>
          <button
            onClick={() => onReject(reservation.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
