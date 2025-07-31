"use client";

import { getTodaysOfferCategory } from "@/utils/offerCategory";
import { isOfferTimeActive } from "@/utils/offerTime";
import { useState } from "react";
import MenuSection from "./MenuSection";
import { useTranslations } from "next-intl";

const subcategoryKeys = ["all-food", "starters", "pizza", "sides", "pasta"];

export default function MenuTabs({ foodMenu }) {
  const t = useTranslations("MenuTabs");
  const [activeSubcategory, setActiveSubcategory] = useState("all-food");
  const [showSubcategories, setShowSubcategories] = useState(false);

  const subcategories = subcategoryKeys.map((key) => ({
    key,
    label: t(key),
  }));

  const filteredMenu = foodMenu.filter((item) =>
    activeSubcategory === "all-food"
      ? true
      : item.subCategory.toLowerCase() === activeSubcategory
  );

  const groupedBySubcategory = subcategoryKeys
    .filter((key) => key !== "all-food")
    .map((key) => ({
      key,
      name: t(key),
      items: foodMenu.filter(
        (item) => item.subCategory.toLowerCase() === key
      ),
    }));

    const offerCategory = getTodaysOfferCategory();
const offerActive = isOfferTimeActive();
 
  return (
    <div className="flex flex-col items-center px-4 sm:px-0">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-10 mb-8">
        <button
          onClick={() => setShowSubcategories(!showSubcategories)}
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          {t("food")}
        </button>
        <a
          href="/menus/drinks"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          {t("drinks")}
        </a>
        <a
          href="/menus/desserts"
          className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
        >
          {("desserts")}
        </a>
      </div>

      {showSubcategories && (
        <div className="flex flex-wrap justify-center gap-3 mt-4 px-2">
          {subcategories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setActiveSubcategory(key);
                setShowSubcategories(false);
              }}
              className={`uppercase text-sm font-semibold tracking-wide ${
                activeSubcategory === key
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-24 gap-y-10 px-4 sm:px-8 md:px-16 lg:px-24 mt-10 w-full">
        {activeSubcategory === "all-food" ? (
          groupedBySubcategory.map((group) => (
            <MenuSection
              key={group.key}
              category={group.name}
              items={group.items}
              className="border-b border-gray-300 pb-6 min-h-[300px]"
            />
          ))
        ) : (
          <MenuSection
            category={subcategories.find((s) => s.key === activeSubcategory)?.label}
            items={filteredMenu}
            className="flex flex-col space-y-6"
          />
        )}
      </div>
    </div>
  );
}

