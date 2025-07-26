import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

const ORDERS_COLLECTION = "orders";
const COUNTER_DOC = doc(db, "counters", "orders");

export const fetchOrders = async () => {
  const snapshot = await getDocs(collection(db, ORDERS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getOrderById = async (id) => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("Order not found");
  return { id: snapshot.id, ...snapshot.data() };
};

/**
 * Gjeneron numrin radhor të porosisë duke përdorur dokumentin counters/orders.
 */
const getNextOrderNumber = async () => {
  return await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(COUNTER_DOC);
    if (!counterDoc.exists()) {
      transaction.set(COUNTER_DOC, { lastOrderNumber: 1 });
      return 1;
    }
    const newNumber = counterDoc.data().lastOrderNumber + 1;
    transaction.update(COUNTER_DOC, { lastOrderNumber: newNumber });
    return newNumber;
  });
};

export const createOrder = async (orderData) => {
  const orderNumber = await getNextOrderNumber();

  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    orderNumber,
    status: orderData.status || "pending",
    createdAt: serverTimestamp(),
  });

  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const updateOrder = async (id, updates) => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, updates);
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const deleteOrder = async (id) => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await deleteDoc(docRef);
  return { id };
};

export const subscribeToOrders = (callback) => {
  return onSnapshot(collection(db, ORDERS_COLLECTION), (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(orders);
  });
};
