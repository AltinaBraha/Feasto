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
          title="Reservations"
          href={`/${locale}/my-account/reservations`}
          description="You have upcoming reservations ready. View details or schedule a new one easily."
          count={stats.upcomingReservationsCount}
          actionText="New Reservation"
          actionHref={`/${locale}/my-account/reservations/new`}
        />

        <AccountCard
          icon={<FiShoppingCart />}
          iconBg="bg-yellow-100 text-yellow-600"
          title="Orders"
          href={`/${locale}/my-account/orders`}
          description="Access your recent and past orders, and reorder with a click."
          count={stats.recentOrdersCount}
          actionText="Place Order"
          actionHref={`/${locale}/menu`}
        />

        <AccountCard
          icon={<FiHeart />}
          iconBg="bg-red-100 text-red-600"
          title="Favorites"
          href={`/${locale}/my-account/favorites`}
          description="Browse and manage the dishes you've marked as favorites."
          count={stats.favoritesCount}
          actionText="View Menu"
          actionHref={`/${locale}/menu`}
        />

        <AccountCard
          icon={<FiMapPin />}
          iconBg="bg-green-100 text-green-600"
          title="Delivery Addresses"
          href={`/${locale}/my-account/settings`}
          description="Manage your saved delivery locations for faster checkout."
          count={stats.addressesCount}
          actionText="Add Address"
          actionHref={`/${locale}/my-account/settings`}
        />

        <AccountCard
          icon={<FiCreditCard />}
          iconBg="bg-blue-100 text-blue-600"
          title="Payment Methods"
          href={`/${locale}/my-account/settings`}
          description="Manage your saved cards or payment options securely."
          count={stats.paymentMethodsCount}
          actionText="Add Payment"
          actionHref={`/${locale}/my-account/settings`}
        />

        <AccountCard
          icon={<FiSettings />}
          iconBg="bg-gray-100 text-gray-600"
          title="Settings"
          href={`/${locale}/my-account/settings`}
          description="Update your profile info, preferences, or contact details."
          count={null}
          actionText="Go to Settings"
          actionHref={`/${locale}/my-account/settings`}
        />
      </div>
    </div>
  );
}
