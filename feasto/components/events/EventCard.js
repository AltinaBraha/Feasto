"use client";

import Image from "next/image";

export default function EventCard({ id, title, description, image, reverse }) {
  return (
    <div
      id={id}
      className={`flex flex-col lg:flex-row ${
        reverse ? "lg:flex-row-reverse" : ""
      } items-center justify-between gap-2`}
    >
      <div className="w-full lg:w-1/2 max-w-[600px]">
        <div className="relative w-full aspect-[16/9] rounded-sm shadow-md">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute bottom-[-10px] left-4 w-[90%] h-[2px] bg-[#e4d7cb]" />
        </div>
      </div>
      <div className="w-full lg:w-1/2 max-w-[600px] text-center">
        <h3 className="text-lg md:text-xl font-bold tracking-widest uppercase text-[#dd5903] mb-4">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
          {description}
        </p>
        <div className="flex flex-col items-center gap-2">
          <a
            href="#"
            className="text-[#dd5903] text-sm font-semibold tracking-wide uppercase hover:underline"
          >
            Learn More »
          </a>
          <div className="h-[1px] w-24 bg-[#e4d7cb]" />
        </div>
      </div>
    </div>
  );
}
