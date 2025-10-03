const Navbar = () => {
    return ( 
        <>
        <nav className="w-full relative z-100 flex items-center justify-between px-20 py-10">
            <h1 className="text-2xl font-semibold text-white">KazeAnime</h1>
            <ul className="flex space-x-6 text-white bg-[#0E0E0E] px-6 py-5 rounded-2xl">
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">Features</li>
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">Anime</li>
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">Manga</li>
                <li className="hover:text-[#a5a5a5] cursor-pointer transition-all duration-100">My List</li>
            </ul>
            <button className="bg-white text-black rounded-2xl p-3 opacity-0">Something</button>
        </nav>
        </>
     );
}
 
export default Navbar;