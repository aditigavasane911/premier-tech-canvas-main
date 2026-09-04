import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Users,
  Star,
  BookOpen,
  Trophy,
  ArrowRight,
  Plus,
  Minus,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Quote,
  Menu,
  X,
  Send,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import heroImage from "@/assets/home page image.png";
import { TechMarquee } from "@/components/site/Marquee";
import { WhyUsGallery } from "@/components/site/WhyUsGallery";
import { AboutCollage } from "@/components/site/AboutCollage";
import { Typewriter } from "@/components/site/Typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Softtech Solutions and Trainings | IT Training, Internships & Placement Support" },
      {
        name: "description",
        content:
          "Softtech Solutions and Trainings trains students in Java, MERN, Python and Cloud with real projects, mentorship and placement support. 1200+ students trained since 2024.",
      },
      { property: "og:title", content: "Softtech Solutions and Trainings | IT Training & Placement" },
      {
        property: "og:description",
        content:
          "Job-ready IT training with real projects, expert mentors and placement support across 48+ course tracks.",
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

const ENQUIRY_OPTIONS = [
  "Online Course (Website)",
  "Offline Course (Classroom)",
  "Internship Program",
  "Placement Assistance",
  "Corporate Training",
  "Other",
];

const DENIM_GRAD = "linear-gradient(145deg, #3a8bbf 0%, #5aaee0 40%, #79BAEC 75%, #93ccf5 100%)";
const DENIM_ORB  = "rgba(180,220,255,0.45)";

const STATS = [
  {
    icon: Users,
    end: 15000,
    suffix: "+",
    title: "Student",
    label: "Taught",
    grad: DENIM_GRAD,
    orb: DENIM_ORB,
  },
  {
    icon: Star,
    end: 48,
    suffix: "+",
    title: "Course",
    label: "Categories",
    grad: DENIM_GRAD,
    orb: DENIM_ORB,
  },
  {
    icon: BookOpen,
    end: 150,
    suffix: "+",
    title: "Place",
    label: "Mentored",
    grad: DENIM_GRAD,
    orb: DENIM_ORB,
  },
  {
    icon: Trophy,
    end: 200,
    suffix: "+",
    title: "Projects",
    label: "Completed",
    grad: DENIM_GRAD,
    orb: DENIM_ORB,
  },
];

function useCountUp(end: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

function StatItem({
  end,
  suffix,
  title,
  label,
  index,
  started,
}: {
  end: number;
  suffix: string;
  title: string;
  label: string;
  index: number;
  started: boolean;
}) {
  const count = useCountUp(end, 2000, started);
  return (
    <div
      className="stat-item"
      style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
    >
      {/* Count */}
      <p className="stat-number">
        {end >= 1000
          ? count >= 1000
            ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`
            : count.toString()
          : count.toString()}
        {suffix}
      </p>
      {/* Labels */}
      <p className="stat-title">{title}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="stat-section"
    >
      <div className="stat-section-inner">
        <div className="stat-row">
          {STATS.map((s, i) => (
            <>
              <StatItem key={s.title} {...s} index={i} started={started} />
              {i < STATS.length - 1 && <div className="stat-divider" key={`div-${i}`} />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}


const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const COURSE_LIST = [
  { name: "C Fundamentals", level: "Beginner", icon: "c/c-original.svg", teaches: ["Basics", "Pointers", "Arrays", "File I/O"] },
  { name: "DSA using C++", level: "Intermediate", icon: "cplusplus/cplusplus-original.svg", teaches: ["OOP", "STL", "Inheritance", "Templates"] },
  { name: "Core Java Fundamentals", level: "Beginner", icon: "java/java-original.svg", teaches: ["OOP", "Collections", "Multithreading", "JDBC"] },
  { name: "Advanced Java for Enterprise", level: "Advanced", icon: "java/java-original.svg", teaches: ["Servlets", "JSP", "Hibernate", "Spring Core"] },
  { name: "Spring Boot Microservices", level: "Advanced", icon: "spring/spring-original.svg", teaches: ["REST APIs", "JPA", "Security", "Microservices"] },
  { name: "Frontend with React", level: "Intermediate", icon: "react/react-original.svg", teaches: ["Components", "Hooks", "Redux", "Routing"] },
  { name: "Python for Backend", level: "Beginner to Intermediate", icon: "python/python-original.svg", teaches: ["Basics", "OOP", "NumPy", "Pandas"] },
  { name: "Cloud Computing with AWS", level: "Intermediate", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg", teaches: ["EC2", "S3", "Lambda", "RDS"] },
  { name: "Web Design (HTML5 & CSS3)", level: "Beginner", icon: "html5/html5-original.svg", teaches: ["Semantic HTML", "Flexbox", "Grid", "Responsive"] },
  { name: "Modern JavaScript (ES6+)", level: "Intermediate", icon: "javascript/javascript-original.svg", teaches: ["ES6+", "DOM", "Async", "Events"] },
  { name: "Responsive UI with Bootstrap", level: "Beginner", icon: "bootstrap/bootstrap-original.svg", teaches: ["Grid", "Components", "Utilities", "Theming"] },
  { name: "Backend with PHP & MySQL", level: "Intermediate", icon: "php/php-original.svg", teaches: ["PHP Basics", "SQL", "CRUD", "Sessions"] },
  { name: "Backend with Node.js", level: "Intermediate", icon: "nodejs/nodejs-original.svg", teaches: ["Express", "APIs", "Middleware", "MongoDB"] },
  { name: "Database Design with MongoDB", level: "Intermediate", icon: "mongodb/mongodb-original.svg", teaches: ["Documents", "Aggregation", "Indexing", "Atlas"] },
  { name: "Type-Safe Code with TypeScript", level: "Advanced", icon: "typescript/typescript-original.svg", teaches: ["Types", "Interfaces", "Generics", "Decorators"] },
  { name: "DevOps Basics with Docker", level: "Advanced", icon: "docker/docker-original.svg", teaches: ["Containers", "Images", "Compose", "Volumes"] },
];

const FAQS = [
  {
    q: "Do you provide placement assistance after the course?",
    a: "Yes. Every student gets resume reviews, mock interviews and direct referrals to our hiring partners until placed.",
  },
  {
    q: "Are the classes online or offline?",
    a: "Both. You can join our classroom batches or attend the same live sessions online with recordings available.",
  },
  {
    q: "Do beginners with no coding background fit here?",
    a: "Absolutely. Every track starts from programming fundamentals before moving into frameworks and live projects.",
  },
  {
    q: "Will I work on real projects?",
    a: "Each learner ships at least two production-style projects with code reviews from working industry mentors.",
  },
];

const AWARDS = [
  "Best IT Training Institute 2024",
  "Excellence in Placements",
  "Top Rated Java Academy",
  "Student Choice Award",
  "Skill Partner of the Year",
];

const TESTIMONIALS = [
  {
    quote:
      "The Java track was brutally practical. I built two full applications and cleared my first interview within weeks.",
    name: "Sneha Patil",
    role: "Software Engineer, Pune",
  },
  {
    quote:
      "Mentors reviewed my code line by line. That habit is the reason I passed the technical rounds so comfortably.",
    name: "Rohit Kulkarni",
    role: "MERN Developer, Bengaluru",
  },
  {
    quote:
      "I came from a non-IT degree. The fundamentals were explained patiently and placement support never stopped.",
    name: "Aditi Sharma",
    role: "Cloud Associate, Hyderabad",
  },
];

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full items-center justify-between gap-6 px-5 lg:px-12">
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <img src="/softtech-logo.png" alt="Softtech Solutions &amp; Training Logo" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block leading-tight">
              <span className="font-display text-sm font-semibold tracking-wide text-primary">
                Softtech Solutions and Trainings
              </span>
              <span className="block text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
                INNOVATE. EDUCATE. ELEVATE.
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-8">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setShowCallbackModal(true)}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
            >
              Request Call
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="animate-fade-in border-t border-border bg-card px-5 py-4 lg:hidden">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-medium text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => { setMenuOpen(false); setShowCallbackModal(true); }}
              className="mt-2 block w-full rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Request Call
            </button>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-32">
            <div className="animate-fade-in lg:px-8 xl:pl-16 xl:pr-10">
              <h1 className="mt-6 font-display text-4xl leading-[1.08] text-primary sm:text-5xl lg:text-6xl min-h-[3em] sm:min-h-0">
                Learn the skills that <span className="text-gradient"><Typewriter text="get you hired" delay={300} speed={100} /></span> in tech.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                HATAEC TECH turns beginners into job-ready engineers through live mentorship,
                production-grade projects and placement support that does not stop at the last class.
              </p>

            </div>

            <div className="animate-fade-in overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={heroImage}
                alt="Students learning software development at HATAEC TECH"
                width={1280}
                height={960}
                className="h-80 w-full object-cover sm:h-[28rem] lg:h-[32rem]"
              />
            </div>
          </div>
        </section>

        {/* STATS */}
        <StatsSection />

        {/* ABOUT */}
        <section id="about" className="border-y border-border bg-muted/40 py-24 lg:py-32">
          <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <div className="animate-fade-in">
              <AboutCollage />
            </div>

            <div className="animate-fade-in">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Who we are
              </span>
              <h2 className="mt-4 font-display text-3xl leading-[1.12] text-primary sm:text-4xl lg:text-5xl">
                Building skills. <span className="text-gradient">Creating opportunities.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                We are a dedicated training studio focused on transforming beginners into job-ready professionals. We offer comprehensive, mentor-led courses in modern technologies, hands-on experience with real-world projects, and dedicated placement support to help you launch a successful career in tech.
              </p>

              <div className="mt-8">
                <p className="font-display text-xl font-semibold text-primary">Ravindra Swami</p>
                <p className="mt-1 text-sm text-muted-foreground">Founder</p>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" className="mx-auto w-full max-w-screen-2xl px-5 py-24 lg:px-12 lg:py-32">
          <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">
            The Courses We Provide
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(showAllCourses ? COURSE_LIST : COURSE_LIST.slice(0, 4)).map((c) => (
              <div key={c.name} className="surface-card group relative flex flex-col items-start gap-4 p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] overflow-hidden cursor-pointer" onClick={() => setShowAllCourses(true)}>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/10 transition-transform group-hover:scale-150" />
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-card border border-border shadow-sm z-10">
                  <img
                    src={`${DEVICON}${c.icon}`}
                    alt={`${c.name} logo`}
                    loading="lazy"
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <div className="z-10 flex flex-col gap-1">
                  <p className="font-display text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">{c.name}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">{c.level}</p>
                </div>
                <div className="z-10 mt-auto flex flex-wrap gap-2 pt-2">
                   {c.teaches.slice(0, 2).map((t) => (
                     <span key={t} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">{t}</span>
                   ))}
                   {c.teaches.length > 2 && (
                     <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                       +{c.teaches.length - 2} more
                     </span>
                   )}
                </div>
              </div>
            ))}
          </div>
          {!showAllCourses && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCourses(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                See all courses
                <ArrowRight className="h-4 w-4 transition-transform" />
              </button>
            </div>
          )}
          {showAllCourses && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCourses(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Show less
                <ArrowRight className="h-4 w-4 transition-transform -rotate-90" />
              </button>
            </div>
          )}
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="border-y border-border bg-muted/40 py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">Tech Stack We Teach</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              The exact tools, frameworks and platforms used inside our project labs.
            </p>
          </div>
          <div className="mt-10">
            <TechMarquee />
          </div>
        </section>

        {/* WHY US — cinematic gallery */}
        <section className="border-y border-border bg-primary py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-2xl px-5 text-center lg:px-12">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/60">
              The HATAEC difference
            </span>
            <h2 className="mt-3 font-display text-3xl text-primary-foreground sm:text-4xl">
              Why choose <span className="text-accent">us</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/70">
              Five promises, delivered in every batch — hover a card to read the story.
            </p>
          </div>
          <div className="mt-10">
            <WhyUsGallery />
          </div>
        </section>

        {/* AWARDS */}
        <section id="awards" className="mx-auto w-full max-w-screen-2xl px-5 py-24 lg:px-12 lg:py-32">
          <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">Awards & Rewards</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {AWARDS.map((a) => (
              <div key={a} className="surface-card flex flex-col items-center gap-3 px-4 py-7 text-center">
                <ShieldCheck className="h-9 w-9 text-secondary" />
                <p className="text-sm font-medium text-foreground">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="feedback" className="border-y border-border bg-muted/40 py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">Student Feedback</h2>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="surface-card p-7">
                  <Quote className="h-7 w-7 text-secondary" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faqs" className="mx-auto max-w-3xl px-5 py-24 lg:px-8 lg:py-32">
          <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">FAQs</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
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
                    <p className="animate-fade-in px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="bg-blue-50/80 border-t border-blue-100/50">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-5 py-24 lg:grid-cols-3 lg:px-12 lg:py-32">
          <div>
            <h2 className="font-display text-2xl text-primary">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-secondary" />
                <span>
                  2nd Floor, Tech Park Avenue
                  <br />
                  Baner, Pune 411045
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a href="mailto:info@hataectech.com">info@hataectech.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="transition-colors hover:text-secondary">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-secondary/10 p-8 border border-secondary/20 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
            <h3 className="relative font-display text-lg font-semibold text-primary">Newsletter</h3>
            <p className="relative mt-4 text-sm text-muted-foreground">
              Stay updated with our latest courses, batches and offers.
            </p>
            <form
              className="relative mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <input
                required
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-input bg-card/80 px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-ring/25 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-[var(--shadow-soft)] hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © 2026 HATAEC TECH. All rights reserved.
        </div>
      </footer>

      {/* CALLBACK MODAL */}
      {showCallbackModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCallbackModal(false); }}
        >
          <div
            className="animate-fade-in relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            style={{ background: "linear-gradient(160deg, #fff 60%, #fef3e2 100%)" }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowCallbackModal(false)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
              Request a Callback
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Fill the form below to request a callback from our team.
            </p>

            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setShowCallbackModal(false);
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter your Name here"
                  className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your Email here"
                  className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Phone no.</label>
                <div className="flex items-center gap-0 rounded-xl border border-input bg-white transition-colors focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-200">
                  <span className="flex shrink-0 items-center gap-1.5 border-r border-input px-3 py-3 text-sm text-muted-foreground">
                    🇮🇳 +91
                  </span>
                  <input
                    required
                    type="tel"
                    placeholder="Enter your number here"
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Enquiry For */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Enquiry For</label>
                <div className="relative">
                  <select
                    required
                    defaultValue="Online Course (Website)"
                    className="w-full appearance-none rounded-xl border border-input bg-white px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                  >
                    {ENQUIRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">How can we help you?</label>
                <textarea
                  rows={3}
                  placeholder="E.g. I want details about the offline course, fees, and schedule..."
                  className="w-full resize-none rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="h-4 w-4" />
                Book My Callback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
