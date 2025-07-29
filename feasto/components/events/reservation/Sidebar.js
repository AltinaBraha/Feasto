"use client";

export default function Sidebar({ eventType, selections, setSelections }) {
  const allCategories = {
    wedding: ["decoration", "menu"],
    celebration: ["decoration", "menu"],
    catering: ["decoration", "menu"],
  };

  const labels = {
    decoration: "Decoration",
    menu: "Menu",
  };

  const allowedCategories = allCategories[eventType] || [];

  const handleClick = (categoryId) => {
    setSelections((prev) => ({
      ...prev,
      activeCategory: categoryId,
    }));
  };

  if (!allowedCategories.length) {
    return (
      <aside className="w-full md:w-64 bg-white border-r px-4 py-6">
        <p className="text-gray-500 text-center">
          No categories available for this event.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-64 bg-white  px-4 py-8 shadow-md">
      <h2 className="text-xl font-bold text-orange-700 mb-6 text-center">
        Categories
      </h2>
      <ul className="space-y-3">
        {allowedCategories.map((cat) => {
          const isActive = selections.activeCategory === cat;
          return (
            <li key={cat}>
              <button
                onClick={() => handleClick(cat)}
                className={`w-full text-left px-5 py-3 rounded-lg font-medium capitalize transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-100 text-orange-600 border border-orange-400"
                    : "hover:bg-gray-50 text-gray-800"
                }`}
              >
                {labels[cat] || cat}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
