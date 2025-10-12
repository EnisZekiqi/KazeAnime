'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import QueryProvider from "../components/QueryProvider";
import { getMangaPage } from "../fetch/api/route";
import Link from "next/link";
import { useState,useEffect } from "react";
import debounce from "lodash.debounce"; // npm install lodash.debounce
import { getMangaSearch } from "../fetch/api/route";
import useMultiFilter from "../hooks/useMultiFilter";
type MangaData = {
    mal_id:number,
    images:{
        jpg:{
            image_url:string
        }
    }
    title:string
    score:number
    genres:{
        name:string
    }[]
}

const MangaList = () => {

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
       queryKey: ["animeList", "search", debouncedSearch],
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
   
const [scrollTop,setScrollTop]=useState(false)

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


const {setFilters,filteredItems} =useMultiFilter<MangaData>(allAnime, ['score','genres'])

 if (activeData.isLoading) return <div>Loading...</div>;
  if (activeData.error) return <div>Error loading data</div>;

    return ( 
        <>
        <div className="flex items-center justify-between w-full px-6">
           <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search manga..."
          className="focus:outline-[#32cd87]/70 px-3 py-2 text-white rounded border border-[#a5a5a5] bg-[#1a1a1a] w-full max-w-md"
        />
        <div className="flex items-center gap-2">
          <select name="score" onChange={(e)=>setFilters(e.target.value)} className="bg-[#1a1a1a] text-white px-3 py-2 rounded border border-[#333] focus:outline-[#32cd87]/70">
            <option value="">Filter by Score</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            </select>
            <select name="genres" onChange={(e)=>setFilters(e.target.value)} className="bg-[#1a1a1a] text-white px-3 py-2 rounded border border-[#333] focus:outline-[#32cd87]/70">
            <option value="">Filter by Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Slice of Life">Slice of Life</option>
            <option value="Sports">Sports</option>
            <option value="Supernatural">Supernatural</option>
            </select>
        </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
           {filteredItems.map((manga: MangaData) => (
      <Link key={manga.mal_id} href={`/manga/${manga.mal_id}`} className=" w-[280px] h-full p-4">
        <div className="relative flex flex-col items-center justify-center w-[280px] h-full p-4 border border-[#333] hover:border-[#28a76f] bg-[#1a1a1a]  rounded-lg m-2  transition-all duration-200 overflow-hidden">
                 
       <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
       <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
        <img
          src={manga.images.jpg.image_url}
          alt={manga.title}
          className="w-36 h-48 object-cover rounded-md mb-2 relative z-10"
        />
         <h2 className="text-white text-[14px] font-medium text-center relative z-10 mt-4">{manga.title}</h2>
      </div>
            </Link>
        ))}
        </div>
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
            {activeData.isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
      </div>
        </>
     );
}
 
export default function Page() {
    return(
        <QueryProvider>
            <MangaList/>
        </QueryProvider>
    )
};