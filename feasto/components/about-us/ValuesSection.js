"use client";

import { Leaf, Star, Flame, Handshake, Recycle, Users } from "lucide-react";

const values = [
  {
    icon: <Leaf className="w-6 h-6 text-orange-500" />,
    title: "Fresh Ingredients",
    desc: "We prioritize quality by using fresh, local ingredients in every dish.",
  },
  {
    icon: <Star className="w-6 h-6 text-orange-500" />,
    title: "Guest Satisfaction",
    desc: "Every dish and every moment is crafted to exceed expectations.",
  },
  {
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    title: "Culinary Innovation",
    desc: "We create unique flavor experiences blending tradition and creativity.",
  },
  {
    icon: <Handshake className="w-6 h-6 text-orange-500" />,
    title: "Trust & Transparency",
    desc: "We believe in honest service and transparent communication.",
  },
  {
    icon: <Recycle className="w-6 h-6 text-orange-500" />,
    title: "Sustainable Practices",
    desc: "Our kitchen follows eco-conscious methods and minimizes waste.",
  },
  {
    icon: <Users className="w-6 h-6 text-orange-500" />,
    title: "Team Excellence",
    desc: "Our team is our soul — skilled, passionate, and dedicated to hospitality.",
  },
];

export default function ValuesSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide mb-2">
        Our Values
      </p>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10">
        Built on Integrity and Hospitality
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {values.map((item, index) => (
          <div
            key={index}
            className="border border-orange-200 p-5 rounded-md shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="text-md font-bold text-gray-900 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
