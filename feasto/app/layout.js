// app/layout.tsx
import "./globals.css";
import { Jost } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/auth/AuthContext";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} font-serif`}>
        <AuthProvider>
          <CartProvider>
            {children} {/* DO NOT WRAP IN ConditionalLayout */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
