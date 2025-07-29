import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * Merr të gjitha tavolinat e lira për një datë dhe orë të dhënë.
 * Nuk filtron sipas numrit të personave, që të mund të bëhet kombinimi në front-end.
 */
export const getAvailableTables = async (date, time, guests) => {
  const tablesRef = collection(db, "tables");
  const reservationsRef = collection(db, "reservations");

  // Merr të gjitha tavolinat
  const tableSnapshot = await getDocs(tablesRef);
  const allTables = tableSnapshot.docs.map((doc) => ({
    id: Number(doc.data().id),
    seats: Number(doc.data().seats),
  }));

  // Merr rezervimet për këtë datë dhe orë
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

  // Filtrimi i tavolinave të lira
  return allTables.filter((t) => !reservedTableIds.includes(t.id));
};
