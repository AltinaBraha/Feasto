import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, qty: 1 }] });
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),
      updateQty: (id, qty) =>
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, qty: Number(qty) } : i
          ),
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", 
    }
  )
);
