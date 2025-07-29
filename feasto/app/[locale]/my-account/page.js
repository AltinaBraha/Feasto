"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import Dashboard from "@/components/my-account/common/Dashboard";
import Loading from "@/components/my-account/common/Loading";

export default function MyAccountPage() {
  const { user, loading, initAuthListener } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  useEffect(() => {
    if (!loading && !user) router.push("/en");
  }, [user, loading, router]);

  if (loading) return <Loading />;
  if (!user) return null;

  // to be fetched from firebase nihere qeshtu statike
  const stats = {
    upcomingReservationsCount: 3,
    recentOrdersCount: 5,
    favoritesCount: 8,
    addressesCount: 2,
    paymentMethodsCount: 1,
  };

  return (
    <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
      <AccountBanner user={user} />
      <Dashboard stats={stats} />
    </div>
  );
}
