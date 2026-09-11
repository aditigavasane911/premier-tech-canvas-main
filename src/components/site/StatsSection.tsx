import { useState, useEffect, Fragment } from "react";
import { STATS } from "@/data/siteData";

function useCountUp({
  end,
  duration = 1800,
  pauseDuration = 1000,
  delay = 0,
  isHovered = false,
}: {
  end: number;
  duration?: number;
  pauseDuration?: number;
  delay?: number;
  isHovered: boolean;
}) {
  const [count, setCount] = useState(end);

  useEffect(() => {
    if (!isHovered) {
      setCount(end);
      return;
    }

    let animFrameId: number;
    let timerId: ReturnType<typeof setTimeout>;
    let active = true;

    const runCycle = () => {
      setCount(0);
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!active) return;
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          animFrameId = requestAnimationFrame(step);
        } else {
          timerId = setTimeout(() => {
            if (active) {
              runCycle();
            }
          }, pauseDuration);
        }
      };

      animFrameId = requestAnimationFrame(step);
    };

    const delayTimerId = setTimeout(() => {
      if (active) {
        runCycle();
      }
    }, delay);

    return () => {
      active = false;
      cancelAnimationFrame(animFrameId);
      clearTimeout(timerId);
      clearTimeout(delayTimerId);
    };
  }, [end, duration, pauseDuration, delay, isHovered]);

  return count;
}

function StatItem({
  end,
  suffix,
  title,
  label,
  index,
  isHovered,
}: {
  end: number;
  suffix: string;
  title: string;
  label: string;
  index: number;
  isHovered: boolean;
}) {
  const count = useCountUp({
    end,
    duration: 1800,
    pauseDuration: 1000,
    delay: index * 180,
    isHovered,
  });

  return (
    <div
      className="stat-item transition-transform duration-300"
      style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
    >
      <p className="stat-number">
        {end >= 1000
          ? count >= 1000
            ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`
            : count.toString()
          : count.toString()}
        {suffix}
      </p>
      <p className="stat-title">{title}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  return (
    <section
      className="stat-section cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      <div className="stat-section-inner">
        <div className="stat-row">
          {STATS.map((s, i) => (
            <Fragment key={s.title}>
              <StatItem {...s} index={i} isHovered={isSectionHovered} />
              {i < STATS.length - 1 && <div className="stat-divider" />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
