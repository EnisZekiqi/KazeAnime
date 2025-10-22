'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import QueryProvider from '../components/QueryProvider';
import { getMangaPage } from '../fetch/api/fetchfunctions';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getMangaSearch } from '../fetch/api/fetchfunctions';
import useMultiFilter from '../hooks/useMultiFilter';
import useFavorites from '../hooks/useFavorites';
import { BiBookmark, BiBookmarkHeart } from 'react-icons/bi';
import { motion } from 'motion/react';
type MangaData = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  title: string;
  score: number;
  genres: {
    name: string;
  }[];
  rank: number;
};

const MangaList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // ⏳ Debounce effect (waits 500ms after typing)
 useEffect(() => {
  const timeout = setTimeout(() => {
    setDebouncedSearch(searchQuery);
  }, 1000);

   return () => clearTimeout(timeout);
  }, [searchQuery]);

  // 🌊 Default infinite scroll (popular/trending)
  const defaultQuery = useInfiniteQuery({
    queryKey: ['animeList', 'default'],
    queryFn: ({ pageParam = 1 }) => getMangaPage({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !debouncedSearch.trim(), // Only runs when no search
  });

  // 🔍 Infinite search query
  const searchQueryData = useInfiniteQuery({
    queryKey: ['animeList', 'search', debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getMangaSearch({ searchQuery: debouncedSearch, pageParam }),
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

  const [scrollTop, setScrollTop] = useState(false);

  // Scroll listener and handler: must run on every render (hook order)
  useEffect(() => {
    const handleScroll = () => {
      // If the scroll position is greater than 100px, show the button
      if (window.scrollY > 100) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { addFavorite, removeFavorite, isFavorite } =
    useFavorites<MangaData>('mangaFavorites');
  const { setFilters, filteredItems } = useMultiFilter<MangaData>(allAnime, [
    'score',
    'genres',
  ]);

  const score = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const genres = filteredItems.flatMap((item) =>
    item.genres.map((g) => g.name)
  );

  if (activeData.isLoading)
    return (
      <div className="h-screen">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-full w-12 h-12 border-4 border-white border-t-transparent animate-spin" />
        </div>
      </div>
    );
  if (activeData.error) return <div>Error loading data</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 mt-6 md:mt-0 md:gap-0 px-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search manga..."
          className="focus:outline-[#32cd87]/70 px-3 py-2 text-white rounded border border-[#a5a5a5] bg-[#1a1a1a] w-full max-w-md"
        />
        <div className="flex justify-between md:justify-baseline items-center gap-2 w-full md:w-auto">
          <select
            name="score"
            onChange={(e) => setFilters('score', e.target.value)}
            className="bg-[#1a1a1a] text-sm sm:text-base text-white px-3 py-2 rounded border border-[#333] focus:outline-[#32cd87]/70"
          >
            <option value="">Filter by Score</option>
            {score.map((s, index) => (
              <option key={index} value={s}>
                {s}+
              </option>
            ))}
          </select>
          <select
            name="genres"
            onChange={(e) => setFilters('genres', e.target.value)}
            className="bg-[#1a1a1a] text-sm sm:text-base text-white px-3 py-2 rounded border border-[#333] focus:outline-[#32cd87]/70"
          >
            <option value="">Filter by Genre</option>
            {Array.from(new Set(genres))
              .sort()
              .map(
                (g, index) =>
                  g && (
                    <option key={index} value={g}>
                      {g}
                    </option>
                  )
              )}
          </select>
        </div>
      </div>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center items-center">
        {filteredItems.map((manga: MangaData) => (
          <Link
            href={`/manga/${manga.mal_id}`}
            key={manga.mal_id}
            className="w-[280px] h-full p-4"
          >
            <div className="relative flex flex-col items-center sm:items-start justify-center w-[300px] sm:w-[425px] h-full p-4 border border-[#333] hover:border-[#28a76f] bg-[#1a1a1a] rounded-lg m-2 transition-all duration-200 overflow-hidden">
              <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
              <button
                type="button"
                aria-label={
                  isFavorite(manga) ? 'Remove favorite' : 'Add favorite'
                }
                title={isFavorite(manga) ? 'Remove favorite' : 'Add favorite'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // toggle favorite
                  if (isFavorite(manga)) removeFavorite(manga);
                  else addFavorite(manga);
                }}
                className="absolute cursor-pointer top-1 right-1 w-9 h-9 p-1.5 sm:p-1 text-white rounded-lg  sm:bg-transparent hover:text-[#32cd87]/70 opacity-100 rounded-br-lg"
              >
                {isFavorite(manga) ? (
                  <BiBookmarkHeart size={25} />
                ) : (
                  <BiBookmark size={25} />
                )}
              </button>
              <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-4">
                <img
                  src={manga.images.jpg.image_url}
                  alt={manga.title}
                  className="sm:w-36 sm:h-48 w-[280px] h-[200px]  sm:object-cover object-contain rounded-md mb-2 relative z-10"
                />
                <div className="flex flex-col justify-around h-full items-start gap-4 sm:gap-0">
                  <div className="">
                    <h2 className="text-white text-[16px] sm:text-[16px] font-medium text-start relative z-10">
                      {manga.title}
                    </h2>
                    <p className="text-white text-sm font-light relative z-10 mt-2">
                      Rank:{' '}
                      <em className="text-[#32cd87]">{manga.rank || 'N/A'}</em>
                    </p>
                    <p className="text-white text-sm font-light relative z-10 mt-2">
                      Score:{' '}
                      <em className="text-[#32cd87]">{manga.score || 'N/A'}</em>
                    </p>
                  </div>

                  {/* genres pinned to bottom */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {manga.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[#245F37] text-white px-2 py-1 rounded-full relative z-10"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
      <div className="w-full flex items-center justify-center">
        {/* Floating scroll-to-top button */}
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
              {activeData.isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
      {filteredItems.length === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-full w-12 h-12 border-4 border-white border-t-transparent animate-spin" />
        </div>
      )}

      {activeData.isFetching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-full w-12 h-12 border-4 border-white border-t-transparent animate-spin" />
        </div>
      )}
    </>
  );
};

export default function Page() {
  return (
    <QueryProvider>
      <MangaList />
    </QueryProvider>
  );
}
