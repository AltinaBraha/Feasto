"use client";
import Image from "next/image";
import eventOptions from "@/data/event-options.json";

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
  const category = selections.activeCategory;

  if (!category || !allowedCategories[eventType]?.includes(category)) {
    return (
      <p className="text-gray-500 text-center italic mt-10">
        Select a valid category to begin.
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

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-3xl font-bold text-orange-700 mb-6 capitalize text-center">
        {category} Options
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
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={option.img}
                  alt={option.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {option.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {category === "menu"
                  ? `€${option.price} per guest`
                  : `€${option.price} total`}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
