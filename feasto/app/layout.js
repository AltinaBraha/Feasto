"use client";
import "./globals.css";
import Footer from "@/components/home-page/Footer";
import Header from "../components/home-page/Header";
import { Jost } from "next/font/google";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/CartProvider"; 

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
              <CartProvider> 
          {!hideHeader && <Header />}
          <main>{children}</main>
          {!hideHeader && <ReservationForm />}
          {!hideHeader && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}