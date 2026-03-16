import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import StorySlide from "@/components/StorySlide";

const scenes = [
  {
    title: "Eidi from Elders",
    description: "Elders lovingly hand out colorful Eidi envelopes, passing on blessings to the young ones.",
    illustration: (
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Background Circle */}
        <circle cx="400" cy="300" r="220" fill="#FDF2F8" />
        {/* Elder Figure (Simplified Stylized) */}
        <rect x="300" y="200" width="120" height="250" rx="60" fill="#9D174D" />
        <circle cx="360" cy="180" r="50" fill="#FCE7F3" />
        <path d="M310 210C310 180 410 180 410 210" stroke="#F9A8D4" strokeWidth="8" />
        {/* Hand giving Eidi */}
        <path d="M420 320L480 320" stroke="#FCE7F3" strokeWidth="20" strokeLinecap="round" />
        {/* Envelopes */}
        <rect x="470" y="280" width="60" height="40" rx="4" fill="#F472B6" transform="rotate(-15 500 300)" />
        <rect x="480" y="290" width="60" height="40" rx="4" fill="#EC4899" transform="rotate(5 510 310)" />
        <rect x="490" y="300" width="60" height="40" rx="4" fill="#BE185D" transform="rotate(20 520 320)" />
        {/* Children Figures */}
        <rect x="520" y="380" width="80" height="150" rx="40" fill="#DB2777" />
        <circle cx="560" cy="360" r="35" fill="#FCE7F3" />
        <rect x="220" y="400" width="70" height="120" rx="35" fill="#9D174D" />
        <circle cx="255" cy="385" r="30" fill="#FCE7F3" />
      </svg>
    ),
  },
  {
    title: "New Eid Clothes",
    description: "Children dressed dressed up in their beautiful new outfits, glowing with happiness and excitement.",
    illustration: (
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <circle cx="400" cy="300" r="220" fill="#F5F3FF" />
        {/* Girl in Pink Hijab */}
        <path d="M300 300C300 250 400 250 400 300V500H300V300Z" fill="#EC4899" />
        <circle cx="350" cy="280" r="45" fill="#FCE7F3" />
        <path d="M305 280C305 235 395 235 395 280V350H305V280Z" fill="#F9A8D4" />
        {/* Boy in White Thobe */}
        <rect x="420" y="270" width="100" height="230" rx="10" fill="white" />
        <circle cx="470" cy="250" r="40" fill="#FCE7F3" />
        <rect x="440" y="210" width="60" height="15" rx="5" fill="#E5E7EB" />
        {/* Sparkles */}
        <circle cx="250" cy="250" r="5" fill="#FDE047" className="animate-pulse" />
        <circle cx="550" cy="280" r="4" fill="#FDE047" className="animate-pulse" />
        <circle cx="400" cy="180" r="6" fill="#FDE047" className="animate-pulse" />
      </svg>
    ),
  },
  {
    title: "Family Moments",
    description: "Eid is a time when families come together, sharing love, joy, and warm embraces.",
    illustration: (
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <circle cx="400" cy="300" r="220" fill="#FAF5FF" />
        {/* Father & Son Hugging */}
        <rect x="320" y="250" width="100" height="250" rx="50" fill="#7E22CE" />
        <rect x="380" y="320" width="60" height="180" rx="30" fill="#A855F7" />
        <circle cx="370" cy="230" r="45" fill="#F3E8FF" />
        <circle cx="410" cy="305" r="30" fill="#F3E8FF" />
        {/* Mother & Daughter */}
        <rect x="450" y="280" width="90" height="220" rx="45" fill="#C026D3" />
        <circle cx="495" cy="260" r="40" fill="#FDF4FF" />
        <path d="M455 260C455 220 535 220 535 260V320H455V260Z" fill="#E879F9" />
        {/* Heart */}
        <path d="M400 200C400 180 430 180 430 200C430 220 400 240 400 240C400 240 370 220 370 200C370 180 400 180 400 200Z" fill="#EC4899" />
      </svg>
    ),
  },
  {
    title: "Sweet Celebrations",
    description: "Delicious sweets and festive meals bring everyone together in celebration.",
    illustration: (
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <circle cx="400" cy="300" r="220" fill="#FFF1F2" />
        {/* Table/Tray */}
        <ellipse cx="400" cy="450" rx="250" ry="60" fill="#E5E7EB" />
        <ellipse cx="400" cy="445" rx="240" ry="55" fill="white" />
        {/* Sweets (Sheer Khurma bowl) */}
        <circle cx="400" cy="400" r="80" fill="#FEF3C7" />
        <circle cx="400" cy="400" r="70" fill="#FFFBEB" />
        <circle cx="380" cy="380" r="5" fill="#D97706" />
        <circle cx="420" cy="390" r="4" fill="#059669" />
        {/* Plated Sweets (Laddu/Dates) */}
        <circle cx="300" cy="430" r="20" fill="#F59E0B" />
        <circle cx="330" cy="440" r="20" fill="#F59E0B" />
        <circle cx="280" cy="450" r="20" fill="#F59E0B" />
        <circle cx="500" cy="430" r="18" fill="#78350F" />
        <circle cx="530" cy="445" r="18" fill="#78350F" />
        {/* Steam */}
        <path d="M380 300C380 280 390 280 390 260" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        <path d="M410 310C410 290 420 290 420 270" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

const Story = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % scenes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#f5f3ff] to-[#fae8ff] flex flex-col items-center justify-center relative overflow-hidden font-body">
      {/* Dynamic Background decor dots */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-400/20"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header back button */}
      <div className="absolute top-8 left-8 z-30">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-[#831843] hover:text-[#4c0519] transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-pink-200 group-hover:bg-white/60 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold tracking-wide">Back to Home</span>
        </Link>
      </div>

      <main className="flex-1 w-full flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {scenes.map((scene, index) => (
            currentSlide === index && (
              <StorySlide
                key={index}
                isActive={true}
                title={scene.title}
                description={scene.description}
                illustration={scene.illustration}
              />
            )
          ))}
        </AnimatePresence>
      </main>

      {/* Navigation dots */}
      <div className="absolute bottom-12 flex gap-4 z-30">
        {scenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative flex items-center justify-center p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div 
              className={`h-2.5 rounded-full transition-all duration-700 ease-in-out ${
                currentSlide === index 
                  ? "w-10 bg-[#9D174D] shadow-[0_0_15px_rgba(157,23,77,0.4)]" 
                  : "w-2.5 bg-[#9D174D]/20 group-hover:bg-[#9D174D]/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Story;
