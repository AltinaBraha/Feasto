"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import SettingsLeft from "@/components/my-account/settings/SettingsLeft";
import SettingsRight from "@/components/my-account/settings/SettingsRight";

export default function SettingsPage() {
  const { user, initAuthListener } = useAuthStore();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  if (!user) return null;

  return (
    <>
     
      <AccountBanner user={user} />
      <div className="max-w-7xl mx-auto mt-12 p-8 bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-wide">
          Profile Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <SettingsLeft user={user} />
          <SettingsRight user={user} />
        </div>
      </div>
      <br></br>
    
    </>
  );
}
