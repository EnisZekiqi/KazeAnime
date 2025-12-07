import axios from 'axios';

/// Anime APIs

export async function getAnime() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime", {
    next: { revalidate: 3600 }, // Revalidate once per hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}

export async function getAnimePage({ pageParam = 1 }: { pageParam?: number }) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/anime?page=${pageParam}`
  );
  return res.data;
}

type SearchParams = {
  searchQuery: string;
  pageParam: number;
};

export async function getAnimeSearch({
  searchQuery,
  pageParam = 1,
}: SearchParams) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${searchQuery}&page=${pageParam}`
  );

  return res.data;
}

export async function AnimeID(id: number) {
  try {
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(`Error fetching anime with ID ${id}:`, error);
    throw error;
  }
}

export async function AnimeCharacter(id: number) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/anime/${id}/characters`
  );
  return res.data.data;
}

export async function SearchAnime(query: string) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query}&limit=10`
  );
  return res.data.data;
}

export async function CharacterID(id: number) {
  const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}/full`);
  return res.data.data;
}

//// Manga APIs

export async function getManga() {
  const res = await fetch("https://api.jikan.moe/v4/top/manga", {
    next: { revalidate: 3600 }, // Revalidate once per hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}

export async function MangaID(id: number) {
  const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
  return res.data.data;
}

export async function MangaCharacter(id: number) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/manga/${id}/characters`
  );
  return res.data.data;
}

export async function getMangaPage({ pageParam = 1 }: { pageParam?: number }) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/manga?page=${pageParam}`
  );
  return res.data;
}

export async function getMangaSearch({
  searchQuery,
  pageParam = 1,
}: SearchParams) {
  const res = await axios.get(
    `https://api.jikan.moe/v4/manga?q=${searchQuery}&page=${pageParam}`
  );

  return res.data;
}
