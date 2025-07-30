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

export default function AccountBanner({ title = "Welcome" }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <section className="relative h-[75vh] w-full mb-0">
      <Image
        src="/img/photo1.jpg"
        alt="Background photo"
        fill
        priority
        className="absolute inset-0 object-cover brightness-[0.5]"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 max-w-5xl mx-auto text-center text-white">
        <h1 className="uppercase tracking-widest font-serif text-5xl mb-4 flex items-center space-x-6">
          <span className="block w-12 border-b-2 border-white"></span>
          <span>{title}</span>
          <span className="block w-12 border-b-2 border-white"></span>
        </h1>
{/* 
        <h1 className="text-5xl font-serif font-semibold tracking-wide mb-6">
          Hello, {user?.displayName || "User"}
        </h1> */}

        <p className="text-lg italic max-w-2xl opacity-80 font-light leading-relaxed">
          “{quote}”
        </p>
      </div>
    </section>
  );
}
