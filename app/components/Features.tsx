'use client';

import { useEffect, useState } from 'react';
import { easeOut, motion } from 'motion/react';

type Anime ={
  mal_id:string
   title: string;
   images:{
    jpg:{
      image_url:string
    }
   }
}

const Features = () => {
  const [anime, setAnime] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const page = Math.floor(Math.random() * 20) + 1; // random page 1–20
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?page=${page}`
        );
        const data = await response.json();
        const shuffled = data.data.sort(() => 0.5 - Math.random());
        setAnime(shuffled.slice(0, 6));
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };
    fetchAnime();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
     transition: { duration: 0.5},
    },
  };

  return (
    <section
      id="features"
      className="relative w-full flex flex-col overflow-visible items-center justify-center py-16 bg-transparent"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl flex flex-col items-start bg-transparent w-full gap-10 px-0 z-[10]"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-start gap-2"
        >
          <span className="font-medium text-md text-[#32cd87]">Features</span>
          <h1 className="text-[38px] sm:text-5xl font-normal text-white">
            How it works
          </h1>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start justify-between gap-12 w-full"
        >
          {/* Left: Feature cards */}
          <div className="flex flex-col gap-10 w-full md:w-1/2">
            {[
              {
                title: 'Explore',
                desc: 'Dive into a vast library of anime and manga. Find trending shows, upcoming releases, or hidden gems tailored for you.',
              },
              {
                title: 'Discover',
                desc: 'Use powerful search and filters to discover your favorite characters, genres, and studios with ease.',
              },
              {
                title: 'Enjoy',
                desc: 'Bookmark your top picks, track your favorites, and explore recommendations based on your watchlist.',
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[2px] bg-[#32cd87]" />
                  <h2 className="text-white text-2xl font-medium">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-[#a5a5a5] leading-relaxed text-[14px] sm:text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: Anime preview grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full md:w-1/2">
            {anime.map((a) => (
              <div
                key={a.mal_id}
                className="relative group overflow-hidden rounded-xl border border-[#333] hover:border-[#32cd87]/50 transition"
              >
                <img
                  src={a.images?.jpg?.image_url}
                  alt={a.title}
                   loading='lazy'
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100  transition flex items-end justify-start p-2">
                  <p className="text-sm text-white font-medium">
                    {a.title.length > 25
                      ? a.title.slice(0, 25) + '...'
                      : a.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative element */}
      <div className="absolute top-0 -left-[12%] rotate-180 -translate-x-1/4 w-[20%] h-full overflow-visible pointer-events-none z-[100]">
        <img
          src="https://framerusercontent.com/images/dwxExDkm76wbBZfsBvtV3qnpVs.png?scale-down-to=1024"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left opacity-100 blur-lg floating-vertical"
        />
      </div>
    </section>
  );
};

export default Features;
