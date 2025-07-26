export default function OrderCard({ order, onMarkReady }) {
  const isReady = order.status === "ready";

  return (
    <div
      className={`rounded-xl p-5 mb-4 transition flex flex-col justify-between min-h-[300px] ${
        isReady ? "bg-gray-100 text-gray-800" : "bg-white text-gray-900"
      } shadow-sm hover:shadow-md`}
    >
      {/* Përmbajtja e sipërme */}
      <div className="space-y-2 flex-1">
        <h2 className="text-lg font-bold">
          Order{" "}
          <span className="text-gray-700">
            #{order.orderNumber || order.id}
          </span>
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, i) => (
              <li key={i}>
                {item.name} x {item.qty}
              </li>
            ))
          ) : (
            <li className="italic text-gray-500">No items</li>
          )}
        </ul>
      </div>

      {/* Përmbajtja e poshtme */}
      <div className="mt-4 space-y-1">
        <p className="font-semibold text-orange-600">Total: ${order.total}</p>
        <p className="text-sm text-gray-600">Type: {order.type}</p>
        <p
          className={`text-sm font-semibold ${
            isReady ? "text-green-700" : "text-blue-700"
          }`}
        >
          Status: {order.status}
        </p>
        {!isReady && (
          <button
            onClick={() => onMarkReady(order.id)}
            className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition"
          >
            Mark as Ready
          </button>
        )}
      </div>
    </div>
  );
}
