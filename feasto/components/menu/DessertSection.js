"use client";

import { useState } from "react";
import DessertItemCard from "./DessertItemCard";
import { useTranslations } from "next-intl";

export default function DessertSection({ category, items, className }) {
  const t = useTranslations("sort"); // 🔄 Përkthimet për butonat e sortimit
  const [sortOption, setSortOption] = useState("default");

  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === "priceLowToHigh") return a.price - b.price;
    if (sortOption === "priceHighToLow") return b.price - a.price;
    if (sortOption === "ratingHighToLow") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className={`${className || ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold border-b pb-2 border-orange-600 uppercase">
          {category}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setSortOption("priceLowToHigh")}
            className="text-sm text-gray-600 hover:text-orange-600"
          >
            {t("priceLowToHigh")}
          </button>
          <button
            onClick={() => setSortOption("priceHighToLow")}
            className="text-sm text-gray-600 hover:text-orange-600"
          >
            {t("priceHighToLow")}
          </button>
          <button
            onClick={() => setSortOption("ratingHighToLow")}
            className="text-sm text-gray-600 hover:text-orange-600"
          >
            {t("rating")}
          </button>
        </div>
      </div>
      <div className="space-y-8">
        {sortedItems.map(item => (
          <DessertItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
