'use client'
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
            <div className="flex items-center justify-around">
                {anime.slice(0,7).map((item:Anime)=>(
                    <div key={item.mal_id} className="flex flex-col items-center bg-[#1a1a1a] p-4 rounded-lg m-2 hover:scale-105 transition-transform duration-200">
                        <img src={item.images.jpg.image_url} alt={item.title} className="w-32 h-48 object-cover rounded-md mb-2"/>
                        <h2 className="text-white text-md font-medium text-center">{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
        </>
     );
}
 
export default TrendingAnime;