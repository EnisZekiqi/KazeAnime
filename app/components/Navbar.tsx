'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { BiMenuAltRight } from 'react-icons/bi';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const isAnime = pathname === '/anime' || pathname.startsWith('/anime/');
  const isManga = pathname === '/manga' || pathname.startsWith('/manga/');
  const isMyList = pathname === '/mylist' || pathname.startsWith('/mylist/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`setup  w-full fixed sm:relative top-0 z-[200] px-4 py-2.5  md:px-20 md:py-10`}
      >
        {/* Top row: logo (or image), desktop links, and menu button */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="hidden md:block text-2xl font-semibold text-white">
              <Link href={`/`}>KazeAnime</Link>
            </h1>
            <span className="block md:hidden">
              <img
                src="https://framerusercontent.com/images/xskSMX1ZvOzyPbACw9W97qU5M.png"
                className="w-8 h-8"
                alt="logo"
              />
            </span>
          </div>

          <ul className="hidden md:flex space-x-6 text-white bg-[#0E0E0E] border border-[#1E1E1E] px-6 py-5 rounded-2xl">
            <li
              className={`hover:text-[#32cd87] cursor-pointer transition-all duration-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              <a href="#features">Features</a>
            </li>
            <li
              className={`hover:text-[#32cd87] ${isAnime ? 'text-[#32cd87]' : 'text-white'} cursor-pointer transition-all duration-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={`/anime`}>Anime</Link>
            </li>
            <li
              className={`hover:text-[#32cd87] ${isManga ? 'text-[#32cd87]' : 'text-white'} cursor-pointer transition-all duration-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={`/manga`}>Manga</Link>
            </li>
            <li
              className={`hover:text-[#32cd87] ${isMyList ? 'text-[#32cd87]' : 'text-white'} cursor-pointer transition-all duration-100`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={`/mylist`}>My List</Link>
            </li>
          </ul>

          <motion.button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            className={`rounded-2xl ${isMenuOpen ? 'text-[#32cd87]' : 'text-white'} transition-all duration-300 p-3 opacity-100 md:opacity-0`}
          >
            <BiMenuAltRight size={25} />
          </motion.button>
        </div>

        {/* Collapsible content for mobile — opens under the top row */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <ul className="flex flex-col space-y-4 text-white text-2xl font-normal px-6 py-5 rounded-2xl">
                <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">
                  Features
                </li>
                <li
                  className="hover:text-[#32cd87] cursor-pointer transition-all duration-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href={`/anime`}>Anime</Link>
                </li>
                <li
                  className="hover:text-[#32cd87] cursor-pointer transition-all duration-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href={`/manga`}>Manga</Link>
                </li>
                <li
                  className="hover:text-[#32cd87] cursor-pointer transition-all duration-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href={`/mylist`}>My List</Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
