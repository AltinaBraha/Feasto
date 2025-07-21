"use client";
import { useEffect, useState } from "react";

const stats = [
  { label: "Chefs", value: 25 },
  { label: "Happy Guests", value: 4500 },
  { label: "Average Rating", value: 4.9 },
];

export default function AnimatedStats() {
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
              {stat.label === "Average Rating" && "★"}
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
