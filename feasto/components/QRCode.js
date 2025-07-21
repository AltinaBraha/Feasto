"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeCard() {
  const qrValue = "http://localhost:3000/menus/food";

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md w-fit mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Scan to View Menu
      </h2>
      <QRCodeCanvas value={qrValue} size={200} />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Point your camera here to scan
      </p>
    </div>
  );
}
