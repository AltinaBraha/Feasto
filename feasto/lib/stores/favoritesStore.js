import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: {},
  addFavorite: (itemId, itemData) =>
    set((state) => ({
      favorites: { ...state.favorites, [itemId]: itemData },
    })),
  removeFavorite: (itemId) =>
    set((state) => {
      const newFavs = { ...state.favorites };
      delete newFavs[itemId];
      return { favorites: newFavs };
    }),
  setFavorites: (favoritesMap) => set({ favorites: favoritesMap }),
  clearFavorites: () => set({ favorites: {} }),
}));
