'use client';

import { useState } from "react";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import SearchBar from "@/components/common/SearchBar";
import OrderList from "@/components/my-account/order/OrderList";
import { useAuthStore } from "@/lib/stores/authStore";
import { useTranslations } from "next-intl";

export default function MyOrdersPage() {
  const t = useTranslations("Orders");
  const user = useAuthStore(state => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return <div>{t("pleaseLogin")}</div>;

  return (
    <div className="min-h-screen pb-12 bg-[rgba(221,89,3,0.05)]">
      <AccountBanner title={t("title")} />
      <div className="max-w-5xl mx-auto p-8 mb-4">
        <SearchBar
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
     
      <main className="max-w-5xl mx-auto px-8">
        <OrderList user={user} searchTerm={searchTerm} />
      </main>
    </div>
  );
}
