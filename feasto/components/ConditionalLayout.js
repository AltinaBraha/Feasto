"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import ReservationForm from "@/components/reservations/ReservationForm";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const hideHeader =
    pathname === "/staff-login" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/display");

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      {!hideHeader && <ReservationForm />}
      {!hideHeader && <Footer />}
    </>
  );
}
