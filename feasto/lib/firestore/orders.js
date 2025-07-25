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
} from "firebase/firestore";

const ORDERS_COLLECTION = "orders";

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

export const createOrder = async (orderData) => {
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
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
