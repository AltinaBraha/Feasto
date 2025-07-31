import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function ExecutiveChef({ chef }) {
  const t = useTranslations("executive");

  if (!chef) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-x-6 items-center">
      <div className="w-full">
        <Image
          src={chef.image}
          alt={chef.name}
          width={400}
          height={400}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-sm font-bold text-orange-600 uppercase mb-2">
          {t("executiveTitle")}
        </h3>
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
          {chef.name}
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{t("bio")}</p>
        <p className="text-gray-600 mb-6 leading-relaxed">{t("quote")}</p>
        <div className="flex space-x-4 text-gray-800 text-xl mb-6">
          <FaTwitter className="hover:text-orange-600 cursor-pointer" />
          <FaFacebook className="hover:text-orange-600 cursor-pointer" />
          <FaInstagram className="hover:text-orange-600 cursor-pointer" />
          <FaYoutube className="hover:text-orange-600 cursor-pointer" />
          <FaPinterest className="hover:text-orange-600 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
