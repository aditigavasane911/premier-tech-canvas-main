import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, Fragment } from "react";
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
  Calendar,
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
const DENIM_ORB = "rgba(180,220,255,0.45)";

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
    let delayTimerId: ReturnType<typeof setTimeout>;
    let active = true;

    const runCycle = () => {
      setCount(0);
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!active) return;
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          animFrameId = requestAnimationFrame(step);
        } else {
          // Pause briefly at max value before restarting next cycle
          timerId = setTimeout(() => {
            if (active) {
              runCycle();
            }
          }, pauseDuration);
        }
      };

      animFrameId = requestAnimationFrame(step);
    };

    delayTimerId = setTimeout(() => {
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


const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const COURSE_LIST = [
  {
    name: "C Fundamentals",
    level: "Beginner",
    icon: "c/c-original.svg",
    bg: "linear-gradient(145deg,#0d2137 0%,#0e3460 60%,#1a5276 100%)",
    teaches: ["Basics", "Pointers", "Arrays", "File I/O"],
    duration: "4–6 weeks",
    description:
      "Build a rock-solid programming foundation with C — the language behind operating systems, embedded systems and high-performance software. You'll learn procedural programming, pointers and memory management from the ground up.",
    topicsFull: ["Variables & Data Types", "Operators & Control Flow", "Functions & Recursion", "Pointers & Memory Addresses", "Arrays & Strings", "Structures & Unions", "File I/O Operations"],
    skills: ["Procedural Programming", "Memory Management", "Low-Level Thinking", "Debugging with GCC"],
    prerequisites: "None — suitable for absolute beginners",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "DSA using C++",
    level: "Intermediate",
    icon: "cplusplus/cplusplus-original.svg",
    bg: "linear-gradient(145deg,#1a0533 0%,#3b0764 60%,#5b21b6 100%)",
    teaches: ["OOP", "STL", "Inheritance", "Templates"],
    duration: "8–10 weeks",
    description:
      "Master data structures and algorithms using C++ — the language favoured in competitive programming and system design interviews. Covers STL, OOP and template programming.",
    topicsFull: ["OOP Concepts", "STL Containers & Algorithms", "Sorting & Searching", "Linked Lists, Trees, Graphs", "Inheritance & Polymorphism", "Templates & Generic Programming", "Time & Space Complexity"],
    skills: ["OOP Design", "Problem Solving", "Competitive Programming", "STL Proficiency"],
    prerequisites: "Basic programming knowledge (C or equivalent)",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Core Java Fundamentals",
    level: "Beginner",
    icon: "java/java-original.svg",
    bg: "linear-gradient(145deg,#7c2400 0%,#b93e00 60%,#f97316 100%)",
    teaches: ["OOP", "Collections", "Multithreading", "JDBC"],
    duration: "8 weeks",
    description:
      "Start your Java journey with solid fundamentals — OOP principles, Collections, exception handling, multithreading and JDBC database connectivity. Build real console and GUI-based applications.",
    topicsFull: ["OOP Principles (Encapsulation, Inheritance, Polymorphism, Abstraction)", "Collections Framework", "Exception Handling", "Multithreading & Concurrency", "JDBC & Database Connectivity", "Java I/O Streams", "Generics & Lambda Expressions"],
    skills: ["Object-Oriented Design", "Database Integration", "Concurrent Programming", "Java SE"],
    prerequisites: "None — beginners welcome",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Advanced Java for Enterprise",
    level: "Advanced",
    icon: "java/java-original.svg",
    bg: "linear-gradient(145deg,#431407 0%,#7c2d12 55%,#c2410c 100%)",
    teaches: ["Servlets", "JSP", "Hibernate", "Spring Core"],
    duration: "10 weeks",
    description:
      "Move into enterprise-grade Java development with Servlets, JSP, Hibernate ORM and Spring Core. Build multi-tier web applications with proper MVC architecture and database persistence.",
    topicsFull: ["Servlets & JSP", "MVC Architecture", "Hibernate ORM", "Spring Core & DI", "Spring MVC", "JPA & Entity Mapping", "Connection Pooling"],
    skills: ["Enterprise Java Development", "ORM & Database Persistence", "Spring Framework", "Web Application Architecture"],
    prerequisites: "Core Java Fundamentals",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Spring Boot Microservices",
    level: "Advanced",
    icon: "spring/spring-original.svg",
    bg: "linear-gradient(145deg,#052e16 0%,#14532d 55%,#15803d 100%)",
    teaches: ["REST APIs", "JPA", "Security", "Microservices"],
    duration: "12 weeks",
    description:
      "Build production-ready microservices with Spring Boot — the most in-demand Java framework. Learn REST API design, JPA data access, Spring Security and cloud-native microservice patterns.",
    topicsFull: ["Spring Boot Setup & Auto-Configuration", "RESTful API Design", "Spring Data JPA", "Spring Security & JWT", "Microservices Architecture", "Service Discovery & API Gateway", "Docker & Deployment"],
    skills: ["REST API Development", "Microservices Design", "Spring Security", "Cloud Deployment"],
    prerequisites: "Advanced Java or equivalent experience",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Frontend with React",
    level: "Intermediate",
    icon: "react/react-original.svg",
    bg: "linear-gradient(145deg,#082f49 0%,#075985 55%,#0ea5e9 100%)",
    teaches: ["Components", "Hooks", "Redux", "Routing"],
    duration: "10 weeks",
    description:
      "Build modern, dynamic user interfaces with React — the most widely used front-end library. From components and hooks to Redux state management and React Router, you'll ship real-world SPAs.",
    topicsFull: ["JSX & Component Architecture", "Props, State & Lifecycle", "React Hooks (useState, useEffect, useContext)", "React Router", "Redux & Redux Toolkit", "API Integration & Fetch", "Performance Optimisation"],
    skills: ["SPA Development", "State Management", "Component Design", "API Integration"],
    prerequisites: "HTML, CSS and JavaScript basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Python for Backend",
    level: "Beginner to Intermediate",
    icon: "python/python-original.svg",
    bg: "linear-gradient(145deg,#1e3a5f 0%,#1d4ed8 55%,#f59e0b 100%)",
    teaches: ["Basics", "OOP", "NumPy", "Pandas"],
    duration: "8 weeks",
    description:
      "Learn Python from scratch and progress to backend development, data manipulation with NumPy & Pandas, and building web APIs. An excellent first language that scales to professional use.",
    topicsFull: ["Python Syntax & Data Types", "Control Flow & Functions", "OOP in Python", "File Handling & Modules", "NumPy & Pandas", "REST APIs with Flask / FastAPI", "Database Integration"],
    skills: ["Python Programming", "Data Manipulation", "Backend API Development", "OOP"],
    prerequisites: "None — beginners welcome",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Cloud Computing with AWS",
    level: "Intermediate",
    icon: "amazonwebservices/amazonwebservices-original-wordmark.svg",
    bg: "linear-gradient(145deg,#1c1917 0%,#292524 55%,#ff9900 100%)",
    teaches: ["EC2", "S3", "Lambda", "RDS"],
    duration: "8 weeks",
    description:
      "Learn to design, deploy and manage cloud infrastructure on AWS — the world's leading cloud platform. Covers core services, serverless architecture and managed databases for real-world workloads.",
    topicsFull: ["AWS Core Services (EC2, S3, VPC)", "IAM & Security", "RDS & DynamoDB", "Lambda & Serverless", "Load Balancing & Auto Scaling", "CloudFront & Route 53", "Deployment Pipelines"],
    skills: ["Cloud Architecture", "AWS Core Services", "Serverless Development", "Cloud Security"],
    prerequisites: "Basic networking and Linux knowledge recommended",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Web Design (HTML5 & CSS3)",
    level: "Beginner",
    icon: "html5/html5-original.svg",
    bg: "linear-gradient(145deg,#7c1d1d 0%,#b91c1c 55%,#e4713a 100%)",
    teaches: ["Semantic HTML", "Flexbox", "Grid", "Responsive"],
    duration: "4 weeks",
    description:
      "Master HTML5 and CSS3 to build beautiful, responsive websites from scratch. You'll learn semantic markup, Flexbox, CSS Grid, animations and mobile-first design principles.",
    topicsFull: ["HTML5 Semantic Elements", "CSS Selectors & Box Model", "Flexbox Layout", "CSS Grid", "Responsive Design & Media Queries", "CSS Animations & Transitions", "Forms & Accessibility"],
    skills: ["Responsive Web Design", "CSS Layouts", "HTML5 Semantics", "Accessibility"],
    prerequisites: "None — suitable for absolute beginners",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Modern JavaScript (ES6+)",
    level: "Intermediate",
    icon: "javascript/javascript-original.svg",
    bg: "linear-gradient(145deg,#1c1400 0%,#3d2e00 55%,#ca8a04 100%)",
    teaches: ["ES6+", "DOM", "Async", "Events"],
    duration: "6 weeks",
    description:
      "Go beyond basics and master modern JavaScript — arrow functions, destructuring, async/await, Promises and DOM manipulation. Build interactive web applications with vanilla JS.",
    topicsFull: ["ES6+ Syntax (Arrow Functions, Destructuring, Spread)", "DOM Manipulation", "Events & Event Loop", "Promises & Async/Await", "Fetch API & AJAX", "Modules & Bundlers", "Error Handling"],
    skills: ["Modern JS Syntax", "Async Programming", "DOM Manipulation", "API Consumption"],
    prerequisites: "HTML & CSS basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Responsive UI with Bootstrap",
    level: "Beginner",
    icon: "bootstrap/bootstrap-original.svg",
    bg: "linear-gradient(145deg,#2e0068 0%,#5a0096 55%,#7c3aed 100%)",
    teaches: ["Grid", "Components", "Utilities", "Theming"],
    duration: "4 weeks",
    description:
      "Build mobile-first, responsive websites quickly with Bootstrap 5 — the world's most popular CSS framework. Learn the grid system, components, utilities and custom theming.",
    topicsFull: ["Bootstrap Grid System", "Navbar & Navigation", "Cards, Modals & Alerts", "Forms & Validation", "Utility Classes", "Custom Theming with SASS", "JavaScript Plugins"],
    skills: ["Bootstrap 5", "Rapid UI Development", "Responsive Design", "Component Usage"],
    prerequisites: "HTML & CSS basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Backend with PHP & MySQL",
    level: "Intermediate",
    icon: "php/php-original.svg",
    bg: "linear-gradient(145deg,#1e1b4b 0%,#312e81 55%,#6366f1 100%)",
    teaches: ["PHP Basics", "SQL", "CRUD", "Sessions"],
    duration: "8 weeks",
    description:
      "Build dynamic, database-driven websites with PHP and MySQL — the classic combination powering millions of websites. Covers server-side scripting, CRUD operations and session management.",
    topicsFull: ["PHP Syntax & Functions", "MySQL Database Design", "CRUD Operations", "Sessions & Cookies", "Form Handling & Validation", "PDO & Prepared Statements", "MVC Pattern"],
    skills: ["Server-Side Scripting", "Database Design", "Web Security Basics", "CRUD Operations"],
    prerequisites: "HTML & CSS basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Backend with Node.js",
    level: "Intermediate",
    icon: "nodejs/nodejs-original.svg",
    bg: "linear-gradient(145deg,#052e16 0%,#166534 55%,#4ade80 100%)",
    teaches: ["Express", "APIs", "Middleware", "MongoDB"],
    duration: "10 weeks",
    description:
      "Build fast, scalable backend services with Node.js and Express. Develop RESTful APIs, middleware systems and connect to MongoDB for full-stack JavaScript development.",
    topicsFull: ["Node.js Runtime & Event Loop", "Express.js & Routing", "Middleware & Error Handling", "RESTful API Design", "MongoDB & Mongoose", "Authentication & JWT", "File Uploads & Streaming"],
    skills: ["Node.js Backend Development", "REST API Design", "MongoDB Integration", "Authentication"],
    prerequisites: "JavaScript fundamentals",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Database Design with MongoDB",
    level: "Intermediate",
    icon: "mongodb/mongodb-original.svg",
    bg: "linear-gradient(145deg,#052e16 0%,#134e1a 55%,#00ed64 100%)",
    teaches: ["Documents", "Aggregation", "Indexing", "Atlas"],
    duration: "6 weeks",
    description:
      "Master NoSQL database design with MongoDB — from document modelling and CRUD operations to aggregation pipelines, indexing strategies and cloud deployment with MongoDB Atlas.",
    topicsFull: ["Document Model & BSON", "CRUD Operations", "Query Operators & Filtering", "Aggregation Pipeline", "Indexing & Performance", "Schema Design Patterns", "MongoDB Atlas & Cloud"],
    skills: ["NoSQL Database Design", "Aggregation Pipelines", "Performance Tuning", "Cloud Databases"],
    prerequisites: "Basic database knowledge recommended",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Type-Safe Code with TypeScript",
    level: "Advanced",
    icon: "typescript/typescript-original.svg",
    bg: "linear-gradient(145deg,#172554 0%,#1e3a8a 55%,#2563eb 100%)",
    teaches: ["Types", "Interfaces", "Generics", "Decorators"],
    duration: "6 weeks",
    description:
      "Eliminate runtime bugs with TypeScript — the typed superset of JavaScript adopted by every major framework. Learn interfaces, generics, decorators and advanced type patterns for enterprise code.",
    topicsFull: ["Types & Type Inference", "Interfaces & Type Aliases", "Generics & Constraints", "Enums & Utility Types", "Decorators & Metadata", "TypeScript with React", "Configuration & Build Tools"],
    skills: ["Static Typing", "Generics & Advanced Types", "TypeScript with React", "Code Safety"],
    prerequisites: "Solid JavaScript experience",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "DevOps Basics with Docker",
    level: "Advanced",
    icon: "docker/docker-original.svg",
    bg: "linear-gradient(145deg,#0c2a4a 0%,#0d3a6e 55%,#2496ed 100%)",
    teaches: ["Containers", "Images", "Compose", "Volumes"],
    duration: "6 weeks",
    description:
      "Containerise and ship applications with Docker — the cornerstone of modern DevOps. Learn to build images, orchestrate services with Docker Compose, manage volumes and integrate CI/CD pipelines.",
    topicsFull: ["Docker Architecture & Concepts", "Building Custom Images", "Docker Compose", "Networking & Volumes", "CI/CD Integration", "Container Registry", "Best Practices & Security"],
    skills: ["Containerisation", "Docker Compose", "DevOps Workflow", "CI/CD Pipelines"],
    prerequisites: "Linux command line basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
];

const FAQS = [
  {
    q: "What does Softtech Solutions & Training do?",
    a: "We work across two areas — building Manufacturing Execution Systems (MES) for manufacturing companies, and training students and developers in programming languages and modern frameworks.",
  },
  {
    q: "What is a Manufacturing Execution System, and why does a company need one?",
    a: "An MES connects the shop floor to the rest of the business — tracking production, quality, and traceability in real time. It helps manufacturers catch problems early, reduce downtime, and keep accurate records instead of relying on manual processes.",
  },
  {
    q: "Which industries do you have experience in?",
    a: "Our MES work comes primarily from the automotive sector, including projects for companies like Fiat India and Volvo-Eicher. The same design principles apply to most other manufacturing environments as well.",
  },
  {
    q: "Do you build custom MES solutions, or only work with existing systems?",
    a: "Both. We design systems from the ground up where needed, and we also customize, extend, or integrate existing MES, ERP, SCADA, and PLC setups.",
  },
  {
    q: "What courses do you offer?",
    a: "We teach Core and Advanced Java, Python, C, C++, AWS, Vaadin, Spring, and full-stack web development, along with the tools and practices used alongside them in real projects.",
  },
  {
    q: "Do I need prior coding experience to join a course?",
    a: "No. Courses are structured for different starting points — some build fundamentals from scratch, others are meant for developers adding a specific skill.",
  },
  {
    q: "Are the sessions hands-on, or mostly lectures?",
    a: "Hands-on. Each course is built around practical exercises and real project work, not theory alone.",
  },
  {
    q: "Who conducts the training?",
    a: "Training is led by our founder, Ravindra Swami, who brings both industry and classroom experience — years as a working software engineer, alongside time as a lecturer and Head of Department, teaching at engineering colleges across Pandharpur, Solapur, Akluj, and Barshi.",
  },
  {
    q: "Do you provide support after an MES project is delivered?",
    a: "Yes. Support continues after go-live — including production support, maintenance, troubleshooting, and training for the client's own staff.",
  },
  {
    q: "How can I get in touch to learn more or enroll?",
    a: "You can reach us using the contact details on this website, and we'll help you find the right course or service for what you need.",
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

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-blue-50 text-blue-700 border-blue-200",
  Advanced: "bg-violet-50 text-violet-700 border-violet-200",
  "Beginner to Intermediate": "bg-sky-50 text-sky-700 border-sky-200",
};

function CourseModal({
  course,
  onClose,
}: {
  course: (typeof COURSE_LIST)[0];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-0 sm:px-4 py-0 sm:py-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-fade-in relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white border border-border/50 shadow-2xl">
        {/* Top accent bar */}
        <div
          className="h-1 w-full rounded-t-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />

        {/* Close */}
        <button
          type="button"
          aria-label="Close course details"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-muted/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 pr-10">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-muted border border-border shadow-sm">
              <img
                src={`${DEVICON}${course.icon}`}
                alt={`${course.name} logo`}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-primary">
                {course.name}
              </h2>
              <span
                className={`mt-1.5 inline-block rounded-md border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${LEVEL_COLOR[course.level] ?? "bg-muted text-muted-foreground border-border"
                  }`}
              >
                {course.level}
              </span>
            </div>
          </div>

          {/* Meta chips */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
              <svg className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
              <svg className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="font-medium">{course.mode}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
              <svg className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span className="font-medium">{course.fee}</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {course.description}
          </p>

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
            <h3 className="font-display text-base font-semibold text-foreground">Skills You'll Learn</h3>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prerequisites</p>
            <p className="mt-1.5 text-sm text-foreground">{course.prerequisites}</p>
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                setTimeout(() => document.querySelector<HTMLElement>("#contact")?.scrollIntoView({ behavior: "smooth" }), 100);
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<(typeof COURSE_LIST)[0] | null>(null);
  const [coursesTriggered, setCoursesTriggered] = useState(false);
  const coursesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const el = coursesRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCoursesTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        <section id="home" className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex items-center overflow-hidden bg-white">
          {/* Full-screen background image */}
          <img
            src={heroImage}
            alt="Workshop teaching session"
            className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in transition-transform duration-1000"
          />

          {/* Soft light gradient overlay so the classroom image is bright & visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/35 sm:to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />

          {/* Foreground text content with crisp dark typography */}
          <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-20 lg:px-16 lg:py-28">
            <div className="max-w-2xl animate-fade-in space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-4 py-1.5 backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#2A75D3] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2A75D3] uppercase">
                  TECHNOLOGY EDUCATOR • MENTOR • WORKSHOP FACILITATOR
                </span>
              </div>

              <h1 className="font-display text-5xl font-black leading-[1.1] text-[#0B2559] sm:text-6xl lg:text-[76px] min-h-[2.5em] sm:min-h-0">
                <span className="text-[#3B82F6]">
                  <Typewriter words={["INNOVATE.", "EDUCATE.", "ELEVATE."]} delay={300} speed={100} pause={1500} deleteSpeed={60} />
                </span>
              </h1>

              <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-[#4A5568] font-medium">
                Empowering students with real-world technology skills through hands-on workshops, mentorship and innovation.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowCallbackModal(true)}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#0B2559] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-900/25 transition-all hover:bg-[#13377a] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/35 active:translate-y-0"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Workshop
                </button>
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300/90 bg-white/80 px-7 py-4 text-base font-semibold text-slate-800 backdrop-blur-md shadow-sm transition-all hover:bg-white hover:-translate-y-0.5"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <StatsSection />

        {/* ABOUT */}
        <section id="about" className="border-y border-border bg-[#F8FAFC] py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <div className="animate-fade-in">
              <AboutCollage />
            </div>

            <div className="animate-fade-in flex flex-col justify-center space-y-8 lg:pl-6">
              {/* Category Tag */}
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#2A75D3] uppercase">
                  WHO WE ARE
                </span>
              </div>

              {/* Paragraph 1 */}
              <p className="text-center text-base sm:text-lg italic leading-relaxed text-slate-700 font-normal max-w-2xl mx-auto">
                <span className="text-amber-500 font-serif font-bold text-2xl leading-none inline-block mr-0.5">“</span>
                <span className="underline decoration-slate-400/60 underline-offset-4 font-semibold text-slate-800">Softtech</span> Solutions &amp; Training, based in Pune, builds Manufacturing Execution Systems (MES) for manufacturing environments, including automotive production lines, and trains students and developers in Java, Python, AWS, <span className="underline decoration-slate-400/60 underline-offset-4">Vaadin</span>, Spring, and full-stack web development.
              </p>

              {/* Paragraph 2 */}
              <p className="text-center text-base sm:text-lg italic leading-relaxed text-slate-700 font-normal max-w-2xl mx-auto">
                Ravindra Swami, whose background spans MES engineering at companies like <strong className="font-semibold text-slate-900">Fiat India</strong> and <strong className="font-semibold text-slate-900">Volvo-Eicher</strong>, and academic teaching as a lecturer and Head of Department, the company brings both worlds into every project and course.
              </p>

              {/* Founder Signature */}
              <div className="pt-4 flex flex-col items-end pr-4">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2559] font-serif flex items-center gap-1.5">
                  <span className="text-amber-500 text-3xl font-serif">“</span>
                  Ravindra Swami
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-500 mr-1">
                  Founder
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" className="py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            <h2 className="text-center font-display text-3xl text-primary sm:text-4xl">
              The Courses We Provide
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              48+ tracks across beginner, intermediate and advanced levels — click any card to explore.
            </p>
          </div>

          {/* Horizontal scroll row with fade masks on edges (hidden when full grid is open) */}
          {!showAllCourses && (
            <div className="courses-scroll-wrapper mt-10">
              <div
                ref={coursesRef}
                className="courses-scroll-track"
              >
                {COURSE_LIST.map((c, i) => (
                  <div
                    key={c.name}
                    className={`courses-card surface-card group relative flex flex-col p-0 overflow-hidden cursor-pointer course-card-enter${coursesTriggered ? " course-card-visible" : ""}`}
                    style={coursesTriggered ? { animationDelay: `${i * 60}ms` } : undefined}
                    onClick={() => setSelectedCourse(c)}
                    onAnimationEnd={(e) => {
                      e.currentTarget.style.animation = "none";
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    {/* Colored Top Section */}
                    <div className="relative h-48 w-full p-6 shrink-0 overflow-hidden" style={{ background: c.bg }}>
                      {/* Subtle light burst */}
                      <div className="absolute right-0 top-0 h-full w-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, white 0%, transparent 60%)' }} />
                      
                      {/* Large technology logo watermark */}
                      <img 
                        src={`${DEVICON}${c.icon}`} 
                        alt="" 
                        className="absolute -right-6 -bottom-6 h-48 w-48 object-contain opacity-[0.15] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
                        style={{ filter: 'grayscale(100%) brightness(200%)' }}
                      />

                      {/* Small icon box */}
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <img
                          src={`${DEVICON}${c.icon}`}
                          alt={`${c.name} logo`}
                          loading="lazy"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    </div>

                    {/* Content Bottom Section */}
                    <div className="flex flex-1 flex-col items-start gap-4 p-6 bg-card relative z-10 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <p className="font-display text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">{c.level}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full">
                        {c.teaches.slice(0, 2).map((t) => (
                          <span key={t} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">{t}</span>
                        ))}
                        {c.teaches.length > 2 && (
                          <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                            +{c.teaches.length - 2} more
                          </span>
                        )}
                      </div>
                      {/* Open Course CTA */}
                      <div className="mt-auto pt-2 w-full border-t border-border/60">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                          Open Course
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expanded grid — all 16 courses */}
          <div className="mx-auto w-full max-w-screen-2xl px-5 lg:px-12">
            {showAllCourses && (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {COURSE_LIST.map((c) => (
                  <div
                    key={`grid-${c.name}`}
                    className="surface-card h-full group relative flex flex-col p-0 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedCourse(c)}
                  >
                    {/* Colored Top Section */}
                    <div className="relative h-48 w-full p-6 shrink-0 overflow-hidden" style={{ background: c.bg }}>
                      {/* Subtle light burst */}
                      <div className="absolute right-0 top-0 h-full w-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, white 0%, transparent 60%)' }} />
                      
                      {/* Large technology logo watermark */}
                      <img 
                        src={`${DEVICON}${c.icon}`} 
                        alt="" 
                        className="absolute -right-6 -bottom-6 h-48 w-48 object-contain opacity-[0.15] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
                        style={{ filter: 'grayscale(100%) brightness(200%)' }}
                      />

                      {/* Small icon box */}
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <img
                          src={`${DEVICON}${c.icon}`}
                          alt={`${c.name} logo`}
                          loading="lazy"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    </div>

                    {/* Content Bottom Section */}
                    <div className="flex flex-1 flex-col items-start gap-4 p-6 bg-card relative z-10 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <p className="font-display text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">{c.level}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full">
                        {c.teaches.slice(0, 2).map((t) => (
                          <span key={t} className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">{t}</span>
                        ))}
                        {c.teaches.length > 2 && (
                          <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                            +{c.teaches.length - 2} more
                          </span>
                        )}
                      </div>
                      {/* Open Course CTA */}
                      <div className="mt-auto pt-2 w-full border-t border-border/60">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                          Open Course
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
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
        <section id="faqs" className="mx-auto max-w-5xl px-5 py-24 lg:px-8 lg:py-32">
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

      {/* COURSE DETAIL MODAL */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

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
                  className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your Email here"
                  className="w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Phone no.</label>
                <div className="flex items-center gap-0 rounded-xl border border-input bg-white transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
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
                    className="w-full appearance-none rounded-xl border border-input bg-white px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                  className="w-full resize-none rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
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
