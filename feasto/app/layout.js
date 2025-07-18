"use client";
import "./globals.css";
import Footer from "@/components/home-page/Footer";
import Header from "../components/home-page/Header";
import { Jost } from "next/font/google";
import { usePathname } from "next/navigation";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeader =
    pathname === "/staff-login" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/display");

  return (
    <html lang="en">
      <body className={`${myFont.variable} font-serif`}>
        <Header /> 
        <main>{children}</main>
        <Footer /> 
      </body>
    </html>
  );
}

