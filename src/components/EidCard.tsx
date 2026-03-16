import { useState, useEffect, useRef } from "react";

interface EidCardProps {
  onFlip?: () => void;
}

// ==========================================
// ADJUSTABLE IMAGE SETTINGS
// ==========================================
// You can adjust these values to change the front image of the Eid Card
export const frontImageConfig = {
  // Replace with the path to your image in the public folder.
  // We downloaded the image you provided as 'eid-cover.png'.
  url: "/eid-cover.png",
  
  // Adjust the scale of the image (e.g., "100%", "120%", "cover", "contain")
  scale: "cover",
  
  // Adjust the horizontal and vertical position (e.g., "center", "left", "50%", "0px", etc.)
  offsetX: "center",
  offsetY: "center",
  
  // Toggle the golden arch border on/off (true/false)
  showGoldenBorder: false,
  
  // Text to overlay on the image (optional, leave empty if image already has text)
  overlayText: "",
  overlaySubtext: "Click to open",
};
// ==========================================

const EidCard = ({ onFlip }: EidCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [typedText, setTypedText] = useState("");
  const hasFlipped = useRef(false);

  const message =
    "Eid Mubarak! May this beautiful day bring peace, happiness, and infinite blessings to you and your family. Enjoy your Eid Salami!";

  const handleFlip = () => {
    setFlipped((f) => !f);
    if (!hasFlipped.current) {
      hasFlipped.current = true;
      onFlip?.();
    }
  };

  useEffect(() => {
    if (!flipped || typedText.length > 0) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(message.slice(0, i));
      if (i >= message.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [flipped]);

  return (
    <div
      className="cursor-pointer mx-auto"
      style={{ perspective: "1500px", width: "340px", height: "440px" }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label="Click to flip the Eid card"
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl overflow-hidden bg-no-repeat"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: `url(${frontImageConfig.url})`,
            backgroundSize: frontImageConfig.scale,
            backgroundPosition: `${frontImageConfig.offsetX} ${frontImageConfig.offsetY}`,
            backgroundColor: "#180309", // Fallback color
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            border: frontImageConfig.showGoldenBorder ? "1px solid hsl(var(--gold) / 0.3)" : "none",
          }}
        >
          {/* Arch golden border */}
          {frontImageConfig.showGoldenBorder && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 340 440" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20,20 L 320,20 L 320,320 Q 320,380 170,420 Q 20,380 20,320 Z" stroke="url(#goldGradient)" strokeWidth="2" />
              <path d="M 30,30 L 310,30 L 310,315 Q 310,370 170,405 Q 30,370 30,315 Z" stroke="url(#goldGradient)" strokeWidth="1.2" strokeDasharray="4 2" />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#ce8d3e" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Overlay Text */}
          <div className="absolute inset-x-0 bottom-[40px] flex items-center justify-center pointer-events-none z-10">
             <div className="relative flex flex-col items-center justify-center text-center z-20 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10 shadow-lg">
               {frontImageConfig.overlayText && (
                 <h2 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-300 drop-shadow-md tracking-wider">
                   {frontImageConfig.overlayText}
                 </h2>
               )}
               {frontImageConfig.overlaySubtext && (
                 <p className="text-[10px] uppercase tracking-widest text-[#cbd5e1] font-body drop-shadow-md m-0 leading-none py-1">
                   {frontImageConfig.overlaySubtext}
                 </p>
               )}
             </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl glass-panel"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <p className="text-foreground/90 leading-relaxed text-center font-body text-base">
            {typedText}
            {flipped && typedText.length < message.length && (
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EidCard;
