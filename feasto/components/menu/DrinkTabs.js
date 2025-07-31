"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DrinkSection from "./DrinkSection";

export default function MenuTabs({ drinkMenu }) {
  const t = useTranslations("menutabs");

  const subcategories = [
    { key: "all-drinks", label: t("all-drinks") },
    { key: "Cocktail", label: t("cocktail") },
    { key: "Coffee", label: t("coffee") },
    { key: "Wine", label: t("wine") },
    { key: "Milkshake", label: t("milkshake") },
  ];

  const [activeKey, setActiveKey] = useState("all-drinks");

  const filteredMenu =
    activeKey === "all-drinks"
      ? drinkMenu
      : drinkMenu.filter(item => item.subCategory === activeKey);

  const groupedBySubcategory = subcategories
    .filter(s => s.key !== "all-drinks")
    .map(s => ({
      key: s.key,
      label: s.label,
      items: drinkMenu.filter(item => item.subCategory === s.key),
    }));

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-10 mb-12">
        <a
          href="/menus/food"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          {t("food")}
        </a>
        <button
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          {t("drinks")}
        </button>
        <a
          href="/menus/desserts"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          {t("desserts")}
        </a>
      </div>

      <div className="flex space-x-4 mt-4">
        {subcategories.map(subcat => (
          <button
            key={subcat.key}
            onClick={() => setActiveKey(subcat.key)}
            className={`uppercase text-sm font-semibold tracking-wide ${
              activeKey === subcat.key
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:text-orange-600"
            }`}
          >
            {subcat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10 px-8 md:px-16 lg:px-24 mt-10">
        {activeKey === "all-drinks"
          ? groupedBySubcategory.map(group => (
              <DrinkSection
                key={group.key}
                category={group.label}
                items={group.items}
                className="border-b border-gray-300 pb-6 min-h-[300px]"
              />
            ))
          : (
            <DrinkSection
              category={subcategories.find(s => s.key === activeKey)?.label || ""}
              items={filteredMenu}
              className="flex flex-col space-y-6 px-8 md:px-16 lg:px-24"
            />
          )}
      </div>
    </div>
  );
}
