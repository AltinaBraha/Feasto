"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import Favorite from "@/components/my-account/favorites/Favorite";

export default function RecommendedCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-[1.03] duration-200">
      <img
        src={item.image || "/images/placeholder-dish.jpg"}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
            <Favorite
            itemId={item.id}
            itemData={{ name: item.name, image: item.image }}
          />        
          </div>
        {item.category && (
          <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        )}
        {item.price && (
          <p className="text-gray-700 text-base font-medium mb-4">
            ${item.price.toFixed(2)}
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => addToCart({ ...item, qty: 1 })}
            className="flex-1 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Add to Cart
          </button>
          <Link
            href={`/menus/food/${item.itemId}`}
            className="flex-1 border border-orange-300 text-orange-700 py-2 rounded-md text-center hover:bg-orange-100 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
