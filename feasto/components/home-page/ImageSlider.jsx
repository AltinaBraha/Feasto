"use client";

import { useState, useEffect } from "react";

const images = [
  "https://patiotime.loftocean.com/wp-content/uploads/2022/03/emanuel-ekstrom-3-4eMmRBXjA-unsplash.jpg",
  "https://patiotime.loftocean.com/wp-content/uploads/2022/03/louis-hansel-Sj8rgEu7jcM-unsplash.jpg",
  "https://patiotime.loftocean.com/wp-content/uploads/2022/03/louis-hansel-sQDTlaADDGM-unsplash.jpg",
  "https://patiotime.loftocean.com/wp-content/uploads/2022/04/mads-eneqvist-zqiE16q_Ju0-unsplash.jpg",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[800px] overflow-hidden bg-black">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat transform transition-all duration-[3000ms] ease-in-out
        ${
          index === currentIndex
            ? "opacity-100 scale-100 z-10"
            : "opacity-0 scale-105 z-0"
        }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${src})`,
          }}
        />
      ))}

      {/* Text over the slider */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4 space-y-4 translate-y-10">
        <h2 className="text-xl md:text-2xl tracking-wider">
          WELCOME TO FEASTO
        </h2>
        <h1 className="text-[40px] md:text-[80px] font-normal">
          Delicious Food & Wonderful Eating Experience
        </h1>
        <h3 className="text-[10px] md:text-[20px]">
          We Serve Food, Harmony & Laughter Since 1998
        </h3>
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white px-6 py-3 rounded shadow-lg">
          VIEW FULL MENUS
        </button>
      </div>
    </div>
  );
}
