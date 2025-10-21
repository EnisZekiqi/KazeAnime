import { MangaID } from '../../fetch/api/route';
import { MangaCharacter } from '@/app/fetch/api/route';
import MangaCharacters from './MangaCharacters';
type MangaData = {
  mal_id: number;
  title: string;
  images?: {
    jpg?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  // Manga may have chapters/volumes instead of episodes
  chapters?: number;
  volumes?: number;
  // published is the manga equivalent of aired
  published?: {
    from?: string;
    to?: string;
  };
  rating?: string;
  score?: number;
  rank?: number;
  genres?: { name: string; mal_id: number }[];
  synopsis?: string;
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
};

export default async function DetailsManga({
  params,
}: {
  params: { id: string };
}) {
  const idNumber = Number(params.id);

  const [manga, characters] = await Promise.all([
    MangaID(idNumber) as Promise<MangaData>,
    MangaCharacter(idNumber) as Promise<Character>,
  ]);

  return (
    <>
      {manga && (
        <div className="flex flex-col items-start justify-center min-h-full p-4">
          <div className=" p-6 flex flex-col items-start gap-4 rounded-lg shadow-lg max-w-7xl w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {manga?.images?.jpg?.image_url ? (
                <img
                  src={manga.images.jpg.image_url}
                  alt={manga.title}
                  loading='lazy'
                  className="w-full h-fit rounded-lg mb-4 md:mb-0 md:mr-6"
                />
              ) : (
                <div className="w-full h-60 bg-[#111] rounded-lg mb-4 md:mb-0 md:mr-6 flex items-center justify-center text-sm text-[#777]">
                  No image
                </div>
              )}
              <div className="text-white">
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
                </div>
                <p className="mb-3">
                  <span className="font-semibold text-[#32cd87]">
                    Chapters:
                  </span>{' '}
                  {manga.chapters ?? 'N/A'}
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-[#32cd87]">
                    Published:
                  </span>{' '}
                  {manga.published?.from
                    ? new Date(
                        manga.published.from as string
                      ).toLocaleDateString()
                    : 'N/A'}{' '}
                  -{' '}
                  {manga.published?.to
                    ? new Date(
                        manga.published.to as string
                      ).toLocaleDateString()
                    : 'N/A'}
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-[#32cd87]">Rating:</span>{' '}
                  {manga?.rating}
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-[#32cd87]">Score:</span>{' '}
                  {manga?.score}
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-[#32cd87]">Rank:</span>{' '}
                  {manga?.rank}
                </p>
                <div className="mb-3">
                  <span className="font-semibold text-[#32cd87]">Genres:</span>{' '}
                {(manga.genres?.map(g => g.name) ?? []).join(', ')}
                </div>
                <p className="mt-4 text-[#a5a5a5] text-sm font-light">
                  {manga.synopsis}
                </p>
              </div>
            </div>
            <MangaCharacters character={characters} />
          </div>
        </div>
      )}
    </>
  );
}
