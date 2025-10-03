import axios from "axios";

export async function getAnime() {
    const res = await axios.get('https://api.jikan.moe/v4/anime')

    return res.data.data
}

export async function getManga() {
    const res = await axios.get('https://api.jikan.moe/v4/manga')
    return res.data.data
}