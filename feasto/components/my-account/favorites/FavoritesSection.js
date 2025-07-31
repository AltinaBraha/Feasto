"use client";

import { useMemo } from "react";
import SearchBar from "@/components/common/SearchBar";
import FavoriteCard from "./FavoriteCard";
import { useTranslations } from "next-intl";

export default function FavoritesSection({ favorites, searchTerm, setSearchTerm }) {
  const t = useTranslations("Favorites");
  const favoriteItems = useMemo(() => Object.values(favorites), [favorites]);

  const filteredFavorites = useMemo(() => {
    return favoriteItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favoriteItems, searchTerm]);

  if (favoriteItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-orange-50 to-white rounded-lg">
        <img
          src="/images/empty-favorites.svg"
          alt={t("noFavoritesYet")}
          className="w-52 mb-6 drop-shadow-md"
        />
        <p className="text-lg mb-4 text-gray-700">
          {t("noFavoritesYet")}
        </p>
        <a
          href="/menus/food"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          {t("browseMenu")}
        </a>
      </div>
    );
  }

  return (
    <section className="p-6 rounded-lg max-w-6xl mx-auto">
      <div className="max-w-lg mx-auto mb-10">
        <SearchBar
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredFavorites.map((item, index) => {
            const key = item.itemId ?? index;
            return <FavoriteCard key={key} item={item} />;
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">{t("noFavoritesMatch")}</p>
      )}
    </section>
  );
}
