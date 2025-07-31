import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUserStats(uid) {
  if (!uid) return null;

  const reservationsRef = collection(db, "reservations");
  const reservationsSnap = await getDocs(
    query(reservationsRef, where("userId", "==", uid))
  );

  const ordersRef = collection(db, "orders");
  const ordersSnap = await getDocs(
    query(ordersRef, where("userId", "==", uid))
  );

  const favoritesRef = collection(db, "favorites");
  const favoritesSnap = await getDocs(
    query(favoritesRef, where("userId", "==", uid))
  );

  const addressesRef = collection(db, "addresses");
  const addressesSnap = await getDocs(
    query(addressesRef, where("userId", "==", uid))
  );

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
