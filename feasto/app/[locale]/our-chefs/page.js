import ExecutiveChef from "@/components/ourChefs/ExecutiveChef";
import ChefQuote from "@/components/ourChefs/ChefQuote";
import OtherChefs from "@/components/ourChefs/OtherChefs";
import ChefVideoSection from "@/components/ourChefs/ChefVideoSection";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import AnimatedWrapper from "@/components/ourChefs/AnimatedWrapper";

async function getChefs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/our-chefs`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function MeetOurChefsPage() {
  const data = await getChefs();
  const t = await getTranslations("ourChefs");

  return (
    <section className="min-h-screen bg-[rgba(221,89,3,0.05)] text-black overflow-hidden">
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[75vh] mb-20">
        <Image
          src="/img/chefs-hero.jpg"
          alt="Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-[.5] scale-105 transition-transform duration-1000 hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide drop-shadow-lg">
            {t("title")}
          </h1>
        </div>
      </div>

      <AnimatedWrapper>
        <ExecutiveChef chef={data.executive} />
      </AnimatedWrapper>

      <AnimatedWrapper delay={0.2}>
        <ChefQuote />
      </AnimatedWrapper>

      <AnimatedWrapper delay={0.4}>
        <OtherChefs chefs={data.others} />
      </AnimatedWrapper>

      <AnimatedWrapper delay={0.6}>
        <ChefVideoSection />
      </AnimatedWrapper>
    </section>
  );
}
