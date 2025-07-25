"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import MenuItemCard from "./MenuItemCard";

export default function MenuSection({ category, items, className }) {
  const t = useTranslations("sort"); 
  const [sortOption, setSortOption] = useState("default");

  const sortedItems = [...items].sort((a, b) => {
    if (sortOption === "priceLowToHigh") return a.price - b.price;
    if (sortOption === "priceHighToLow") return b.price - a.price;
    if (sortOption === "ratingHighToLow")
      return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className={className || ""}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 border-orange-600 uppercase">
          {category}
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
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
        {sortedItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
