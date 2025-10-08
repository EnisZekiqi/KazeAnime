'use client'


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "motion/react-client";

const FAQ = () => {
  const [showFAQ, setShowFAQ] = useState("");

  const faqs = [
    { id: "What is Interaction Design", description: "Interaction design is about creating engaging interfaces with well-thought-out behaviors.",  },
    { id: "Principles & Patterns", description: "Design principles and reusable patterns help users navigate your app intuitively.",  },
    { id: "Usability & Accessibility", description: "Ensuring that your product is easy to use and accessible to all users is essential.",  },
    { id: "UX Optimization", description: "UX optimization focuses on improving user satisfaction by refining every interaction.",  }
  ];

  return (
   <div className="flex items-start justify-between w-full px-10">
    <div className="flex flex-col items-start gap-4">
        <span className="font-medium text-md text-[#32cd87]">Answers</span>
        <h1 className="font-normal text-5xl text-white">FAQs</h1>
    </div>
     <div className="flex flex-col items-start gap-2">
      {faqs.map((faq, index) => (
        <motion.div
          layout
          onClick={() =>
            setShowFAQ(showFAQ === faq.id ? "" : faq.id)
          }
          key={index}
          className="p-3 border border-[#343434] rounded-2xl w-[320px] sm:w-[500px] bg-[#141414] text-white cursor-pointer shadow-sm"
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
                animate={{ opacity: 1, height: 50, y: 0 }}
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

