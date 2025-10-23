import { SearchAnime } from '../fetch/api/fetchfunctions';
import Link from 'next/link';

type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

export default async function SearchPage(props: unknown) {
  const { searchParams } = props as { searchParams: { query?: string } };
  const query = searchParams.query ?? '';

  if (!query) {
    return <p className="text-white h-screen text-center flex items-center justify-center font-medium text-xl">Please enter a search term.</p>;
  }

  const data = (await SearchAnime(query)) as Anime[];

  return (
    <div className="flex flex-col items-center sm:items-start justify-center min-h-[150vh] p-4">
      <h1 className="text-white text-xl sm:text-2xl font-medium mb-4 w-full text-start">
        Search Results for{' '}
        <b className="text-[#28a76f] font-semibold">{query}</b>
      </h1>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
        {data.length > 0 ? (
          data.map((anime) => (
            <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
              <div
                key={anime.mal_id}
                className="w-[280px] h-[360px] relative flex flex-col items-center justify-center border overflow-hidden border-[#343434] hover:border-[#28a76f] m-2 bg-[#1a1a1a] p-4 rounded-lg transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-contain rounded-md mb-2 relative z-10"
                />
                <h2 className="text-white text-md font-medium text-center relative z-10 mt-4">
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
