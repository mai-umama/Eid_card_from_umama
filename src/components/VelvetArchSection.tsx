import { useEffect, useRef, useState } from "react";

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

export const VelvetArchSection = () => {
  // Pick one random quote per page load (stable via useRef)
  const quoteRef = useRef(EID_QUOTES[Math.floor(Math.random() * EID_QUOTES.length)]);

  const [visibleQuote, setVisibleQuote] = useState("");
  const [showCursor, setShowCursor]     = useState(false);
  const [typed, setTyped]               = useState(false); // never restarts
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

  return (
    <section
      id="velvet-arch-section"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div
        className="relative w-full max-w-lg shadow-2xl border-4 border-[#d4af37]/30"
        style={{
          backgroundImage: "url('/velvet_arch.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#4a0404",
          aspectRatio: "3/4",
          maxHeight: "90vh",
          borderRadius: "50% 50% 12px 12px / 12% 12% 4px 4px",
          scrollMarginTop: "5vh",
        }}
      >
        {/* Text — centered below the Bismillah */}
        <div
          ref={sectionRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 pt-[22%] pb-[8%]"
        >
          <div className="max-w-lg mx-auto space-y-6">

            {/* Shiny "Eid Mubarak" title */}
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(110deg,#bf953f,30%,#fcf6ba,50%,#bf953f,70%,#fde047)] bg-[length:200%_100%] leading-tight drop-shadow-md"
              style={{
                animation: "shimmer 2s linear infinite",
                WebkitTextStroke: "0.5px rgba(212,175,55,0.3)",
              }}
            >
              Eid Mubarak
            </h2>

            {/* Static wish */}
            <p
              className="font-serif text-base sm:text-lg text-[#fefce8] leading-relaxed drop-shadow-sm font-medium"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
            >
              May this beautiful day bring peace, happiness, and infinite blessings to you and your family.
            </p>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#fde047] to-transparent mx-auto opacity-70" />

            {/* Typing quote with blinking cursor */}
            <p
              className="font-body text-sm sm:text-base text-[#fef08a] italic leading-relaxed max-w-xs mx-auto drop-shadow-sm font-light min-h-[5rem]"
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
