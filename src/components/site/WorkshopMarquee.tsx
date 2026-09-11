import { MapPin } from "lucide-react";
import type { Workshop } from "@/data/workshops";

/**
 * Doubled marquee of workshop/college cards, shared between the homepage
 * and the /workshops page. The track animates via `.animate-marquee`
 * (translateX -50% loop, so the list must be duplicated).
 */
export function WorkshopMarquee({ workshops }: { workshops: Workshop[] }) {
  return (
    <div className="flex w-max gap-10 py-4 sm:gap-16 animate-marquee">
      {[...workshops, ...workshops].map((workshop, i) => (
        <div
          key={`${workshop.id}-${i}`}
          className="group relative flex flex-col items-center w-36 sm:w-44 transition-all duration-300"
        >
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-blue-900/5 p-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
            <img
              src={workshop.image}
              alt={workshop.college}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
          <h3 className="mt-4 font-display text-sm font-bold text-center leading-snug text-[#0B2559]">
            {workshop.college}
          </h3>
          <div className="mt-1.5 flex items-center justify-center gap-1 text-xs text-[#4A5568] font-medium">
            <MapPin className="h-3.5 w-3.5" />
            {workshop.location}
          </div>
        </div>
      ))}
    </div>
  );
}
