import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
}

const StarBurstEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const particleCount = 6 + Math.floor(Math.random() * 4); // 6-9 particles
    const newParticles: Particle[] = [];
    const timestamp = Date.now();

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: timestamp + i,
        x: e.clientX,
        y: e.clientY,
        angle: (i / particleCount) * 360 + (Math.random() * 20 - 10),
        distance: 40 + Math.random() * 60,
        size: 8 + Math.random() * 12,
        duration: 0.6 + Math.random() * 0.4,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup: remove these particles after their animation duration
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
    }, 1200);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x, 
              y: p.y, 
              opacity: 1, 
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              x: p.x + Math.cos((p.angle * Math.PI) / 180) * p.distance,
              y: p.y + Math.sin((p.angle * Math.PI) / 180) * p.distance,
              opacity: 0,
              scale: [0, 1.2, 0.5, 0],
              rotate: p.angle + 180
            }}
            transition={{ 
              duration: p.duration, 
              ease: "easeOut" 
            }}
            className="absolute text-[#fde047] drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]"
            style={{ 
              width: p.size, 
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StarBurstEffect;
