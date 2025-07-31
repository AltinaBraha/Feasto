"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "next-intl";
import AuthButton from "../my-account/common/AuthButton";

export default function Header() {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const handleScroll = () => {
    const element = document.getElementById("reservation-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="absolute left-0 w-full z-50 bg-transparent text-white">
      <div className="hidden md:flex justify-between px-20 py-3 mt-2 bg-transparent text-base border-b border-gray-600">
        <div>{t("topBar.address")}</div>
        <div className="flex space-x-10">
          <div>{t("topBar.phone")}</div>
          <div>{t("topBar.email")}</div>
        </div>
      </div>

      <nav className="flex items-center justify-between px-6 md:px-20 py-4">
        <div className="relative w-40 h-20 cursor-pointer">
          <Image
            src="/img/logo.png"
            alt="Feasto Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <ul className="hidden md:flex space-x-16 font-medium text-xs font-bold">
          <li className="relative cursor-pointer text-xs tracking-wide font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <Link href="/">{t("menu.home")}</Link>
          </li>

          <li className="relative group cursor-pointer text-xs font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            {t("menu.menus")} <span className="ml-1 text-[8px]">&#x25BC;</span>
            <ul className="absolute left-0 top-full w-44 bg-black bg-opacity-90 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href={`/${locale}/menus/food`}>{t("menu.food")}</Link>
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href={`/${locale}/menus/drinks`}>{t("menu.drinks")}</Link>
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href="/menus/desserts">
                  {t("menu.desserts")}
                </Link>
              </li> 
            </ul>
          </li>

          <li className="relative group cursor-pointer text-xs font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            {t("menu.aboutUs")}{" "}
            <span className="ml-1 text-[8px]">&#x25BC;</span>
            <ul className="absolute left-0 top-full w-44 bg-black bg-opacity-90 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href={`/${locale}/about-us`}>{t("menu.ourStory")}</Link>
              </li>
              <li className="px-4 py-2 hover:bg-orange-600 cursor-pointer">
                <Link href={`/${locale}/our-chefs`}>{t("menu.ourChefs")}</Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-orange-600 cursor-pointer"
                onClick={handleScroll}
              >
                {t("menu.contactUs")}
              </li>
            </ul>
          </li>

          <li
            onClick={handleScroll}
            className="relative cursor-pointer text-xs font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {t("menu.findTable")}
            {/* Optional arrow icon if you want */}
            <span className="ml-1 text-[8px]">&#x25BC;</span>
          </li>
          <li className="relative cursor-pointer text-xs tracking-wide font-bold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            <Link href={`/${locale}/events`}>{t("menu.events")}</Link>
          </li>
          <LanguageSwitcher />
        </ul>

        {/* <button
          onClick={handleScroll}
          className="hidden md:block border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition"
        >
          {t("menu.findTable")}
        </button> */}
        <AuthButton />

        <div className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-black/95 px-6 py-6 text-sm space-y-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>
                {t("menu.home")}
              </Link>
            </li>
            <li className="group">
              <span className="block">{t("menu.menus")}</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <Link href="/menus/food" onClick={() => setIsOpen(false)}>
                    {t("menu.food")}
                  </Link>
                </li>
                <li>
                  <Link href="/menus/drinks" onClick={() => setIsOpen(false)}>
                    {t("menu.drinks")}
                  </Link>
                </li>
                <li>
                  <Link href="/menus/desserts" onClick={() => setIsOpen(false)}>
                    {t("menu.desserts")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="group">
              <span className="block">{t("menu.aboutUs")}</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <Link href="/about-us" onClick={() => setIsOpen(false)}>
                    {t("menu.ourStory")}
                  </Link>
                </li>
                <li>
                  <Link href="/our-chefs" onClick={() => setIsOpen(false)}>
                    {t("menu.ourChefs")}
                  </Link>
                </li>
                <li>
                  <button onClick={handleScroll}>{t("menu.contactUs")}</button>
                </li>
              </ul>
            </li>
            <li className="group">
              <span className="block">{t("menu.guestbook")}</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>{t("menu.leaveReview")}</li>
                <li>{t("menu.whatGuestsSay")}</li>
              </ul>
            </li>
            <li className="pt-4">
              <button
                onClick={handleScroll}
                className="w-full border border-white px-4 py-2 rounded bg-transparent hover:bg-white hover:text-black transition"
              >
                {t("menu.findTable")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
