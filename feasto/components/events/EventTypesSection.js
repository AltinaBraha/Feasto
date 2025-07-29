"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import SearchEvents from "@/components/events/SearchEvents";

export default function EventTypesSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 md:px-36 space-y-16">
      <SearchEvents onMatch={scrollToSection} />

      {events.map(({ title, description, image, reverse }, idx) => (
        <EventCard
          key={idx}
          id={title.toLowerCase().replace(/\s+/g, "-")}
          title={title}
          description={description}
          image={image}
          reverse={reverse}
        />
      ))}
    </section>
  );
}
