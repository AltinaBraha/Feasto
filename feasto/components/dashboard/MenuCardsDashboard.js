"use client";

import { useEffect, useState } from "react";
import foodMenu from "@/data/food.json";
import drinkMenu from "@/data/drinks.json";
import Modal from "@/components/dashboard/Modal";
import Image from "next/image";
import { fetchDesserts, deleteDessert, updateDessert  } from "@/lib/firebase/fetchDesserts";
import { FaEdit, FaTrash } from "react-icons/fa";

function Card({ item, onDelete, onEdit, showActions }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl relative">
      <div className="relative h-48 w-full">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          {showActions && (
            <div className="flex space-x-2">
              <button onClick={() => onEdit(item)}>
                <FaEdit className="text-gray-600 hover:text-gray-800" />
              </button>
              <button onClick={() => onDelete(item.id)}>
                <FaTrash className="text-orange-600 hover:text-orange-800" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        <p className="text-sm text-gray-500 mt-2 italic">
          Ingredients: {item.ingredients?.join(", ")}
        </p>
      
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-orange-600 text-lg">
            ${item.price?.toFixed(2)}
          </span>
          <span className="text-sm bg-orange-100 text-orange-700 rounded px-2 py-0.5">
            {item.subCategory}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MenuCardsDashboard({ filter, currentPage, itemsPerPage, desserts }) {
  const [editItem, setEditItem] = useState(null);
  const [allDesserts, setAllDesserts] = useState([]);

  useEffect(() => {
    if (filter === "menu-desserts") fetchDesserts().then(setAllDesserts);
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await deleteDessert(id);
      setAllDesserts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleSaveEdit = async () => {
    try {
      await updateDessert(editItem.id, editItem);
      setAllDesserts((prev) =>
        prev.map((item) => (item.id === editItem.id ? editItem : item))
      );
      setEditItem(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const allData =
    filter === "menu-food"
      ? foodMenu
      : filter === "menu-drinks"
      ? drinkMenu
      : filter === "menu-desserts"
      ? allDesserts
      : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = allData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedData.map((item) => (
          <Card
            key={item.id + item.name}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showActions={filter === "menu-desserts"}
          />
        ))}
      </div>

      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <h2 className="text-xl font-bold mb-4">Edit Dessert</h2>
          <div className="space-y-2">
            <input
              className="w-full p-2 border rounded"
              value={editItem.name || ""}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              placeholder="Name"
            />
            <input
              className="w-full p-2 border rounded"
              value={editItem.description || ""}
              onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              placeholder="Description"
            />
            <input
              className="w-full p-2 border rounded"
              type="number"
              value={editItem.price || 0}
              onChange={(e) =>
                setEditItem({ ...editItem, price: parseFloat(e.target.value) })
              }
              placeholder="Price"
            />
            <input
              className="w-full p-2 border rounded"
              value={editItem.image || ""}
              onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
              placeholder="Image URL"
            />
            <input
              className="w-full p-2 border rounded"
              value={editItem.subCategory || ""}
              onChange={(e) => setEditItem({ ...editItem, subCategory: e.target.value })}
              placeholder="Subcategory"
            />
            <input
              className="w-full p-2 border rounded"
              value={editItem.rating || 0}
              onChange={(e) =>
                setEditItem({ ...editItem, rating: parseFloat(e.target.value) })
              }
              placeholder="Rating"
            />
            <input
              className="w-full p-2 border rounded"
              value={editItem.ingredients?.join(", ") || ""}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  ingredients: e.target.value.split(",").map((ing) => ing.trim()),
                })
              }
              placeholder="Ingredients (comma-separated)"
            />
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
