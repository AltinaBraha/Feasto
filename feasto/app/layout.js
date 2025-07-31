import "./globals.css";
import { Jost } from "next/font/google";
// import { CartProvider } from "@/components/CartProvider";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${myFont.variable} font-serif`}>
          {children}
      </body>
    </html>
  );
}
