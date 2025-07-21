"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import drinksMenu from "../data/drinks.json";
import Link from "next/link";
import Image from "next/image";

export default function DrinksPage() {
  const [activeSubcategory, setActiveSubcategory] = useState("All Drinks");
  const [notification, setNotification] = useState(null);
  const { addToCart } = useCart();
  const [sortOptionsByCategory, setSortOptionsByCategory] = useState({});

  const subcategories = [
    "All Drinks",
    "Cocktail",
    "Coffee",
    "Wine",
    "Milkshake",
  ];

  const filteredMenu = drinksMenu.filter((item) => {
    if (!activeSubcategory || activeSubcategory === "All Drinks") return true;
    return item.subcategory === activeSubcategory;
  });

  const groupedBySubcategory = subcategories
    .filter((subcategory) => subcategory !== "All Drinks")
    .map((subcategory) => ({
      name: subcategory,
      items: drinksMenu.filter((item) => item.subcategory === subcategory),
    }));

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, qty: 1 });
    showNotification(`"${item.name}" added!`);
  };

  const handleSortChangeForCategory = (categoryName, option) => {
    setSortOptionsByCategory((prev) => ({
      ...prev,
      [categoryName]: option,
    }));
  };

  const sortItemsByCategory = (items, categoryName) => {
    const option = sortOptionsByCategory[categoryName] || "default";
    let sortedItems = [...items];
    if (option === "priceLowToHigh") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (option === "priceHighToLow") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (option === "ratingHighToLow") {
      sortedItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return sortedItems;
  };

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen relative">
      {notification && (
        <div className="fixed top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50 text-sm sm:text-base">
          {notification}
        </div>
      )}

      <section className="min-h-screen text-black">
        <div className="relative h-[90vh] sm:h-[105vh] mb-20">
          <Image
            src="/img/MenusFood/drinks.jpg"
            alt="Drinks Hero"
            fill
            className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
          />

          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
            <h2 className="text-white text-base sm:text-xl uppercase tracking-widest font-serif flex items-center space-x-6">
              <span className="block w-10 sm:w-12 border-b-2 border-white-600"></span>
              <span>refresh & relax</span>
              <span className="block w-10 sm:w-12 border-b-2 border-white-600"></span>
            </h2>
            <h1 className="text-white text-4xl sm:text-7xl font-serif tracking-wide font-sans">
              DRINKS MENU
            </h1>
            <p className="text-white text-sm sm:text-lg uppercase tracking-wide">
              Daily, 12pm–11pm
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:space-x-10 mb-10 sm:mb-12 px-4">
          <Link
            href="/menus/food"
            className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-xs sm:text-sm tracking-wide"
          >
            Food
          </Link>
          <button
            className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-xs sm:text-sm tracking-wide cursor-default"
            disabled
          >
            Drinks
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:space-x-4 mb-12 px-4">
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => setActiveSubcategory(subcat)}
              className={`uppercase text-xs sm:text-sm font-semibold tracking-wide px-2 py-1 sm:px-0 sm:py-0 ${
                activeSubcategory === subcat
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>

        {activeSubcategory !== "All Drinks" ? (
          <div className="px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 border-orange-600 uppercase">
                {activeSubcategory}
              </h2>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    handleSortChangeForCategory(
                      activeSubcategory,
                      "priceLowToHigh"
                    )
                  }
                  className="text-xs sm:text-sm text-gray-600 hover:text-orange-600"
                >
                  Price ↑
                </button>
                <button
                  onClick={() =>
                    handleSortChangeForCategory(
                      activeSubcategory,
                      "priceHighToLow"
                    )
                  }
                  className="text-xs sm:text-sm text-gray-600 hover:text-orange-600"
                >
                  Price ↓
                </button>
                <button
                  onClick={() =>
                    handleSortChangeForCategory(
                      activeSubcategory,
                      "ratingHighToLow"
                    )
                  }
                  className="text-xs sm:text-sm text-gray-600 hover:text-orange-600"
                >
                  Rating
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 sm:gap-x-20">
              {sortItemsByCategory(filteredMenu, activeSubcategory).map(
                (item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAdd={() => handleAddToCart(item)}
                  />
                )
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 sm:gap-x-24 gap-y-10 px-4 sm:px-8 md:px-16 lg:px-24">
            {groupedBySubcategory.map((group) => (
              <div key={group.name} className="mb-16">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b pb-2 border-orange-600 uppercase">
                    {group.name}
                  </h2>
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        handleSortChangeForCategory(
                          group.name,
                          "priceLowToHigh"
                        )
                      }
                      className="text-xs text-gray-500 hover:text-orange-600"
                    >
                      Sort by Price ↑
                    </button>
                    <button
                      onClick={() =>
                        handleSortChangeForCategory(
                          group.name,
                          "priceHighToLow"
                        )
                      }
                      className="text-xs text-gray-500 hover:text-orange-600"
                    >
                      Sort by Price ↓
                    </button>
                    <button
                      onClick={() =>
                        handleSortChangeForCategory(
                          group.name,
                          "ratingHighToLow"
                        )
                      }
                      className="text-xs text-gray-500 hover:text-orange-600"
                    >
                      Sort by Rating
                    </button>
                  </div>
                </div>
                <div className="space-y-8">
                  {sortItemsByCategory(group.items, group.name).map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onAdd={() => handleAddToCart(item)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function MenuItem({ item, onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-6">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover self-center"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-500 text-sm">{item.ingredients.join(", ")}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 min-w-[110px] justify-end">
        <div className="hidden sm:block flex-grow border-b border-dotted border-gray-400 mx-2"></div>
        <span className="font-bold whitespace-nowrap mb-2 sm:mb-0">
          ${item.price.toFixed(2)}
        </span>
        <button
          onClick={onAdd}
          aria-label={`Add ${item.name} to cart`}
          className="text-orange-600 border border-orange-600 rounded px-3 py-1 text-sm font-bold hover:bg-orange-600 hover:text-white transition"
          disabled={!item.available}
          title={item.available ? "Add to cart" : "Not available"}
        >
          +
        </button>
      </div>
    </div>
  );
}
