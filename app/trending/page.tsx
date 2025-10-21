import { getAnime } from '../fetch/api/fetchfunctions';
import TrendingAnime from './TrendingAnime';
import { getManga } from '../fetch/api/fetchfunctions';
import TrendingManga from './TrendingManga';
export default async function Trending() {
  const anime = await getAnime();
  const manga = await getManga();
  return (
    <>
      <TrendingAnime anime={anime} />
      <div className="empty h-[150px] opacity-0" />
      <TrendingManga manga={manga} />
    </>
  );
}
