"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import EventTypeSelector from "@/components/events/reservation/EventTypeSelector";
import GuestInfoForm from "@/components/events/reservation/GuestInfoForm";
import Sidebar from "@/components/events/reservation/Sidebar";
import OptionsDisplay from "@/components/events/reservation/OptionsDisplay";
import SummaryFooter from "@/components/events/reservation/SummaryFooter";

export default function EventReservationPage() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");

  const [eventType, setEventType] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    eventDate: "",
    guests: "",
  });

  const [selections, setSelections] = useState({
    decoration: null,
    menu: null,
    music: null,
    activeCategory: "menu",
  });

  useEffect(() => {
    if (typeFromUrl && !eventType) {
      setEventType(typeFromUrl);
    }
  }, [typeFromUrl, eventType]);

  return (
    <main className="bg-[#fff9f3] min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[75vh]">
        <Image
          src="/img/"
          alt="Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-[.5] scale-105 transition-transform duration-1000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide drop-shadow-lg">
            Start Planning Your Event
          </h1>
        </div>
      </div>

      {/* CONTENT BELOW HERO */}
      <div className="pt-20 pb-12 px-4 max-w-[1200px] mx-auto">
        {!eventType ? (
          <EventTypeSelector setEventType={setEventType} />
        ) : (
          <div className="flex flex-col gap-6">
            <GuestInfoForm guestInfo={guestInfo} setGuestInfo={setGuestInfo} />
            <div className="flex flex-col lg:flex-row gap-6">
              <Sidebar
                eventType={eventType}
                selections={selections}
                setSelections={setSelections}
              />
              <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
                <OptionsDisplay
                  guestInfo={guestInfo}
                  selections={selections}
                  setSelections={setSelections}
                  eventType={eventType}
                />
              </div>
            </div>
            <SummaryFooter
              guestInfo={guestInfo}
              selections={selections}
              eventType={eventType}
            />
          </div>
        )}
      </div>
    </main>
  );
}
