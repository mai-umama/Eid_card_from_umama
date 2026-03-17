import { useMemo } from "react";

const SkyBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 70,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
  }, []);

  const lanterns = [
    { top: "15%", left: "10%", delay: "0s", size: 28 },
    { top: "30%", left: "85%", delay: "2s", size: 24 },
    { top: "55%", left: "6%", delay: "4s", size: 20 },
    { top: "20%", left: "72%", delay: "1s", size: 22 },
    { top: "45%", left: "90%", delay: "3s", size: 18 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden transition-colors duration-700" style={{ zIndex: 0, background: "hsl(var(--background))" }}>
      {/* Radial glow / Sky Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(var(--gold) / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Sun / Moon Container */}
      <div className="absolute transition-all duration-1000" style={{ top: "40px", right: "10%" }}>
        {/* The Moon (Dark Mode) */}
        <div
          className="relative rounded-full transition-all duration-700 dark:opacity-100 opacity-0"
          style={{
            width: "80px",
            height: "80px",
            background: "hsl(var(--gold))",
            boxShadow: "0 0 60px hsl(var(--gold) / 0.4), 0 0 120px hsl(var(--gold) / 0.2)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: "-10px",
              left: "20px",
              width: "80px",
              height: "80px",
              background: "hsl(var(--background))",
            }}
          />
        </div>

        {/* The Sun (Light Mode) */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700 dark:opacity-0 opacity-100"
          style={{
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle at 30% 30%, #fff, #fde047 60%, #bf953f)",
            boxShadow: "0 0 80px rgba(253, 224, 71, 0.6), 0 0 150px rgba(191, 149, 63, 0.3)",
          }}
        />
      </div>

      {/* Stars (Subtle in light mode) */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full transition-opacity duration-700 dark:opacity-100 opacity-30"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "hsl(var(--gold) / 0.8)",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Floating Lanterns (Themed) */}
      {lanterns.map((l, i) => (
        <div
          key={i}
          className="absolute transition-all duration-700"
          style={{
            top: l.top,
            left: l.left,
            width: `${l.size}px`,
            height: `${l.size * 1.6}px`,
            background: "hsl(var(--gold))",
            clipPath:
              "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
            opacity: 0.35,
            animation: `float 6s ease-in-out ${l.delay} infinite`,
            boxShadow: "0 0 25px hsl(var(--gold) / 0.3)",
          }}
        />
      ))}
    </div>
  );
};

export default SkyBackground;
