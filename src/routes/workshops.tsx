import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { WorkshopMarquee } from "@/components/site/WorkshopMarquee";
import { WORKSHOPS } from "@/data/workshops";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops & Campus Engagement | Softtech Solutions" },
      { name: "description", content: "Explore our past workshops and campus engagements." },
    ],
  }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full items-center justify-between px-5 lg:px-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
          <span className="font-display text-sm font-semibold text-primary">
            Softtech Solutions
          </span>
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

          <div className="mt-16 w-full overflow-hidden">
            <WorkshopMarquee workshops={WORKSHOPS} />
          </div>
        </div>
      </main>
    </div>
  );
}
