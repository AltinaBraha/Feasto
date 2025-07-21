"use client";
import { useCart } from "@/components/CartProvider";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OrderModal from "@/components/shop-page/OrderModal";

export default function ShopPage() {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const [orderType, setOrderType] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // ose skeleton/loading
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = async () => {
    if (!orderType) return alert("Choose order type");

    const res = await fetch(
      "https://6877a749dba809d901f05d20.mockapi.io/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          createdAt: new Date().toISOString(),
          items: cart,
          total,
          type: orderType,
          status: "pending",
        }),
      }
    );

    if (res.ok) {
      toast.success("Order placed!");
      clearCart();
    }

  };

  return (
    <>
      {/* Hero / Banner */}
      <section
        className="h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/img/cart-banner.jpg')" }}
      >
        <h1 className="text-white text-5xl font-serif">Cart</h1>
      </section>

      {/* Cart Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
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
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="px-2 py-1 border"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        )}

        <div className="text-right mt-4 text-xl font-medium">Total: ${total}</div>

        {/* Order Type Buttons */}
            <button
        onClick={() => setIsOrderModalOpen(true)}
        disabled={cart.length === 0}
        className={`mt-6 px-6 py-3 rounded ${
          cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 text-white"
        }`}
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

      </div>
    </>
  );
}
