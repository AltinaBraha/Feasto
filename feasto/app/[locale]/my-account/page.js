"use client";

import { useAuthStore } from "@/lib/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import Dashboard from "@/components/my-account/common/Dashboard";
import { getUserStats } from "@/lib/firebase/myAccount";

export default function MyAccountPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/en"); 
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      (async () => {
        setStatsLoading(true);
        const fetchedStats = await getUserStats(user.uid);
        setStats(fetchedStats);
        setStatsLoading(false);
      })();
    }
  }, [user]);

  if (!user) return null;
  return (
    <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
      <AccountBanner user={user} />
      {statsLoading && (
        <p className="text-center text-gray-400 py-10">Loading dashboard...</p>
      )}
      {!statsLoading && stats && <Dashboard stats={stats} />}
    </div>
  );
}
