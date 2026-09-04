import { useState, useEffect } from "react";

/** Single-word mode: type once and stop */
type SingleProps = {
  text: string;
  words?: never;
  speed?: number;
  delay?: number;
  pause?: never;
  deleteSpeed?: never;
};

/** Multi-word cycling mode: type → pause → delete → next word */
type MultiProps = {
  words: string[];
  text?: never;
  speed?: number;
  delay?: number;
  pause?: number;
  deleteSpeed?: number;
};

type TypewriterProps = SingleProps | MultiProps;

export function Typewriter({
  text,
  words,
  speed = 100,
  delay = 0,
  pause = 1500,
  deleteSpeed = 60,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  // Single-word mode
  useEffect(() => {
    if (words) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay, words]);

  useEffect(() => {
    if (words || !started || !text) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, started, words]);

  // Multi-word cycling mode
  useEffect(() => {
    if (!words || words.length === 0) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentWord = words[wordIndex];

      if (!deleting) {
        charIndex++;
        setDisplayedText(currentWord.substring(0, charIndex));
        if (charIndex === currentWord.length) {
          deleting = true;
          timeout = setTimeout(tick, pause);
          return;
        }
      } else {
        charIndex--;
        setDisplayedText(currentWord.substring(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeout = setTimeout(tick, deleting ? deleteSpeed : speed);
    };

    timeout = setTimeout(tick, delay);
    return () => clearTimeout(timeout);
  }, [words, speed, delay, pause, deleteSpeed]);

  return (
    <span className="inline-block">
      {displayedText}
      <span className="animate-pulse border-r-4 border-current ml-1 inline-block h-[0.85em] align-middle -mt-1" />
    </span>
  );
}
