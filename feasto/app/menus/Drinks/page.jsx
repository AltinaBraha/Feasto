"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import drinksMenu from "../data/drinks.json";

export default function DrinksPage() {
  const [activeSubcategory, setActiveSubcategory] = useState("All Drinks");
  const [notification, setNotification] = useState(null);
  const { addToCart } = useCart();

  const subcategories = ["All Drinks", "Cocktail", "Coffee", "Wine", "Milkshake"];

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
    showNotification(`"${item.name}" added !`);
  };

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen relative">
      {/* Notification */}
      {notification && (
        <div className="fixed top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      <section className="min-h-screen text-black">
        <div className="relative h-[105vh] mb-20">
          <img
            src="/img/MenusFood/drinks.jpg"
            alt="Drinks Hero"
            className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
            <h2 className="text-white text-xl uppercase tracking-widest font-serif flex items-center space-x-6">
              <span className="block w-12 border-b-2 border-white-600"></span>
              <span>refresh & relax</span>
              <span className="block w-12 border-b-2 border-white-600"></span>
            </h2>
            <h1 className="text-white text-7xl font-serif tracking-wide font-sans">
              DRINKS MENU
            </h1>
            <p className="text-white text-lg uppercase tracking-wide">
              Daily, 12pm–11pm
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-10 mb-12">
          <a
            href="/menus/food"
            className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide"
          >
            Food
          </a>
          <button
            className="border-b-2 pb-1 border-orange-600 text-orange-600 font-bold uppercase text-sm tracking-wide cursor-default"
            disabled
          >
            Drinks
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => setActiveSubcategory(subcat)}
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

        {activeSubcategory !== "All Drinks" ? (
          <div className="px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-bold mb-8 border-b pb-2 border-orange-600 uppercase">
              {activeSubcategory}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20">
              {filteredMenu.map((item) => (
                <MenuItem key={item.id} item={item} onAdd={() => handleAddToCart(item)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10 px-8 md:px-16 lg:px-24">
            {groupedBySubcategory.map((group) => (
              <div key={group.name} className="mb-16">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-orange-600 uppercase">
                  {group.name}
                </h2>
                <div className="space-y-8">
                  {group.items.map((item) => (
                    <MenuItem key={item.id} item={item} onAdd={() => handleAddToCart(item)} />
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
    <div className="flex items-center space-x-6 border-b border-gray-200 pb-6">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-500 text-sm">{item.ingredients.join(", ")}</p>
      </div>
      <div className="flex items-center space-x-4 min-w-[110px] justify-end">
        <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
        <span className="font-bold whitespace-nowrap">${item.price.toFixed(2)}</span>
        <button
          onClick={onAdd}
          aria-label={`Add ${item.name} to cart`}
          className="ml-4 text-orange-600 border border-orange-600 rounded px-2 text-lg font-bold hover:bg-orange-600 hover:text-white transition"
          disabled={!item.available}
          title={item.available ? "Add to cart" : "Not available"}
        >
          +
        </button>
      </div>
    </div>
  );
}
