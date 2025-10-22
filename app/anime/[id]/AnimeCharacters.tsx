'use client';
import { useState } from 'react';
import Link from 'next/link';

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

type CharacterProps = {
  character: Character[];
};

const AnimeCharacters = ({ character }: CharacterProps) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      {character && character.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4 text-white">Characters</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {character.slice(0, visibleCount).map((char) => (
              <Link
                key={char.mal_id}
                href={`/characters/${char.character.mal_id}`}
              >
                <div className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center h-full">
                  <img
                    src={char.character.images.jpg.image_url}
                     loading='lazy'
                    className="w-full sm:h-22 md:h-40 lg:h-60 object-contain "
                    alt=""
                  />
                  <h3 className="text-white text-md font-medium text-center mt-4">
                    {char.character.name}
                  </h3>
                  <p className="text-[#a5a5a5] text-sm font-light text-center">
                    {char.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {visibleCount < character.length && (
        <div className="flex w-full items-center justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-[#245F37] text-white rounded-lg hover:bg-[#28a76f] transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default AnimeCharacters;
