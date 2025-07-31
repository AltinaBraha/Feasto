import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";

const ORDERS_COLLECTION = "orders";
const COUNTER_DOC = doc(db, "counters", "orders");

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

export const fetchOrders = async () => {
  const snapshot = await getDocs(collection(db, ORDERS_COLLECTION));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
};

export const getOrderById = async (id) => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("Order not found");
  return { id: snapshot.id, ...snapshot.data() };
};

export const createOrder = async (orderData) => {
  const orderNumber = await getNextOrderNumber();
  const orderId = orderNumber.toString();

  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await setDoc(docRef, {
    ...orderData,
    orderNumber,
    status: orderData.status || "pending",
    createdAt: serverTimestamp(),
    userId: orderData.userId,
  });

  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const fetchOrdersByUser = async (userId) => {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
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
    const orders = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
    callback(orders);
  });
};

export const resetOrderCounter = async () => {
  await setDoc(COUNTER_DOC, { lastOrderNumber: 0 });
};
