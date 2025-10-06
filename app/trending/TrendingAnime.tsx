'use client'
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

type AnimeProps = {
    anime: Anime[];
}

const TrendingAnime = ({anime}:AnimeProps) => {
    return ( 
        <>
         <div className="flex flex-col items-start gap-4">
            <h1 className="text-white text-2xl font-semibold">Trending Anime</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-around gap-10">
                {anime.slice(0,5).map((item:Anime)=>(
                   <Link key={item.mal_id} href={`/anime/${item.mal_id}`}>
                    <div  className="relative flex flex-col items-center border border-[#333] bg-[#1a1a1a] w-[280px] h-full p-4 rounded-lg m-2 hover:scale-105 transition-transform duration-200 overflow-hidden">
                        {/* top-left decorative gradient — absolute so it stays anchored to this card */}
                        <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                         <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                        <img src={item.images.jpg.image_url} alt={item.title} className="w-36 h-48 object-cover rounded-md mb-2 relative z-10"/>
                        <h2 className="text-white text-[14px] font-medium text-center relative z-10 mt-4">{item.title}</h2>
                    </div>
                   </Link>
                ))}
            </div>
        </div>
        </>
     );
}
 
export default TrendingAnime;