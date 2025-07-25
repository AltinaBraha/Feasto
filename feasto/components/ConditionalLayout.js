"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import ReservationForm from "@/components/reservations/ReservationForm";
import ChatWidget from "@/components/chatbot/ChatWidget"; 

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const localeNormalizedPath = pathname.replace(/^\/(en|de|sq)/, "");

  const hideHeader =
    localeNormalizedPath === "/staff-login" ||
    localeNormalizedPath.startsWith("/dashboard") ||
    localeNormalizedPath.startsWith("/display") ||
    localeNormalizedPath.startsWith("/menus/scan-menu");

  const hideChat =
    localeNormalizedPath === "/menus/food" ||
    localeNormalizedPath === "/menus/drinks";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      {!hideHeader && <ReservationForm />}
      {!hideHeader && <Footer />}
      {!hideChat && <ChatWidget />}
    </>
  );
}
