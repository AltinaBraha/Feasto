import "./globals.css";
<<<<<<< HEAD
import { CartProvider } from "@/components/CartProvider";
=======
import Header from "../components/home-page/Header";
import { Jost } from "next/font/google";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});
>>>>>>> 5040dc3a61c98e55ef9dd1e0d2e264d0234e8fbf

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="text-gray-900 bg-white">
        <CartProvider>
          {/* <Header /> --> hiqet përkohësisht */}
          <main>{children}</main>
          {/* <Footer /> --> hiqet përkohësisht */}
        </CartProvider>
=======
    
      <body className={`${myFont.variable} font-serif`} >
          <Header /> 
        <main>
          {children}
          </main>
        {/* <Footer /> --> hiqet përkohësisht */}
>>>>>>> 5040dc3a61c98e55ef9dd1e0d2e264d0234e8fbf
      </body>
    </html>
  );
}
