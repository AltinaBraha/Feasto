import MenuHeader from "@/components/menu/MenuHeader";
import DrinkTabs from "@/components/menu/DrinkTabs";
import MenuSection from "@/components/menu/MenuSection";
import CartButton from "@/components/menu/CartButton";
import Image from "next/image";

async function getMenu() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/menu/drinks`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  const data = await res.json();
  return data;
}


export default async function OurMenuPage() {
  const drinkMenu = await getMenu();

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen relative">
     
        <div className="relative h-[105vh] mb-20">
           <Image
            src="/img/MenusFood/drinks.jpg"
            alt="Drinks Hero"
            fill
            className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
            <h2 className="text-white text-xl uppercase tracking-widest font-serif flex items-center space-x-6">
              <span className="block w-12 border-b-2 border-white-600"></span>
              <span>refresh & relax</span>
              <span className="block w-12 border-b-2 border-white-600"></span>
            </h2>
            <h1 className="text-white text-7xl font-serif tracking-wide font-sans">
              DRINKS MENU
            </h1>
            <p className="text-white text-lg uppercase tracking-wide">
              Daily, 12pm–11pm
            </p>
          </div>
        </div>
      <DrinkTabs drinkMenu={drinkMenu} />
      <CartButton />
    </main>
  );
}
