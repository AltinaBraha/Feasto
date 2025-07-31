"use client";

import { PartyPopper, UtensilsCrossed, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EventTypeSelector({ setEventType }) {
  const t = useTranslations("events.typeSelector");

  const eventTypes = [
    {
      id: "wedding",
      title: t("wedding.title"),
      description: t("wedding.description"),
      icon: <Heart className="w-8 h-8 text-pink-500" />,
    },
    {
      id: "catering",
      title: t("catering.title"),
      description: t("catering.description"),
      icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" />,
    },
    {
      id: "celebration",
      title: t("celebration.title"),
      description: t("celebration.description"),
      icon: <PartyPopper className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="text-center space-y-8 px-4">
      <h2 className="text-3xl font-bold text-orange-700">{t("title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {eventTypes.map((event) => (
          <button
            key={event.id}
            onClick={() => setEventType(event.id)}
            className="bg-white border border-gray-200 hover:border-orange-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left flex flex-col items-start space-y-3"
          >
            <div className="flex items-center gap-3">
              {event.icon}
              <span className="text-xl font-semibold">{event.title}</span>
            </div>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
