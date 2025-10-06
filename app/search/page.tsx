
import { SearchAnime } from "../fetch/api/route";
import Link from "next/link";

type Anime = {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || "";

  if (!query) {
    return <p className="text-white">Please enter a search term.</p>;
  }

  const data = await SearchAnime(query) as Anime[];

  return (
    <div className="flex flex-col items-start justify-center min-h-[150vh] p-4">
      <h1 className="text-white text-2xl font-semibold mb-4">
        Search Results for <b className="text-[#28a76f] font-semibold">{query}</b>
      </h1>
      <div className="flex flex-wrap justify-start items-center gap-4">
        {data.length > 0 ? (
          data.map((anime) => (
          <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
              <div
              key={anime.mal_id}
              className="w-[280px] m-2 bg-[#1a1a1a] p-4 rounded-lg hover:scale-105 transition-transform duration-200"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-64 object-contain rounded-md mb-2"
              />
              <h2 className="text-white text-md font-medium text-center">
                {anime.title}
              </h2>
            </div>
            </Link>
          ))
        ) : (
          <p className="text-white">No results found.</p>
        )}
      </div>
    </div>
  );
}
