'use client'

import Link from "next/link";
import QueryProvider from "../components/QueryProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getAnimePage, getAnimeSearch } from "../fetch/api/route";
import debounce from "lodash.debounce"; // npm install lodash.debounce

type AnimeData = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  genres: {
    name: string;
  }[];
};

const AnimeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ⏳ Debounce effect (waits 500ms after typing)
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    handler();
    return () => handler.cancel();
  }, [searchQuery]);

  // 🌊 Default infinite scroll (popular/trending)
  const defaultQuery = useInfiniteQuery({
    queryKey: ["animeList", "default"],
    queryFn: ({ pageParam = 1 }) => getAnimePage({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !debouncedSearch.trim(), // Only runs when no search
  });

  // 🔍 Infinite search query
  const searchQueryData = useInfiniteQuery({
    queryKey: ["animeList", "search", debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getAnimeSearch({ searchQuery: debouncedSearch, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!debouncedSearch.trim(), // Only runs when searching
  });

  // 🎬 Use active dataset (search or default)
  const activeData = debouncedSearch.trim() ? searchQueryData : defaultQuery;
  const allAnime = activeData.data?.pages.flatMap((page) => page.data) || [];

  // 🆙 Scroll-to-top button
  const [scrollTop, setScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (activeData.isLoading) return <div>Loading...</div>;
  if (activeData.error) return <div>Error loading data</div>;

  return (
    <>
      <div className="flex items-center justify-between w-full px-6 py-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anime..."
          className="focus:outline-[#32cd87]/70 px-3 py-2 text-white rounded border border-[#a5a5a5] bg-[#1a1a1a] w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-4 gap-6 justify-center items-center">
        {allAnime.map((anime: AnimeData) => (
          <Link
            href={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="w-[280px] h-full p-4"
          >
            <div className="relative flex flex-col items-center justify-center w-[280px] h-full p-4 border border-[#333] hover:border-[#28a76f] bg-[#1a1a1a] rounded-lg m-2 transition-all duration-200 overflow-hidden">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-36 h-48 object-cover rounded-md mb-2 relative z-10"
              />
              <h2 className="text-white text-[14px] font-medium text-center relative z-10 mt-4">
                {anime.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {scrollTop && (
        <button
          aria-label="Scroll to top"
          title="Scroll to top"
          onClick={handleScrollToTop}
          className="fixed bottom-6 cursor-pointer right-6 z-50 p-2.5 border border-[#333] rounded-full bg-[#245F37] text-white shadow-lg hover:scale-105 transition-transform"
        >
          ▲
        </button>
      )}

      <div className="w-full flex items-center justify-center mt-8 mb-4">
        {activeData.hasNextPage && (
          <button
            className="px-5 py-3 font-medium cursor-pointer text-sm sm:text-md bg-[#245F37] text-[#fff] rounded-xl transition"
            onClick={() => activeData.fetchNextPage()}
          >
            {activeData.isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
};

export default function AnimePage() {
  return (
    <QueryProvider>
      <AnimeList />
    </QueryProvider>
  );
}
