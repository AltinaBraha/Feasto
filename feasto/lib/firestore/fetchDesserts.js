import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchDesserts = async () => {
  const querySnapshot = await getDocs(collection(db, "Desserts")); // "D" e madhe
  const desserts = [];
  querySnapshot.forEach(doc => {
    desserts.push({ id: doc.id, name: doc.id, ...doc.data() }); // vendos name si id nëse mungon
  });
  return desserts;
};
