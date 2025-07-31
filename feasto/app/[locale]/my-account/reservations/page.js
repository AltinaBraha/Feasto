"use client";

import ReservationsClient from "@/components/my-account/my-reservations/ReservationsContainer";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import { useTranslations } from "next-intl";

export default function ReservationsPage() {
    const t = useTranslations("Reservations");
  
  return (
    <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
      <AccountBanner title={t("title")} />
      <ReservationsClient />
    </div>
  );
}
