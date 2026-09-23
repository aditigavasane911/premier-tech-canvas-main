import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealToken {
  text: string;
  className?: string;
  isQuote?: boolean;
}

const PARAGRAPH_1_TOKENS: RevealToken[] = [
  {
    text: "“",
    className: "text-primary font-serif font-bold text-2xl leading-none inline-block mr-0.5",
    isQuote: true,
  },
  { text: "Softtech", className: "font-semibold text-slate-800" },
  { text: "Solutions" },
  { text: "&" },
  { text: "Training," },
  { text: "based" },
  { text: "in" },
  { text: "Pune," },
  { text: "builds" },
  { text: "Manufacturing" },
  { text: "Execution" },
  { text: "Systems" },
  { text: "(MES)" },
  { text: "for" },
  { text: "manufacturing" },
  { text: "environments," },
  { text: "including" },
  { text: "automotive" },
  { text: "production" },
  { text: "lines," },
  { text: "and" },
  { text: "trains" },
  { text: "students" },
  { text: "and" },
  { text: "developers" },
  { text: "in" },
  { text: "Java," },
  { text: "Python," },
  { text: "AWS," },
  { text: "Vaadin," },
  { text: "Spring," },
  { text: "and" },
  { text: "full-stack" },
  { text: "web" },
  { text: "development." },
];

const PARAGRAPH_2_TOKENS: RevealToken[] = [
  { text: "Ravindra" },
  { text: "Swami," },
  { text: "whose" },
  { text: "background" },
  { text: "spans" },
  { text: "MES" },
  { text: "engineering" },
  { text: "at" },
  { text: "companies" },
  { text: "like" },
  { text: "Fiat", className: "font-semibold text-slate-900" },
  { text: "India", className: "font-semibold text-slate-900" },
  { text: "and" },
  { text: "Volvo-Eicher,", className: "font-semibold text-slate-900" },
  { text: "and" },
  { text: "academic" },
  { text: "teaching" },
  { text: "as" },
  { text: "a" },
  { text: "lecturer" },
  { text: "and" },
  { text: "Head" },
  { text: "of" },
  { text: "Department," },
  { text: "the" },
  { text: "company" },
  { text: "brings" },
  { text: "both" },
  { text: "worlds" },
  { text: "into" },
  { text: "every" },
  { text: "project" },
  { text: "and" },
  { text: "course." },
  {
    text: "”",
    className: "text-primary font-serif font-bold text-2xl leading-none inline-block ml-0.5",
    isQuote: true,
  },
];

export function AboutTheoryReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hasTriggeredRef = useRef(false);
  const totalLinesRef = useRef(0);
  const [state, setState] = useState<"idle" | "revealing" | "complete">("idle");

  const computeLines = () => {
    const elements = wordElementsRef.current.filter((el): el is HTMLSpanElement => el !== null);
    if (!elements.length) return;

    let currentLineIndex = 0;
    let lastLineCenter: number | null = null;

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;

      const center = (rect.top + rect.bottom) / 2;

      if (lastLineCenter === null) {
        lastLineCenter = center;
        currentLineIndex = 0;
      } else if (center - lastLineCenter > 14) {
        // Line break detected across wrapped lines or paragraph break
        currentLineIndex++;
        lastLineCenter = center;
      }

      // Approximately 80-120ms between successive lines (100ms selected)
      const lineDelay = currentLineIndex * 100;
      el.style.setProperty("--line-delay", `${lineDelay}ms`);
      el.setAttribute("data-line", String(currentLineIndex));
    }

    totalLinesRef.current = currentLineIndex + 1;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial computation of lines
    computeLines();

    // Recompute on window resize if not yet triggered so wrapped lines adapt accurately
    const handleResize = () => {
      if (!hasTriggeredRef.current) {
        computeLines();
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // When web fonts finish loading, recompute to ensure accurate line wrapping
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!hasTriggeredRef.current) {
          computeLines();
        }
      });
    }

    // One-time Intersection Observer to trigger progressive reveal
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          // Unobserve and disconnect immediately: trigger ONLY ONCE per page load
          observer.unobserve(container);
          observer.disconnect();

          // Ensure lines are calculated for the exact current layout
          computeLines();

          // Start progressive line-by-line reveal
          setState("revealing");

          // Once all lines have finished revealing, mark complete
          const totalDuration = (totalLinesRef.current + 1) * 100 + 400;
          setTimeout(() => {
            setState("complete");
          }, totalDuration);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-state={state}
      className="about-reveal-container space-y-8"
      aria-label="About Softtech Solutions and Training"
    >
      {/* Paragraph 1 */}
      <p className="text-center text-base sm:text-lg italic leading-relaxed text-slate-700 font-normal max-w-2xl mx-auto">
        {PARAGRAPH_1_TOKENS.map((token, idx) => (
          <span key={`p1-${idx}`}>
            <span
              ref={(el) => {
                wordElementsRef.current[idx] = el;
              }}
              className={cn("about-reveal-word", token.className)}
            >
              {token.text}
            </span>
            {idx < PARAGRAPH_1_TOKENS.length - 1 && " "}
          </span>
        ))}
      </p>

      {/* Paragraph 2 */}
      <p className="text-center text-base sm:text-lg italic leading-relaxed text-slate-700 font-normal max-w-2xl mx-auto">
        {PARAGRAPH_2_TOKENS.map((token, idx) => {
          const globalIdx = PARAGRAPH_1_TOKENS.length + idx;
          return (
            <span key={`p2-${idx}`}>
              <span
                ref={(el) => {
                  wordElementsRef.current[globalIdx] = el;
                }}
                className={cn("about-reveal-word", token.className)}
              >
                {token.text}
              </span>
              {idx < PARAGRAPH_2_TOKENS.length - 1 && " "}
            </span>
          );
        })}
      </p>
    </div>
  );
}
