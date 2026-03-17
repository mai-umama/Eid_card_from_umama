import { motion } from "framer-motion";

interface EidCardPreviewProps {
  senderName: string;
  receiverName: string;
  gender: "Male" | "Female" | "Other";
  characterType: "Standard" | "Lantern" | "Festive";
  templateId?: "royal-teal" | "majestic-midnight" | "eternal-ivory";
  id?: string;
  variant?: "full" | "icon";
}

const EidCardPreview = ({ 
  senderName, 
  receiverName, 
  gender, 
  characterType, 
  templateId = "royal-teal",
  id, 
  variant = "full" 
}: EidCardPreviewProps) => {
  
  // ── Character Rendering Logic (High-Precision SVG Mode) ──────────────────
  const BoyChar = (
    <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto max-w-full drop-shadow-2xl">
      {/* Head */}
      <circle cx="200" cy="225" r="105" fill="#FEE2C7" />
      {/* Hair (Peaking out) */}
      <path d="M110 200C110 150 290 150 290 200V240H110V200Z" fill="#4B2C20" /> 
      {/* White Kufi (Covering Scalp) */}
      <path d="M120 190C120 140 150 100 200 100C250 100 280 140 280 190V230H120V190Z" fill="white" />
      {/* Sparkly Eyes */}
      <g className="eyes">
        <circle cx="165" cy="250" r="30" fill="white" />
        <circle cx="235" cy="250" r="30" fill="white" />
        <circle cx="165" cy="255" r="22" fill="#1A1A1A" />
        <circle cx="235" cy="255" r="22" fill="#1A1A1A" />
        <circle cx="158" cy="245" r="8" fill="white" />
        <circle cx="228" cy="245" r="8" fill="white" />
        <circle cx="170" cy="263" r="4" fill="white" opacity="0.6" />
        <circle cx="240" cy="263" r="4" fill="white" opacity="0.6" />
      </g>
      {/* Smile & Blush */}
      <path d="M185 310Q200 320 215 310" stroke="#4B2C20" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="135" cy="295" r="12" fill="#FDA4AF" opacity="0.5" />
      <circle cx="265" cy="295" r="12" fill="#FDA4AF" opacity="0.5" />
      {/* Body (Thobe) */}
      <path d="M130 390Q200 375 270 390L280 600H120L130 390Z" fill="white" />
      {/* Prayer Hands */}
      <path d="M180 500L200 440L220 500Q200 525 180 500Z" fill="#FEE2C7" stroke="#E2E8F0" strokeWidth="1" />
    </svg>
  );

  const GirlChar = (
    <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto max-w-full drop-shadow-2xl">
      {/* Hood Hijab (Lavender - Full Coverage) */}
      <path d="M70 240C70 100 330 100 330 240V440H70V240Z" fill="#D8B4FE" />
      {/* Face (Tucked within Hijab) */}
      <circle cx="200" cy="270" r="100" fill="#FEE2C7" />
      {/* Inner Hijab Frame */}
      <path d="M75 250C75 140 325 140 325 250Q200 220 75 250" fill="#C084FC" opacity="0.3" />
      {/* Sparkly Eyes */}
      <g className="eyes">
        <circle cx="168" cy="295" r="32" fill="white" />
        <circle cx="232" cy="295" r="32" fill="white" />
        <circle cx="168" cy="300" r="24" fill="#1A1A1A" />
        <circle cx="232" cy="300" r="24" fill="#1A1A1A" />
        <circle cx="160" cy="290" r="9" fill="white" />
        <circle cx="224" cy="290" r="9" fill="white" />
        <circle cx="176" cy="310" r="5" fill="white" opacity="0.6" />
        <circle cx="240" cy="310" r="5" fill="white" opacity="0.6" />
        <path d="M140 275L150 285M260 275L250 285" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Smile & Blush */}
      <path d="M185 350Q200 360 215 350" stroke="#4B2C20" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="130" cy="340" r="16" fill="#FDA4AF" opacity="0.6" />
      <circle cx="270" cy="340" r="16" fill="#FDA4AF" opacity="0.6" />
      {/* Body (Dress) */}
      <path d="M110 440Q200 430 290 440L310 600H90L110 440Z" fill="#8B5CF6" />
      {/* Prayer Hands */}
      <path d="M180 540L200 480L220 540Q200 565 180 540Z" fill="#FEE2C7" stroke="#D1D5DB" strokeWidth="1" />
    </svg>
  );

  const CharacterDisplay = () => {
    const isMale = gender === "Male";
    const isLantern = characterType === "Lantern";
    const isFestive = characterType === "Festive";

    const LanternAccessory = (
      <svg viewBox="0 0 80 140" className="absolute bottom-[12%] right-[-10%] w-[22%] drop-shadow-lg" style={{ zIndex: 20 }}>
        <line x1="40" y1="0" x2="40" y2="20" stroke="#B45309" strokeWidth="2" />
        <rect x="22" y="20" width="36" height="8" rx="4" fill="#D97706" />
        <rect x="18" y="28" width="44" height="70" rx="10" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
        <rect x="24" y="34" width="32" height="58" rx="7" fill="#FEF3C7" opacity="0.9" />
        <ellipse cx="40" cy="63" rx="10" ry="16" fill="#FBBF24" opacity="0.8" />
        <ellipse cx="40" cy="57" rx="5" ry="8" fill="#F59E0B" opacity="0.9" />
        <rect x="22" y="98" width="36" height="8" rx="4" fill="#D97706" />
        <line x1="40" y1="106" x2="40" y2="130" stroke="#D97706" strokeWidth="2" />
        <circle cx="40" cy="132" r="5" fill="#B45309" />
        <rect x="33" y="48" width="8" height="8" rx="2" fill="#FDE68A" opacity="0.6" />
        <rect x="33" y="68" width="8" height="8" rx="2" fill="#FDE68A" opacity="0.6" />
      </svg>
    );

    const FestiveDecorations = (
      <>
        {[
          { cx: "12%", cy: "10%", color: "#FCD34D", size: "8%" },
          { cx: "80%", cy: "8%",  color: "#F9A8D4", size: "7%" },
          { cx: "5%",  cy: "50%", color: "#6EE7B7", size: "6%" },
          { cx: "88%", cy: "45%", color: "#A5B4FC", size: "9%" },
          { cx: "20%", cy: "85%", color: "#FCA5A5", size: "6%" },
          { cx: "75%", cy: "80%", color: "#FCD34D", size: "7%" },
        ].map((s, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            style={{ position: "absolute", left: s.cx, top: s.cy, width: s.size, zIndex: 20 }}
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={s.color} />
          </motion.svg>
        ))}
        <motion.svg
          viewBox="0 0 40 40"
          style={{ position: "absolute", left: "44%", top: "2%", width: "12%", zIndex: 20 }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {[0,60,120,180,240,300].map((deg, i) => (
            <ellipse key={i} cx="20" cy="20" rx="5" ry="10"
              fill={["#F472B6","#FCD34D","#6EE7B7","#A5B4FC","#FCA5A5","#34D399"][i]}
              transform={`rotate(${deg} 20 20) translate(0 -6)`}
              opacity="0.85"
            />
          ))}
          <circle cx="20" cy="20" r="6" fill="#FEF3C7" />
        </motion.svg>
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: "absolute", inset: "10%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,224,71,0.35) 0%, rgba(216,180,254,0.25) 60%, transparent 100%)",
            filter: "blur(10px)", zIndex: 0,
          }}
        />
      </>
    );

    return (
      <div className="relative w-full h-full flex items-center justify-center isolate">
        {isLantern && (
          <motion.div
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              position: "absolute", inset: "15%", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(251,191,36,0.55) 0%, rgba(245,158,11,0.25) 55%, transparent 100%)",
              filter: "blur(18px)", zIndex: 0,
            }}
          />
        )}
        {isFestive && FestiveDecorations}
        <motion.div
          key={`${gender}-${characterType}`}
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="h-full w-full flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-10 relative"
        >
          {isMale ? BoyChar : GirlChar}
          {isLantern && LanternAccessory}
        </motion.div>
      </div>
    );
  };

  const getThemeMap = () => {
    switch (templateId) {
      case "majestic-midnight":
        return {
          outerBg: "#0f172a",
          innerBg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          silhouette: "#020617",
          accent: "#e2e8f0",
          border: "border-slate-800",
        };
      case "eternal-ivory":
        return {
          outerBg: "#fef2f2",
          innerBg: "linear-gradient(135deg, #fffcf2 0%, #fff7ed 100%)",
          silhouette: "#fecaca",
          accent: "#fb7185",
          border: "border-rose-100",
        };
      case "royal-teal":
      default:
        return {
          outerBg: "#042f2e",
          innerBg: "linear-gradient(135deg, #134e4a 0%, #0d9488 100%)",
          silhouette: "#042f2e",
          accent: "#fcd34d",
          border: "border-teal-900",
        };
    }
  };

  const themeContext = getThemeMap();

  if (variant === "icon") {
    const isMale = gender === "Male";
    return (
       <div className="w-full h-full p-2 flex items-center justify-center bg-gray-200/20 rounded-lg overflow-hidden">
          <div className="w-full h-full object-contain">
            {isMale ? BoyChar : GirlChar}
          </div>
       </div>
    );
  }

  return (
    <div 
      id={id}
      className={`relative w-full aspect-[4/5] shadow-2xl overflow-hidden p-3 sm:p-5 transition-all duration-1000 ${themeContext.border}`}
      style={{ background: themeContext.outerBg, borderRadius: "24px" }}
    >
      <div 
        className="relative w-full h-full flex flex-col items-center p-6 sm:p-10 shadow-inner overflow-hidden"
        style={{ background: themeContext.innerBg, borderRadius: "16px" }}
      >
        <div className="absolute inset-2 border-[1.5px] rounded-lg opacity-40 z-20 pointer-events-none" style={{ borderColor: themeContext.accent }} />
        <div className="absolute inset-4 border-[0.5px] rounded-md opacity-20 z-20 pointer-events-none" style={{ borderColor: themeContext.accent }} />
        
        <div className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none opacity-20 z-0">
           <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0 200V120L40 140L60 100V60H100V100L120 120V80H160V120L180 90H220L240 120V80H280V120L300 100V60H340V100L360 140L400 120V200H0Z" fill={themeContext.silhouette} />
              <path d="M85 40L100 20L115 40V120H85V40ZM325 40L340 20L355 40V120H325V40Z" fill={themeContext.silhouette} />
           </svg>
        </div>

        <div className="absolute inset-x-0 top-0 h-1/2 z-0 pointer-events-none opacity-40">
           {[...Array(15)].map((_, i) => (
             <div 
               key={i}
               className="absolute rounded-full"
               style={{
                 width: Math.random() < 0.3 ? "6px" : "3px",
                 height: Math.random() < 0.3 ? "6px" : "3px",
                 backgroundColor: themeContext.accent,
                 top: `${Math.random() * 80}%`,
                 left: `${Math.random() * 100}%`,
                 animation: `pulse ${2 + Math.random() * 3}s infinite`,
               }}
             />
           ))}
        </div>

        <div className="relative z-10 w-full h-full block">
          <div className="absolute top-4 left-0 right-0 w-full text-center select-none drop-shadow-md pb-4 text-shadow-sm">
            <h2 className="font-display text-[10px] sm:text-xs font-bold opacity-80 uppercase m-0 tracking-[0.3em]" style={{ color: themeContext.accent }}>
              HAPPY EID AL-FITR
            </h2>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-2 mb-0 tracking-[0.1em]" style={{ color: "white" }}>
              MUBARAK
            </h1>

            <div className="w-full text-center mt-6">
              <div className="text-[10px] uppercase mb-1 opacity-70 tracking-[0.4em]" style={{ color: themeContext.accent }}>To</div>
              <h3 className="text-2xl sm:text-3xl font-black text-white text-center drop-shadow-lg truncate mx-auto px-2 max-w-[90%] font-display">
                {receiverName || "DEAREST ONE"}
              </h3>
            </div>
          </div>

          <div className="absolute top-[35%] bottom-[15%] left-0 right-0 w-full flex items-center justify-center">
             <div className="h-full max-h-[100%] flex items-center justify-center">
                <CharacterDisplay />
             </div>
          </div>

          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 w-full text-center z-20">
             <div className="text-[10px] uppercase mb-1 opacity-70 tracking-[0.4em]" style={{ color: themeContext.accent }}>From</div>
             <div className="inline-block px-8 py-2.5 sm:py-3 rounded-full border shadow-xl backdrop-blur-sm" style={{ backgroundColor: `${themeContext.accent}20`, borderColor: `${themeContext.accent}40` }}>
                <h4 className="text-lg sm:text-xl font-bold font-display tracking-widest truncate max-w-[240px] sm:max-w-[300px] text-white">
                   {senderName || "UMAMA"}
                </h4>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EidCardPreview;
