'use client'
import Link from "next/link";
import QueryProvider from "../components/QueryProvider";
import { getAnimePage } from "../fetch/api/route";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState,useEffect } from "react";
type AnimeData = {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}

const AnimeList = () => {
 const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['animeList'],
    queryFn: getAnimePage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });

  
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
  


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return ( 
        <>
        <h1>Anime List</h1>
        <div className="grid grid-cols-4 gap-6 justify-center items-center">
            {data?.pages.map((page) =>
    page.data.map((anime: AnimeData) => (
      <Link  href={`/anime/${anime.mal_id}`} className=" w-[280px] h-full p-4" key={anime.mal_id}>
        <div key={anime.mal_id} className="relative flex flex-col items-center justify-center w-[280px] h-full p-4 border border-[#333] hover:border-[#28a76f] bg-[#1a1a1a]  rounded-lg m-2  transition-all duration-200 overflow-hidden">
       
       <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
       <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-36 h-48 object-cover rounded-md mb-2 relative z-10"
        />
         <h2 className="text-white text-[14px] font-medium text-center relative z-10 mt-4">{anime.title}</h2>
      </div>
        </Link>
    ))
  )}
        </div>
      {scrollTop && (
          <button
            aria-label="Scroll to top"
            title="Scroll to top"
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#245F37] text-white shadow-lg hover:scale-105 transition-transform"
          >
            ▲
          </button>
        )}
      <div className="w-full flex items-center justify-center">
        {hasNextPage && (
        <button className="px-4.5 py-3 font-medium cursor-pointer text-sm sm:text-md -ml-12 sm:-ml-0 bg-[#245F37] text-[#fff] rounded-xl  transition " onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
      </div>
        </>
     );
}
 
export default function AnimePage() {
    return (
        <QueryProvider>
            <AnimeList />
        </QueryProvider>
    )
}