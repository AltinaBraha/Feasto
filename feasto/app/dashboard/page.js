"use client";
import { useEffect, useState } from "react";
// import Toast from "../../components/Toast";
import { toast } from 'react-toastify';

export default function WaiterDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    fetchOrders();

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://6877a749dba809d901f05d20.mockapi.io/orders"
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("MockAPI nuk ktheu array për orders:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error("Gabim gjatë fetch:", err);
      setOrders([]);
    }
  };

 const markReady = async (id) => {
  try {
    await fetch(`https://6877a749dba809d901f05d20.mockapi.io/orders/${id}`, {
      method: "DELETE",
    });
    toast.success(`Order #${id} marked as ready and removed`);
  } catch (error) {
    toast.error("Failed to delete order. CORS or network issue.");
    console.error("DELETE error:", error);
  }
};


  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.type === filter);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold text-orange-500">Filter Orders</h2>
        <button
          className={`block w-full text-left px-4 py-2 rounded ${
            filter === "all" ? "bg-orange-500" : "hover:bg-gray-800"
          }`}
          onClick={() => setFilter("all")}
        >
          All Orders
        </button>
        <button
          className={`block w-full text-left px-4 py-2 rounded ${
            filter === "take-away" ? "bg-orange-500" : "hover:bg-gray-800"
          }`}
          onClick={() => setFilter("take-away")}
        >
          Take Away
        </button>
        <button
          className={`block w-full text-left px-4 py-2 rounded ${
            filter === "order-here" ? "bg-orange-500" : "hover:bg-gray-800"
          }`}
          onClick={() => setFilter("order-here")}
        >
          Order Here
        </button>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Orders {filter !== "all" && `(${filter.replace("-", " ")})`}
        </h1>

        {filteredOrders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order, index) => (
              <div
                key={order?.id ?? `order-${index}`}
                className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
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
                      order.status === "ready"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
                {order.status === "pending" && (
                  <div className="mt-4">
                    <button
                      onClick={() => markReady(order.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
                    >
                      Mark as Ready
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* {toast && <Toast message={toast} onClose={() => setToast("")} />} */}
      </main>
    </div>
  );
}
