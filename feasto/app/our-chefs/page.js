"use client";

import { useState } from "react";
import chefs from "@/app/data/chefs.json";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import ReservationForm from "@/components/ReservationForm";

export default function MeetOurChefsPage() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="min-h-screen bg-white text-black">
      {/* HERO */}
      <div className="relative h-[75vh] mb-20">
        <img
          src="/img/chefs-hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold tracking-wide">
            MEET OUR CHEFS
          </h1>
        </div>
      </div>

      {/* EXECUTIVE CHEF */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full">
          <img
            src="/img/executive-chef.jpg"
            alt="Executive Chef"
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">
            Our Executive Chef
          </h3>
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
            Alexander Petillo
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Food is the foundation of true happiness. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit aenean commodo.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We see our customers as invited guests to a party, and we are the
            hosts. It’s our job every day to make every important aspect of the
            customer experience a little bit better. Donec quam felis, ultricies
            nec, pellentesque eu.
          </p>
          <div className="flex space-x-4 text-gray-800 text-xl mb-6">
            <FaTwitter className="hover:text-orange-600 cursor-pointer" />
            <FaFacebook className="hover:text-orange-600 cursor-pointer" />
            <FaInstagram className="hover:text-orange-600 cursor-pointer" />
            <FaYoutube className="hover:text-orange-600 cursor-pointer" />
            <FaPinterest className="hover:text-orange-600 cursor-pointer" />
          </div>
          <button className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition-all duration-300 text-sm font-semibold">
            Get in Touch
          </button>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="relative h-[400px] w-full mb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/quote-background.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center px-4 text-center text-white">
            <p className="max-w-4xl text-xl md:text-3xl font-light italic leading-relaxed">
              “A distinctive, well-preserved and comfortable space, high-quality
              products, authentic cuisine, food and drinks are done flawlessly.”
            </p>
            <p className="mt-6 text-lg font-semibold text-orange-400">
              Alexander Petillo
            </p>
          </div>
        </div>
      </section>

      {/* OTHER CHEFS */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-12">
          {chefs.others.map((chef) => (
            <div key={chef.name}>
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-[400px] object-cover mb-4"
              />
              <p className="text-orange-600 font-semibold uppercase text-sm mb-1">
                {chef.role}
              </p>
              <h3 className="text-xl font-bold mb-2">{chef.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{chef.bio}</p>
              <div className="flex gap-3 text-gray-700 text-xl">
                {chef.socials.map((icon, i) => (
                  <a key={i} href={icon.url} target="_blank" rel="noreferrer">
                    <i className={`fab fa-${icon.platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO THUMBNAIL */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div
          className="relative w-full h-[500px] overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setShowVideo(true)}
        >
          <img
            src="/img/chef-video-bg.jpg"
            alt="Chef video"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center transition hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/CoAvaYOwm6k?autoplay=1"
              title="Chef Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
