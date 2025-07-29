"use client";
import { PartyPopper, UtensilsCrossed, Heart } from "lucide-react";

const eventTypes = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Elegant venue, full experience, customizable setup.",
    icon: <Heart className="w-8 h-8 text-pink-500" />,
  },
  {
    id: "catering",
    title: "Catering",
    description: "We bring the menu to your location.",
    icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" />,
  },
  {
    id: "celebration",
    title: "Private Celebration",
    description: "Birthdays, graduations, or any private event.",
    icon: <PartyPopper className="w-8 h-8 text-purple-500" />,
  },
];

export default function EventTypeSelector({ setEventType }) {
  return (
    <div className="text-center space-y-8 px-4">
      <h2 className="text-3xl font-bold text-orange-700">Select Event Type</h2>
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
