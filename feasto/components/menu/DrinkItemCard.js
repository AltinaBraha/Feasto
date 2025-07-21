"use client";
import Image from "next/image";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function DrinkItemCard({ item }) {
  const { addToCart } = useCart();
  const slugify = (text) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  return (
    <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
     <div className="flex-shrink-0 relative w-16 h-16">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <Link href={`/menus/Drinks/${slugify(item.name)}`} className="font-semibold text-lg hover:text-orange-600 transition">
          {item.name}
        </Link>
        <p className="text-gray-500 text-sm">{item.ingredients.join(", ")}</p>
      </div>
      <div className="flex items-center space-x-4 min-w-[110px] justify-end">
        <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
        <span className="font-bold whitespace-nowrap">${item.price.toFixed(2)}</span>
        <button
          onClick={() => addToCart({ ...item, qty: 1 })}
          disabled={!item.available}
          title={item.available ? "Add to cart" : "Not available"}
          className="ml-4 text-orange-600 border border-orange-600 rounded px-2 text-lg font-bold hover:bg-orange-600 hover:text-white transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
