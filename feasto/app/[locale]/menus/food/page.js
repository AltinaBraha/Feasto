import MenuHeader from "@/components/menu/MenuHeader";
import MenuTabs from "@/components/menu/MenuTabs";
import MenuSection from "@/components/menu/MenuSection";
import CartButton from "@/components/menu/CartButton";
import foodMenu from "@/data/food.json";


export default function OurMenuPage() {
  return (
    <main >
      <div className="max-w-full bg-[rgba(221,89,3,0.05)] min-h-screen relative">
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