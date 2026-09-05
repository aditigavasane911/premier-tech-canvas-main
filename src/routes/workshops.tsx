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
  },

  {
    id: "fabtech",
    college: "FABTECH COLLEGE",
    location: "Sangola",
    tech: "AWS Cloud Services",
    date: "June 2024",
    image: fabtechLogo,
    isLogo: true,
  },
  {
    id: "plgie",
    college: "Puranmal Lahoti Government Institute of Engineering",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: plgieLogo,
    isLogo: true,
  },
  {
    id: "grwp",
    college: "Government Residential Women's Polytechnic",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: grwpLogo,
    isLogo: true,
  },
  {
    id: "msbec",
    college: "M.S. Bidve Engineering College (MSBEC)",
    location: "Latur",
    tech: "Tech Workshop",
    date: "2024",
    image: msbecLogo,
    isLogo: true,
  },
  {
    id: "hncc",
    college: "S.A.P.D.J. Pathashala's Hirachand Nemchand College of Commerce",
    location: "Solapur",
    tech: "Tech Workshop",
    date: "2024",
    image: hnccLogo,
    isLogo: true,
  },
  {
    id: "rit",
    college: "Rajarambapu Institute of Technology (RIT)",
    location: "Sangli",
    tech: "Tech Workshop",
    date: "2024",
    image: ritLogo,
    isLogo: true,
  },
  {
    id: "vvp",
    college: "Dr. Vithalrao Vikhe Patil College Of Engineering",
    location: "Ahmednagar",
    tech: "Tech Workshop",
    date: "2024",
    image: vvpLogo,
    isLogo: true,
  },
  {
    id: "mitcrer",
    college: "MIT College of Railway Engineering & Research",
    location: "Barshi",
    tech: "Tech Workshop",
    date: "2024",
    image: mitcrerLogo,
    isLogo: true,
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

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WORKSHOPS.map((workshop, i) => (
              <div 
                key={workshop.id} 
                className="group animate-fade-in relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`aspect-[4/3] overflow-hidden ${workshop.isLogo ? 'bg-white p-6' : 'bg-muted'}`}>
                  <img 
                    src={workshop.image} 
                    alt={`${workshop.college} Workshop`}
                    className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${workshop.isLogo ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
                    <MapPin className="h-3.5 w-3.5" />
                    {workshop.location}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-tight text-[#0B2559] group-hover:text-[#2A75D3] transition-colors">
                    {workshop.college}
                  </h3>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-sm font-semibold text-foreground">{workshop.tech}</span>
                    <span className="text-xs font-medium text-muted-foreground">{workshop.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
