"use client";

import { use } from "react";
import foodData from '../../data/food.json';
import Image from "next/image";
import { useState, useEffect } from "react";
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

  // Reviews Logic
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    rating: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${item.name}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [item.name]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${item.name}`, JSON.stringify(updatedReviews));
    setFormData({ name: "", email: "", content: "", rating: 0 });
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="text-black">
      {notification && (
        <div className="fixed top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      <div className="relative h-[480px] w-full mb-8">
        <Image
          src="/img/shop-bg-darken.jpg"
          alt="More Food Details"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Taste the Details
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 text-black">
        <div className="flex flex-col md:flex-row gap-20">
          {/* Image */}
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

          {/* Details */}
          <div className="md:w-1/2 flex flex-col space-y-4">
            <h1 className="text-4xl">{item.name}</h1>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
              <span className="text-gray-500 text-sm ml-2">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>

            <p className="text-2xl">${item.price}.00</p>

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
              <label htmlFor="quantity" className="font-semibold">
                Quantity
              </label>
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
              <p>
                Product total:{" "}
                <span className="font-semibold">${totalPrice}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
       <div className="max-w-4xl mt-16 border-t border-gray-300 pt-8 ml-0 pl-4">

          <h2 className="text-2xl font-semibold mb-6">
            Reviews ({reviews.length})
          </h2>

          {reviews.map((r, idx) => (
            <div key={idx} className="mb-6 border-b pb-4 border-gray-200">
              <p className="font-semibold">
                {r.name} –{" "}
                <span className="text-sm text-gray-500">{r.date}</span>
              </p>
              <div className="flex space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                ))}
              </div>
              <p className="mt-2 text-gray-700">{r.content}</p>
            </div>
          ))}

        <form onSubmit={handleReviewSubmit} className="space-y-6 w-full md:w-[10%] lg:w-[60%]">

            {/* Title */}
            <div>
              <h2 className="text-2xl font-semibold">Add a review</h2>
              <p className="text-gray-600">
                Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
              </p>
            </div>

            {/* First row: Name, Email*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-b border-gray-400 focus:outline-none focus:border-black p-2"
              />
              <input
                type="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-b border-gray-400 focus:outline-none focus:border-black p-2"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-1 font-medium text-gray-500">Your rating *</label>
              <div className="flex space-x-1 text-xl">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                    className={i < formData.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Review text */}
            <textarea
              required
              placeholder="Your review *"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="border-b border-gray-400 focus:outline-none focus:border-black p-0 w-full h-17 resize-none"
            ></textarea>

            {/* Submit */}
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
              Submit Review
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
