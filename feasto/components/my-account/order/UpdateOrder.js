import { useState, useMemo } from "react";

export default function EditableOrder({ order, menuItems, onSave, onCancel }) {
  const [items, setItems] = useState(order.items);

  function updateQty(itemId, newQty) {
    if (isNaN(newQty) || newQty < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, qty: newQty } : item))
    );
  }

  function removeItem(itemId) {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  function addItem(newItem) {
  console.log("Adding item:", newItem);
  const existing = items.find((i) => i.id === newItem.id);
  if (existing) {
    updateQty(newItem.id, existing.qty + 1);
  } else {
    setItems((prev) => {
      const newItems = [...prev, { ...newItem, qty: 1 }];
      console.log("New items list after add:", newItems);
      return newItems;
    });
  }
}



  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [items]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[85vh] overflow-auto p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-8 border-b border-gray-200 pb-3">
          Edit Order Items
        </h3>

        <ul className="mb-8 space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
              )}

              <div className="flex flex-col flex-grow min-w-0">
                <span className="text-gray-800 font-medium truncate">{item.name}</span>
                <span className="text-sm text-gray-500">${item.price.toFixed(2)}</span>
              </div>

              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                className="w-20 px-3 py-1 border border-gray-300 rounded-md text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
                title={`Remove ${item.name}`}
                className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="mb-10">
          <label htmlFor="addMeal" className="block text-gray-700 font-semibold mb-3">
            Add Meal
          </label>
          <select
        id="addMeal"
        onChange={(e) => {
            console.log("Dropdown changed, value:", e.target.value);
            const meal = menuItems.find((m) => m.id.toString() === e.target.value);
            if (meal) {
            console.log("Found meal:", meal);
            addItem(meal);
            } else {
            console.log("Meal not found for id:", e.target.value);
            }
            e.target.value = "";
        }}
        defaultValue=""
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
         <option value="" disabled>
              Select a meal
            </option>
            {menuItems.map((meal) => (
              <option key={meal.id} value={meal.id}>
                {meal.name} - ${meal.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="text-right mb-6 text-lg font-semibold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onSave(items)}
            className="inline-flex justify-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 text-white font-semibold rounded-md transition"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="inline-flex justify-center px-6 py-2 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 focus:ring-2 focus:ring-offset-2 text-gray-700 font-semibold rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
