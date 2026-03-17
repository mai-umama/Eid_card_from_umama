import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StorySlideProps {
  title: string;
  description: string;
  illustration: ReactNode;
  isActive: boolean;
}

const StorySlide = ({ title, description, illustration, isActive }: StorySlideProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 text-center"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.2, 
          duration: 0.8,
          type: "spring",
          stiffness: 50
        }}
        className="mb-8 sm:mb-12 w-full max-w-sm sm:max-w-md pointer-events-none"
        style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {illustration}
        </motion.div>
      </motion.div>
      
      <div className="max-w-2xl">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display text-pink-950 dark:text-pink-100 mb-4 sm:mb-6 tracking-tight drop-shadow-sm"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl sm:text-2xl text-pink-900/80 dark:text-pink-200/90 font-body leading-relaxed max-w-xl mx-auto drop-shadow-sm px-4"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default StorySlide;
