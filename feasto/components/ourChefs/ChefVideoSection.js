"use client";
import { useState } from "react";
import Image from "next/image";

export default function ChefVideoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div
          className="relative w-full h-[500px] overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setShowVideo(true)}
        >
          <Image
            src="/img/chef-video-bg.jpg"
            alt="Chef video"
            width={1200}
            height={500}
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
    </>
  );
}
