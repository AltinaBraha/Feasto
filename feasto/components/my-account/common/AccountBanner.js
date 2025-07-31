"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function AccountBanner({ title }) {
  const t = useTranslations("AccountBanner");
  const quotes = t.raw("quotes");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, [quotes]);

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
          <span>{title || t("title")}</span>
          <span className="block w-12 border-b-2 border-white"></span>
        </h1>

        <p className="text-lg italic max-w-2xl opacity-80 font-light leading-relaxed">
          “{quote}”
        </p>
      </div>
    </section>
  );
}
