'use client';

import { useState, useEffect } from 'react';

// Generic type constraint: must have a `mal_id`, optionally a `type`
export default function useFavorites<
  T extends { mal_id: string | number; type?: string }
>(defaultType?: string) {
  const [favorites, setFavorites] = useState<Array<T & { type: string }>>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites) as Array<T & { type: string }>;
        setFavorites(parsed);
      } catch {
        console.error('Failed to parse favorites from localStorage');
      }
    }
  }, []);

  // ✅ Helper: always return a consistent type
  const resolveType = (item: T): string =>
    item.type ?? defaultType ?? 'unknown';

  const isFavorite = (item: T) => {
    const itemType = resolveType(item);
    return favorites.some(
      (fav) => fav.mal_id === item.mal_id && fav.type === itemType
    );
  };

  const addFavorite = (item: T) => {
    const itemType = resolveType(item);
    const itemWithType: T & { type: string } = { ...item, type: itemType };

    if (!isFavorite(item)) {
      const updatedFavorites = [...favorites, itemWithType];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (item: T) => {
    const itemType = resolveType(item);
    const updatedFavorites = favorites.filter(
      (fav) => !(fav.mal_id === item.mal_id && fav.type === itemType)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
