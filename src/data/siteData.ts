export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Workshops", href: "#workshops" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export const ENQUIRY_OPTIONS = [
  "Online Course",
  "Offline Course",
  "Workshop",
  "Other",
];

export const STATS = [
  {
    end: 15000,
    suffix: "+",
    title: "Student",
    label: "Taught",
  },
  {
    end: 48,
    suffix: "+",
    title: "Course",
    label: "Categories",
  },
  {
    end: 150,
    suffix: "+",
    title: "Place",
    label: "Mentored",
  },
  {
    end: 200,
    suffix: "+",
    title: "Projects",
    label: "Completed",
  },
];

export const COURSE_LIST = [
  {
    name: "C Fundamentals",
    banner: "/courses/c-fundamentals.png",
    level: "Beginner",
    icon: "c/c-original.svg",
    bg: "linear-gradient(145deg,#0d2137 0%,#0e3460 60%,#1a5276 100%)",
    teaches: ["Basics", "Pointers", "Arrays", "File I/O"],
    duration: "4–6 weeks",
    description:
      "Build a rock-solid programming foundation with C — the language behind operating systems, embedded systems and high-performance software. You'll learn procedural programming, pointers and memory management from the ground up.",
    topicsFull: [
      "Variables & Data Types",
      "Operators & Control Flow",
      "Functions & Recursion",
      "Pointers & Memory Addresses",
      "Arrays & Strings",
      "Structures & Unions",
      "File I/O Operations",
    ],
    skills: [
      "Procedural Programming",
      "Memory Management",
      "Low-Level Thinking",
      "Debugging with GCC",
    ],
    prerequisites: "None — suitable for absolute beginners",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "DSA using C++",
    banner: "/courses/dsa-using-cpp.png",
    level: "Intermediate",
    icon: "cplusplus/cplusplus-original.svg",
    bg: "linear-gradient(145deg,#1a0533 0%,#3b0764 60%,#5b21b6 100%)",
    teaches: ["OOP", "STL", "Inheritance", "Templates"],
    duration: "8–10 weeks",
    description:
      "Master data structures and algorithms using C++ — the language favoured in competitive programming and system design interviews. Covers STL, OOP and template programming.",
    topicsFull: [
      "OOP Concepts",
      "STL Containers & Algorithms",
      "Sorting & Searching",
      "Linked Lists, Trees, Graphs",
      "Inheritance & Polymorphism",
      "Templates & Generic Programming",
      "Time & Space Complexity",
    ],
    skills: ["OOP Design", "Problem Solving", "Competitive Programming", "STL Proficiency"],
    prerequisites: "Basic programming knowledge (C or equivalent)",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Core Java Fundamentals",
    banner: "/courses/core-java.png",
    level: "Beginner",
    icon: "java/java-original.svg",
    bg: "linear-gradient(145deg,#7c2400 0%,#b93e00 60%,#f97316 100%)",
    teaches: ["OOP", "Collections", "Multithreading", "JDBC"],
    duration: "8 weeks",
    description:
      "Start your Java journey with solid fundamentals — OOP principles, Collections, exception handling, multithreading and JDBC database connectivity. Build real console and GUI-based applications.",
    topicsFull: [
      "OOP Principles (Encapsulation, Inheritance, Polymorphism, Abstraction)",
      "Collections Framework",
      "Exception Handling",
      "Multithreading & Concurrency",
      "JDBC & Database Connectivity",
      "Java I/O Streams",
      "Generics & Lambda Expressions",
    ],
    skills: ["Object-Oriented Design", "Database Integration", "Concurrent Programming", "Java SE"],
    prerequisites: "None — beginners welcome",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Advanced Java for Enterprise",
    banner: "/courses/advanced-java.png",
    level: "Advanced",
    icon: "java/java-original.svg",
    bg: "linear-gradient(145deg,#431407 0%,#7c2d12 55%,#c2410c 100%)",
    teaches: ["Servlets", "JSP", "Hibernate", "Spring Core"],
    duration: "10 weeks",
    description:
      "Move into enterprise-grade Java development with Servlets, JSP, Hibernate ORM and Spring Core. Build multi-tier web applications with proper MVC architecture and database persistence.",
    topicsFull: [
      "Servlets & JSP",
      "MVC Architecture",
      "Hibernate ORM",
      "Spring Core & DI",
      "Spring MVC",
      "JPA & Entity Mapping",
      "Connection Pooling",
    ],
    skills: [
      "Enterprise Java Development",
      "ORM & Database Persistence",
      "Spring Framework",
      "Web Application Architecture",
    ],
    prerequisites: "Core Java Fundamentals",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Spring Boot Microservices",
    banner: "/courses/spring-boot.png",
    level: "Advanced",
    icon: "spring/spring-original.svg",
    bg: "linear-gradient(145deg,#052e16 0%,#14532d 55%,#15803d 100%)",
    teaches: ["REST APIs", "JPA", "Security", "Microservices"],
    duration: "12 weeks",
    description:
      "Build production-ready microservices with Spring Boot — the most in-demand Java framework. Learn REST API design, JPA data access, Spring Security and cloud-native microservice patterns.",
    topicsFull: [
      "Spring Boot Setup & Auto-Configuration",
      "RESTful API Design",
      "Spring Data JPA",
      "Spring Security & JWT",
      "Microservices Architecture",
      "Service Discovery & API Gateway",
      "Docker & Deployment",
    ],
    skills: ["REST API Development", "Microservices Design", "Spring Security", "Cloud Deployment"],
    prerequisites: "Advanced Java or equivalent experience",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Frontend with React",
    banner: "/courses/frontend-react.png",
    level: "Intermediate",
    icon: "react/react-original.svg",
    bg: "linear-gradient(145deg,#082f49 0%,#075985 55%,#0ea5e9 100%)",
    teaches: ["Components", "Hooks", "Redux", "Routing"],
    duration: "10 weeks",
    description:
      "Build modern, dynamic user interfaces with React — the most widely used front-end library. From components and hooks to Redux state management and React Router, you'll ship real-world SPAs.",
    topicsFull: [
      "JSX & Component Architecture",
      "Props, State & Lifecycle",
      "React Hooks (useState, useEffect, useContext)",
      "React Router",
      "Redux & Redux Toolkit",
      "API Integration & Fetch",
      "Performance Optimisation",
    ],
    skills: ["SPA Development", "State Management", "Component Design", "API Integration"],
    prerequisites: "HTML, CSS and JavaScript basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Python for Backend",
    banner: "/courses/python-backend.png",
    level: "Beginner to Intermediate",
    icon: "python/python-original.svg",
    bg: "linear-gradient(145deg,#1e3a5f 0%,#1d4ed8 55%,#f59e0b 100%)",
    teaches: ["Basics", "OOP", "NumPy", "Pandas"],
    duration: "8 weeks",
    description:
      "Learn Python from scratch and progress to backend development, data manipulation with NumPy & Pandas, and building web APIs. An excellent first language that scales to professional use.",
    topicsFull: [
      "Python Syntax & Data Types",
      "Control Flow & Functions",
      "OOP in Python",
      "File Handling & Modules",
      "NumPy & Pandas",
      "REST APIs with Flask / FastAPI",
      "Database Integration",
    ],
    skills: ["Python Programming", "Data Manipulation", "Backend API Development", "OOP"],
    prerequisites: "None — beginners welcome",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Cloud Computing with AWS",
    banner: "/courses/cloud-aws.png",
    level: "Intermediate",
    icon: "amazonwebservices/amazonwebservices-original-wordmark.svg",
    bg: "linear-gradient(145deg,#1c1917 0%,#292524 55%,#ff9900 100%)",
    teaches: ["EC2", "S3", "Lambda", "RDS"],
    duration: "8 weeks",
    description:
      "Learn to design, deploy and manage cloud infrastructure on AWS — the world's leading cloud platform. Covers core services, serverless architecture and managed databases for real-world workloads.",
    topicsFull: [
      "AWS Core Services (EC2, S3, VPC)",
      "IAM & Security",
      "RDS & DynamoDB",
      "Lambda & Serverless",
      "Load Balancing & Auto Scaling",
      "CloudFront & Route 53",
      "Deployment Pipelines",
    ],
    skills: ["Cloud Architecture", "AWS Core Services", "Serverless Development", "Cloud Security"],
    prerequisites: "Basic networking and Linux knowledge recommended",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Web Design (HTML5 & CSS3)",
    banner: "/courses/web-design-html-css.png",
    level: "Beginner",
    icon: "html5/html5-original.svg",
    bg: "linear-gradient(145deg,#7c1d1d 0%,#b91c1c 55%,#e4713a 100%)",
    teaches: ["Semantic HTML", "Flexbox", "Grid", "Responsive"],
    duration: "4 weeks",
    description:
      "Master HTML5 and CSS3 to build beautiful, responsive websites from scratch. You'll learn semantic markup, Flexbox, CSS Grid, animations and mobile-first design principles.",
    topicsFull: [
      "HTML5 Semantic Elements",
      "CSS Selectors & Box Model",
      "Flexbox Layout",
      "CSS Grid",
      "Responsive Design & Media Queries",
      "CSS Animations & Transitions",
      "Forms & Accessibility",
    ],
    skills: ["Responsive Web Design", "CSS Layouts", "HTML5 Semantics", "Accessibility"],
    prerequisites: "None — suitable for absolute beginners",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Modern JavaScript (ES6+)",
    banner: "/courses/modern-javascript.png",
    level: "Intermediate",
    icon: "javascript/javascript-original.svg",
    bg: "linear-gradient(145deg,#1c1400 0%,#3d2e00 55%,#ca8a04 100%)",
    teaches: ["ES6+", "DOM", "Async", "Events"],
    duration: "6 weeks",
    description:
      "Go beyond basics and master modern JavaScript — arrow functions, destructuring, async/await, Promises and DOM manipulation. Build interactive web applications with vanilla JS.",
    topicsFull: [
      "ES6+ Syntax (Arrow Functions, Destructuring, Spread)",
      "DOM Manipulation",
      "Events & Event Loop",
      "Promises & Async/Await",
      "Fetch API & AJAX",
      "Modules & Bundlers",
      "Error Handling",
    ],
    skills: ["Modern JS Syntax", "Async Programming", "DOM Manipulation", "API Consumption"],
    prerequisites: "HTML & CSS basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Responsive UI with Bootstrap",
    banner: "/courses/responsive-bootstrap.png",
    level: "Beginner",
    icon: "bootstrap/bootstrap-original.svg",
    bg: "linear-gradient(145deg,#2e0068 0%,#5a0096 55%,#7c3aed 100%)",
    teaches: ["Grid", "Components", "Utilities", "Theming"],
    duration: "4 weeks",
    description:
      "Build mobile-first, responsive websites quickly with Bootstrap 5 — the world's most popular CSS framework. Learn the grid system, components, utilities and custom theming.",
    topicsFull: [
      "Bootstrap Grid System",
      "Navbar & Navigation",
      "Cards, Modals & Alerts",
      "Forms & Validation",
      "Utility Classes",
      "Custom Theming with SASS",
      "JavaScript Plugins",
    ],
    skills: ["Bootstrap 5", "Rapid UI Development", "Responsive Design", "Component Usage"],
    prerequisites: "HTML & CSS basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Backend with PHP & MySQL",
    banner: "/courses/backend-php-mysql.png",
    level: "Intermediate",
    icon: "php/php-original.svg",
    bg: "linear-gradient(145deg,#1e1b4b 0%,#312e81 55%,#6366f1 100%)",
    teaches: ["PHP Basics", "SQL", "CRUD", "Sessions"],
    duration: "8 weeks",
    description:
      "Build dynamic, database-driven websites with PHP and MySQL — the classic combination powering millions of websites. Covers server-side scripting, CRUD operations and session management.",
    topicsFull: [
      "PHP Syntax & Functions",
      "MySQL Database Design",
      "CRUD Operations",
      "Sessions & Cookies",
      "Form Handling & Validation",
      "PDO & Prepared Statements",
      "MVC Pattern",
    ],
    skills: ["Server-Side Scripting", "Database Design", "Web Security Basics", "CRUD Operations"],
    prerequisites: "HTML & CSS basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Backend with Node.js",
    banner: "/courses/backend-nodejs.png",
    level: "Intermediate",
    icon: "nodejs/nodejs-original.svg",
    bg: "linear-gradient(145deg,#052e16 0%,#166534 55%,#4ade80 100%)",
    teaches: ["Express", "APIs", "Middleware", "MongoDB"],
    duration: "10 weeks",
    description:
      "Build fast, scalable backend services with Node.js and Express. Develop RESTful APIs, middleware systems and connect to MongoDB for full-stack JavaScript development.",
    topicsFull: [
      "Node.js Runtime & Event Loop",
      "Express.js & Routing",
      "Middleware & Error Handling",
      "RESTful API Design",
      "MongoDB & Mongoose",
      "Authentication & JWT",
      "File Uploads & Streaming",
    ],
    skills: [
      "Node.js Backend Development",
      "REST API Design",
      "MongoDB Integration",
      "Authentication",
    ],
    prerequisites: "JavaScript fundamentals",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Database Design with MongoDB",
    banner: "/courses/database-mongodb.png",
    level: "Intermediate",
    icon: "mongodb/mongodb-original.svg",
    bg: "linear-gradient(145deg,#052e16 0%,#134e1a 55%,#00ed64 100%)",
    teaches: ["Documents", "Aggregation", "Indexing", "Atlas"],
    duration: "6 weeks",
    description:
      "Master NoSQL database design with MongoDB — from document modelling and CRUD operations to aggregation pipelines, indexing strategies and cloud deployment with MongoDB Atlas.",
    topicsFull: [
      "Document Model & BSON",
      "CRUD Operations",
      "Query Operators & Filtering",
      "Aggregation Pipeline",
      "Indexing & Performance",
      "Schema Design Patterns",
      "MongoDB Atlas & Cloud",
    ],
    skills: [
      "NoSQL Database Design",
      "Aggregation Pipelines",
      "Performance Tuning",
      "Cloud Databases",
    ],
    prerequisites: "Basic database knowledge recommended",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "Type-Safe Code with TypeScript",
    banner: "/courses/typesafe-typescript.png",
    level: "Advanced",
    icon: "typescript/typescript-original.svg",
    bg: "linear-gradient(145deg,#172554 0%,#1e3a8a 55%,#2563eb 100%)",
    teaches: ["Types", "Interfaces", "Generics", "Decorators"],
    duration: "6 weeks",
    description:
      "Eliminate runtime bugs with TypeScript — the typed superset of JavaScript adopted by every major framework. Learn interfaces, generics, decorators and advanced type patterns for enterprise code.",
    topicsFull: [
      "Types & Type Inference",
      "Interfaces & Type Aliases",
      "Generics & Constraints",
      "Enums & Utility Types",
      "Decorators & Metadata",
      "TypeScript with React",
      "Configuration & Build Tools",
    ],
    skills: ["Static Typing", "Generics & Advanced Types", "TypeScript with React", "Code Safety"],
    prerequisites: "Solid JavaScript experience",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
  {
    name: "DevOps Basics with Docker",
    banner: "/courses/devops-docker.png",
    level: "Advanced",
    icon: "docker/docker-original.svg",
    bg: "linear-gradient(145deg,#0c2a4a 0%,#0d3a6e 55%,#2496ed 100%)",
    teaches: ["Containers", "Images", "Compose", "Volumes"],
    duration: "6 weeks",
    description:
      "Containerise and ship applications with Docker — the cornerstone of modern DevOps. Learn to build images, orchestrate services with Docker Compose, manage volumes and integrate CI/CD pipelines.",
    topicsFull: [
      "Docker Architecture & Concepts",
      "Building Custom Images",
      "Docker Compose",
      "Networking & Volumes",
      "CI/CD Integration",
      "Container Registry",
      "Best Practices & Security",
    ],
    skills: ["Containerisation", "Docker Compose", "DevOps Workflow", "CI/CD Pipelines"],
    prerequisites: "Linux command line basics",
    mode: "Online & Offline",
    fee: "Contact Us",
  },
];

export const FAQS = [
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

export const TESTIMONIALS = [
  {
    quote:
      "Before this C workshop, pointers haunted my dreams. But the instructor's simple, clear examples turned that fear into confidence—I was coding on my own by day two!",
    name: "Rohit Sable",
    role: "TE Computer Engineering",
    rating: 5.0,
  },
  {
    quote:
      "I always found ES6 features confusing until we saw side-by-side code comparisons. It instantly clicked, and now I write modern JavaScript with ease.",
    name: "Snehal Rane",
    role: "TE IT",
    rating: 4.8,
  },
  {
    quote:
      "Teaching Java collections with patience and answering every question without judgment made this session truly stand out for our beginners.",
    name: "Prof. Anil Deshpande",
    role: "Java Faculty",
    rating: 4.6,
  },
  {
    quote:
      "The Spring Boot microservices workshop was a game-changer. Breaking down the architecture into digestible pieces helped students grasp JPA queries in no time.",
    name: "Ms. Meera Joshi",
    role: "Backend Trainer",
    rating: 5.0,
  },
  {
    quote:
      "I had zero Python knowledge coming in but left able to build backend logic. That kind of transformation speaks volumes about the workshop's quality.",
    name: "Suraj Gaikwad",
    role: "First Year, E&TC",
    rating: 4.5,
  },
  {
    quote:
      "Seeing how OOP concepts map directly onto real-world DSA problems made this C++ session memorable. It’s not just syntax; it’s thinking like a programmer.",
    name: "Sanika Kulkarni",
    role: "TE IT",
    rating: 4.8,
  },
  {
    quote:
      "As a non-CS student, I worried I'd fall behind, but the step-by-step pace and immediate hands-on tasks kept me engaged throughout.",
    name: "Ankita Ghorpade",
    role: "First Year, IT",
    rating: 4.4,
  },
  {
    quote:
      "Students often get overwhelmed by Servlets and JSP in textbooks, but this workshop made those topics practical and approachable.",
    name: "Nikhil Pawar",
    role: "BE Computer Engineering",
    rating: 5.0,
  },
  {
    quote:
      "The way the React hooks were demystified here completely changed my approach. I now understand what’s going on under the hood instead of copy-pasting blindly.",
    name: "Aditya Shinde",
    role: "SE Computer",
    rating: 4.3,
  },
  {
    quote:
      "I’ve seen many PHP sessions, but this one clarified SQL joins with real examples that stuck with me. Very practical and useful for our projects.",
    name: "Komal Deshpande",
    role: "TE Computer Engineering",
    rating: 4.3,
  },
  {
    quote:
      "Breaking down Docker and containers into simple, relatable steps transformed my understanding from mystery to clarity. This session sparked my interest in DevOps careers.",
    name: "Rahul Bansode",
    role: "BE Computer Engineering",
    rating: 4.4,
  },
  {
    quote:
      "The workshop on Cloud Computing didn’t just show slides—it gave us hands-on experience with EC2 and S3, which is exactly what the industry demands today.",
    name: "Tejas Kale",
    role: "BE Computer Engineering",
    rating: 5.0,
  },
  {
    quote:
      "The hands-on approach during the responsive Bootstrap session helped me build attractive, functional pages quickly without drowning in CSS.",
    name: "Rutuja Salunkhe",
    role: "First Year Computer Engineering",
    rating: 4.4,
  },
  {
    quote:
      "I always thought MongoDB was a completely different beast compared to SQL, but this workshop made NoSQL accessible and even enjoyable.",
    name: "Ruchita Kadam",
    role: "BE IT",
    rating: 4.5,
  },
  {
    quote:
      "One of the best workshops I've experienced—REST APIs finally made sense, not just in theory but through clear, practical examples.",
    name: "Yash Kadam",
    role: "BE Computer Engineering",
    rating: 4.4,
  },
  {
    quote:
      "The DOM manipulation exercises were super practical—we didn’t just watch slides; we built things on the spot, which made learning stick.",
    name: "Aniket Shelar",
    role: "SE Computer Engineering",
    rating: 4.9,
  },
  {
    quote:
      "Our instructor’s ability to connect OOP principles to solving real DSA problems makes complex concepts feel natural and intuitive.",
    name: "Prof. Kavita Sharma",
    role: "Computer Science Faculty",
    rating: 4.8,
  },
  {
    quote:
      "This workshop was a perfect introduction for beginners who thought CSS and Flexbox were puzzles. By the end, I was confident in making layouts.",
    name: "Kiran Bhagat",
    role: "First Year Mechanical Engineering",
    rating: 4.9,
  },
  {
    quote:
      "Explaining TypeScript’s interfaces and types using everyday analogies helped me grasp this advanced topic without feeling overwhelmed.",
    name: "Ishwari Kolhe",
    role: "BE Computer Engineering",
    rating: 4.8,
  },
  {
    quote:
      "It’s rare to find a cloud session that’s both relevant and practical. After this, I updated my resume with AWS skills I actually understand.",
    name: "Sakshi Jagtap",
    role: "TE Computer",
    rating: 4.6,
  },
  {
    quote:
      "The Node.js backend workshop broke down Express step-by-step, which cleared up all the confusion I had from online tutorials.",
    name: "Pallavi Yadav",
    role: "SE Computer Engineering",
    rating: 4.7,
  },
  {
    quote:
      "Hands-on, no fluff—this Java session made collections click for me, and the patient teaching helped everyone feel comfortable asking questions.",
    name: "Omkar Deshmukh",
    role: "SE Computer",
    rating: 4.3,
  },
  {
    quote:
      "I never thought a CSS session could be so engaging and fun—this completely changed my mindset about frontend design.",
    name: "Vaishnavi Thorat",
    role: "First Year IT",
    rating: 4.3,
  },
  {
    quote:
      "API request-response flows were brought to life with clear diagrams, making the entire concept easy to understand and apply.",
    name: "Devendra More",
    role: "TE Computer",
    rating: 4.9,
  },
  {
    quote:
      "The workshop’s practical approach to backend with PHP and MySQL had immediate impact—we applied concepts directly to our mini-projects.",
    name: "Akash Bhoir",
    role: "BE IT",
    rating: 5.0,
  },
  {
    quote:
      "This was hands down the most useful DSA session I’ve attended. The STL used to be a black box, but now I actually enjoy solving problems with it.",
    name: "Prathamesh Jadhav",
    role: "SE Computer Engineering",
    rating: 4.6,
  },
  {
    quote:
      "I’ve attended many Java sessions before, but this one’s focus on practical enterprise applications made it invaluable for placements.",
    name: "Shraddha More",
    role: "TE IT",
    rating: 4.3,
  },
  {
    quote:
      "This workshop was the perfect entry point for absolute beginners like me, making coding feel approachable and exciting.",
    name: "Kiran Bhagat",
    role: "First Year Mechanical Engineering",
    rating: 4.3,
  },
  {
    quote:
      "The instructor’s interactive style kept energy high and made a three-hour React workshop fly by without losing attention.",
    name: "Pooja Chavan",
    role: "TE Computer Engineering",
    rating: 4.5,
  },
  {
    quote:
      "Aggregation pipelines in MongoDB felt intimidating until this session made them approachable through clear examples and patient teaching.",
    name: "Vedant Pisal",
    role: "SE Computer Engineering",
    rating: 4.3,
  },
];
