import Link from "next/link";

const Footer = () => {
    return ( 
        <>
          <footer className="w-full bg-[#0f0f0f] text-gray-400 py-8 mt-12 border-t border-gray-800">
      <div className="px-10 mx-auto  flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Kaze<span className="text-[#32cd87]">Anime</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Discover your next favorite anime & manga adventure.
          </p>
        </div>

        {/* Links (optional) */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-[#32cd87] transition">Home</a>
          <span className="hover:text-[#32cd87] transition"><Link href={`/anime`}>Anime</Link></span>
          <span className="hover:text-[#32cd87] transition"><Link href={`/manga`}>Manga</Link></span>
        </div>

        {/* Attribution */}
        <div className="text-xs text-gray-500 text-center sm:text-right">
          <p>Powered by <span className="text-[#32cd87] font-medium">Jikan API</span></p>
          <p>© {new Date().getFullYear()} KazeAnime. All rights reserved.</p>
        </div>
      </div>
    </footer>
        </>
     );
}
 
export default Footer;