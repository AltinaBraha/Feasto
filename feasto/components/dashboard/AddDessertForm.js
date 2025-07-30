"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function AddDessertForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    subCategory: "",
    rating: "",
    ingredients: "",
  });
  const handleImageUpload = async (file) => {
  const storage = getStorage();
  const imageRef = ref(storage, `desserts/${file.name}`);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  setFormData((prev) => ({ ...prev, image: url }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newDessert = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      };

      await addDoc(collection(db, "Desserts"), newDessert);
      toast.success("Dessert added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        subCategory: "",
        category:"",
        rating: "",
        ingredients: "",
      });

      onSuccess?.(); 
    } catch (err) {
      console.error("Failed to add dessert:", err);
      toast.error("Failed to add dessert.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-3 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
        Add New Dessert
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", type: "text" },
          { name: "description", type: "text" },
          { name: "price", type: "number" },
          { name: "image", type: "text" },
          { name: "subCategory", type: "text" },
           { name: "category", type: "text" },
          { name: "rating", type: "number" },
          { name: "ingredients", type: "text" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.name}
            required
            value={formData[field.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field.name]: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
        >
          Add Dessert
        </button>
      </form>
    </div>
  );
}
