"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function MenuItemCard({ item }) {
  const { addToCart } = useCart();
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 border-b border-gray-200 pb-6 gap-4 sm:gap-0">
      {/* Image */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* Name + Ingredients */}
      <div className="flex-1 text-start">
        <Link
          href={`/menus/food/${slugify(item.name)}`}
          className="font-semibold text-lg hover:text-orange-600 transition block"
        >
          {item.name}
        </Link>
        <p className="text-gray-500 text-sm">{item.ingredients.join(", ")}</p>
      </div>

      {/* Price + Add button */}
      <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-4 sm:justify-end justify-start items-start sm:min-w-[110px]">
        <div className="hidden sm:block flex-grow border-b border-dotted border-gray-400 mx-2"></div>
        <span className="font-bold whitespace-nowrap mb-2 sm:mb-0">
          ${item.price.toFixed(2)}
        </span>
        <button
          onClick={() => addToCart({ ...item, qty: 1 })}
          disabled={!item.available}
          title={item.available ? "Add to cart" : "Not available"}
          className="text-orange-600 border border-orange-600 rounded px-3 py-1 text-lg font-bold hover:bg-orange-600 hover:text-white transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
