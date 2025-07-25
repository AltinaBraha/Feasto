import ExecutiveChef from "@/components/ourChefs/ExecutiveChef";
import ChefQuote from "@/components/ourChefs/ChefQuote";
import OtherChefs from "@/components/ourChefs/OtherChefs";
import ChefVideoSection from "@/components/ourChefs/ChefVideoSection.js";
import Image from "next/image";
import { getTranslations } from "next-intl/server"; // ✅ Import at top


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
    <section className="min-h-screen bg-[rgba(221,89,3,0.05)] text-black">
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[75vh] mb-20">
        <Image
          src="/img/chefs-hero.jpg"
          alt="Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />

        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            {t("title")}
          </h1>
        </div>
      </div>

      <ExecutiveChef chef={data.executive} />

      <ChefQuote  />

      <OtherChefs chefs={data.others} />

      <ChefVideoSection />
    </section>
  );
}
