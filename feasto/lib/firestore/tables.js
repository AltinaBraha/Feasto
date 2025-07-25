// lib/firestore/tables.js
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Merr tavolinat e lira sipas datës, orës dhe numrit të personave
export const getAvailableTables = async (date, time, guests) => {
  const tablesRef = collection(db, "tables");
  const reservationsRef = collection(db, "reservations");

  // Merr të gjitha tavolinat
  const tableSnapshot = await getDocs(tablesRef);
  const allTables = tableSnapshot.docs.map((doc) => ({
    id: Number(doc.data().id), // Ensure id is a number
    ...doc.data(),
  }));

  // Filtrimi sipas numrit të ulëseve
  const suitableTables = allTables.filter((t) => t.seats >= guests);

  // Merr rezervimet për datën dhe orën e dhënë
  const reservedSnapshot = await getDocs(
    query(reservationsRef, where("date", "==", date), where("time", "==", time))
  );

  const reservedTableIds = reservedSnapshot.docs.map((doc) =>
    Number(doc.data().table)
  ); // Ensure reserved IDs are numbers

  // Kthe vetëm tavolinat e lira
  return suitableTables.filter((t) => !reservedTableIds.includes(t.id));
};
