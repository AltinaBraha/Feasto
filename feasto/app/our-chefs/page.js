import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import ReservationForm from "@/components/reservations/ReservationForm";
import OtherChefs from "@/components/ourChefs/OtherChefs";
import ChefVideoSection from "@/components/ourChefs/ChefVideoSection";

export default function MeetOurChefsPage() {
  return (
    <section className="min-h-screen bg-[rgba(221,89,3,0.05)] text-black">
      {/* HERO */}
      <div className="relative h-[75vh] mb-20">
        <img
          src="/img/chefs-hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[.5]"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold tracking-wide">
            MEET OUR CHEFS
          </h1>
        </div>
      </div>

      {/* EXECUTIVE CHEF */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full">
          <img
            src="/img/executive-chef.jpg"
            alt="Executive Chef"
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">
            Our Executive Chef
          </h3>
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
            Alexander Petillo
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Food is the foundation of true happiness...
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We see our customers as invited guests to a party...
          </p>
          <div className="flex space-x-4 text-gray-800 text-xl mb-6">
            <FaTwitter className="hover:text-orange-600 cursor-pointer" />
            <FaFacebook className="hover:text-orange-600 cursor-pointer" />
            <FaInstagram className="hover:text-orange-600 cursor-pointer" />
            <FaYoutube className="hover:text-orange-600 cursor-pointer" />
            <FaPinterest className="hover:text-orange-600 cursor-pointer" />
          </div>
          <button className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition-all duration-300 text-sm font-semibold">
            Get in Touch
          </button>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative h-[400px] w-full mb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/quote-background.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center px-4 text-center text-white">
            <p className="max-w-4xl text-xl md:text-3xl font-light italic leading-relaxed">
              “A distinctive, well-preserved and comfortable space, high-quality
              products, authentic cuisine, food and drinks are done flawlessly.”
            </p>
            <p className="mt-6 text-lg font-semibold text-orange-400">
              Alexander Petillo
            </p>
          </div>
        </div>
      </section>

      {/* OTHER CHEFS */}
      <OtherChefs />

      {/* VIDEO SECTION */}
      <ChefVideoSection />

      {/* RESERVATION */}
      <ReservationForm />
    </section>
  );
}
