'use client'
import { useState } from "react";
import AccountBanner from "@/components/my-account/common/AccountBanner";
import SearchBar from "@/components/common/SearchBar";
import OrderList from "@/components/my-account/order/OrderList";
import { useAuthStore } from "@/lib/stores/authStore";

export default function MyOrdersPage() {
  const user = useAuthStore(state => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dine-in");

  if (!user) return <div>Please log in to view your orders.</div>;

  return (
    <div className="min-h-screen pb-12 bg-[rgba(221,89,3,0.05)]">
      <AccountBanner title="Orders" />
      <div className="max-w-5xl mx-auto p-8 mb-4">
        <SearchBar
          placeholder="Search orders by number, name, status, or item..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
     
      <main className="max-w-5xl mx-auto px-8">
        <OrderList user={user} searchTerm={searchTerm} activeTab={activeTab} />
      </main>
    </div>
  );
}
