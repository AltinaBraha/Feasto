import QRCode from "react-qr-code";
import Image from "next/image";

export default function ScanMenuPage() {
  const qrValue = "http://192.168.1.110:3000/menus/food";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full font-sans relative">
        <div className="absolute top-0 left-0 w-full h-12 bg-black flex justify-center items-center rounded-t-2xl">
          <Image
            src="/img/logo.png"
            alt="Restaurant Logo"
            width={80}
            height={40}
            priority
          />
        </div>

        <div className="pt-16">
          <h1 className="text-2xl font-semibold mb-6 text-gray-900 tracking-wide">
            Tap into flavor! Scan here
          </h1>

          <div className="flex justify-center mb-6">
            <QRCode value={qrValue} size={200} />
          </div>

          <p className="text-gray-600 text-sm mb-8">
            Once scanned, you’ll instantly access our full menu with all current
            dishes and specials.
          </p>
          {/* 
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition font-semibold shadow-sm">
            Need Help?
          </button> */}
        </div>
      </div>
    </main>
  );
}
