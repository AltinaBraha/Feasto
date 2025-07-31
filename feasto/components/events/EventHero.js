"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EventsHero() {
  const t = useTranslations("events.hero");

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white text-center">
      <Image
        src="/img/event-bg.jpg"
        alt="Events Hero"
        fill
        priority
        className="z-0 object-cover object-center"
      />
      <div className="z-10 bg-black/50 w-full h-full absolute top-0 left-0" />
      <div className="z-20 relative px-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide uppercase">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl tracking-widest font-medium uppercase">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
