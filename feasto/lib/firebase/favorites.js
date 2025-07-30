// favorite.js
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,

} from "firebase/firestore";

export const getFavoriteDocId = (userId, itemId) => `${userId}_${itemId}`;

/**
 * Check if a favorite exists for given userId and itemId
 * @param {string} userId 
 * @param {string} itemId 
 * @returns {Promise<boolean>}
 */
export async function checkFavorite(userId, itemId) {
  const docRef = doc(db, "favorites", getFavoriteDocId(userId, itemId));
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

/**
 * Add a favorite item for user
 * @param {string} userId 
 * @param {string} itemId 
 * @param {Object} itemData Additional item info (e.g. name, image)
 */
export async function addFavorite(userId, itemId, itemData = {}) {
  const docRef = doc(db, "favorites", getFavoriteDocId(userId, itemId));
  await setDoc(docRef, {
    userId,
    itemId,
    ...itemData,
    addedAt: serverTimestamp(),
  });
}

/**
 * Remove a favorite item for user
 * @param {string} userId 
 * @param {string} itemId 
 */
export async function removeFavorite(userId, itemId) {
  const docRef = doc(db, "favorites", getFavoriteDocId(userId, itemId));
  await deleteDoc(docRef);
}

/**
 * Get all favorites for a given user
 * @param {string} userId
 * @returns {Promise<Array<Object>>} List of favorite docs data
 */
export async function getFavoritesMapByUser(userId) {
  if (!userId) return {};
  const favoritesArray = await getFavoritesByUser(userId);
  return favoritesArray.reduce((map, fav) => {
    map[fav.itemId] = fav;
    return map;
  }, {});
}
export async function getFavoritesByUser(userId) {
  if (!userId) return [];
  const q = query(collection(db, "favorites"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}