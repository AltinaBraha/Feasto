"use client";

import { use } from "react";
import foodData from '../../data/food.json';
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { notFound } from "next/navigation";

const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function FoodItemPage({ params }) {
   const { foodItem } = use(params);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);
 

  const item = foodData.find((f) => slugify(f.name) === foodItem);

  if (!item) return notFound();

  const totalPrice = (item.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart({ ...item, qty: quantity });
    setNotification(`"${item.name}" added to cart!`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="text-black">
      {notification && (
        <div className="fixed top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* STATIC background image with heading */}
      <div className="relative h-[480px] w-full mb-8">
        <Image
          src="/img/shop-bg-darken.jpg"
          alt="More Food Details"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Taste the Details
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 text-black">
        <div className="flex flex-col md:flex-row gap-20">
          {/* Left: Food Image with hover zoom effect */}
          <div className="md:w-1/2">
            <div className="overflow-hidden rounded-lg w-[500px] h-[450px] group">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={350}
                quality={100}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110 brightness-75"
              />
            </div>
          </div>

          {/* Right: Food Details */}
          <div className="md:w-1/2 flex flex-col space-y-4">
            <h1 className="text-4xl">{item.name}</h1>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
              <span className="text-gray-500 text-sm ml-2">(1 review)</span>
            </div>

            <p className="text-2xl ">${item.price}.00</p>

            {item.ingredients && (
              <div>
                <h3 className="font-semibold mb-1">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {item.ingredients.map((ing, index) => (
                    <li key={index}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-gray-700">{item.description}</p>

            <div className="mt-4 flex items-center space-x-4">
              <label htmlFor="quantity" className="font-semibold">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded px-2 py-1"
              />
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Add to cart
              </button>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <p>Product total: <span className="font-semibold">${totalPrice}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
