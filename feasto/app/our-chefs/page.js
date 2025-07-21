import ExecutiveChef from "@/components/ourChefs/ExecutiveChef";
import ChefQuote from "@/components/ourChefs/ChefQuote";
import OtherChefs from "@/components/ourChefs/OtherChefs";
import ChefVideoSection from "@/components/ourChefs/ChefVideoSection.js";
import Image from "next/image";

async function getChefs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/our-chefs`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function MeetOurChefsPage() {
  const data = await getChefs();

  return (
    <section className="min-h-screen bg-[rgba(221,89,3,0.05)] text-black">
      {/* HERO */}
      <div className="relative h-[75vh] mb-20">
        <Image
          src="/img/chefs-hero.jpg"
          alt="Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />

        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold tracking-wide">
            MEET OUR CHEFS
          </h1>
        </div>
      </div>

      {/* EXECUTIVE */}
      <ExecutiveChef chef={data.executive} />

      {/* QUOTE */}
      <ChefQuote quote={data.executive.quote} author={data.executive.name} />

      {/* OTHER CHEFS */}
      <OtherChefs chefs={data.others} />

      {/* VIDEO */}
      <ChefVideoSection />
    </section>
  );
}
