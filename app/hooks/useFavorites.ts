'use client';

import { useState, useEffect } from 'react';

// defaultType: optional string to tag items saved without a `type` field (e.g. 'anime' or 'manga')
export default function useFavorites<
  T extends { mal_id: string | number; type?: string },
>(defaultType?: string) {
  const [favorites, setFavorites] = useState<Array<T & { type: string }>>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  const isFavorite = (item: T) => {
    const itemType = (item as any).type ?? defaultType ?? 'unknown';
    return favorites.some(
      (fav) => fav.mal_id === item.mal_id && fav.type === itemType
    );
  };

  const addFavorite = (item: T) => {
    const itemType = (item as any).type ?? defaultType ?? 'unknown';
    const itemWithType = { ...(item as any), type: itemType } as T & {
      type: string;
    };

    if (!isFavorite(item)) {
      const updatedFavorites = [...favorites, itemWithType];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (item: T) => {
    const itemType = (item as any).type ?? defaultType ?? 'unknown';
    const updatedFavorites = favorites.filter(
      (fav) => !(fav.mal_id === item.mal_id && fav.type === itemType)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  return { favorites, addFavorite, removeFavorite, isFavorite };
}
