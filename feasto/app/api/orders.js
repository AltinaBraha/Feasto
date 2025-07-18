const BASE_URL = "https://6877a749dba809d901f05d20.mockapi.io/orders";

export const fetchOrders = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch order by ID");
  return await res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return await res.json();
};

export const updateOrder = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return await res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete order");
  return res;
};
