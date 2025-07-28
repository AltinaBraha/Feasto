import AboutHero from "@/components/about-us/AboutHero";
import AboutContent from "@/components/about-us/AboutContent";
import ValuesSection from "@/components/about-us/ValuesSection";
import TestimonialsSlider from "@/components/about-us/TestimonialsSlider";

export const metadata = {
  title: "About Us | Feasto",
  description:
    "Learn more about our restaurant's vision, mission, and passionate team.",
};

export default function AboutUsPage() {
  return (
    <main className="bg-[rgba(221,89,3,0.05)]">
      <AboutHero />
      <AboutContent />
      <ValuesSection />
      <TestimonialsSlider />
    </main>
  );
}
