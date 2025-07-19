export default function OrderCard({ order, onMarkReady }) {
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Order #{order.id}
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
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
        <p className="mt-3 font-medium text-orange-600">
          Total: ${order.total}
        </p>
        <p className="text-sm text-gray-600">Type: {order.type}</p>
        <p
          className={`text-sm font-semibold mt-1 ${
            order.status === "ready" ? "text-green-600" : "text-blue-600"
          }`}
        >
          Status: {order.status}
        </p>
      </div>
      {order.status === "pending" && (
        <div className="mt-4">
          <button
            onClick={() => onMarkReady(order.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
          >
            Mark as Ready
          </button>
        </div>
      )}
    </div>
  );
}
