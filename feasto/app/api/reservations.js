const BASE_URL = "https://6877a749dba809d901f05d20.mockapi.io/reservations";

export const fetchReservations = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const getReservationById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch reservation by ID");
  return await res.json();
};

export const createReservation = async (reservationData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  });
  if (!res.ok) throw new Error("Failed to create reservation");
  return await res.json();
};

export const updateReservationStatus = async (id, status) => {
  return updateReservation(id, { status });
};

export const updateReservation = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update reservation");
  return await res.json();
};

export const deleteReservation = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete reservation");
  return res;
};
