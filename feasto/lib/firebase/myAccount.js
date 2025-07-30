import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUserStats(uid) {
  if (!uid) return null;

  // Reservations count
  const reservationsRef = collection(db, "reservations");
  const reservationsSnap = await getDocs(
    query(reservationsRef, where("userId", "==", uid))
  );

  // Orders count
  const ordersRef = collection(db, "orders");
  const ordersSnap = await getDocs(
    query(ordersRef, where("userId", "==", uid))
  );

  // Favorites count (corrected)
  const favoritesRef = collection(db, "favorites");
  const favoritesSnap = await getDocs(
    query(favoritesRef, where("userId", "==", uid))
  );

  // Addresses count
  const addressesRef = collection(db, "addresses");
  const addressesSnap = await getDocs(
    query(addressesRef, where("userId", "==", uid))
  );

  // Payment methods count
  const paymentsRef = collection(db, "paymentMethods");
  const paymentsSnap = await getDocs(
    query(paymentsRef, where("userId", "==", uid))
  );

  return {
    upcomingReservationsCount: reservationsSnap.size,
    recentOrdersCount: ordersSnap.size,
    favoritesCount: favoritesSnap.size,
    addressesCount: addressesSnap.size,
    paymentMethodsCount: paymentsSnap.size,
  };
}
