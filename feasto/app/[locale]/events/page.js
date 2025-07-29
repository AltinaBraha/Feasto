import EventGallery from "@/components/events/EventGallery";
import EventsHero from "@/components/events/EventHero";
import EventTypesSection from "@/components/events/EventTypesSection";

export const metadata = {
  title: "Start Planning Your Event",
  description:
    "Exceptional Catering. Seamless Coordination. Unforgettable Moments.",
};

export default function EventsPage() {
  return (
    <main className="bg-[rgba(221,89,3,0.05)]  min-h-screen">
      <EventsHero />
      <EventTypesSection />
      <EventGallery />
    </main>
  );
}
