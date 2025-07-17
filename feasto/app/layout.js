"use client";
import "./globals.css";
import Header from "../components/home-page/Header";
import { CartProvider } from "@/components/CartProvider";
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
      <body className={`${myFont.variable} font-serif text-gray-900 bg-white`}>
        <CartProvider>
          {!hideHeader && <Header />}
          <main>{children}</main>
          {/* <Footer /> */}
        </CartProvider>
      </body>
    </html>
  );
}
