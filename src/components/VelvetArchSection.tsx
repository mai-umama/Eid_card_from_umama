import { useEffect, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateCardCanvas } from "@/lib/generateCardCanvas";

// ── Easy to edit: add more quotes here ──────────────────────────────────────
const EID_QUOTES = [
  "\"Let this Eid be the occasion of sharing the love and caring for the people who need to be loved and cared. Eid Mubarak to all!\"",
  "\"May the magic of this Eid bring lots of happiness in your life and may you celebrate it with all your close friends and may it fill your heart with love.\"",
  "\"On this blessed day, may Allah shower blessings and mercy upon you and your family. Eid Mubarak!\"",
  "\"Wishing you a joyous Eid filled with peace, love, and gratitude. May this day remind us of the beauty of unity and togetherness.\"",
  "\"Eid is a time to cherish every blessing, strengthen bonds of love, and be grateful for all that Allah has bestowed upon us. Eid Mubarak!\"",
];

// ── Typing speed (ms per character) — easy to tune ──────────────────────────
const TYPING_SPEED_MS = 30;

export const VelvetArchSection = ({ userName }: { userName?: string }) => {
  // Pick one random quote per page load (stable via useRef)
  const quoteRef = useRef(EID_QUOTES[Math.floor(Math.random() * EID_QUOTES.length)]);

  const [visibleQuote, setVisibleQuote] = useState("");
  const [showCursor, setShowCursor]     = useState(false);
  const [typed, setTyped]               = useState(false); // never restarts
  const [isExporting, setIsExporting]   = useState(false);
  const sectionRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const startTyping = () => {
      const fullText = quoteRef.current;
      let idx = 0;
      setShowCursor(true);

      const typeNext = () => {
        idx++;
        setVisibleQuote(fullText.slice(0, idx));
        if (idx < fullText.length) {
          setTimeout(typeNext, TYPING_SPEED_MS);
        } else {
          // Blink cursor for 2s then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      };
      setTimeout(typeNext, TYPING_SPEED_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typed) {
          setTyped(true);
          observer.disconnect();
          startTyping();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [typed]);
  
  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const canvas = await generateCardCanvas({ 
        senderName: userName || "UMAMA", 
        receiverName: userName || "DEAREST", 
        gender: "Other", // Doesn't matter for velvet-arch
        templateId: "velvet-arch",
        quote: quoteRef.current,
        width: 1200, 
        height: 1800 
      });
      const link = document.createElement("a");
      link.download = `eid-card-${userName || "friend"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Card downloaded successfully!");
    } catch (error) {
      console.error("Export failed", error);
      toast.error("Failed to download card.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section
      id="velvet-arch-section"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-700"
    >
      {/* Outer Template Wrapper */}
      <div className="relative w-full max-w-[500px] p-6 sm:p-10 md:p-12 flex items-center justify-center rounded-lg shadow-inner overflow-visible transition-colors duration-700">
        
        {/* Geometric Pattern Background (behind the card) */}
        <div 
          className="absolute inset-0 rounded-lg dark:opacity-20 opacity-[0.08] pointer-events-none transition-opacity duration-700"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23bf953f' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Thick Gold Frame (Template Style) */}
        <div className="absolute inset-1 sm:inset-2 border-4 border-[#bf953f] pointer-events-none rounded-lg z-20 shadow-[0_0_25px_rgba(191,149,63,0.3)] dark:shadow-[0_0_40px_rgba(191,149,63,0.2)]">
          <div className="absolute inset-1 border border-[#fcf6ba]/40 rounded-sm" />
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-[-10px] left-[-10px] w-8 h-8 bg-[#bf953f] rotate-45 border border-[#fcf6ba]/50 shadow-lg" />
          <div className="absolute top-[-10px] right-[-10px] w-8 h-8 bg-[#bf953f] rotate-45 border border-[#fcf6ba]/50 shadow-lg" />
          <div className="absolute bottom-[-10px] left-[-10px] w-8 h-8 bg-[#bf953f] rotate-45 border border-[#fcf6ba]/50 shadow-lg" />
          <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 bg-[#bf953f] rotate-45 border border-[#fcf6ba]/50 shadow-lg" />
        </div>

        {/* The Card Itself */}
        <div
          className="relative w-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden rounded-sm ring-1 ring-[#bf953f]/20 z-10"
          style={{
            backgroundImage: "url('/velvet_arch.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            aspectRatio: "2/3",
            maxHeight: "85vh",
          }}
        >
          {/* Text Container — centered below the Bismillah */}
          <div
            ref={sectionRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 sm:px-12 pt-[22%] pb-[8%]"
          >
            <div className="w-full space-y-6">
              {/* Shiny "Eid Mubarak" title */}
              <h2
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(110deg,#bf953f,30%,#fcf6ba,50%,#bf953f,70%,#fde047)] bg-[length:200%_100%] leading-tight drop-shadow-md"
                style={{
                  animation: "shimmer 2s linear infinite",
                  WebkitTextStroke: "0.5px rgba(212,175,55,0.3)",
                }}
              >
                {userName ? `Eid Mubarak, ${userName}` : "Eid Mubarak"}
              </h2>

              {/* Static wish */}
              <p
                className="font-serif text-sm sm:text-lg text-[#fefce8] leading-relaxed drop-shadow-sm font-medium"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                May this beautiful day bring peace, happiness, and infinite blessings to you and your family.
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#fde047] to-transparent mx-auto opacity-70" />

              {/* Typing quote with blinking cursor */}
              <p
                className="font-body text-xs sm:text-base text-[#fef08a] italic leading-relaxed max-w-[280px] mx-auto drop-shadow-sm font-light min-h-[4.5rem]"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {visibleQuote}
                {showCursor && (
                  <span
                    className="inline-block w-[2px] h-[1em] bg-[#fde047] ml-[1px] align-middle"
                    style={{ animation: "cursor-blink 0.7s step-end infinite" }}
                  />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-display text-sm tracking-[0.2em] transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] text-black font-bold shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[#fcf6ba]/30 disabled:opacity-50 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span className="relative z-10">{isExporting ? "PREPARING..." : "DOWNLOAD CARD"}</span>
          </button>
        </div>
      </div>

      {/* Inline keyframes for cursor blink (no extra CSS file needed) */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default VelvetArchSection;
