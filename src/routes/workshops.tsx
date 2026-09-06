import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import plgieLogo from "@/assets/colleges/plgie.png";
import mitcrerLogo from "@/assets/colleges/mitcrer.png";
import sveriLogo from "@/assets/colleges/sveri.png";
import fabtechLogo from "@/assets/colleges/fabtech.png";
import msbecLogo from "@/assets/colleges/msbec.png";
import ritLogo from "@/assets/colleges/rit.png";
import vvpLogo from "@/assets/colleges/vvp.png";
import hnccLogo from "@/assets/colleges/hncc.png";
import grwpLogo from "@/assets/colleges/grwp.jpg";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops & Campus Engagement | Softtech Solutions" },
      { name: "description", content: "Explore our past workshops and campus engagements." },
    ],
  }),
  component: WorkshopsPage,
});

export const WORKSHOPS = [
  {
    id: "sveri",
    college: "SVERIS COLLEGE OF ENGINEERING",
    location: "Pandharpur",
    tech: "Java Development",
    date: "August 2024",
    image: sveriLogo,
    isLogo: true,
    workshopsCount: 5,
  },
  {
    id: "fabtech",
    college: "FABTECH COLLEGE",
    location: "Sangola",
    tech: "AWS Cloud Services",
    date: "June 2024",
    image: fabtechLogo,
    isLogo: true,
    workshopsCount: 8,
  },
  {
    id: "plgie",
    college: "Puranmal Lahoti Government Institute of Engineering",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: plgieLogo,
    isLogo: true,
    workshopsCount: 4,
  },
  {
    id: "grwp",
    college: "Government Residential Women's Polytechnic",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: grwpLogo,
    isLogo: true,
    workshopsCount: 3,
  },
  {
    id: "msbec",
    college: "M.S. Bidve Engineering College (MSBEC)",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: msbecLogo,
    isLogo: true,
    workshopsCount: 6,
  },
  {
    id: "hncc",
    college: "S.A.P.D.J. Pathashala's Hirachand Nemchand College of Commerce",
    location: "Solapur",
    tech: "Tech Workshop",
    date: "2024",
    image: hnccLogo,
    isLogo: true,
    workshopsCount: 5,
  },
  {
    id: "rit",
    college: "Rajarambapu Institute of Technology (RIT)",
    location: "Sangli",
    tech: "Tech Workshop",
    date: "2024",
    image: ritLogo,
    isLogo: true,
    workshopsCount: 7,
  },
  {
    id: "vvp",
    college: "Dr. Vithalrao Vikhe Patil College Of Engineering",
    location: "Ahmednagar",
    tech: "Tech Workshop",
    date: "2024",
    image: vvpLogo,
    isLogo: true,
    workshopsCount: 4,
  },
  {
    id: "mitcrer",
    college: "MIT College of Railway Engineering & Research",
    location: "Barshi",
    tech: "Tech Workshop",
    date: "2024",
    image: mitcrerLogo,
    isLogo: true,
    workshopsCount: 3,
  },
];

function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full items-center justify-between px-5 lg:px-12">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
          <span className="font-display text-sm font-semibold text-primary">Softtech Solutions</span>
        </div>
      </header>

      <main className="py-24 lg:py-32 bg-[#F4F9FF]">
        <div className="mx-auto max-w-screen-xl px-5 lg:px-12">
          <div className="text-center animate-fade-in">
            <span className="text-sm font-bold tracking-wider text-[#2A75D3] uppercase">
              GALLERY & ACHIEVEMENTS
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-[#0B2559] sm:text-5xl">
              Workshops & Campus Engagements
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#4A5568] font-medium">
              We partner with top engineering colleges to deliver hands-on technology workshops, 
              bridging the gap between academic learning and industry requirements.
            </p>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
          `}</style>
          <div className="mt-16 w-full overflow-hidden">
            <div className="flex w-max gap-10 sm:gap-16 animate-marquee hover:[animation-play-state:paused] py-4">
              {[...WORKSHOPS, ...WORKSHOPS].map((workshop, i) => (
                <div 
                  key={`${workshop.id}-${i}`} 
                  className="group relative flex flex-col items-center w-36 sm:w-44 transition-all duration-300"
                >
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-blue-900/5 p-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <img 
                      src={workshop.image} 
                      alt={workshop.college} 
                      className="h-full w-full object-contain" 
                    />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-bold text-center leading-snug text-[#0B2559]">
                    {workshop.college}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
