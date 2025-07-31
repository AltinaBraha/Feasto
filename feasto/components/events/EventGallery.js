"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const galleryImages = [
  "/img/gallery1.jpg",
  "/img/gallery2.jpg",
  "/img/gallery3.jpg",
  "/img/gallery4.jpg",
  "/img/gallery5.jpg",
  "/img/gallery6.jpg",
  "/img/gallery7.jpg",
  "/img/gallery8.jpg",
  "/img/gallery9.jpg",
  "/img/gallery10.jpg",
  "/img/gallery11.jpg",
  "/img/gallery12.jpg",
  "/img/gallery13.jpg",
  "/img/gallery14.jpg",
  "/img/gallery15.jpg",
];

export default function EventGallery() {
  const t = useTranslations("events.gallery");

  return (
    <section className="py-24 px-6 md:px-20">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-[#dd5903] text-2xl md:text-3xl font-semibold tracking-widest uppercase mb-4">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {galleryImages.map((src, i) => (
          <div key={i} className="relative aspect-square w-full shadow-md">
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover rounded-sm"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
