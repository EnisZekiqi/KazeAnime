import { AnimeCharacter, AnimeID } from '@/app/fetch/api/fetchfunctions';
import AnimeCharacters from './AnimeCharacters';

type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  rating: string;
  score: number;
  rank: number;
  genres: { name: string; mal_id: number }[];
  synopsis: string;
  episodes: number;
  role: string;
  aired: {
    to: string;
    from: string;
  };
};

type Character = {
  mal_id: number;
  character: {
    name: string;
    role: string;
    mal_id: number;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
      };
    };
  };
  about: string;
  role:string
};

export default async function DetailsAnime(props: unknown) {
  const { params } = props as { params: Promise<{ id: string }> };
  const { id } = await params;

  const idNumber = Number(id);

  try {
    const [dataRes, charRes] = await Promise.all([
      AnimeID(idNumber).catch((err) => {
        console.error('AnimeID fetch error:', err);
        return null;
      }),
      AnimeCharacter(idNumber).catch((err) => {
        console.error('AnimeCharacter fetch error:', err);
        return [];
      }),
    ]);

    if (!dataRes) {
      return <div className="text-white p-6">Anime not found.</div>;
    }

    const data = dataRes;
    const character = charRes;

   

    return (
      <>
        {data && (
          <div className="flex flex-col items-start justify-center min-h-full p-2 sm:p-4">
            <div className=" p-6 flex flex-col items-start gap-4 rounded-lg shadow-lg max-w-7xl w-full">
              <div className="flex flex-col md:flex-row items-center md:items-start">
               <img
                src={data?.images?.jpg?.large_image_url ?? "/placeholder.jpg"}
                alt={data?.title ?? "Unknown anime"}
                   loading='lazy'
                  className="w-full h-fit rounded-lg mb-4 md:mb-0 md:mr-6"
                />
                <div className="text-white">
                  <h1 className="text-2xl sm:text-3xl font-semibold sm:font-bold mb-2">
                    {data.title}
                  </h1>
                  <p className="mb-3">
                    <span className="font-semibold text-[#32cd87]">
                      Episodes:
                    </span>{' '}
                    {data.episodes}
                  </p>
                  <p className="mb-3">
                    <span className="font-semibold text-[#32cd87]">Aired:</span>{' '}
                    {data?.aired?.from
                    ? new Date(data.aired.from).toLocaleDateString()
                    : "N/A"}
                    -{' '}
                    {data.aired.to
                      ? new Date(data.aired.to).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <p className="mb-3">
                    <span className="font-semibold text-[#32cd87]">Rating:</span>{' '}
                   {data?.rating ?? "N/A"}
                  </p>
                  <p className="mb-3">
                    <span className="font-semibold text-[#32cd87]">Score:</span>{' '}
                    {data?.score ?? "N/A"}
                  </p>
                  <p className="mb-3">
                    <span className="font-semibold text-[#32cd87]">Rank:</span>{' '}
                    {data?.rank ?? "N/A"}
                  </p>
                  <div className="mb-3">
                    <span className="font-semibold text-[#32cd87]">Genres:</span>{' '}
                      {data?.genres?.map((g: { name: string; mal_id: number }) => g.name).join(", ") ?? "N/A"}
                  </div>
                  <p className="mt-4 text-[#a5a5a5] text-sm font-light">
                    {data.synopsis}
                  </p>
                </div>
              </div>
              <AnimeCharacters character={character} />
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return <div className="text-white p-6">Error loading anime details.</div>;
  }
}
