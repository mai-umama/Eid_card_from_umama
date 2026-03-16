import { useState, useEffect } from "react";

const scenes = [
  {
    title: "The Joy of Salami",
    description:
      "Children lining up with excitement, eyes sparkling as they receive their Eidi envelopes from loving elders.",
    emoji: "🧧",
  },
  {
    title: "New Eid Clothes",
    description:
      "Little ones dressed in their finest, twirling and showing off colorful new outfits.",
    emoji: "👗",
  },
  {
    title: "Family Gatherings",
    description:
      "Relatives embracing each other warmly, sharing laughter and heartfelt greetings.",
    emoji: "🤗",
  },
  {
    title: "Sweet Celebrations",
    description:
      "The aroma of sheer khurma and sweet treats filling every corner of the home.",
    emoji: "🍮",
  },
  {
    title: "Lanterns & Lights",
    description:
      "Streets and homes adorned with glowing lanterns and festive decorations.",
    emoji: "🏮",
  },
];

interface EidScenesProps {
  visible: boolean;
}

const EidScenes = ({ visible }: EidScenesProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % scenes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="w-full max-w-xl glass-panel rounded-3xl overflow-hidden relative"
      style={{ minHeight: "200px" }}
    >
      {scenes.map((scene, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center p-8 text-center"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <div>
            <span className="text-5xl mb-4 block">{scene.emoji}</span>
            <h3 className="font-display text-lg gold-text mb-2">
              {scene.title}
            </h3>
            <p className="text-foreground/70 font-body text-sm leading-relaxed">
              {scene.description}
            </p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background:
                i === current
                  ? "hsl(var(--gold))"
                  : "hsl(var(--gold) / 0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EidScenes;
