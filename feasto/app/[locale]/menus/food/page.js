import MenuHeader from "@/components/menu/MenuHeader";
import MenuTabs from "@/components/menu/MenuTabs";
import MenuSection from "@/components/menu/MenuSection";
import CartButton from "@/components/menu/CartButton";
import foodMenu from "@/data/food.json";

export const dynamic = 'force-static';

// async function getMenu() {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//   const res = await fetch(`${baseUrl}/api/menu/food`, {
//     next: { revalidate: 60 }, 
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch menu");
//   }

//   const data = await res.json();
//   return data;
// }

export default function OurMenuPage() {
  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen relative">
      <div className="max-w-full">
        <MenuHeader />
        <div className="sm:block hidden">
          <MenuTabs foodMenu={foodMenu} />
        </div>
        <div className="sm:hidden block px-4">
          <MenuTabs foodMenu={foodMenu} />
        </div>
        <CartButton />
      </div>
    </main>
  );
}