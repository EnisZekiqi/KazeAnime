'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, easeOut } from 'motion/react';

type Card = {
  name: string;
  description: string;
  img: string;
  about: string;
};

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setSearchClicked(true);
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease:easeOut,
      },
    },
  };

  const card = [
    {
      name: 'Ella Marie',
      about: 'Very Interesting Website, Love it',
      description: 'Creative Director',
      img: 'https://res.cloudinary.com/datm8nslc/image/upload/v1746221984/images8_c4eus0.jpg',
    },
    {
      name: 'Sam Smith',
      about: 'So much to explore ,very enjoyable',
      description: 'Youtube Creator',
      img: 'https://res.cloudinary.com/datm8nslc/image/upload/v1746222025/images_5_q74apj.jpg',
    },
    {
      name: 'Ella Marie',
      about: 'I could spent days here ,endless joy',
      description: 'Creative Director',
      img: 'https://res.cloudinary.com/datm8nslc/image/upload/v1746222033/images_9_rgjjwh.jpg',
    },
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row items-start md:items-end  justify-between gap-8">
      <section className="relative overflow-hidden w-full h-full flex-1 flex flex-col items-start justify-center space-y-6">
        <div className="wrapper z-100 absolute top-0 left-0 w-3/6 h-screen"></div>
        <motion.div
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="text-[32px] md:text-[48px] lg:text-[80px] z-100 text-white font-[500] w-full lg:w-3/4 lg:leading-[105px] mt-14"
        >
          Your Gateway to Anime Worlds{' '}
        </motion.div>
        <motion.p
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-[#a5a5a5] z-100 text-sm text-balance  sm:text-lg w-full md:w-2/5"
        >
          Discover, Explore, and Immerse Yourself in the Best Anime Content with
          KazeAnime
        </motion.p>
        <motion.div
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="border focus:focus-within:border-[#28a76f] border-[#343434]/70 bg-[#0E0E0E] rounded-2xl z-100 p-0.5 sm:p-1 w-full sm:w-[450px] overflow-hidden"
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 p-1 z-100"
          >
            <input
              type="text"
              placeholder="Search Anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-1 sm:py-2 bg-transparent text-[#fff] placeholder-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 sm:px-4.5 sm:py-3 font-medium cursor-pointer text-sm sm:text-md -ml-20 sm:-ml-0 bg-[#245F37] text-[#fff] rounded-xl  transition"
            >
              {searchClicked ? 'Searching...' : 'Search'}
            </button>
          </form>
        </motion.div>
        {/* decorative image moved to layout so it can be absolutely positioned relative to body (not fixed) */}
      </section>
      <Card card={card} />
    </div>
  );
};

type CardProps = {
  card: Card[];
};

const Card = ({ card }: CardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % card.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentCard = card[currentIndex];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={card[currentIndex].name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5}}
          className="flex flex-col items-start gap-4 w-84 floating-vertical"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-fade text-white text-md sm:text-lg font-medium"
          >
            {currentCard.about}
          </motion.h1>
          <div className="flex items-center gap-2 rounded-full p-1.5 bg-[#0E0E0E]">
            <img
              src={currentCard.img}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <p className="text-white text-md font-medium">{currentCard.name}</p>
            <span className="text-[#a5a5a5] text-sm font-medium">
              {currentCard.description}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
