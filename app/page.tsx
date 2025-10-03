import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Trending from "./trending/page";

export default function Home() {
  return (
    <div className="flex flex-col items-start  justify-center h-full px-20 py-10 ">
    <HeroSection/>
    <div className="empty h-[150px] opacity-0"/>
    <Trending/>
    </div>
  );
}
