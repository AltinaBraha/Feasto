"use client";

import { useMemo } from "react";
import RecommendedCard from "./RecommendedCard";
import { useTranslations } from "next-intl";

export default function RecommendedSection({ favorites, foodData }) {
  const t = useTranslations("Favorites");
  const favoriteItems = useMemo(() => Object.values(favorites), [favorites]);

  const recommendedItems = useMemo(() => {
    if (favoriteItems.length === 0) {
      return foodData.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    const favoriteIds = new Set(favoriteItems.map((item) => item.itemId));
    const favoriteCategories = new Set(
      favoriteItems.map((item) => item.category).filter(Boolean)
    );

    const nonFavoriteItems = foodData.filter(
      (item) => !favoriteIds.has(item.itemId)
    );

    const categoryMatches = nonFavoriteItems.filter((item) =>
      favoriteCategories.has(item.category)
    );

    let recs = [...categoryMatches];

    if (recs.length < 3) {
      const needed = 3 - recs.length;
      const extras = nonFavoriteItems.filter((item) => !recs.includes(item));
      const shuffledExtras = extras.sort(() => 0.5 - Math.random());
      recs = recs.concat(shuffledExtras.slice(0, needed));
    }

    return recs.slice(0, 3);
  }, [favoriteItems, foodData]);

  if (favoriteItems.length >= 3) return null;

  return (
    <section className="mt-14 max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
        {t("recommendedForYou")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendedItems.map((item, index) => (
          <RecommendedCard key={item.itemId ?? index} item={item} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/menus/food"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg text-m font-bold hover:bg-orange-700 transition"
        >
          {t("exploreMenu")}
        </a>
      </div>
      <br />
    </section>
  );
}
