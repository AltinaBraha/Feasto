"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const quotes = [
  "Good food is the foundation of genuine happiness.",
  "Where every meal is a celebration of flavor and togetherness.",
  "Savor the moment — your next favorite dish awaits.",
  "Bringing people together, one delicious bite at a time.",
  "Taste the passion in every dish we serve.",
  "Welcome back! Ready to delight your senses today?",
  "Fresh ingredients, warm smiles, unforgettable meals.",
  "Food is our common ground, a universal experience.",
];

export default function AccountBanner({ user }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="relative w-full h-140">
      <Image
        src="/img/photo1.jpg"
        alt="Background photo"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome, {user.displayName || "User"}</h1>
        <p className="mt-6 text-lg italic opacity-90 max-w-xl mx-auto">{quote}</p>
      </div>
    </div>
  );
}
