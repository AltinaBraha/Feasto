"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import EventTypeSelector from "@/components/events/reservation/EventTypeSelector";
import GuestInfoForm from "@/components/events/reservation/GuestInfoForm";
import Sidebar from "@/components/events/reservation/Sidebar";
import OptionsDisplay from "@/components/events/reservation/OptionsDisplay";
import SummaryFooter from "@/components/events/reservation/SummaryFooter";
import Image from "next/image";

export default function EventReservationPage() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");

  const [eventType, setEventType] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: "",
    guests: "",
  });

  const [selections, setSelections] = useState({
    decoration: null,
    menu: null,
    activeCategory: "menu",
  });

  useEffect(() => {
    if (typeFromUrl && !eventType) {
      setEventType(typeFromUrl);
    }
  }, [typeFromUrl, eventType]);

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen">
      <section className="relative h-[90vh] flex items-center justify-center text-white text-center">
        <Image
          src="/img/event-bg.jpg"
          alt="Events Hero"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="z-0"
        />
        <div className="z-10 bg-black/50 w-full h-full absolute top-0 left-0" />
        <div className="z-20 relative px-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide uppercase">
            {eventType
              ? `${eventType} Event Planning`
              : "Start Planning Your Event"}
          </h1>
        </div>
      </section>

      <div className="pt-24 pb-56 px-4 max-w-[1200px] mx-auto">
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
              setGuestInfo={setGuestInfo}
              selections={selections}
              setSelections={setSelections}
              eventType={eventType}
            />
          </div>
        )}
      </div>
    </main>
  );
}
