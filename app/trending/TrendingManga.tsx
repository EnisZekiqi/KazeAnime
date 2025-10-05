'use client'


type Manga = {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}


type MangaProps = {
    manga: Manga[];
}

const TrendingManga = ({manga}:MangaProps) => {
    return ( 
        <>
         <div className="flex flex-col items-start gap-4">
            <h1 className="text-2xl font-semibold text-white">Trending Manga</h1>
            <div className="flex items-center justify-around">
                {manga.slice(0,5).map((item:Manga)=>(
                    <div key={item.mal_id} className="flex flex-col items-center w-[280px] h-full bg-[#1a1a1a] p-4 rounded-lg m-2 hover:scale-105 transition-transform duration-200">
                        <img src={item.images.jpg.image_url} alt={item.title} className="w-36 h-48 object-cover rounded-md mb-2"/>
                        <h2 className="text-white text-[14px] font-medium text-center">{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
        </>
     );
}
 
export default TrendingManga;