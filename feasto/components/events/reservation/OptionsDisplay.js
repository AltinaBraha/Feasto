"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import eventOptions from "@/data/event-options.json";
import { useTranslations } from "next-intl";

const allowedCategories = {
  wedding: ["decoration", "menu"],
  celebration: ["decoration", "menu"],
  catering: ["decoration", "menu"],
};

export default function OptionsDisplay({
  guestInfo,
  selections,
  setSelections,
  eventType,
}) {
  const t = useTranslations("events.options");
  const tSidebar = useTranslations("events.sidebar.labels");
  const [selectedImage, setSelectedImage] = useState(null);
  const category = selections.activeCategory;

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
  }, [selectedImage]);

  if (!category || !allowedCategories[eventType]?.includes(category)) {
    return (
      <p className="text-gray-500 text-center italic mt-10">
        {t("selectCategory")}
      </p>
    );
  }

  const options = eventOptions[eventType]?.[category] || [];

  const handleSelect = (option) => {
    setSelections((prev) => ({
      ...prev,
      [category]: option,
    }));
  };

  let categoryLabel = category;
  try {
    const translated = tSidebar(category);
    if (typeof translated === "string") categoryLabel = translated;
  } catch {}

  return (
    <>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-orange-700 mb-6 capitalize text-center">
          {t("title", { category: categoryLabel })}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option) => {
            const isSelected = selections[category]?.id === option.id;
            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-orange-500 scale-105"
                    : "border-neutral-300"
                } hover:shadow-md bg-white`}
              >
                <div
                  className="relative w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(option.img);
                  }}
                >
                  <Image
                    src={option.img}
                    alt={option.title}
                    fill
                    className="object-cover hover:scale-105 transition"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {category === "menu"
                    ? t("pricePerGuest", { price: option.price.toFixed(2) })
                    : t("priceTotal", { price: option.price.toFixed(2) })}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%]">
            <div className="relative w-[800px] h-[500px]">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
