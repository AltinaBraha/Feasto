"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";
import foodMenu from "../data/food.json";
import { toast } from "react-toastify";

export default function OurMenuPage() {
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState("All Food");
  const { addToCart,cart } = useCart();
  
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [sortOptionsByCategory, setSortOptionsByCategory] = useState({});

  const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  const subcategories = ["All Food", "Starters", "Pizza", "Sides",  "Pasta"];

  const filteredMenu = foodMenu.filter((item) => {
    if (!activeSubcategory || activeSubcategory === "All Food") return true;
    return item.subcategory === activeSubcategory;
  });
  const groupedBySubcategory = subcategories
    .filter((subcategory) => subcategory !== "All Food")
    .map((subcategory) => ({
      name: subcategory,
      items: foodMenu.filter((item) => item.subcategory === subcategory),
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
        <div className="fixed top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
      <section className="min-h-screen text-black">
        <div className="relative h-[105vh] mb-20">
          <img
            src="/img/MenusFood/menu.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
            <h2 className="text-white text-xl uppercase tracking-widest font-serif flex items-center space-x-6">
              <span className="block w-12 border-b-2 border-white-600"></span>
              <span>delicious & healthy</span>
              <span className="block w-12 border-b-2 border-white-600"></span>
            </h2>
            <h1 className="text-white text-7xl font-serif tracking-wide font-sans">
              OUR MENU
            </h1>
            <p className="text-white text-lg uppercase tracking-wide">
              Tuesday–Sunday, 12pm–8pm
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mb-12">
          <div className="flex justify-center space-x-10 mb-12">
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
          {showSubcategories && (
            <div className="flex space-x-4 mt-4">
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
        </div>
        {activeSubcategory && activeSubcategory !== "All Food" ? (
          <div className="px-8 md:px-16 lg:px-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold border-b pb-2 border-orange-600 uppercase">
                {activeSubcategory}
              </h2>
              <div className="space-x-2">
                <button
                  onClick={() => handleSortChangeForCategory(activeSubcategory, "priceLowToHigh")}
                  className="text-sm text-gray-600 hover:text-orange-600"
                >
                  Sort by Price ↑
                </button>
                <button
                  onClick={() => handleSortChangeForCategory(activeSubcategory, "priceHighToLow")}
                  className="text-sm text-gray-600 hover:text-orange-600"
                >
                 Sort by Price ↓
                </button>
                <button
                  onClick={() => handleSortChangeForCategory(activeSubcategory, "ratingHighToLow")}
                  className="text-sm text-gray-600 hover:text-orange-600"
                >
                  Sort by Rating 
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20">
              {sortItemsByCategory(filteredMenu, activeSubcategory).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-6 border-b border-gray-200 pb-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <Link href={`/menus/food/${slugify(item.name)}`} className="font-semibold text-lg hover:text-orange-600 transition">
                      {item.name}
                    </Link>

                    <p className="text-gray-500 text-sm">
                      {item.ingredients.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 min-w-[110px] justify-end">
                    <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
                    <span className="font-bold whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10 px-8 md:px-16 lg:px-24">
            {groupedBySubcategory.map((group) => (
              <div key={group.name} className="mb-16">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold border-b pb-2 border-orange-600 uppercase">
                    {group.name}
                  </h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleSortChangeForCategory(group.name, "priceLowToHigh")}
                      className="text-xs text-gray-500 hover:text-orange-600"
                    >
                      Sort by Price ↑
                    </button>
                    <button
                      onClick={() => handleSortChangeForCategory(group.name, "priceHighToLow")}
                      className="text-xs text-gray-500 hover:text-orange-600"
                    >
                      Sort by Price ↓
                    </button>
                    <button
                      onClick={() => handleSortChangeForCategory(group.name, "ratingHighToLow")}
                      className="text-xs text-gray-500 hover:text-orange-600"
                    >
                      Sort by Rating 
                    </button>
                  </div>
                </div>
                <div className="space-y-8">
                  {sortItemsByCategory(group.items, group.name).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-6 border-b border-gray-200 pb-6"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <Link href={`/menus/food/${slugify(item.name)}`} className="font-semibold text-lg hover:text-orange-600 transition">
                          {item.name}
                        </Link>

                        <p className="text-gray-500 text-sm">
                          {item.ingredients.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 min-w-[110px] justify-end">
                        <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
                        <span className="font-bold whitespace-nowrap">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(item)}
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
              </div>
            ))}
          </div>
        )}
      </section>
      {cart.length > 0 && (
  <button
    onClick={() => router.push("/shop")}
    className="fixed bottom-6 right-6 bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 transition z-50"
  >
    🛒 See My Cart ({cart.length})
  </button>
)}

    </main>
  );
}

