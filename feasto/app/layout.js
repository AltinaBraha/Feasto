import "./globals.css";
import Header from "../components/home-page/Header";
import { Jost } from "next/font/google";

const myFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={`${myFont.variable} font-serif`} >
          <Header /> 
        <main>
          {children}
          </main>
        {/* <Footer /> --> hiqet përkohësisht */}
      </body>
    </html>
  );
}
