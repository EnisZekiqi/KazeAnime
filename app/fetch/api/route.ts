import axios from "axios";


/// Anime APIs

export async function getAnime() {
    const res = await axios.get('https://api.jikan.moe/v4/anime')

    return res.data.data
}

export async function getAnimePage({ pageParam = 1 }: { pageParam?: number }) {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?page=${pageParam}`)
    return res.data
}

export async function AnimeID(id:number) {
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`)
    return res.data.data
}

export async function AnimeCharacter(id:number) {
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
    return res.data.data
}


export async function SearchAnime(query:string) {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`)
    return res.data.data
}

export async function CharacterID(id:number) {
    const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}/full`)
    return res.data.data
}


//// Manga APIs

export async function getManga() {
    const res = await axios.get('https://api.jikan.moe/v4/manga')
    return res.data.data
}


export async function MangaID(id:number) {
    const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}`)
    return res.data.data
}


export async function MangaCharacter(id:number) {
    const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}/characters`)
    return res.data.data
}
