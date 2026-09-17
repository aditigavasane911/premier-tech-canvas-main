import { ArrowUpRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import mentorship from "@/assets/whyus-mentorship.jpg";
import placement from "@/assets/whyus-placement.jpg";
import projects from "@/assets/whyus-projects.jpg";
import curriculum from "@/assets/whyus-curriculum.jpg";
import interview from "@/assets/whyus-interview.jpg";

const CARDS = [
  {
    image: mentorship,
    title: "1:1 Mentorship",
    caption:
      "A dedicated mentor tracks your progress, code quality and interview prep in every small batch.",
  },
  {
    image: placement,
    title: "Placement Support",
    caption: "Resume, mock drives and referrals continue until you sign your offer letter.",
  },
  {
    image: projects,
    title: "Real Projects",
    caption:
      "Ship production-style applications with line-by-line code reviews from industry engineers.",
  },
  {
    image: curriculum,
    title: "Industry Curriculum",
    caption:
      "Syllabus rebuilt every quarter with hiring managers so you learn what interviews actually ask.",
  },
  {
    image: interview,
    title: "Mock Interviews",
    caption: "Defend your code in front of panels until the real interview feels like a rehearsal.",
  },
];

/**
 * The track must stay wider than the widest viewport with no blank trailing
 * edge, and the -50% loop covers a whole set per pass. Raising REPEAT slows
 * the perceived scroll (each card lingers longer in view) while keeping the
 * loop seamless.
 */
const REPEAT = 8;
const WHEEL = Array.from({ length: REPEAT }, () => CARDS).flat();

/** Duration of one -50% marquee pass (half the track = REPEAT/2 * CARDS cards).
 *  Larger value = slower scroll. */
const MARQUEE_MS = 110_000;

export function WhyUsGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Keep the 3s overlay in lock-step with what's visually centered by
  // reading the track's current translateX each frame. Using a rAF loop
  // avoids a parallel setInterval that would drift from the CSS animation.
  const measureStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = track.querySelectorAll("article");
    if (cards.length < 2) return 0;
    const a = cards[0] as HTMLElement;
    const b = cards[1] as HTMLElement;
    return Math.max(1, b.offsetLeft - a.offsetLeft);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const getStep = () => measureStep();
    let lastIdx = -1;
    let isInView = true;

    const tick = () => {
      if (!isInView || document.hidden) {
        rafRef.current = null;
        return;
      }
      const step = getStep();
      if (step === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const raw = getComputedStyle(track).transform;
      let tx = 0;
      if (raw && raw !== "none") {
        const m = raw.match(/matrix.*\((.+)\)/);
        if (m?.[1]) {
          const vals = m[1].split(",").map(Number);
          const v = vals.length === 6 ? vals[4] : vals[12];
          if (v != null && Number.isFinite(v)) tx = v;
        }
      }
      // translateX(-50%) loop: tx oscillates in [-trackHalf, 0].
      // Normalize to distance scrolled from 0 so we can map to a card.
      const trackHalf = track.scrollWidth / 2;
      const dist = trackHalf ? ((-tx % trackHalf) + trackHalf) % trackHalf : 0;
      // Offset so card 0 is considered centered at animation start (tx=0).
      // Wrapper center compensates for varying viewport widths without re-measuring.
      const cardW = (track.querySelector("article") as HTMLElement | null)?.offsetWidth ?? step;
      const centerPad = Math.max(0, (wrapper.offsetWidth - cardW) / 2);
      const idx = Math.floor((dist + centerPad) / step) % CARDS.length;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIndex(idx);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const startMeasuring = () => {
      if (rafRef.current == null && !document.hidden) {
        lastIdx = -1;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const stopMeasuring = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onVis = () => {
      if (document.hidden) {
        stopMeasuring();
      } else {
        startMeasuring();
      }
    };

    const onResize = () => {
      lastIdx = -1;
    };

    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              isInView = Boolean(entry?.isIntersecting);
              if (isInView) startMeasuring();
              else stopMeasuring();
            },
            { rootMargin: "200px 0px" },
          );
    if (intersectionObserver) {
      intersectionObserver.observe(wrapper);
    } else {
      startMeasuring();
    }

    document.addEventListener("visibilitychange", onVis);

    // Re-sync on resize so step/center stay valid without tearing.
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(() => {
        lastIdx = -1;
      });
      ro.observe(track);
      ro.observe(wrapper);
    } catch {
      // ResizeObserver not available in some test environments.
    }
    window.addEventListener("resize", onResize);

    return () => {
      stopMeasuring();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      intersectionObserver?.disconnect();
      ro?.disconnect();
    };
  }, [measureStep]);

  const trackStyle = {
    "--whyus-marquee-duration": `${MARQUEE_MS}ms`,
  } as CSSProperties;

  return (
    <div ref={wrapperRef} className="whyus-track-wrapper" aria-label="Why choose us">
      <div ref={trackRef} className="whyus-track marquee" style={trackStyle}>
        {WHEEL.map((card, cardIndex) => (
          <article
            key={`${card.title}-${cardIndex}`}
            className="whyus-card group"
            data-active={cardIndex % CARDS.length === activeIndex ? "true" : undefined}
            aria-hidden={cardIndex >= CARDS.length * 2 ? true : undefined}
          >
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              decoding="async"
              width={768}
              height={1152}
              className="whyus-card-img"
            />
            <span className="whyus-card-arrow" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <div className="whyus-card-overlay">
              <p className="font-display text-lg font-semibold text-white">{card.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/75">{card.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
