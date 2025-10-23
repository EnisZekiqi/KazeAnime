'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
type Favorites = {
  mal_id: number | string;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  type: string;
};

const MyList = () => {
  const [storedFav, setStoredFav] = useState<Favorites[]>([]);
  const [showAnime, setShowAnime] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setStoredFav(JSON.parse(storedFavorites));
    }
  }, []);

  const savedAnime = storedFav.filter(
    (item) => item.type?.toLowerCase() !== 'manga'
  );
  const savedManga = storedFav.filter(
    (item) => item.type?.toLowerCase() === 'manga'
  );

  return (
    <>
      <div className="flex flex-col items-start gap-10 min-h-full px-4 py-2.5  md:px-20 md:py-10">
        {storedFav.length === 0 ? (
          <div className="text-white flex flex-col gap-4 items-center h-[70vh] w-full justify-center">
            <svg
            width="50px"
            height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <g clip-path="url(#clip0_429_11038)">
                  {' '}
                  <path
                    d="M8.65704 3H16C17.1046 3 18 3.89543 18 5V12.343M6 5.99981V21L12 18L18 21V17.9998"
                    stroke="#32cd87"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{' '}
                  <path
                    d="M4.00012 4L20.0001 20"
                    stroke="#32cd87"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  ></path>{' '}
                </g>{' '}
                <defs>
                  {' '}
                  <clipPath id="clip0_429_11038">
                    {' '}
                    <rect width="24" height="24" fill="white"></rect>{' '}
                  </clipPath>{' '}
                </defs>{' '}
              </g>
            </svg>
            <p>No favorites added yet</p>
          </div>
        ) : (
          <div className="flex flex-col items-center sm:items-start gap-10 w-full">
            {/* Mobile-only tab buttons (visible only on smallest screens) */}

            <div className="w-full relative bg-transparent  flex gap-4 md:hidden">
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 w-1/2 h-full bg-[#245F37] rounded-full z-0"
                style={{
                  left: showAnime === true ? 0 : '50%',
                }}
              />
              <button
                className={`flex-1 py-2 text-center rounded z-[100] ${showAnime ? ' text-white' : 'bg-transparent text-white/80'}`}
                onClick={() => setShowAnime(true)}
              >
                Saved Anime
              </button>
              <button
                className={`flex-1 py-2 text-center rounded z-[100] ${!showAnime ? 'text-white' : 'bg-transparent text-white/80'}`}
                onClick={() => setShowAnime(false)}
              >
                Saved Manga
              </button>
            </div>
            {/* Saved Anime section */}
            <div className={`${showAnime ? 'block' : 'hidden'} md:block`}>
              <h1 className="text-2xl text-white font-medium hidden md:block">
                Saved Anime
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-around gap-10 w-full">
                {savedAnime.length === 0 ? <div className='flex text-white gap-4 flex-col items-center justify-center h-[400px]'>
                   <svg
            width="50px"
            height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <g clip-path="url(#clip0_429_11038)">
                  {' '}
                  <path
                    d="M8.65704 3H16C17.1046 3 18 3.89543 18 5V12.343M6 5.99981V21L12 18L18 21V17.9998"
                    stroke="#32cd87"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{' '}
                  <path
                    d="M4.00012 4L20.0001 20"
                    stroke="#32cd87"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  ></path>{' '}
                </g>{' '}
                <defs>
                  {' '}
                  <clipPath id="clip0_429_11038">
                    {' '}
                    <rect width="24" height="24" fill="white"></rect>{' '}
                  </clipPath>{' '}
                </defs>{' '}
              </g>
            </svg>
            <p>No Anime's added yet</p>
                </div> :savedAnime.map((anime: Favorites) => (
                  <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                    <div className="relative flex flex-col items-center justify-center border border-[#333] hover:border-[#28a76f] bg-[#1a1a1a] w-[280px] h-full p-4 rounded-lg m-2  transition-all duration-200 overflow-hidden">
                      <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                      <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-36 h-48 object-cover rounded-md mb-2 relative z-10"
                      />
                      <h2 className="text-white text-[14px] font-medium text-center relative z-10 mt-4">
                        {anime.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Saved Manga section */}
            <div className={`${!showAnime ? 'block' : 'hidden'} md:block`}>
              <h1 className="text-2xl font-medium text-white hidden md:block">
                Saved Manga
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-around gap-10 w-full">
                {savedManga.length === 0 ? <div className='flex text-white gap-4 flex-col items-center justify-center h-[400px]'>
                   <svg
            width="50px"
            height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <g clip-path="url(#clip0_429_11038)">
                  {' '}
                  <path
                    d="M8.65704 3H16C17.1046 3 18 3.89543 18 5V12.343M6 5.99981V21L12 18L18 21V17.9998"
                    stroke="#32cd87"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{' '}
                  <path
                    d="M4.00012 4L20.0001 20"
                    stroke="#32cd87"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  ></path>{' '}
                </g>{' '}
                <defs>
                  {' '}
                  <clipPath id="clip0_429_11038">
                    {' '}
                    <rect width="24" height="24" fill="white"></rect>{' '}
                  </clipPath>{' '}
                </defs>{' '}
              </g>
            </svg>
            <p>No Manga's added yet</p>
                </div> :savedManga.map((anime: Favorites) => (
                  <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                    <div className="relative flex flex-col items-center justify-center border border-[#333] hover:border-[#28a76f] bg-[#1a1a1a] w-[280px] h-full p-4 rounded-lg m-2  transition-all duration-200 overflow-hidden">
                      <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                      <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-br from-[#54545400] via-[#245f37] to-[#245f37] opacity-70 rounded-br-lg pointer-events-none z-0 blur-lg" />
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-36 h-48 object-cover rounded-md mb-2 relative z-10"
                      />
                      <h2 className="text-white text-[14px] font-medium text-center relative z-10 mt-4">
                        {anime.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyList;
