'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <nav className={`setup  w-full fixed sm:relative top-0 z-[200] px-4 py-2.5  md:px-20 md:py-10`}>
                {/* Top row: logo (or image), desktop links, and menu button */}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="hidden md:block text-2xl font-semibold text-white">KazeAnime</h1>
                        <span className="block md:hidden"><img src="https://framerusercontent.com/images/xskSMX1ZvOzyPbACw9W97qU5M.png" className="w-8 h-8" alt="logo" /></span>
                    </div>

                    <ul className="hidden md:flex space-x-6 text-white bg-[#0E0E0E] border border-[#1E1E1E] px-6 py-5 rounded-2xl">
                        <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">Features</li>
                        <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">Anime</li>
                        <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">Manga</li>
                        <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">My List</li>
                    </ul>

                    <motion.button onClick={toggleMenu} aria-expanded={isMenuOpen} className={`rounded-2xl ${isMenuOpen ? 'rotate-45':'rotate-0'} p-3 opacity-100 md:opacity-0`}>
                         <svg className="w-7 h-7" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </motion.button>
                </div>

                {/* Collapsible content for mobile — opens under the top row */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="md:hidden overflow-hidden mt-4">
                            <ul className="flex flex-col space-y-4 text-white text-2xl font-normal px-6 py-5 rounded-2xl">
                                <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">Features</li>
                                <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">Anime</li>
                                <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">Manga</li>
                                <li className="hover:text-[#32cd87] cursor-pointer transition-all duration-100">My List</li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}

export default Navbar;