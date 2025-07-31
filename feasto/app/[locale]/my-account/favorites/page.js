"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useFavoritesStore } from "@/lib/stores/favoritesStore";
import { getFavoritesMapByUser } from "@/lib/firebase/favorites";

import FavoritesSection from "@/components/my-account/favorites/FavoritesSection";
import RecommendedSection from "@/components/my-account/favorites/RecommendedSection";

import AccountBanner from "@/components/my-account/common/AccountBanner";

import foodData from "@/data/food.json";
import { useTranslations } from "next-intl";
import CartButton from "@/components/menu/CartButton";

export default function FavoritesPage() {
  const t = useTranslations("Favorites");
  const user = useAuthStore((s) => s.user);
  const favorites = useFavoritesStore((s) => s.favorites);
  const setFavoritesStore = useFavoritesStore((s) => s.setFavorites);
  const clearFavoritesStore = useFavoritesStore((s) => s.clearFavorites);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        clearFavoritesStore();
        setLoading(false);
        return;
      }
      setLoading(true);
      const favMap = await getFavoritesMapByUser(user.uid);
      setFavoritesStore(favMap);
      setLoading(false);
    }
    loadFavorites();
  }, [user, setFavoritesStore, clearFavoritesStore]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-lg text-gray-700 animate-pulse">
          {t("loadingFavorites")}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-orange-50 to-white rounded-lg">
        <p className="mb-4 text-lg text-gray-700">{t("pleaseLoginToView")}</p>
        <a
          href="/login"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          {t("goToLogin")}
        </a>
      </div>
    );
  }

  return (
    <>
      <AccountBanner title={t("favoriteDishes")} />
      <div className="bg-[rgba(221,89,3,0.05)] min-h-screen">
        <FavoritesSection
          favorites={favorites}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <RecommendedSection favorites={favorites} foodData={foodData} />
         <CartButton />
      </div>
    </>
  );
}
