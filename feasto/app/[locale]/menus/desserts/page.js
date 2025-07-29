import Image from "next/image";
import CartButton from "@/components/menu/CartButton";
import DessertTabs from "@/components/menu/DessertTabs";
import { fetchDesserts } from "@/lib/firebase/fetchDesserts";
import { getTranslations } from "next-intl/server"; 

export default async function OurMenuPage() {
  const dessertMenu = await fetchDesserts();
  const t = await getTranslations("dessertHeader"); 

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen relative">
      <div className="relative h-[105vh] mb-20">
        <Image
          src="/img/Desserts/dessertss.webp"
          alt="Desserts Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
          <h2 className="text-white text-xl uppercase tracking-widest font-serif flex items-center space-x-6">
            <span className="block w-12 border-b-2 border-white-600"></span>
            <span>{t("subtitle")}</span> 
            <span className="block w-12 border-b-2 border-white-600"></span>
          </h2>
          <h1 className="text-white text-7xl font-serif tracking-wide font-sans">
            {t("title")}
          </h1>
          <p className="text-white text-lg uppercase tracking-wide">
            {t("hours")} 
          </p>
        </div>
      </div>

      <DessertTabs dessertMenu={dessertMenu} />
      <CartButton />
    </main>
  );
}
