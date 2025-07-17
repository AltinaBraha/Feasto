"use client";

import { useState } from "react";
import foodMenu from "../data/food.json";

export default function OurMenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Nxjerrim kategoritë unike nga foodMenu dhe shtojmë "All" në fillim
  const categories = ["All", ...Array.from(new Set(foodMenu.map(item => item.category)))];

  // Filtrimi i menu-së sipas kategorisë aktive
  const filteredMenu =
    activeCategory === "All"
      ? foodMenu
      : foodMenu.filter((item) => item.category === activeCategory);

  return (
    <section className="min-h-screen bg-white text-black">
      {/* HERO */}
      <div className="relative h-[75vh] mb-20">
        <img
          src="/img/chefs-hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold tracking-wide">
            OUR MENU
          </h1>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex space-x-6 mb-12 font-bold uppercase text-sm tracking-wide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`border-b-2 pb-1 ${
              activeCategory === cat
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-gray-600 hover:text-orange-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 px-8 md:px-16 lg:px-24">

        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 border-b border-gray-200 pb-6"
          >
            {/* Image round */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />

            {/* Text content */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
              </div>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>

            {/* Dotted line + price + plus */}
            <div className="flex items-center space-x-4 min-w-[110px] justify-end">
              {/* Dotted line simulation */}
              <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
              <span className="font-bold whitespace-nowrap">${item.price.toFixed(2)}</span>

              {/* Plus button */}
              <button
                aria-label={`Add ${item.name} to cart`}
                className="ml-4 text-orange-600 border border-orange-600 rounded px-2 text-lg font-bold hover:bg-orange-600 hover:text-white transition"
                disabled={!item.available}
                title={item.available ? "Add to cart" : "Not available"}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
