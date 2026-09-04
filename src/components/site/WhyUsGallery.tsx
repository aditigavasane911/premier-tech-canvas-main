import { ArrowUpRight } from "lucide-react";
import mentorship from "@/assets/whyus-mentorship.jpg";
import placement from "@/assets/whyus-placement.jpg";
import projects from "@/assets/whyus-projects.jpg";
import curriculum from "@/assets/whyus-curriculum.jpg";
import interview from "@/assets/whyus-interview.jpg";

const CARDS = [
  {
    image: mentorship,
    title: "1:1 Mentorship",
    caption: "A dedicated mentor tracks your progress, code quality and interview prep in every small batch.",
  },
  {
    image: placement,
    title: "Placement Support",
    caption: "Resume, mock drives and referrals continue until you sign your offer letter.",
  },
  {
    image: projects,
    title: "Real Projects",
    caption: "Ship production-style applications with line-by-line code reviews from industry engineers.",
  },
  {
    image: curriculum,
    title: "Industry Curriculum",
    caption: "Syllabus rebuilt every quarter with hiring managers so you learn what interviews actually ask.",
  },
  {
    image: interview,
    title: "Mock Interviews",
    caption: "Defend your code in front of panels until the real interview feels like a rehearsal.",
  },
];

export function WhyUsGallery() {
  const items = [...CARDS, ...CARDS];
  return (
    <div className="whyus-track-wrapper">
      <div className="whyus-track">
        {items.map((card, i) => (
          <article key={`${card.title}-${i}`} className="whyus-card group">
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
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
