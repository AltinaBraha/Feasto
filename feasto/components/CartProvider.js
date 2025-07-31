// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//     setIsReady(true);
//   }, []);

//   useEffect(() => {
//     if (isReady) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, isReady]);

//   const clearCart = () => {
//     setCart([]);
//   };

//   const addToCart = (item) => {
//     setCart((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQty = (id, qty) => {
//     setCart((prev) =>
//       prev.map((i) => (i.id === id ? { ...i, qty: Number(qty) } : i))
//     );
//   };

//   if (!isReady) return null;

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);
