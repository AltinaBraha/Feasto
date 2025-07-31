'use client';

import { useState, useEffect } from "react";
import { HiUser, HiGlobeAlt, HiLockClosed } from "react-icons/hi";
import { useTranslations } from "next-intl";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "xk", label: "Albanian" },
  { code: "de", label: "Deutsch" },
];

export default function SettingsLeft({ user, onSaveProfile, onChangePassword }) {
  const t = useTranslations("Settings");
  
  const [name, setName] = useState(user.name || user.displayName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [language, setLanguage] = useState(user.language || "en");
  const [emailNotifications, setEmailNotifications] = useState(user.emailNotifications ?? true);

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    setName(user.name || "");
    setPhone(user.phone || "");
    setLanguage(user.language || "en");
  }, [user]);

  async function saveProfile() {
    try {
      setSaving(true);
      await onSaveProfile?.({ name, phone, language, emailNotifications });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function changePassword() {
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t("passwordsMismatch"));
      return;
    }
    setPasswordError("");
    try {
      setChangingPw(true);
      await onChangePassword?.({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordChange(false);
      alert(t("passwordChangedSuccess"));
    } catch (err) {
      setPasswordError(err?.message || t("failedChangePassword"));
    } finally {
      setChangingPw(false);
    }
  }

  return (
    <section className="md:col-span-2 space-y-12 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveProfile();
        }}
        className="space-y-12"
      >
        <div className="space-y-8">
          <div className="flex items-center space-x-2 text-orange-600 mb-3">
            <HiUser className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">{t("personalInfo")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("fullName")}
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={t("fullName")}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("phone")}
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+123456789"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              {t("emailAddress")}
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-4 py-3 text-gray-600 cursor-not-allowed"
              value={user.email}
              disabled
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-orange-600 mb-3">
            <HiGlobeAlt className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">{t("preferences")}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("languagePreference")}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              >
                {LANGUAGES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="emailNotifications"
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="emailNotifications" className="text-sm font-semibold text-gray-700 select-none">
                {t("receiveNotifications")}
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 justify-end">
          {profileSaved && <span className="text-green-600 font-semibold">{t("profileSaved")}</span>}
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition font-bold tracking-wide disabled:opacity-60"
          >
            {saving ? t("saving") : t("saveChanges")}
          </button>
        </div>
      </form>

      <div className="border-t border-gray-200 pt-10">
        <button
          className="flex items-center text-black font-bold underline mb-6 space-x-2"
          onClick={() => setShowPasswordChange((v) => !v)}
          type="button"
        >
          <HiLockClosed className="w-5 h-5" />
          <span>{showPasswordChange ? t("cancelPasswordChange") : t("changePassword")}</span>
        </button>

        {showPasswordChange && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              changePassword();
            }}
            className="space-y-6 max-w-md"
          >
            {passwordError && <p className="text-red-600 font-semibold">{passwordError}</p>}

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("currentPassword")}
              </label>
              <input
                id="currentPassword"
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("newPassword")}
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("confirmNewPassword")}
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={changingPw}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-bold tracking-wide disabled:opacity-60"
              >
                {changingPw ? t("changing") : t("changePassword")}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
