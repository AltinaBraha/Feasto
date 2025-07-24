"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import ReservationForm from "@/components/reservations/ReservationForm";

import ChatWidget from "@/components/chatbot/ChatWidget"; 

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideHeader =
    pathname === "/staff-login" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/display") ||
    pathname.startsWith("/menus/scan-menu");

    const hideChat =
    pathname === "/menus/food" ||
    pathname === "/menus/drinks";



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
