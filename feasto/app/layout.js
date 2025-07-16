import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-900 bg-white">
        <CartProvider>
          {/* <Header /> --> hiqet përkohësisht */}
          <main>{children}</main>
          {/* <Footer /> --> hiqet përkohësisht */}
        </CartProvider>
      </body>
    </html>
  );
}
