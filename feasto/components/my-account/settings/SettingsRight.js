'use client';

import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useTranslations } from "next-intl";

export default function SettingsRight({ user, onSaveLocation }) {
  const t = useTranslations("Settings");

  const [location, setLocation] = useState(user.location || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  async function handleSave() {
    try {
      setSaving(true);
      await onSaveLocation?.({ location });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="md:col-span-1 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-5 space-x-2 text-orange-600">
        <HiLocationMarker className="w-5 h-5" />
        <h2 className="text-xl font-bold text-gray-900">{t("deliveryLocation")}</h2>
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 resize-none
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        placeholder={t("enterDeliveryAddress")}
        rows={6}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition font-bold disabled:opacity-60"
        >
          {saving ? t("saving") : t("saveAddress")}
        </button>
        {saved && <span className="text-green-600 text-sm font-semibold">{t("saved")}</span>}
      </div>
      <p className="mt-3 text-sm text-gray-500 italic">
        {t("deliveryAddressInfo")}
      </p>
    </section>
  );
}
