'use client'
import { useState } from "react";

const Navbar = () => {


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return ( 

        <>
        <nav className={`setup ${isMenuOpen ? 'h-screen':'h-fit'} transition-all duration-200 w-full relative z-100 flex items-center justify-between px-4 py-2.5 md:px-20 md:py-10`}>
            <h1 className="hidden md:block text-2xl font-semibold text-white">KazeAnime</h1>
            <span className="block md:hidden"><img src="https://framerusercontent.com/images/xskSMX1ZvOzyPbACw9W97qU5M.png" className="w-8 h-8" alt="" /></span>
            <ul className="hidden md:flex space-x-6 text-white bg-[#0E0E0E] px-6 py-5 rounded-2xl">
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">Features</li>
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">Anime</li>
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">Manga</li>
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">My List</li>
            </ul>
            <button onClick={toggleMenu} className={`rounded-2xl ${isMenuOpen ? 'rotate-90':'rotate-0'} transition-all duration-200 p-3 opacity-100 md:opacity-0`}>
                <svg className="w-7 h-7" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
        </nav>
        </>
     );
}
 
export default Navbar;