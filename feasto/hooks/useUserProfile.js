"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ensureUserDoc,
  subscribeUserProfile,
  updateUserProfile,
  updateAuthDisplayName,
  changePasswordWithReauth,
} from "@/lib/firebase/users";

export function useUserProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    let unsub = () => {};
    let cancelled = false;

    (async () => {
      setLoading(true);

      await ensureUserDoc(user.uid, {
        email: user.email || "",
        name: user.displayName || "",
        emailNotifications: true,
      });

      unsub = subscribeUserProfile(user.uid, (doc) => {
        if (!cancelled) {
          setProfile(doc);
          setLoading(false);
        }
      });
    })();

    return () => {
      cancelled = true;
      unsub();
    };
  }, [user]);

  const saveProfile = useCallback(
    async ({ name, phone, language, emailNotifications }) => {
      if (!user) return;
      await updateUserProfile(user.uid, { name, phone, language, emailNotifications });
      if (name && name !== (user.displayName || "")) {
        await updateAuthDisplayName(name);
      }
    },
    [user]
  );

  const changePassword = useCallback(
    async ({ currentPassword, newPassword }) => {
      if (!user?.email) throw new Error("No user email to re-authenticate.");
      await changePasswordWithReauth(user.email, currentPassword, newPassword);
    },
    [user?.email]
  );

  const saveLocation = useCallback(
    async ({ location }) => {
      if (!user) return;
      await updateUserProfile(user.uid, { location });
    },
    [user]
  );

  const mergedUser = user
    ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || profile?.name || "",
        name: profile?.name ?? user.displayName ?? "",
        phone: profile?.phone ?? "",
        language: profile?.language ?? "en",           // ✅ fixed
        emailNotifications: profile?.emailNotifications ?? true,
        location: profile?.location ?? "",
      }
    : null;

  return {
    profile: mergedUser,
    loading,
    actions: { saveProfile, changePassword, saveLocation },
  };
}
