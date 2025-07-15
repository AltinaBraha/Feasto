import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-900 bg-white">
        {/* <Header /> --> hiqet përkohësisht */}
        <main>{children}</main>
        {/* <Footer /> --> hiqet përkohësisht */}
      </body>
    </html>
  );
}
