import { useState, useEffect } from "react";

export function Typewriter({ text, speed = 100, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, started]);

  return (
    <span className="inline-block">
      {displayedText}
      <span className="animate-pulse border-r-4 border-primary ml-1 inline-block h-[0.85em] align-middle -mt-1"></span>
    </span>
  );
}
