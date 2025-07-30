import { create } from "zustand";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,

  initAuthListener: () => {
    onAuthStateChanged(auth, (currentUser) => {
      set({ user: currentUser, loading: false });
    });
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  setUser: (user) => set({ user }),
}));
