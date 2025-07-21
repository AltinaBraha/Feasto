import MenuHeader from "@/components/menu/MenuHeader";
import MenuTabs from "@/components/menu/MenuTabs";
import MenuSection from "@/components/menu/MenuSection";
import CartButton from "@/components/menu/CartButton";

async function getMenu() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/menu/food`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  const data = await res.json();
  return data;
}


export default async function OurMenuPage() {
  const foodMenu = await getMenu();

  return (
    <main className="bg-[rgba(221,89,3,0.05)] min-h-screen relative">
      <MenuHeader />
      <MenuTabs foodMenu={foodMenu} />
      <CartButton />
    </main>
  );
}
