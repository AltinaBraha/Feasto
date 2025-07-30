"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import SettingsLeft from "@/components/my-account/settings/SettingsLeft";
import SettingsRight from "@/components/my-account/settings/SettingsRight";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function SettingsPage() {
  const { user, initAuthListener } = useAuthStore();

  useEffect(() => {
    initAuthListener?.();
  }, [initAuthListener]);

  const { profile, loading, actions } = useUserProfile(user);

  if (!user) return null;

  if (loading) {
    return (
      <>
        <AccountBanner title="Settings" />
        <div className="max-w-7xl mx-auto mt-12 p-8">
          <p className="text-gray-700">Loading profile…</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AccountBanner title="Settings" />
      <div className="max-w-7xl mx-auto mt-12 p-8 bg-gray-50 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <SettingsLeft
            user={profile}
            onSaveProfile={actions.saveProfile}
            onChangePassword={actions.changePassword}
          />
          <SettingsRight
            user={profile}
            onSaveLocation={actions.saveLocation}
          />
        </div>
      </div>
      <br />
    </>
  );
}
