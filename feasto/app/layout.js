import "./globals.css";
import { Jost } from "next/font/google";
import { CartProvider } from "@/components/CartProvider"; 
import ConditionalLayout from "@/components/ConditionalLayout";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} font-serif`}>
        <CartProvider>
          <ConditionalLayout>
            <main>{children}</main>
          </ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}
