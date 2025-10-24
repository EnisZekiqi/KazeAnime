'use client'
import { useState,useEffect } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { motion,AnimatePresence } from "motion/react";

interface ToastProps{
    show:boolean;
    message:string;
    onClose:()=>void
}

const Toast = ({show,message,onClose,}:ToastProps) => {


  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

    return ( 
        <>
      <AnimatePresence>
        {message === '' ? '':  
       <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 fixed top-[15%] right-2 flex items-start rounded z-[100] gap-2 text-xs font-medium shadow-lg text-white bg-[#245F37] pointer-events-auto"
    >
      <FiCheckSquare className=" mt-0.5" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>}
      </AnimatePresence>
        </>
     );
}
 
export default Toast;