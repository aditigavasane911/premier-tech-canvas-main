import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  Quote,
  Menu,
  X,
  Send,
  ChevronDown,
  Calendar,
  Linkedin,
  Instagram,
  Star,
} from "lucide-react";
import { ImageStack } from "@/components/site/ImageStack";
import heroImage1 from "@/assets/group-photo.webp";
import heroImage2 from "@/assets/hero-teaching.webp";
import { TechMarquee } from "@/components/site/Marquee";
import { WhyUsGallery } from "@/components/site/WhyUsGallery";
import { AboutCollage } from "@/components/site/AboutCollage";
import { AboutTheoryReveal } from "@/components/site/AboutTheoryReveal";
import { FeedbackModal } from "@/components/site/FeedbackModal";
import { WriteYourOwnFeedback } from "@/components/site/WriteYourOwnFeedback";
import { Typewriter } from "@/components/site/Typewriter";
import { WORKSHOPS } from "@/data/workshops";
import { API_BASE, DEVICON_BASE } from "@/lib/constants";
import { CourseCard } from "@/components/site/CourseCard";
import { WorkshopMarquee } from "@/components/site/WorkshopMarquee";
import { DiscordIcon, XIcon } from "@/components/site/icons";
import type { FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Softtech Solutions and Trainings | IT Training, Internships & Placement Support" },
      {
        name: "description",
        content:
          "Softtech Solutions and Trainings trains students in Java, MERN, Python and Cloud with real projects, mentorship and placement support. 1200+ students trained since 2024.",
      },
      {
        property: "og:title",
        content: "Softtech Solutions and Trainings | IT Training & Placement",
      },
      {
        property: "og:description",
        content:
          "Job-ready IT training with real projects, expert mentors and placement support across 48+ course tracks.",
      },
    ],
  }),
  component: Home,
});

import { NAV, ENQUIRY_OPTIONS, COURSE_LIST, FAQS, TESTIMONIALS } from "@/data/siteData";
import { StatsSection } from "@/components/site/StatsSection";

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-blue-50 text-blue-700 border-blue-200",
  Advanced: "bg-violet-50 text-violet-700 border-violet-200",
  "Beginner to Intermediate": "bg-sky-50 text-sky-700 border-sky-200",
};

