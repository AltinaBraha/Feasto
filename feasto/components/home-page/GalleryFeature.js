import Image from "next/image";
import Link from "next/link";

export default function GalleryFeature() {
  const images = [
    { src: "/img/1.jpg", href: "/link1" },
    { src: "/img/2.jpg", href: "/link2" },
    { src: "/img/3.jpg", href: "/link3" },
    { src: "/img/4.jpg", href: "/link4" },
  ];

  return (
  <section className="w-full py-16">
  <div className="flex w-full h-[600px]">
    {/* Left Large Block - Link to Menus/Food */}
    <Link href="/menus/food" className="flex-1 overflow-hidden relative group cursor-pointer">
      <div
        className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/img/1.jpg)`,
        }}
      ></div>
      <div className="absolute left-4 bottom-4 text-left text-white space-y-4 z-10">
        <p className="text-xl font-semibold">RECOMMENDATIONS</p>
        <p className="text-[40px] whitespace-nowrap">NEW TASTING MENUS</p>
        <p className="text-sm border-b-2 border-orange-500 w-max mt-1 pb-1">SPRING SPECIALS</p>
      </div>
    </Link>

    {/* Middle Two Rows */}
    <div className="flex flex-col flex-1 gap-0">
      <div className="flex flex-1">
        {/* Top Left - Image link to Menus/Food */}
        <Link href="/menus/food" className="flex-1 overflow-hidden relative group cursor-pointer">
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/img/2.jpg)`,
            }}
          ></div>
        </Link>

        {/* Top Right - Text link to Menus/Food */}
        <Link href="/menus/food" className="flex-1 bg-black relative cursor-pointer">
          <div className="absolute left-1/2 bottom-20 -translate-x-1/2 text-white text-center">
            <p className="text-xl font-semibold">VIEW FULL MENUS</p>
            <p className="text-m border-b-2 border-orange-500 w-max mt-4 pb-1 ml-6">LEARN MORE</p>
          </div>
        </Link>
      </div>

      <div className="flex flex-1">
        {/* Bottom Left - Text link to Our Chefs */}
        <Link href="/our-chefs" className="flex-1 bg-black relative cursor-pointer">
          <div className="absolute left-1/2 bottom-20 -translate-x-1/2 text-white text-center">
            <h3 className="text-orange-500 font-bold uppercase">RECIPES</h3>
            <p className="text-xl font-semibold">OUR CHEF'S SECRETS</p>
            <p className="text-m border-b-2 border-orange-500 w-max mt-4 pb-1 mx-auto">LEARN MORE</p>
          </div>
        </Link>

        {/* Bottom Right - Image link to Our Chefs */}
        <Link href="/our-chefs" className="flex-1 overflow-hidden relative group cursor-pointer">
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/img/3.jpg)`,
            }}
          ></div>
        </Link>
      </div>
    </div>

    {/* Right Side Block - Link to Drinks */}
    <Link href="/menus/drinks" className="relative h-[600px] w-[260px] overflow-hidden group rounded shadow-lg bg-white cursor-pointer">
      <Image
        src="/img/4.jpg"
        alt="Image with overlay"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute right-4 bottom-4 text-white text-right z-10 space-y-2">
        <p className="text-xl font-semibold">WINE LIST</p>
        <p className="text-[40px]">HAVE A DRINK</p>
        <p className="text-lg border-b-2 border-orange-500 w-max mt-1 ml-35 pb-1">Learn More</p>
      </div>
    </Link>
  </div>
</section>



  );
}
