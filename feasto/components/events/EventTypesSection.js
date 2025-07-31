"use client";

import { useState } from "react";
import EventCard from "@/components/events/EventCard";
import SearchEvents from "@/components/events/SearchEvents";
import events from "@/data/events.json";

export default function EventTypesSection() {
  const [filteredEvents] = useState(events);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 md:px-36 space-y-16">
      <SearchEvents onMatch={scrollToSection} />

      {filteredEvents.map((event) => (
        <EventCard
          key={event.type}
          id={event.type}
          title={event.title}
          description={event.description}
          image={event.image}
          reverse={event.reverse}
          type={event.type}
        />
      ))}
    </section>
  );
}
