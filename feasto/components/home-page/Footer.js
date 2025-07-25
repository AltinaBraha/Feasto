"use client";

import { useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer id="contact" className="bg-black text-white px-4 sm:px-10 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col space-y-4">
          <div className="relative w-32 h-12 sm:w-36 sm:h-14">
            <Image
              src="/img/logo.png"
              alt="Feasto Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            {t("description")}
          </p>
          <div className="flex space-x-4 text-white text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-orange-500">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-orange-500">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-orange-500">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-orange-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            {t("workingHours.title")}
          </h3>
          <ul className="text-xs sm:text-sm space-y-1 leading-relaxed">
            <li>{t("workingHours.weekdays")}</li>
            <li>{t("workingHours.saturday")}</li>
            <li>{t("workingHours.sunday")}</li>
            <li className="mt-2 font-semibold text-orange-500">
              {t("workingHours.happyHour")}
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold">
            {t("address.title")}
          </h3>
          <p className="text-xs sm:text-sm">{t("address.street")}</p>
          <p className="text-xs sm:text-sm">{t("address.phone")}</p>
          <p className="text-xs sm:text-sm">{t("address.email")}</p>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold">
            {t("newsletter.title")}
          </h3>
          <p className="text-xs sm:text-sm">{t("newsletter.description")}</p>
          <input
            type="email"
            placeholder={t("newsletter.placeholder")}
            className="w-full px-3 py-2 mb-2 text-black text-sm border-b border-white bg-transparent placeholder-white focus:outline-none"
          />
          <div className="flex items-start gap-2 text-xs sm:text-sm">
            <input type="checkbox" id="privacy" />
            <label htmlFor="privacy">{t("newsletter.privacyAgreement")}</label>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-xs gap-4 sm:gap-0">
        <p className="text-center sm:text-left">{t("bottom.copyright")}</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-orange-500">
            {t("bottom.privacy")}
          </a>
          <a href="#" className="hover:text-orange-500">
            {t("bottom.terms")}
          </a>
          <a href="#" className="hover:text-orange-500">
            {t("bottom.policy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
