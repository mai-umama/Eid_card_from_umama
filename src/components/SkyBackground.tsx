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
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(222 30% 15%) 0%, transparent 60%)",
        }}
      />

      {/* Crescent Moon */}
      <div className="absolute" style={{ top: "40px", right: "10%" }}>
        <div
          className="relative rounded-full"
          style={{
            width: "80px",
            height: "80px",
            background: "hsl(var(--gold))",
            boxShadow:
              "0 0 60px hsl(var(--gold) / 0.4), 0 0 120px hsl(var(--gold) / 0.2)",
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
      </div>

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "hsl(43 70% 80%)",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Floating Lanterns */}
      {lanterns.map((l, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: l.top,
            left: l.left,
            width: `${l.size}px`,
            height: `${l.size * 1.6}px`,
            background: "hsl(var(--gold))",
            clipPath:
              "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
            opacity: 0.45,
            animation: `float 6s ease-in-out ${l.delay} infinite`,
            boxShadow: "0 0 25px hsl(var(--gold) / 0.5)",
          }}
        />
      ))}
    </div>
  );
};

export default SkyBackground;
