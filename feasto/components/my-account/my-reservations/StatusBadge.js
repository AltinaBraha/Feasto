"use client";

import { useTranslations } from "next-intl";

export default function StatusBadge({ status }) {
  const t = useTranslations("Reservations.status");

  const statusColors = {
    confirmed: "border-green-500 text-green-600 bg-green-50",
    pending: "border-amber-400 text-amber-600 bg-amber-50",
    cancelled: "border-red-400 text-red-600 bg-red-50",
  };
  const statusDots = {
    confirmed: "bg-green-500",
    pending: "bg-amber-400",
    cancelled: "bg-red-400",
  };

  const colorClass = statusColors[status] || statusColors.pending;
  const dotClass = statusDots[status] || statusDots.pending;

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-1.5 rounded-full border ${colorClass}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`}></span>
      {t(status)}
    </span>
  );
}
