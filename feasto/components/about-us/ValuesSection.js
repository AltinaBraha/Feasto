"use client";

import { useTranslations } from "next-intl";
import { Leaf, Star, Flame, Handshake, Recycle, Users } from "lucide-react";

const iconMap = {
  freshIngredients: <Leaf className="w-6 h-6 text-orange-500" />,
  guestSatisfaction: <Star className="w-6 h-6 text-orange-500" />,
  culinaryInnovation: <Flame className="w-6 h-6 text-orange-500" />,
  trustTransparency: <Handshake className="w-6 h-6 text-orange-500" />,
  sustainability: <Recycle className="w-6 h-6 text-orange-500" />,
  teamExcellence: <Users className="w-6 h-6 text-orange-500" />,
};

export default function ValuesSection() {
  const t = useTranslations("about-us.values");
  const keys = [
    "freshIngredients",
    "guestSatisfaction",
    "culinaryInnovation",
    "trustTransparency",
    "sustainability",
    "teamExcellence",
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide mb-2">
        {t("section")}
      </p>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10">
        {t("headline")}
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {keys.map((key) => (
          <div
            key={key}
            className="border border-orange-200 p-5 rounded-md shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="mb-3">{iconMap[key]}</div>
            <h3 className="text-md font-bold text-gray-900 mb-1">
              {t(`${key}.title`)}
            </h3>
            <p className="text-sm text-gray-600">{t(`${key}.desc`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
