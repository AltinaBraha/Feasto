"use client";

import Link from "next/link";
import Favorite from "@/components/my-account/favorites/Favorite";
import { useCart } from "@/components/CartProvider";
import { useTranslations } from "next-intl";

export default function FavoriteCard({ item }) {
  const { addToCart } = useCart();
  const t = useTranslations("Favorites");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={item.image || "/images/placeholder-dish.jpg"}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
          <Favorite itemId={item.itemId} itemData={{ name: item.name, image: item.image }} />
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => addToCart({ ...item, qty: 1 })}
            className="flex-1 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            {t("addToCart")}
          </button>
          <Link
            href={`/menus/food/${item.itemId}`}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md text-center hover:bg-gray-100 transition"
          >
            {t("view")}
          </Link>
        </div>
      </div>
    </div>
  );
}
