"use client";

import { useCart } from "@/components/CartProvider";
import { useState } from "react";
import OrderModal from "@/components/shop-page/OrderModal";
import Link from "next/link";


export default function ClientCartSection() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

 if (cart.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <p className="mb-4 text-lg font-medium">Your cart is empty.</p>
       <Link
          href="/menus/food"
          className="mt-2 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition text-center"
        >
          View Food Options
        </Link>
    </div>
  );
}

  return (
    <>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">${item.price}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="px-2 py-1 border"
              disabled={item.qty <= 1}
            >
              -
            </button>
            <span className="w-6 text-center">{item.qty}</span>
            <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 border">
              +
            </button>
            <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 text-xl">
              &times;
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-4 text-xl font-medium">Total: ${total.toFixed(2)}</div>

      <button
        onClick={() => setIsOrderModalOpen(true)}
        className="mt-6 px-6 py-3 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
      >
        Order Now
      </button>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        total={total}
        clearCart={clearCart}
        cart={cart}
      />
    </>
  );
}