function CourseModal({
  course,
  onClose,
  onEnroll,
}: {
  course: (typeof COURSE_LIST)[0];
  onClose: () => void;
  onEnroll: (course: (typeof COURSE_LIST)[0]) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-0 sm:px-4 py-0 sm:py-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-fade-in relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white border border-border/50 shadow-2xl">
        {/* Top banner image or accent bar */}
        {"banner" in course && course.banner ? (
          <div className="relative h-44 sm:h-56 w-full overflow-hidden rounded-t-3xl bg-muted">
            <img
              src={course.banner}
              alt={`${course.name} banner`}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="h-1 w-full rounded-t-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
        )}

        {/* Close */}
        <button
          type="button"
          aria-label="Close course details"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-white/90 backdrop-blur-sm text-foreground shadow-md transition-colors hover:bg-white z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 pr-10">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-muted border border-border shadow-sm">
              <img
                src={`${DEVICON_BASE}${course.icon}`}
                alt={`${course.name} logo`}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-primary">
                {course.name}
              </h2>
              <span
                className={`mt-1.5 inline-block rounded-md border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                  LEVEL_COLOR[course.level] ?? "bg-muted text-muted-foreground border-border"
                }`}
              >
                {course.level}
              </span>
            </div>
          </div>

          {/* Meta chips */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
              <svg
                className="h-4 w-4 text-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
              <svg
                className="h-4 w-4 text-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="font-medium">{course.mode}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
              <svg
                className="h-4 w-4 text-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span className="font-medium">{course.fee}</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

          {/* Topics */}
          <div className="mt-6">
            <h3 className="font-display text-base font-semibold text-foreground">Topics Covered</h3>
            <ul className="mt-3 space-y-2">
              {course.topicsFull.map((topic) => (
                <li key={topic} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <svg
                    className="h-4 w-4 shrink-0 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="font-display text-base font-semibold text-foreground">
              Skills You'll Learn
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Prerequisites
            </p>
            <p className="mt-1.5 text-sm text-foreground">{course.prerequisites}</p>
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="flex-1 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              Enrol / Enquire Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border bg-muted/50 px-6 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const heroImages = [heroImage1, heroImage2];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [liveFeedbacks, setLiveFeedbacks] = useState<
    Array<{ name: string; role: string; quote: string; rating: number }>
  >([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    // 1. Load cached feedbacks if available
    try {
      const cached = JSON.parse(localStorage.getItem("sst_feedbacks") || "[]");
      if (Array.isArray(cached) && cached.length > 0) {
        setLiveFeedbacks(
          cached.map(
            (f: {
              name: string;
              role?: string;
              course?: string;
              quote: string;
              rating: number;
            }) => ({
              name: f.name,
              role: f.course ? `${f.role || "Student"} • ${f.course}` : f.role || "Student",
              quote: f.quote,
              rating: f.rating,
            }),
          ),
        );
      }
    } catch {
      // Ignore
    }

    // 2. Fetch from backend API
    fetch(`${API_BASE}/api/feedback`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveFeedbacks((prev) => {
            const serverFeedbacks = data.map(
              (f: {
                name: string;
                role?: string;
                course?: string;
                quote: string;
                rating: number;
              }) => ({
                name: f.name,
                role: f.course ? `${f.role || "Student"} • ${f.course}` : f.role || "Student",
                quote: f.quote,
                rating: f.rating,
              }),
            );
            const seen = new Set();
            return [...serverFeedbacks, ...prev].filter((item) => {
              const key = `${item.name}-${item.quote.slice(0, 20)}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          });
        }
      })
      .catch(() => {
        // Fallback to static testimonials
      });
  }, []);

  const allTestimonials = [...liveFeedbacks, ...TESTIMONIALS];
  const TESTIMONIALS_PER_PAGE = 5;
  const totalPages = Math.ceil(allTestimonials.length / TESTIMONIALS_PER_PAGE);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTestimonialPage((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (testimonialPage !== totalPages) return;
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      setTestimonialPage(0);
    }, 700);
    return () => clearTimeout(timeout);
  }, [testimonialPage, totalPages]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [enquiryCourse, setEnquiryCourse] = useState<(typeof COURSE_LIST)[0] | null>(null);
  const [defaultEnquiryFor, setDefaultEnquiryFor] = useState<string>("Online Course");
  const [selectedCourse, setSelectedCourse] = useState<(typeof COURSE_LIST)[0] | null>(null);
  const [coursesTriggered, setCoursesTriggered] = useState(false);
  const coursesRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState("Home");
  const [hiddenNav, setHiddenNav] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        frameId = null;
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
          setHiddenNav(true);
        } else if (currentScrollY < lastScrollY.current) {
          setHiddenNav(false);
        }
        lastScrollY.current = currentScrollY;

        const sections = NAV.map((n) => n.href.substring(1)).filter(Boolean);
        let current = "Home";
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element && currentScrollY >= element.offsetTop - 150) {
            const navItem = NAV.find((n) => n.href === `#${section}`);
            if (navItem) current = navItem.label;
          }
        }
        if (window.innerHeight + Math.round(currentScrollY) >= document.body.offsetHeight - 100) {
          current = "Contact";
        }
        setActiveSection((active) => (active === current ? active : current));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const el = coursesRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCoursesTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [callbackStatus, setCallbackStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCallbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCallbackStatus(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const userMessage = ((formData.get("message") as string) || "").trim();
    const finalMessage = enquiryCourse
      ? userMessage
        ? `[Course: ${enquiryCourse.name}] ${userMessage}`
        : `[Course: ${enquiryCourse.name}]`
      : userMessage;

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      enquiryFor: formData.get("enquiryFor"),
      message: finalMessage,
    };

    try {
      const res = await fetch(`${API_BASE}/api/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setCallbackStatus({
          type: "success",
          text: "Callback request submitted! Our team will reach out shortly.",
        });
        form.reset();
        setTimeout(() => {
          setShowCallbackModal(false);
          setEnquiryCourse(null);
        }, 1500);
      } else {
        setCallbackStatus({ type: "error", text: "Failed to submit request. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setCallbackStatus({
        type: "error",
        text: "Error submitting request. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out pt-4 lg:pt-5 ${
          hiddenNav ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-14 lg:h-16 items-center justify-between bg-white rounded-full border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.06)] w-full max-w-[95%] lg:max-w-[1300px] px-4 lg:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <div className="rounded-full bg-white p-1 shadow-sm border border-gray-50 flex items-center justify-center">
              <img
                src="/softtech-logo.png"
                alt="Softtech Solutions &amp; Training Logo"
                loading="eager"
                decoding="async"
                className="h-10 lg:h-12 w-10 lg:w-12 object-contain rounded-full"
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center leading-none">
              <span className="font-display text-sm lg:text-[15px] font-bold text-[#0A1B3F]">
                Softtech Solutions and Trainings
              </span>
              <span className="mt-1 block text-[9px] lg:text-[10px] font-semibold tracking-[0.2em] text-gray-500">
                INNOVATE. EDUCATE. ELEVATE.
              </span>
            </div>
          </a>

          <div className="hidden items-center lg:flex ml-auto mr-10">
            <nav className="flex items-center gap-8 xl:gap-12">
              {NAV.map((item) => {
                const isActive = activeSection === item.label;
                const hasDropdown = item.label === "Courses" || item.label === "Workshops";
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveSection(item.label)}
                    className={`relative flex items-center gap-1 text-sm font-semibold transition-colors duration-200 py-2 ${
                      isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                    {hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:block shrink-0">
            <button
              type="button"
              onClick={() => {
                setEnquiryCourse(null);
                setShowCallbackModal(true);
              }}
              className="flex items-center gap-2 rounded-full bg-[#0044CC] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              Request Call
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-gray-50 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-4 right-4 top-full mt-2 animate-fade-in rounded-2xl border border-gray-100 bg-white p-4 shadow-xl lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => {
                const isActive = activeSection === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveSection(item.label);
                    }}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setEnquiryCourse(null);
                    setShowCallbackModal(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0044CC] px-5 py-3 text-sm font-bold text-white shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  Request Call
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative min-h-screen min-h-[100dvh] w-full flex items-center overflow-hidden bg-slate-100"
        >
          {/* Background image carousel with smooth 5-second cross-fade */}
          {heroImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt="Softtech Solutions workshop training session"
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "low"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover ${
                idx === 1 ? "object-[65%_25%]" : "object-center"
              } transition-opacity duration-1000 ease-in-out ${
                idx === currentHeroIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentHeroIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentHeroIndex ? "w-8 bg-[#2A75D3]" : "w-2.5 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Left-side soft fade — keeps image on left visible while text remains readable */}
          <div
            className="absolute left-0 top-0 bottom-0 w-full sm:w-[60%] lg:w-[52%] bg-gradient-to-r from-white via-white/55 via-45% to-transparent pointer-events-none z-10"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black 88%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 88%, transparent 100%)",
            }}
          />

          {/* Foreground text content */}
          <div className="relative z-20 mx-auto w-full max-w-screen-2xl px-6 py-12 lg:px-16 lg:py-16">
            <div className="max-w-xl animate-fade-in space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/95 px-4 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#2A75D3] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2A75D3] uppercase">
                  TECHNOLOGY EDUCATOR • MENTOR • WORKSHOP FACILITATOR
                </span>
              </div>

              <h1 className="font-display text-5xl font-black leading-[1.1] text-[#0B2559] sm:text-6xl lg:text-[72px] min-h-[2.5em] sm:min-h-0">
                <span className="text-[#3B82F6]">
                  <Typewriter
                    words={["INNOVATE.", "EDUCATE.", "ELEVATE."]}
                    delay={300}
                    speed={100}
                    pause={1500}
                    deleteSpeed={60}
                  />
                </span>
              </h1>

              <p className="max-w-lg text-lg sm:text-xl leading-relaxed text-[#4A5568] font-medium">
                Empowering students with real-world technology skills through hands-on workshops,
                mentorship and innovation.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setEnquiryCourse(null);
                    setDefaultEnquiryFor("Workshop");
                    setShowCallbackModal(true);
                  }}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#0B2559] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-900/25 transition-all hover:bg-[#13377a] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/35 active:translate-y-0"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Workshop
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <StatsSection />

        {/* ABOUT */}
        <section
          id="about"
          className="border-y border-border bg-[#F8FAFC] pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-10 lg:pb-24"
        >
          <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <div className="animate-fade-in">
              <AboutCollage />
            </div>

            <div className="flex flex-col justify-center space-y-8 lg:pl-6">
              {/* Category Tag */}
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#2A75D3] uppercase">
                  WHO WE ARE
                </span>
              </div>

              {/* Progressive Line-by-Line Reveal Paragraph */}
              <AboutTheoryReveal />

              {/* Founder Signature */}
              <div className="pt-4 flex flex-col items-end pr-4">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2559] font-serif flex items-center gap-1.5">
                  <span className="text-primary text-2xl sm:text-3xl font-serif font-medium">
                    —
                  </span>
                  Ravindra Swami
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-500 mr-1">Founder</p>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" className="py-12 lg:py-16 overflow-hidden">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">
              The Courses We Provide
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              48+ tracks across beginner, intermediate and advanced levels — click any card to
              explore.
            </p>
          </div>

          {/* Horizontal scroll row with fade masks on edges (hidden when full grid is open) */}
          {!showAllCourses && (
            <div className="courses-scroll-wrapper mt-10">
              <div ref={coursesRef} className="courses-scroll-track">
                {COURSE_LIST.map((c, i) => (
                  <CourseCard
                    key={c.name}
                    course={c}
                    animated
                    visible={coursesTriggered}
                    index={i}
                    onClick={() => setSelectedCourse(c)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Expanded grid — all 16 courses */}
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            {showAllCourses && (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {COURSE_LIST.map((c) => (
                  <CourseCard key={c.name} course={c} onClick={() => setSelectedCourse(c)} />
                ))}
              </div>
            )}

            {/* See all / Show less toggle (moved to bottom) */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCourses((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                {showAllCourses ? (
                  <>
                    Show less
                    <ArrowRight className="h-4 w-4 -rotate-90 transition-transform" />
                  </>
                ) : (
                  <>
                    See all courses
                    <ArrowRight className="h-4 w-4 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* WORKSHOPS & CAMPUS ENGAGEMENT */}
        <section
          id="workshops"
          className="border-y border-border bg-[#F4F9FF] py-12 lg:py-16 overflow-hidden"
        >
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <div className="text-center animate-fade-in">
              <span className="text-sm font-bold tracking-wider text-[#2A75D3] uppercase">
                EMPOWERING STUDENTS
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold text-[#0B2559] sm:text-5xl">
                Workshops & Campus Engagement
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#4A5568] font-medium">
                We bring industry-grade training directly to college campuses, providing students
                with hands-on experience in the latest technologies.
              </p>
            </div>

            <div className="mt-16 w-full overflow-hidden">
              <WorkshopMarquee workshops={WORKSHOPS} />
            </div>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="border-y border-border bg-muted/40 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">
              Tech Stack We Teach
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              The exact tools, frameworks and platforms used inside our project labs.
            </p>
          </div>
          <div className="mt-10">
            <TechMarquee />
          </div>
        </section>

        {/* WHY US — cinematic gallery */}
        <section
          id="why-us"
          className="relative overflow-hidden border-y border-[#9ed0f8] bg-gradient-to-b from-[#cae5fc] via-[#b6dcf9] to-[#9eccf5] py-14 lg:py-18 select-none"
        >
          {/* Ambient decorative background elements matching user design */}
          {/* Top-right soft orb */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-[#7ec0f8] opacity-90 blur-3xl"
            aria-hidden="true"
          />
          {/* Left curved orb */}
          <div
            className="pointer-events-none absolute top-1/2 -left-28 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-[#82c5fa] opacity-90 blur-3xl"
            aria-hidden="true"
          />
          {/* Subtle bottom ambient glow */}
          <div
            className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#6bb4f6]/50 to-transparent"
            aria-hidden="true"
          />

          <div className="relative mx-auto w-full max-w-screen-2xl px-5 text-center lg:px-12">
            {/* Top-right 4x5 dot matrix */}
            <div
              className="pointer-events-none absolute top-1 right-6 sm:right-12 lg:right-20 hidden sm:grid grid-cols-4 gap-2.5 opacity-90"
              aria-hidden="true"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
              ))}
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#1e3a66]">
              The HATAEC difference
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#031533] sm:text-4xl">
              Why choose <span className="text-[#0284c7]">us</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-[#1e3a66]">
              Five promises, delivered in every batch — hover a card to read the story.
            </p>
            {/* Blue accent indicator bar below subtitle */}
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-[#0284c7]" />
          </div>
          <div className="relative mt-10">
            <WhyUsGallery />
          </div>
        </section>

        {/* News & Recognition */}
        <section id="news" className="bg-background py-5 lg:py-6 overflow-hidden">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <h2 className="text-center font-display text-2xl sm:text-3xl text-primary mb-3 sm:mb-4">
              Awards and Rewards
            </h2>
            <div className="space-y-4 lg:space-y-5">
              {/* We in News */}
              <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                  <ImageStack
                    images={["/news1.webp", "/news2.webp", "/news3.webp"]}
                    className="w-60 h-44 sm:w-[300px] sm:h-[200px]"
                  />
                  <h3 className="mt-2.5 sm:mt-3 font-display text-lg sm:text-xl font-bold text-primary">
                    We in <span className="text-[#3b82f6]">News</span>
                  </h3>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-snug">
                    From the classroom to the headlines.
                  </h2>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Our work, ideas, and impact have been recognized by leading media platforms,
                    helping us share our journey, innovations, and the people behind them with a
                    wider audience.
                  </p>
                </div>
              </div>

              {/* Awards and Rewards */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-6 lg:gap-10">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                  <ImageStack
                    images={["/award1.webp", "/award2.webp", "/award3.webp", "/award4.webp"]}
                    className="w-60 h-44 sm:w-[300px] sm:h-[200px]"
                    reverse
                  />
                  <h3 className="mt-2.5 sm:mt-3 font-display text-lg sm:text-xl font-bold text-primary">
                    Awards and <span className="text-[#3b82f6]">Rewards</span>
                  </h3>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-snug">
                    Recognized for the work that creates impact.
                  </h2>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Every award represents a milestone in our journey ; celebrating innovation,
                    meaningful contributions, and the commitment to turning ideas into real-world
                    change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="feedback" className="border-y border-border bg-muted/40 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-9">
              <h2 className="font-display text-3xl text-primary sm:text-4xl">Student Feedback</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Read authentic reviews and ratings from our students and workshop trainees.
              </p>
            </div>
            <div className="mt-9 overflow-hidden relative">
              <div
                className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${testimonialPage * 100}%)` }}
              >
                {Array.from({ length: totalPages + 1 }).map((_, pageIndex) => {
                  const actualPageIndex = pageIndex % totalPages;
                  return (
                    <div
                      key={pageIndex}
                      className="w-full shrink-0 flex flex-wrap justify-center gap-5"
                    >
                      {allTestimonials
                        .slice(
                          actualPageIndex * TESTIMONIALS_PER_PAGE,
                          (actualPageIndex + 1) * TESTIMONIALS_PER_PAGE,
                        )
                        .map((t) => (
                          <figure
                            key={t.name}
                            className="surface-card p-5 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col"
                          >
                            <Quote className="h-5 w-5 text-secondary mx-auto" />
                            <blockquote className="mt-3 text-[13px] leading-relaxed text-muted-foreground text-center flex-1">
                              {t.quote}
                            </blockquote>

                            <div
                              className="mt-3 flex items-center justify-center gap-1"
                              aria-label={`${t.rating} out of 5 stars`}
                            >
                              <span className="font-semibold text-xs text-foreground mr-1">
                                {t.rating}
                              </span>
                              {[1, 2, 3, 4, 5].map((s) => (
                                <svg
                                  key={s}
                                  className={`h-3.5 w-3.5 ${s <= Math.round(t.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>

                            <figcaption className="mt-4 flex items-center justify-center gap-2">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shrink-0">
                                {t.name.charAt(0)}
                              </span>
                              <span className="text-left">
                                <span className="block text-[13px] font-semibold text-foreground">
                                  {t.name}
                                </span>
                                <span className="block text-[11px] text-muted-foreground">
                                  {t.role}
                                </span>
                              </span>
                            </figcaption>
                          </figure>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination dots */}
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTestimonialPage(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    (testimonialPage === totalPages ? 0 : testimonialPage) === i
                      ? "w-8 bg-secondary"
                      : "w-2.5 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* WRITE YOUR OWN COLUMN */}
            <WriteYourOwnFeedback
              onFeedbackAdded={(newFb) => {
                setLiveFeedbacks((prev) => [
                  {
                    name: newFb.name,
                    role: newFb.course
                      ? `${newFb.role || "Student"} • ${newFb.course}`
                      : newFb.role || "Student",
                    quote: newFb.quote,
                    rating: newFb.rating,
                  },
                  ...prev,
                ]);
                setTestimonialPage(0);
              }}
            />
          </div>
        </section>

        {/* FAQ */}
        <section id="faqs" className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
          <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">FAQs</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-foreground">{f.q}</span>
                    {open ? (
                      <Minus className="h-4 w-4 shrink-0 text-secondary" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {open && (
                    <p className="animate-fade-in px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* COURSE DETAIL MODAL */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={(course) => {
            setSelectedCourse(null);
            setEnquiryCourse(course);
            setShowCallbackModal(true);
          }}
        />
      )}

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="bg-white">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-5 py-10 lg:grid-cols-3 lg:px-12">
          <div className="flex flex-col gap-6 items-start">
            <div className="flex items-center gap-4">
              <img
                src="/softtech-logo.png"
                alt="Softtech Logo"
                loading="lazy"
                decoding="async"
                className="h-24 sm:h-32 w-auto object-contain"
              />
              <h2 className="font-display text-2xl font-bold text-primary leading-tight">
                Softtech Solutions <br />
                and Training
              </h2>
            </div>

            <div className="flex items-center gap-5 mt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/softtech-solutions-and-training/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-[#5865F2] transition-colors"
                aria-label="Discord"
              >
                <DiscordIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-black transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-primary uppercase">
              QUICK LINKS
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="transition-colors hover:text-secondary">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#eff6ff] p-8 rounded-3xl lg:-mr-4">
            <h3 className="font-display text-lg font-semibold text-primary uppercase mb-5">
              CONTACT
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-secondary" />
                <span>
                  623/6/6, Shree Swamikrupa Sprash, Bafna Property Backside, Bibavewadi, Pune,
                  Maharashtra 411037, IN
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-secondary" />
                <div className="flex flex-col gap-1">
                  <a href="tel:8275265361" className="hover:text-secondary transition-colors">
                    8275265361
                  </a>
                  <a href="tel:7020370236" className="hover:text-secondary transition-colors">
                    7020370236
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-secondary" />
                <a
                  href="mailto:info@softtechsolutionsandtraining.com"
                  className="hover:text-secondary transition-colors"
                >
                  info@softtechsolutionsandtraining.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-blue-900 font-medium">
          © 2026@SOFTTECH SOLUTIONS AND TRAINING.All Rights Reserved.
        </div>
      </footer>

      {/* CALLBACK MODAL */}
      {showCallbackModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCallbackModal(false);
              setEnquiryCourse(null);
            }
          }}
        >
          <div
            className="animate-fade-in relative my-auto w-full max-w-[425px] rounded-[32px] bg-white p-5 sm:p-6 shadow-2xl border border-white/60 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #fff 60%, #fef3e2 100%)" }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                setShowCallbackModal(false);
                setEnquiryCourse(null);
              }}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-center font-display text-xl sm:text-2xl font-bold text-foreground leading-snug px-6">
              {enquiryCourse ? `Enrol in ${enquiryCourse.name}` : "Request a Callback"}
            </h2>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {enquiryCourse
                ? `Fill the form below to enquire and enrol in ${enquiryCourse.name}.`
                : "Fill the form below to request a callback from our team."}
            </p>

            {enquiryCourse && (
              <div className="mt-2 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/70 px-3 py-0.5 text-[11px] font-semibold text-blue-700">
                  Course: {enquiryCourse.name} • {enquiryCourse.level} • {enquiryCourse.duration}
                </span>
              </div>
            )}

            {callbackStatus && (
              <p
                role="status"
                className={`mt-2.5 rounded-xl px-3.5 py-2 text-center text-xs font-medium ${
                  callbackStatus.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {callbackStatus.text}
              </p>
            )}

            <form
              key={enquiryCourse ? enquiryCourse.name : "general"}
              className="mt-3.5 space-y-3"
              onSubmit={handleCallbackSubmit}
            >
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Name</label>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Enter your Name here"
                  className="w-full rounded-xl border border-input bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Email</label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Enter your Email here"
                  className="w-full rounded-xl border border-input bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Phone no.</label>
                <div className="flex items-center gap-0 rounded-xl border border-input bg-white transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <span className="flex shrink-0 items-center gap-1.5 border-r border-input px-3 py-2 text-xs sm:text-sm text-muted-foreground">
                    🇮🇳 +91
                  </span>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="Enter your number here"
                    className="w-full bg-transparent px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Enquiry For */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Enquiry For
                </label>
                <div className="relative">
                  <select
                    name="enquiryFor"
                    required
                    defaultValue={
                      enquiryCourse
                        ? enquiryCourse.mode.toLowerCase().includes("offline")
                          ? "Offline Course"
                          : "Online Course"
                        : defaultEnquiryFor
                    }
                    className="w-full appearance-none rounded-xl border border-input bg-white px-3.5 py-2 pr-10 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    {ENQUIRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  How can we help you?
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="E.g. I want details about the offline course, fees, and schedule..."
                  className="w-full resize-none rounded-xl border border-input bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="h-4 w-4" />
                {enquiryCourse ? "Submit Course Enquiry" : "Book My Callback"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FEEDBACK & 5-STAR RATING MODAL */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onFeedbackAdded={(newFb) => {
          setLiveFeedbacks((prev) => [
            {
              name: newFb.name,
              role: newFb.course
                ? `${newFb.role || "Student"} • ${newFb.course}`
                : newFb.role || "Student",
              quote: newFb.quote,
              rating: newFb.rating,
            },
            ...prev,
          ]);
          setTestimonialPage(0);
        }}
      />
    </div>
  );
}
