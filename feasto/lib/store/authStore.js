// lib/store/authStore.js
import create from "zustand";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    router.push("/staff-login");
  },

  setUser: (user) => set({ user }),
}));
