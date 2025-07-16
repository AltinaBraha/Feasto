import "./globals.css";
import Header from "../components/home-page/Header";
import { CartProvider } from "@/components/CartProvider";
import { Jost } from "next/font/google";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} font-serif text-gray-900 bg-white`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          {/* <Footer /> --> hiqet përkohësisht */}
        </CartProvider>
      </body>
    </html>
  );
}
