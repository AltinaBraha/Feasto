"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function AnimatedStats() {
  const t = useTranslations("about-us.stats");

  const stats = [
    { label: t("chefs"), value: 25 },
    { label: t("happyGuests"), value: 4500 },
    { label: t("averageRating"), value: 4.9 },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      const increment = stat.value / 50;
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[i] < stat.value) {
            updated[i] = Math.min(updated[i] + increment, stat.value);
          }
          return updated;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <h2 className="text-4xl font-bold text-orange-600">
              {Math.round(counts[i])}
              {stat.label === t("averageRating") && "★"}
            </h2>
            <p className="text-gray-700 mt-2 text-sm uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
