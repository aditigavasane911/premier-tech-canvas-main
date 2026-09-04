import { useState, useEffect } from "react";

export function Typewriter({ 
  words, 
  speed = 100, 
  delay = 0,
  deleteSpeed = 50,
  pause = 1500
}: { 
  words: string[]; 
  speed?: number; 
  delay?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let timeout: ReturnType<typeof setTimeout>;
    
    const currentWord = words[wordIndex % words.length];

    if (isDeleting) {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    } else {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, started, wordIndex, words, speed, deleteSpeed, pause]);

  return (
    <span className="inline-block">
      {displayedText}
      <span className="animate-pulse border-r-4 border-current ml-[2px] inline-block h-[0.85em] align-middle -mt-1"></span>
    </span>
  );
}
