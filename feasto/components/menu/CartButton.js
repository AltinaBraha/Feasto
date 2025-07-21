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
      className="fixed bottom-3 right-3 md:bottom-6 md:right-6 bg-orange-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-full shadow-lg hover:bg-orange-700 transition z-50"
    >
      🛒 See My Cart ({cart.length})
    </button>
  );
}
