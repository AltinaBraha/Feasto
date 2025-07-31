"use client";

import { usePathname } from "next/navigation";
import AccountCard from "./AccountCard";
import {
  FiCalendar,
  FiShoppingCart,
  FiHeart,
  FiSettings,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

export default function Dashboard({ stats }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <AccountCard
          icon={<FiCalendar />}
          iconBg="bg-orange-100 text-orange-600"
          titleKey="reservations.title"
          descriptionKey="reservations.description"
          actionKey="reservations.action"
          href={`/${locale}/my-account/reservations`}
          count={stats.upcomingReservationsCount}
          actionHref={`/${locale}/my-account/reservations/new`}
        />

        <AccountCard
          icon={<FiShoppingCart />}
          iconBg="bg-yellow-100 text-yellow-600"
          titleKey="orders.title"
          descriptionKey="orders.description"
          actionKey="orders.action"
          href={`/${locale}/my-account/orders`}
          count={stats.recentOrdersCount}
          actionHref={`/${locale}/menu`}
        />

        <AccountCard
          icon={<FiHeart />}
          iconBg="bg-red-100 text-red-600"
          titleKey="favorites.title"
          descriptionKey="favorites.description"
          actionKey="favorites.action"
          href={`/${locale}/my-account/favorites`}
          count={stats.favoritesCount}
          actionHref={`/${locale}/menu`}
        />

        <AccountCard
          icon={<FiMapPin />}
          iconBg="bg-green-100 text-green-600"
          titleKey="addresses.title"
          descriptionKey="addresses.description"
          actionKey="addresses.action"
          href={`/${locale}/my-account/settings`}
          count={stats.addressesCount}
          actionHref={`/${locale}/my-account/settings`}
        />

        <AccountCard
          icon={<FiCreditCard />}
          iconBg="bg-blue-100 text-blue-600"
          titleKey="payments.title"
          descriptionKey="payments.description"
          actionKey="payments.action"
          href={`/${locale}/my-account/settings`}
          count={stats.paymentMethodsCount}
          actionHref={`/${locale}/my-account/settings`}
        />

        <AccountCard
          icon={<FiSettings />}
          iconBg="bg-gray-100 text-gray-600"
          titleKey="settings.title"
          descriptionKey="settings.description"
          actionKey="settings.action"
          href={`/${locale}/my-account/settings`}
          count={null}
          actionHref={`/${locale}/my-account/settings`}
        />
      </div>
    </div>
  );
}
