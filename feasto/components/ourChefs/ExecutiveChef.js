import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

export default function ExecutiveChef({ chef }) {
  if (!chef) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="w-full">
        <Image
          src={chef.image}
          alt={chef.name}
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
      <div>
        <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">
          Our Executive Chef
        </h3>
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
          {chef.name}
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{chef.bio}</p>
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
  );
}
