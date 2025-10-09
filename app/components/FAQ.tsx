'use client'


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "motion/react-client";

const FAQ = () => {
  const [showFAQ, setShowFAQ] = useState("");

 const faqs = [
  {
    id: "What is KazeAnime?",
    description:
      "KazeAnime is an anime discovery platform powered by the Jikan API. You can explore trending series, detailed character info, and search for your favorite anime all in one place.",
  },
  {
    id: "Where does the anime data come from?",
    description:
      "All anime and manga information on KazeAnime is sourced from the Jikan API, an open-source REST API for MyAnimeList data.",
  },
  {
    id: "Can I watch anime directly on KazeAnime?",
    description:
      "No, KazeAnime is not a streaming site. It's designed to help you explore, learn about, and track anime titles, characters, and related info.",
  },
  {
    id: "How often is the data updated?",
    description:
      "The data is fetched live from the Jikan API, which stays in sync with MyAnimeList. This means you’ll always get up-to-date info on new episodes, characters, and rankings.",
  },
  {
    id: "Can I save my favorite anime?",
    description:
      "Not yet — but we’re planning to add a favorites feature soon so you can bookmark the anime you love and access them anytime.",
  },
];


  return (
   <div className="flex flex-col md:flex-row items-start justify-between w-full px-10 gap-10 md:gap-0">
    <div className="flex flex-col items-start gap-4">
        <span className="font-medium text-md text-[#32cd87]">Answers</span>
        <h1 className="font-normal text-5xl text-white">FAQs</h1>
    </div>
     <div className="flex flex-col items-start sm:items-end gap-2 w-full">
      {faqs.map((faq, index) => (
        <motion.div
          layout
          onClick={() =>
            setShowFAQ(showFAQ === faq.id ? "" : faq.id)
          }
          key={index}
          className={`p-3 border ${showFAQ === faq.id ? 'border-[#32cd87]' : 'border-[#343434]'}  rounded-2xl w-full sm:w-[500px] bg-[#141414] text-white cursor-pointer shadow-sm transition-all duration-300`}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-md sm:text-lg font-medium">
              {faq.id}
            </div>
            <motion.div
              animate={{ rotate: showFAQ === faq.id ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {showFAQ === faq.id && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 60, y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden text-sm text-[#a5a5a5] mt-2"
              >
                {faq.description}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
   </div>
  );
};

export default FAQ;

