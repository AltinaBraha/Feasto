"use client";

import TypewriterParagraph from "@/components/TypewriterParagraph";

export default function AboutUsClientWrapper() {
  const paragraph =
    "Feasto is a contemporary restaurant established in June 2025, dedicated to delivering a unique dining experience for all food lovers. Our space blends comfort and elegance, offering a warm ambiance ideal for family lunches, romantic dinners, or special events.";

  return (
    <div className="mt-14 px-4 sm:px-6 py-4 rounded-md max-w-6xl mx-auto mb-6">
      <TypewriterParagraph text={paragraph} />
      <div className="mt-8"></div>
    </div>
  );
}
