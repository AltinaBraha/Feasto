"use client";

import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

export default function CartButton() {
  const { cart } = useCart();
  const router = useRouter();

  if (cart.length === 0) return null;

  return (
    <button
      onClick={() => router.push("/shop")}
      className="fixed bottom-6 right-6 bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 transition z-50"
    >
      🛒 See My Cart ({cart.length})
    </button>
  );
}
