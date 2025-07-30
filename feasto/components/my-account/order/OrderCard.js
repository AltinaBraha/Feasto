'use client';

import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { FaBoxOpen, FaClock, FaListAlt } from "react-icons/fa";

export default function OrderCard({ order, onCancel, onReorder, onEdit  }) {
  const createdAt = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();

  function formatOrderDate(date) {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return `${format(d, "PPpp", { locale: enUS })} (${formatDistanceToNow(d, { addSuffix: true, locale: enUS })})`;
  }

  return (
<section className="relative flex flex-col bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-300 dark:border-gray-700 p-6 max-w-lg mx-auto" style={{ minHeight: "400px" }}>
      <header className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
          <FaBoxOpen className="text-orange-600" />
          Order Details
        </h2>
        <span
          className={`uppercase font-semibold px-4 py-1 rounded-full text-sm ${
            order.status === "pending"
              ? "bg-[rgba(255,179,71,0.3)] text-[rgba(221,89,3,0.9)]"
              : order.status === "ready" || order.status === "completed"
              ? "bg-[rgba(114,186,80,0.3)] text-[rgba(88,140,40,0.9)]"
              : order.status === "cancelled"
              ? "bg-[rgba(237,118,97,0.3)] text-[rgba(180,50,40,0.9)]"
              : "bg-[rgba(200,200,200,0.3)] text-[rgba(100,100,100,0.9)]"
          }`}
        >
          {order.status === "pending"
            ? "Preparing..."
            : order.status === "completed"
            ? order.type === "delivery"
              ? `Delivered at ${format(order.updatedAt?.toDate ? order.updatedAt.toDate() : new Date(), "p")}`
              : "Completed"
            : order.status === "cancelled"
            ? "Order Cancelled"
            : order.status}
        </span>
      </header>

      <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-400 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <FaClock />
          <time dateTime={createdAt.toISOString()}>{formatOrderDate(createdAt)}</time>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <FaListAlt />
          {order.type.replace("-", " ")}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Items</h3>
        <ul className="space-y-4 max-h-64 overflow-y-auto">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 items-center border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-grow min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{item.description}</p>
                <p className="mt-1 font-semibold text-orange-600">
                  Qty: {item.qty} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="font-semibold text-gray-900 dark:text-white min-w-[60px] text-right">
                ${(item.qty * item.price).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {order.type === "delivery" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-gray-800 dark:text-gray-300 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Customer Info</h3>
            <p><strong>Name:</strong> {order.formData.fullName || "—"}</p>
            <p><strong>Email:</strong> {order.formData.email || "—"}</p>
            <p><strong>Phone:</strong> {order.formData.phone || "—"}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p>{order.formData.address || "—"}</p>
            <p>{order.formData.city || "—"}</p>
            <p>{order.formData.postalCode || "—"}</p>
          </div>
        </div>
      )}

      {order.type === "dine-in" && (
        <div className="mb-6 text-gray-800 dark:text-gray-300 text-sm">
          <h3 className="font-semibold mb-2">Table Number</h3>
          <p>{order.formData.tableNumber || "—"}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="text-orange-600 font-bold text-xl">
          Total: ${order.total.toFixed(2)}
        </div>
           <div className="absolute bottom-6 right-6 left-6 flex gap-4 justify-end">
    {order.status === "pending" && (
      <button
        onClick={onCancel}
        className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-md font-semibold text-sm transition"
        style={{ boxShadow: "0 2px 6px rgba(239, 68, 68, 0.4)", minWidth: "90px" }}
      >
        Cancel
      </button>
    )}
    <button
      onClick={onReorder}
      className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 rounded-md font-semibold text-sm transition"
      style={{ boxShadow: "0 2px 6px rgba(59, 130, 246, 0.4)", minWidth: "90px" }}
    >
      Reorder
    </button>
    {order.status === "pending" && (
      <button
        onClick={onEdit}
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-md font-semibold text-sm transition"
        style={{ boxShadow: "0 2px 6px rgba(234, 179, 8, 0.4)", minWidth: "90px" }}
      >
        Edit
      </button>
    )}
  </div>

        
      </div>
    </section>
  );
}
