"use client";

import { useState } from "react";
import { HiUser, HiGlobeAlt, HiLockClosed } from "react-icons/hi";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "sq", label: "Albanian" },
  { code: "de", label: "Deutsch" },
];

export default function SettingsLeft({ user }) {
  // State
  const [name, setName] = useState(user.displayName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [language, setLanguage] = useState(user.language || "en");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Handlers
  function saveProfile() {
    // TODO: call your setUser or API here to save profile
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function changePassword() {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match!");
      return;
    }
    setPasswordError("");
    alert("Password changed! (Mock)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowPasswordChange(false);
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
        {/* Profile Info */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2 text-orange-600 mb-3">
            <HiUser className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number (optional)
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
              Email Address
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

        {/* Preferences */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-orange-600 mb-3">
            <HiGlobeAlt className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
                Language Preference
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
                Receive Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Save button and feedback */}
        <div className="flex items-center space-x-4 justify-end">
          {profileSaved && <span className="text-green-600 font-semibold">Profile saved!</span>}
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition font-bold tracking-wide"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Change Password Section */}
      <div className="border-t border-gray-200 pt-10">
        <button
          className="flex items-center text-black font-bold underline mb-6 space-x-2"
          onClick={() => setShowPasswordChange((v) => !v)}
          type="button"
        >
          <HiLockClosed className="w-5 h-5" />
          <span>{showPasswordChange ? "Cancel Password Change" : "Change Password"}</span>
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
                Current Password
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
                New Password
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
                Confirm New Password
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
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-bold tracking-wide "
              >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
