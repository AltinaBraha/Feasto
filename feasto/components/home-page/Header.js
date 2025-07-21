'use client';
import Image from 'next/image';
import Link from 'next/link';




export default function Header() {
    const handleScroll = () => {
    const element = document.getElementById('reservation-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
<header className=" absolute left-0 w-full z-50 bg-transparent text-white">

  <div className="flex justify-between px-20 py-3 mt-2 bg-transparent text-base border-b border-gray-600">
  <div>123 Main Street, City</div>
  <div className="flex space-x-10">
    <div>+1 234 567 890</div>
    <div>contact@feasto.com</div>
  </div>
</div>

{/* logo */}
  <nav className="flex justify-between items-center px-10 py-4 bg-transparent">
      <div className="cursor-pointer relative w-50 h-20">
            <Image
              src="/img/logo.png"
              alt="Feasto Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
    <ul className="hidden md:flex space-x-20 font-medium pl-[35%]">

                <Link href="/">
                <li className="relative cursor-pointer text-xs tracking-wide font-bold
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                  after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300
                  hover:after:scale-x-100"
                >
                  HOME
                </li>
              </Link>

            <li className="relative group cursor-pointer text-xs font-bold
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300
                hover:after:scale-x-100"
            >
                MENUS <span className="ml-1 text-[8px]">&#x25BC;</span>
  
                  <ul className="absolute left-0 top-full w-44 bg-black bg-opacity-90 rounded shadow-lg
                      opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                      transition-opacity duration-300 z-50"
                  >
                    <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                      <Link href="/menus/food" className="block w-full h-full">Food</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                      <Link href="/menus/drinks" className="block w-full h-full">Drinks</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                      <Link href="/menus/desserts" className="block w-full h-full">Desserts</Link>
                    </li>
                  </ul>
                </li>

              <li className="relative group cursor-pointer text-xs font-bold
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300
                hover:after:scale-x-100"
            >
        ABOUT US <span className="ml-1 text-[8px]">&#x25BC;</span>

  <ul
    className="absolute left-0 top-full w-44 bg-black bg-opacity-90 rounded shadow-lg
      opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
      transition-opacity duration-300 z-50"
  >
    <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
      <Link href="/about-us" className="block w-full h-full">Our Story</Link>
    </li>
    <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
      <Link href="/our-chefs" className="block w-full h-full">Our Chefs</Link>
    </li>
    {/* <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
      <Link href="/about-us" className="block w-full h-full">Our Story</Link>
    </li> */}
    <li
      className="px-4 py-2 hover:bg-orange-600 cursor-pointer"
      onClick={handleScroll}
    >
      Contact Us
    </li>
  

          {/* <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
            <Link href="/about/location" className="block w-full h-full">Location</Link>
          </li> */}
        </ul>
      </li>

                <li className="relative  text-sm cursor-pointer group text-xs font-bold 
            after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
            after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300
            hover:after:scale-x-100"
        >
        GUESTBOOK <span className="ml-1 text-[8px]">&#x25BC;</span>
        <ul className="absolute left-0 top-full mt-2 w-44 bg-black bg-opacity-90 rounded shadow-lg
            opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
            transition-opacity duration-300 z-50"
        >
            <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">Leave a Review</li>
            <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">What Our Guests Say</li>
        </ul>
        </li>
        </ul>



    {/* Buttoni */}
   <button
        onClick={handleScroll}
        className="border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition"
      >
        Find a Table
      </button>
  </nav>
</header>
  );
}
