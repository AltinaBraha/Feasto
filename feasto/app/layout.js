import "./globals.css";
import { Jost } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import { AuthProvider } from "@/auth/AuthContext"; // ✅ Shto këtë

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} font-serif`}>
        <AuthProvider>
          {" "}
          {/* ✅ AuthProvider vendoset më së larti */}
          <CartProvider>
            <ConditionalLayout>
              <main>{children}</main>
            </ConditionalLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
