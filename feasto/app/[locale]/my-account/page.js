"use client";

import { useAuthStore } from "@/lib/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import Dashboard from "@/components/my-account/common/Dashboard";
import Loading from "@/components/my-account/common/Loading";
import { getUserStats } from "@/lib/firebase/myAccount";

export default function MyAccountPage() {
  const { user, loading, initAuthListener } = useAuthStore();
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/en");
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

  if (loading || statsLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
      <AccountBanner user={user} />
      {stats && <Dashboard stats={stats} />}
    </div>
  );
}
