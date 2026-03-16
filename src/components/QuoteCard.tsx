import { useState, useCallback } from "react";

const quotes = [
  "Let this Eid remind us that the greatest wealth is kindness.",
  "Eid is not only a celebration, it is a reminder to spread love and gratitude.",
  "When hearts are grateful, every day feels like Eid.",
  "Faith, patience, and gratitude turn ordinary days into blessings.",
  "May the light of Eid shine in your heart all year long.",
  "True joy is found in making others smile this Eid.",
  "The beauty of Eid lies in the hearts that come together.",
  "Gratitude unlocks the fullness of life — let this Eid fill your soul.",
  "In giving, we receive the greatest blessings of Eid.",
  "Eid teaches us that love shared is love multiplied.",
];

const QuoteCard = () => {
  const [quote, setQuote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [fading, setFading] = useState(false);

  const generateQuote = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      let newQuote = quote;
      while (newQuote === quote) {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      }
      setQuote(newQuote);
      setFading(false);
    }, 400);
  }, [quote]);

  return (
    <div
      className="max-w-lg w-full text-center glass-panel rounded-3xl px-8 py-10"
    >
      <h3 className="font-display text-sm tracking-widest uppercase gold-text mb-6">
        ✦ Words of Wisdom ✦
      </h3>
      <p
        className="italic text-lg text-foreground/80 font-body leading-relaxed mb-8"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.4s ease",
          minHeight: "60px",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <button
        onClick={generateQuote}
        className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 bg-primary text-primary-foreground"
      >
        Generate Another Quote
      </button>
    </div>
  );
};

export default QuoteCard;
