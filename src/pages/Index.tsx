import { useState, useCallback, useRef, useEffect } from "react";
import SkyBackground from "@/components/SkyBackground";
import VelvetArchSection from "@/components/VelvetArchSection";
import StarBurstEffect from "@/components/StarBurstEffect";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, BookOpen, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

const Index = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or default to true
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    }
    return true;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Apply theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Scroll-reveal refs
  const titleReveal    = useScrollReveal(0.1);
  const charReveal     = useScrollReveal(0.1);
  const inputReveal    = useScrollReveal(0.1);

  // Auto-play on first user interaction
  useEffect(() => {
    const playOnFirstInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.6;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      document.removeEventListener("click", playOnFirstInteraction, true);
      document.removeEventListener("touchstart", playOnFirstInteraction, true);
    };
    document.addEventListener("click", playOnFirstInteraction, true);
    document.addEventListener("touchstart", playOnFirstInteraction, true);
    return () => {
      document.removeEventListener("click", playOnFirstInteraction, true);
      document.removeEventListener("touchstart", playOnFirstInteraction, true);
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); }
      else { audioRef.current.play().catch(() => {}); }
      setIsPlaying(!isPlaying);
    }
  };

  const celebrate = useCallback(() => {
    if (!name.trim()) return;
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setIsCelebrating(true);
    setDisplayName(name.trim());

    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        ...defaults,
        particleCount: 50 * (timeLeft / duration),
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#d4af37", "#065f46", "#ffffff", "#fbbf24", "#10b981", "#ec4899", "#8b5cf6"],
      });
    }, 250);

    setTimeout(() => {
      setIsCelebrating(false);
    }, duration);
  }, [name, isPlaying]);

  const scrollToNext = () => {
    document.getElementById('velvet-arch-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative bg-background overflow-x-hidden">
      <StarBurstEffect />
      <audio ref={audioRef} src="/eid_mubarak.mp3" loop className="hidden" />
      <SkyBackground />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <main className="w-full min-h-[100svh] flex flex-col items-center justify-center relative z-10 px-4 pt-10 pb-4 gap-0">

        {/* Title */}
        <div
          ref={titleReveal}
          className="reveal flex flex-col items-center text-center space-y-1 mb-1"
          style={{ animationDelay: "0ms" }}
        >
          <h2
            className="font-display font-bold bg-clip-text text-transparent bg-[linear-gradient(110deg,#d4af37,45%,#fff8b0,55%,#d4af37)] bg-[length:200%_100%] animate-[shimmer_2.5s_infinite] drop-shadow-[0_2px_10px_rgba(212,175,55,0.8)] opacity-95 tracking-[0.2em]"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}
          >
            عِيد مُبَارَك
          </h2>
          <h1
            className="font-display font-bold bg-clip-text text-transparent bg-[linear-gradient(110deg,#bf953f,45%,#fcf6ba,55%,#bf953f)] bg-[length:200%_100%] animate-[shimmer_2s_infinite] drop-shadow-[0_4px_25px_rgba(212,175,55,0.6)] text-center transition-all duration-700 max-w-[95vw] leading-tight tracking-wide"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {displayName ? `Eid Mubarak, ${displayName}` : "Eid Mubarak"}
          </h1>
        </div>

        {/* Cartoon characters */}
        <div
          ref={charReveal}
          className="reveal flex items-end justify-center"
          style={{ animationDelay: "120ms", width: "clamp(200px, 34vw, 360px)" }}
        >
          <img
            src="/cartoon_kids.png"
            alt="Cartoon children in Eid clothes"
            className="w-full h-full object-contain object-bottom hover:scale-105 transition-transform duration-700 drop-shadow-[0_10px_22px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Input & Celebrate */}
        <div
          ref={inputReveal}
          className="reveal w-full max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3 mt-2 z-20"
          style={{ animationDelay: "240ms" }}
        >
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Enter your name"
              maxLength={25}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                localStorage.setItem("eid-user-name", e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && celebrate()}
              className="w-full bg-slate-100/40 dark:bg-black/40 border-2 border-[#d4af37]/80 rounded-full px-6 py-3.5 dark:text-white text-slate-800 font-body text-base outline-none focus:border-[#d4af37] focus:bg-white/60 dark:focus:bg-black/60 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] placeholder:text-slate-600 dark:placeholder:text-white/60 focus:shadow-[0_0_25px_rgba(212,175,55,0.35)] backdrop-blur-sm"
            />
          </div>
          <button
            onClick={celebrate}
            disabled={isCelebrating || !name.trim()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-display text-lg tracking-widest transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_45px_rgba(212,175,55,1)] active:scale-95 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] text-black shadow-[0_0_30px_rgba(212,175,55,0.8)] border border-[#fcf6ba]/50 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2 font-bold">Celebrate ✨</span>
            <div className="absolute inset-0 h-full w-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        {/* Premium CTA Button */}
        {displayName && (
          <button
            onClick={scrollToNext}
            className="mt-10 px-10 py-4 rounded-full font-display text-sm sm:text-base tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 hover:-translate-y-2 active:scale-95 bg-[linear-gradient(135deg,#bf953f_0%,#fcf6ba_50%,#bf953f_100%)] text-black font-bold shadow-[0_0_25px_rgba(191,149,63,0.5)] hover:shadow-[0_0_50px_rgba(191,149,63,0.9)] flex items-center gap-3 group relative overflow-hidden z-20"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <span className="relative z-10 drop-shadow-sm">Reveal your Eid wish ✨</span>
            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
          </button>
        )}
      </main>

      {/* Second Section: Velvet Arch */}
      {name.trim() && <VelvetArchSection userName={displayName} />}

      {/* ── Floating Buttons ───────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-4 sm:right-6 flex flex-col items-end gap-3 z-50">

        {/* Glassmorphism audio button */}
        <button
          onClick={toggleAudio}
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(0,0,0,0.55) 100%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1.5px solid rgba(212,175,55,0.45)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            width: "3.25rem",
            height: "3.25rem",
          }}
          aria-label="Toggle Audio"
        >
          {/* Inner glow ring on hover */}
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: "0 0 0 0 rgba(212,175,55,0.6)", animation: "ring-pulse 1.2s ease-out infinite" }}
          />
          <span className="relative text-[#d4af37]">
            {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </span>
        </button>

        {/* Story button */}
        <Link
          to="/create-card"
          className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-300/30 backdrop-blur-md group"
        >
          <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          <span className="tracking-wide">Create Card</span>
        </Link>

        <Link
          to="/story"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] active:scale-95 bg-gradient-to-r from-rose-800 to-pink-700 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] border border-pink-500/30 backdrop-blur-md"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline tracking-wide">Eid Story</span>
        </Link>
      </div>

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-4 sm:right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-lg group relative overflow-hidden"
          style={{
            background: isDarkMode ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: `1.5px solid ${isDarkMode ? "rgba(212,175,55,0.3)" : "rgba(191,149,63,0.3)"}`,
            color: isDarkMode ? "#fde047" : "#bf953f",
          }}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M22 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
          )}
          <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Index;
