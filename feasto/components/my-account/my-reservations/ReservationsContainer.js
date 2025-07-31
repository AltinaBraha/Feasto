"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { getReservationsByUser } from "@/lib/firebase/reservations";
import { format, isBefore } from "date-fns";
import { de, enUS, sq } from "date-fns/locale";
import {
  FaCalendarAlt,
  FaClock,
  FaUserFriends,
  FaChair,
} from "react-icons/fa";

import SearchBar from "@/components/common/SearchBar";
import StatusBadge from "./StatusBadge";
import Detail from "./Detail";

import { useTranslations, useLocale } from "next-intl";

export default function ReservationsClient() {
  const t = useTranslations("Reservations");
  const locale = useLocale(); // get current locale from next-intl
  const user = useAuthStore((state) => state.user);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [search, setSearch] = useState("");

  const localeMap = {
    de,
    en: enUS,
    xk: sq,
  };
  const dateFnsLocale = localeMap[locale] || enUS;

  useEffect(() => {
    if (!user) {
      setReservations([]);
      setLoading(false);
      return;
    }
    async function loadReservations() {
      setLoading(true);
      const data = await getReservationsByUser(user.uid);
      setReservations(
        data.sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        )
      );
      setLoading(false);
    }
    loadReservations();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <h2 className="text-xl font-bold text-gray-800">{t("loginPrompt")}</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-lg font-medium text-gray-600">{t("loading")}</p>
      </div>
    );
  }

  const now = new Date();
  const upcoming = reservations.filter(
    (res) => new Date(`${res.date}T${res.time}`) >= now
  );
  const past = reservations.filter((res) =>
    isBefore(new Date(`${res.date}T${res.time}`), now)
  );

  const filtered = (activeTab === "upcoming" ? upcoming : past).filter((res) => {
    const dateTime = new Date(`${res.date}T${res.time}`);
    const month = format(dateTime, "MMMM", { locale: dateFnsLocale }).toLowerCase();
    return (
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      month.includes(search.toLowerCase())
    );
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <SearchBar
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-10 max-w-2xl mx-auto"
      />

      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-12">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 text-lg font-semibold tracking-wide border-b-4 transition-all ${
              activeTab === "upcoming"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-gray-600 hover:text-orange-600"
            }`}
          >
            {t("tabs.upcoming")}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-3 text-lg font-semibold tracking-wide border-b-4 transition-all ${
              activeTab === "past"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-gray-600 hover:text-orange-600"
            }`}
          >
            {t("tabs.past")}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center mt-20 text-gray-600 space-y-3">
          <p className="text-lg italic font-medium">
            {activeTab === "upcoming"
              ? t("empty.upcoming")
              : t("empty.past")}
          </p>
        </div>
      ) : (
        <ul className="space-y-10">
          {filtered.map((res) => {
            const dateTime = new Date(`${res.date}T${res.time}`);
            const formattedDate = format(dateTime, "EEEE, MMM d, yyyy", { locale: dateFnsLocale });
            const formattedTime = format(dateTime, "h:mm a", { locale: dateFnsLocale });

            return (
              <li
                key={res.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-l-4 border-orange-500"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    {formattedDate} <span className="text-gray-400 font-normal">•</span> {formattedTime}
                  </h2>
                  <StatusBadge status={res.status} />
                </div>

                <div className="mt-4">
                  <p className="text-gray-800 font-semibold">{res.name}</p>
                  <p className="text-sm text-gray-500">{res.email}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 text-base">
                  <Detail icon={<FaUserFriends />} label={t("details.guests")} value={res.people} />
                  <Detail icon={<FaChair />} label={t("details.tables")} value={res.tables?.join(", ") || "—"} />
                  <Detail icon={<FaCalendarAlt />} label={t("details.date")} value={res.date} />
                  <Detail icon={<FaClock />} label={t("details.time")} value={res.time} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
