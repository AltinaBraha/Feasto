import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";

const userDocRef = (uid) => doc(db, "users", uid);

export async function ensureUserDoc(uid, seed = {}) {
  const ref = userDocRef(uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        ...seed,               
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: false }        
    );
  } else {
    await updateDoc(ref, { updatedAt: serverTimestamp() });
  }
}

export async function getUserProfile(uid) {
  const snap = await getDoc(userDocRef(uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}


export function subscribeUserProfile(uid, callback) {
  return onSnapshot(userDocRef(uid), (snap) => {
    callback(snap.exists() ? { uid, ...snap.data() } : null);
  });
}


export async function updateUserProfile(uid, fields) {
  await setDoc(
    userDocRef(uid),
    { ...fields, updatedAt: serverTimestamp() },
    { merge: true }
  );
}


export async function updateAuthDisplayName(displayName) {
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, { displayName });
}


export async function changePasswordWithReauth(email, currentPassword, newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user.");

  const credential = EmailAuthProvider.credential(email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}
