"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import ReservationForm from "@/components/reservations/ReservationForm";
import ChatWidget from "@/components/chatbot/ChatWidget";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const normalizedPath = pathname.replace(/^\/(en|de|sq)/, "");

  const hideHeader =
    normalizedPath === "/staff-login" ||
    normalizedPath.startsWith("/dashboard") ||
    normalizedPath.startsWith("/display") ||
    normalizedPath.startsWith("/menus/scan-menu");

  const hideChat =
    normalizedPath.startsWith("/dashboard") ||
    normalizedPath === "/menus/food" ||
    normalizedPath === "/menus/drinks";

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
