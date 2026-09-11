import { ArrowRight } from "lucide-react";
import { DEVICON_BASE } from "@/lib/constants";

export interface Course {
  name: string;
  level: string;
  icon: string;
  bg: string;
  teaches: string[];
  duration: string;
  description: string;
  topicsFull: string[];
  skills: string[];
  prerequisites: string;
  mode: string;
  fee: string;
}

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  /** Scroll-row variant (adds `courses-card` sizing + entrance classes). */
  animated?: boolean;
  /** True once the IntersectionObserver has fired — starts the staggered entrance. */
  visible?: boolean;
  /** Stagger delay in ms used when `visible` is true. */
  index?: number;
}

/**
 * Shared course card used in the horizontal scroll row (entrance-animated)
 * and the expanded "See all courses" grid. Visual markup is identical;
 * only the wrapper and animation differ.
 */
export function CourseCard({
  course,
  onClick,
  animated = false,
  visible = false,
  index = 0,
}: CourseCardProps) {
  const className = `surface-card group relative flex flex-col p-0 overflow-hidden cursor-pointer${
    animated ? " courses-card course-card-enter" : " h-full"
  }${visible ? " course-card-visible" : ""}`;

  return (
    <div
      className={className}
      style={visible ? { animationDelay: `${index * 60}ms` } : undefined}
      onClick={onClick}
      onAnimationEnd={(e) => {
        e.currentTarget.style.animation = "none";
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Colored Top Section */}
      <div
        className="relative h-24 w-full p-3.5 sm:p-4 shrink-0 overflow-hidden"
        style={{ background: course.bg }}
      >
        {/* Subtle light burst */}
        <div
          className="absolute right-0 top-0 h-full w-full opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 100% 0%, white 0%, transparent 60%)",
          }}
        />

        {/* Large technology logo watermark */}
        <img
          src={`${DEVICON_BASE}${course.icon}`}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute -right-3 -bottom-3 h-24 w-24 object-contain opacity-[0.15] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
          style={{ filter: "grayscale(100%) brightness(200%)" }}
        />

        {/* Small icon box */}
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
          <img
            src={`${DEVICON_BASE}${course.icon}`}
            alt={`${course.name} logo`}
            loading="lazy"
            decoding="async"
            className="h-4.5 w-4.5 object-contain"
          />
        </div>
      </div>

      {/* Content Bottom Section */}
      <div className="flex flex-1 flex-col items-start gap-2 p-3.5 sm:p-4 bg-card relative z-10 w-full">
        <div className="flex flex-col gap-0.5 w-full">
          <p className="font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
            {course.name}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">
            {course.level}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 w-full">
          {course.teaches.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {course.teaches.length > 2 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{course.teaches.length - 2} more
            </span>
          )}
        </div>
        {/* Open Course CTA */}
        <div className="mt-auto pt-1.5 w-full border-t border-border/60">
          <span className="inline-flex items-center gap-2 text-base font-bold text-primary group-hover:text-secondary transition-colors">
            Open Course
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}
