"use client";

import { useState } from "react";
import DessertSection from "./DessertSection";

export default function DessertTabs({ dessertMenu }) {
  const subcategories = [
    { key: "all-desserts", label: "All Desserts" },
    { key: "Cakes", label: "Cakes" },
    { key: "Ice Cream", label: "Ice Cream" },
    { key: "Cookies", label: "Cookies" },
    { key: "Fruit Desserts", label: "Fruit Desserts" },

  ];

  const [activeKey, setActiveKey] = useState("all-desserts");

  const filteredMenu =
    activeKey === "all-desserts"
      ? dessertMenu
      : dessertMenu.filter(item => item.subCategory === activeKey);

  const groupedBySubcategory = subcategories
    .filter(s => s.key !== "all-desserts")
    .map(s => ({
      key: s.key,
      label: s.label,
      items: dessertMenu.filter(item => item.subCategory === s.key),
    }));

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="flex justify-center space-x-10 mb-12">
        {/* Link-et për të shkuar në kategori të tjera në menunë e përgjithshme */}
        <a
          href="/menus/food"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          Food
        </a>
        <a
          href="/menus/drinks"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          Drinks
        </a>
        <button
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          Desserts
        </button>
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
        {activeKey === "all-desserts"
          ? groupedBySubcategory.map(group => (
              <DessertSection
                key={group.key}
                category={group.label}
                items={group.items}
                className="border-b border-gray-300 pb-6 min-h-[300px]"
              />
            ))
          : (
            <DessertSection
              category={subcategories.find(s => s.key === activeKey)?.label || ""}
              items={filteredMenu}
              className="flex flex-col space-y-6 px-8 md:px-16 lg:px-24"
            />
          )}
      </div>
    </div>
  );
}
