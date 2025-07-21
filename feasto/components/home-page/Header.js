"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById("reservation-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="absolute left-0 w-full z-50 bg-transparent text-white">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between px-20 py-3 mt-2 bg-transparent text-base border-b border-gray-600">
        <div>123 Main Street, City</div>
        <div className="flex space-x-10">
          <div>+1 234 567 890</div>
          <div>contact@feasto.com</div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-4">
        <div className="relative w-32 h-12 cursor-pointer">
          <Image
            src="/img/logo.png"
            alt="Feasto Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-20 font-medium pl-[35%]">
          <Link href="/">
            <li className="relative cursor-pointer text-xs tracking-wide font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
              HOME
            </li>
          </Link>

          <li className="relative group cursor-pointer text-xs font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            MENUS <span className="ml-1 text-[8px]">&#x25BC;</span>
            <ul className="absolute left-0 top-full w-44 bg-black bg-opacity-90 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href="/menus/food">Food</Link>
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href="/menus/drinks">Drinks</Link>
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href="/menus/desserts">Desserts</Link>
              </li>
            </ul>
          </li>

          <li className="relative group cursor-pointer text-xs font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            ABOUT US <span className="ml-1 text-[8px]">&#x25BC;</span>
            <ul className="absolute left-0 top-full w-44 bg-black bg-opacity-90 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href="/about-us">Our Story</Link>
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href="/our-chefs">Our Chefs</Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-orange-600 cursor-pointer"
                onClick={handleScroll}
              >
                Contact Us
              </li>
            </ul>
          </li>

          <li className="relative group cursor-pointer text-xs font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            GUESTBOOK <span className="ml-1 text-[8px]">&#x25BC;</span>
            <ul className="absolute left-0 top-full mt-2 w-44 bg-black bg-opacity-90 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                Leave a Review
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                What Our Guests Say
              </li>
            </ul>
          </li>
        </ul>

        <button
          onClick={handleScroll}
          className="hidden md:block border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition"
        >
          Find a Table
        </button>

        <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 px-6 py-6 text-sm space-y-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>
                HOME
              </Link>
            </li>
            <li className="group">
              <span className="block">MENUS</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <Link href="/menus/food" onClick={() => setIsOpen(false)}>
                    Food
                  </Link>
                </li>
                <li>
                  <Link href="/menus/drinks" onClick={() => setIsOpen(false)}>
                    Drinks
                  </Link>
                </li>
                <li>
                  <Link href="/menus/desserts" onClick={() => setIsOpen(false)}>
                    Desserts
                  </Link>
                </li>
              </ul>
            </li>
            <li className="group">
              <span className="block">ABOUT US</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <Link href="/about-us" onClick={() => setIsOpen(false)}>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/our-chefs" onClick={() => setIsOpen(false)}>
                    Our Chefs
                  </Link>
                </li>
                <li>
                  <button onClick={handleScroll}>Contact Us</button>
                </li>
              </ul>
            </li>
            <li className="group">
              <span className="block">GUESTBOOK</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>Leave a Review</li>
                <li>What Our Guests Say</li>
              </ul>
            </li>
            <li className="pt-4">
              <button
                onClick={handleScroll}
                className="w-full border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition"
              >
                Find a Table
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
