"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import {
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "@/lib/firebase/favorites";
import { useFavoritesStore } from "@/lib/stores/favoritesStore";
import { toast } from "react-toastify";

export default function Favorite({ itemId, itemData }) {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavoriteStore = useFavoritesStore((state) => state.addFavorite);
  const removeFavoriteStore = useFavoritesStore((state) => state.removeFavorite);

  const isFavorite = !!favorites[itemId];

  useEffect(() => {
    let cancelled = false;
    async function checkAndSync() {
      if (!user) {
        removeFavoriteStore(itemId);
        return;
      }
      if (!favorites[itemId]) {
        setLoading(true);
        const exists = await checkFavorite(user.uid, itemId);
        if (!cancelled && exists) {
          addFavoriteStore(itemId, itemData);
        }
        setLoading(false);
      }
    }
    checkAndSync();

    return () => {
      cancelled = true;
    };
  }, [user, itemId, addFavoriteStore, removeFavoriteStore, itemData]);


     async function toggleFavorite() {
    if (!user) {
      toast.error("Login to add Favorites");
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(user.uid, itemId);
        removeFavoriteStore(itemId);
      } else {
        await addFavorite(user.uid, itemId, itemData);
        addFavoriteStore(itemId, itemData);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={toggleFavorite}
      disabled={loading}
      className={`p-1 transition-colors
        ${isFavorite ? "text-orange-500" : "text-orange-400 hover:text-orange-500"}
        focus:outline-none focus:ring-0`}
    >
      {isFavorite ? (
        <HeartSolid className="h-6 w-6" />
      ) : (
        <HeartOutline className="h-6 w-6" />
      )}
    </button>
  );
}