'use client'
import { useQuery } from "@tanstack/react-query";
import QueryProvider from "../components/QueryProvider";
import { getAnimePage } from "../fetch/api/route";
import { useInfiniteQuery } from "@tanstack/react-query";
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return ( 
        <>
        <h1>Anime List</h1>
        <div className="grid grid-cols-4">
            {data?.pages.map((page) =>
    page.data.map((anime: AnimeData) => (
      <div key={anime.mal_id} className="p-4 border border-gray-300 m-2">
        <h2 className="text-lg font-bold">{anime.title}</h2>
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-15 h-20 mt-2"
        />
      </div>
    ))
  )}
        </div>
      {hasNextPage && (
        <button className="bg-green-400 text-black p-1 rounded-lg" onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
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