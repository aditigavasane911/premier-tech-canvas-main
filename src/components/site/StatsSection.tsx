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

function StudentIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Mortarboard Diamond */}
      <polygon points="24 6 42 14 24 22 6 14" />
      {/* Cap Under-arch */}
      <path d="M12 17.5v4c0 3.5 5.4 6 12 6s12-2.5 12-6v-4" />
      {/* Tassel */}
      <path d="M9 15v8" />
      {/* Head */}
      <path d="M18 25.5a6 6 0 0 0 12 0" />
      {/* Shoulders */}
      <path d="M11 41c0-6 5.8-10 13-10s13 4 13 10" />
    </svg>
  );
}

function CourseIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="7" width="14" height="14" rx="3" />
      <rect x="27" y="7" width="14" height="14" rx="3" />
      <rect x="7" y="27" width="14" height="14" rx="3" />
      <rect x="27" y="27" width="14" height="14" rx="3" />
    </svg>
  );
}

function PlacementIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Mortarboard Diamond */}
      <polygon points="21 7 36 14 21 21 6 14" />
      {/* Cap base */}
      <path d="M11 16.5v4c0 3.5 4.5 5.5 10 5.5s10-2.5 10-5.5v-4" />
      {/* Tassel on left */}
      <path d="M9 15v8" />
      {/* Target badge on bottom right */}
      <circle cx="33" cy="31" r="9" />
      <circle cx="33" cy="31" r="5" />
      {/* Checkmark inside target */}
      <path d="M30.5 31l1.8 1.8 3.5-3.5" />
    </svg>
  );
}

function ProjectsIcon({ className = "w-7 h-7 sm:w-8 sm:h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Browser window */}
      <rect x="6" y="8" width="36" height="32" rx="4" />
      {/* Title bar divider */}
      <line x1="6" y1="18" x2="42" y2="18" />
      {/* Three dots */}
      <circle cx="12" cy="13" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="13" r="1.2" fill="currentColor" />
      <circle cx="21" cy="13" r="1.2" fill="currentColor" />
      {/* Code symbol < / > */}
      <path d="M17 25l-4 4 4 4" />
      <line x1="22" y1="35" x2="26" y2="23" />
      <path d="M31 25l4 4-4 4" />
    </svg>
  );
}

const STAT_ICONS = [
  <StudentIcon key="student" />,
  <CourseIcon key="course" />,
  <PlacementIcon key="placement" />,
  <ProjectsIcon key="projects" />,
];

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
      <div className="my-1.5 flex items-center justify-center text-[#79BAEC]">
        {STAT_ICONS[index] ?? null}
      </div>
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
