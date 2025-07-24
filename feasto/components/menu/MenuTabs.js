"use client";

import { useState } from "react";
import MenuSection from "./MenuSection";

const subcategories = ["All Food", "Starters", "Pizza", "Sides", "Pasta"];

export default function MenuTabs({ foodMenu }) {
  const [activeSubcategory, setActiveSubcategory] = useState("All Food");
  const [showSubcategories, setShowSubcategories] = useState(false);

  const filteredMenu = foodMenu.filter((item) =>
    activeSubcategory === "All Food"
      ? true
      : item.subcategory === activeSubcategory
  );

  const groupedBySubcategory = subcategories
    .filter((s) => s !== "All Food")
    .map((s) => ({
      name: s,
      items: foodMenu.filter((item) => item.subcategory === s),
    }));

  return (
    <div className="flex flex-col items-center mb-12 px-4 sm:px-0">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-10 mb-8">
        <button
          onClick={() => setShowSubcategories(!showSubcategories)}
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          Food
        </button>
        <a
          href="/menus/Drinks"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          Drinks
        </a>
      </div>

      {/* Subcategories */}
      {showSubcategories && (
        <div className="flex flex-wrap justify-center gap-3 mt-4 px-2">
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => {
                setActiveSubcategory(subcat);
                setShowSubcategories(false);
              }}
              className={`uppercase text-sm font-semibold tracking-wide ${
                activeSubcategory === subcat
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}

      {/* Menu Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-24 gap-y-10 px-4 sm:px-8 md:px-16 lg:px-24 mt-10 w-full">
        {activeSubcategory === "All Food" ? (
          groupedBySubcategory.map((group) => (
            <MenuSection
              key={group.name}
              category={group.name}
              items={group.items}
              className="border-b border-gray-300 pb-6 min-h-[300px]"
            />
          ))
        ) : (
          <MenuSection
            category={activeSubcategory}
            items={filteredMenu}
            className="flex flex-col space-y-6"
          />
        )}
      </div>
    </div>
  );
}
