import { getAnime } from "./api/route"


export default async function SSRAnime() {

    const anime = await getAnime()

    return(
        <>
        {anime.map((item)=>(
            <div key={item.id} className="">
                <h1>Titles</h1>
               <p className="text-white"> {item.title}</p>
            </div>
        ))}
        </>
    )
}