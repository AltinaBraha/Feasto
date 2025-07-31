import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getAvailableTables = async (date, time, guests) => {
  const tablesRef = collection(db, "tables");
  const reservationsRef = collection(db, "reservations");

  const tableSnapshot = await getDocs(tablesRef);
  const allTables = tableSnapshot.docs.map((doc) => ({
    id: Number(doc.data().id),
    seats: Number(doc.data().seats),
  }));

  const reservedSnapshot = await getDocs(
    query(reservationsRef, where("date", "==", date), where("time", "==", time))
  );

  const reservedTableIds = reservedSnapshot.docs.flatMap((doc) => {
    const data = doc.data();
    if (Array.isArray(data.tables)) {
      return data.tables.map(Number);
    }
    return [Number(data.table)];
  });

  return allTables.filter((t) => !reservedTableIds.includes(t.id));
};
