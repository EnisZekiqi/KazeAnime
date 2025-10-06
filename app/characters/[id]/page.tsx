import { CharacterID } from "@/app/fetch/api/route"

export default async function CharacterDetails({params}: {params: {id: number}}) {

    const {id} = params;

    const data = await CharacterID(id);

    return(
        <>
        {data && (
            <div className="flex flex-col items-start justify-center min-h-screen p-4 z-100">
                <div className=" p-6 flex flex-col items-start gap-4 rounded-lg shadow-lg max-w-3xl w-full bg-[#1a1a1a]">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <img src={data.images.jpg.image_url} alt={data.name} className="w-48 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"/>
                        <div className="text-white">
                            <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
                            <p className="mt-4 text-[#a5a5a5] text-sm font-light">{data.about ? data.about : "No description available."}</p>
                        </div>
                    </div>  
                </div>
            </div>
        )}
        </>
    )
}