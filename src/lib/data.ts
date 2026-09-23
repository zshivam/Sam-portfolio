// Portfolio Data - Shivam Sahani

export const personalInfo = {
  name: "Shivam Sahani",
  title: "Software Developer",
  tagline: "Building dynamic full-stack web experiences",
  bio: "Building dynamic full-stack web experiences while leveraging strong algorithmic foundations and data-driven analytical skills. A multi-talented, adaptable professional eager to drive impact across software engineering, marketing, and strategic growth.",
  email: "Zshivam19@gmail.com",
  avatar: "/shivam.png",
  links: {
    github: "https://github.com/zshivam",
    linkedin: "https://www.linkedin.com/in/zshivam24/",
    twitter: "https://x.com/zshiwam",
    instagram: "https://www.instagram.com/hishivam.in/",
    resume: "https://drive.google.com/file/d/1PEHuC7Y5Z4S8364VNukm-99_u0hzNnmo/view?usp=drive_link",
  },
};

export const skills = [
  { label: "React", color: "#61DAFB", category: "frontend" },
  { label: "Next.js", color: "#ffffff", category: "frontend" },
  { label: "TypeScript", color: "#3178C6", category: "language" },
  { label: "JavaScript", color: "#F7DF1E", category: "language" },
  { label: "C++", color: "#00599C", category: "language" },
  { label: "Python", color: "#3776AB", category: "language" },
  { label: "Node.js", color: "#339933", category: "backend" },
  { label: "Express", color: "#ffffff", category: "backend" },
  { label: "Django", color: "#44B78B", category: "backend" },
  { label: "FastAPI", color: "#009688", category: "backend" },
  { label: "HTML5", color: "#E34F26", category: "frontend" },
  { label: "CSS3", color: "#1572B6", category: "frontend" },
  { label: "Tailwind", color: "#06B6D4", category: "frontend" },
  { label: "Vue.js", color: "#4FC08D", category: "frontend" },
  { label: "MongoDB", color: "#47A248", category: "database" },
  { label: "PostgreSQL", color: "#4169E1", category: "database" },
  { label: "MySQL", color: "#4479A1", category: "database" },
  { label: "Docker", color: "#2496ED", category: "devops" },
  { label: "Kubernetes", color: "#326CE5", category: "devops" },
  { label: "Git", color: "#F05032", category: "tools" },
  { label: "GitHub", color: "#f0f6fc", category: "tools" },
  { label: "Excel", color: "#107C41", category: "tools" },
  { label: "Figma", color: "#F24E1E", category: "design" },
  { label: "Flutter", color: "#02569B", category: "mobile" },
];

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  role: string;
  status: string;
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    deployment: string;
  };
  tech: string[];
  github: string | null;
  live: string | null;
  gradient: string;
  icon: string;
  image: string;
  category: string;
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Rent-A-Vibe",
    description:
      "A full-stack rental platform connecting people with unique experiences and spaces. Features real-time booking, dynamic pricing, and a seamless user experience for both hosts and renters.",
    longDescription:
      "Rent-A-Vibe is an end-to-end marketplace web platform designed to democratize access to aesthetic event spaces, creative studio environments, and curated equipment. It eliminates friction in the short-term rental ecosystem by integrating real-time availability calendars, instantaneous reservation confirmation, and dynamic price modeling calibrated to booking duration and weekend demand surges.",
    role: "Full-Stack Architect & Lead Engineer",
    status: "Active GitHub Repository",
    features: [
      "Real-Time Booking Engine with instant availability conflict resolution",
      "Dynamic Pricing Calculator factoring peak hours, duration, and optional amenities",
      "Dual Role-Based Portals tailored for Host asset management and Renter discovery",
      "Comprehensive Multi-Filter Search by aesthetic vibe, geographic radius, and budget",
      "Interactive High-Resolution Gallery with verified renter reviews and rating aggregations",
    ],
    architecture: {
      frontend: "Next.js 14, TypeScript, TailwindCSS, Framer Motion",
      backend: "Node.js REST API, Next Server Actions, JWT Authentication",
      database: "MongoDB with Mongoose ODM & Geospatial Query Indexing",
      deployment: "Vercel Cloud with Edge Middleware",
    },
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "TailwindCSS"],
    github: "https://github.com/zshivam/Rent-A-Vibe",
    live: null,
    gradient: "from-purple-600 to-cyan-500",
    icon: "🏠",
    image: "/projects/rent-a-vibe.jpg",
    category: "Full-Stack Web App",
  },
  {
    id: 2,
    title: "KapCart",
    description:
      "Hyperlocal Grocery Delivery Platform designed to connect local grocery stores with customers for fast, same-hour delivery. Built with a focus on scalability and performance.",
    longDescription:
      "KapCart is a hyper-responsive grocery logistics and e-commerce platform built to empower neighborhood merchants against centralized delivery giants. By optimizing local inventory synchronization and routing delivery dispatches within a 3-5 km localized radius, KapCart guarantees sub-hour delivery times while reducing operational fulfillment overhead for regional store owners.",
    role: "Backend Systems & Database Engineer",
    status: "Scalable E-Commerce Engine",
    features: [
      "Hyperlocal Geolocation Engine with automatic radius-based store matching",
      "Atomic Inventory Locking to prevent race conditions during peak checkout rushes",
      "Vendor Merchant Dashboard for instant stock adjustments and promotional price tiers",
      "Live Order Status Pipeline from payment capture to rider pickup and doorstep fulfillment",
      "Optimized Relational Schema ensuring sub-50ms API response times under concurrency",
    ],
    architecture: {
      frontend: "React.js, Redux Toolkit, Styled Components, Axios",
      backend: "Node.js, Express.js microservice APIs, Bcrypt Security",
      database: "PostgreSQL with connection pooling and relational indexing",
      deployment: "Docker Containerization, Cloud Host Ready",
    },
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Redux"],
    github: "https://github.com/zshivam/KapCart",
    live: null,
    gradient: "from-cyan-500 to-emerald-500",
    icon: "🛒",
    image: "/projects/kapcart.jpg",
    category: "E-Commerce & Delivery",
  },
  {
    id: 3,
    title: "Pankaj Studio",
    description:
      "A professional photography & creative studio website with a stunning gallery, booking system, and portfolio showcase. Delivered a polished, production-ready web presence.",
    longDescription:
      "A bespoke, client-facing photography showcase and appointment booking portal engineered for Pankaj Studio. Created to convert visual impression into client inquiries, this platform features fluid masonry portfolio grids, buttery GSAP-powered motion transitions, an interactive client inquiry workflow, and lightning-fast asset loading optimized for high-resolution imagery.",
    role: "Solo Frontend Developer & UI Designer",
    status: "Live in Production (pankajstudio.in)",
    features: [
      "High-Performance Masonry Lightbox with progressive asset streaming and zero layout shift",
      "Integrated Session Scheduling & Automated Client Inquiry Dispatch System",
      "Dynamic Service Catalog detailing wedding, commercial, and portrait packages",
      "98+ Google Lighthouse Score achieved through asset compression and semantic structure",
      "Ultra-fluid CSS micro-interactions and scroll-triggered narrative animations",
    ],
    architecture: {
      frontend: "Modern JavaScript (ES6+), Semantic HTML5, Modular CSS3",
      backend: "Serverless Email & Form Webhook Integration",
      database: "Cloudinary CDN for responsive high-res media distribution",
      deployment: "Production Domain with SSL Certificate (pankajstudio.in)",
    },
    tech: ["JavaScript", "HTML5", "CSS3", "GSAP Animations", "Cloudinary"],
    github: "https://github.com/zshivam/Pankajstudio",
    live: "https://pankajstudio.in",
    gradient: "from-pink-500 to-purple-600",
    icon: "📸",
    image: "/projects/pankaj-studio.png",
    category: "Client Studio Showcase",
  },
  {
    id: 4,
    title: "InfoForm",
    description:
      "A full-stack form management platform with a Python/FastAPI backend and Vue.js frontend. Features data collection, analytics, and real-time form submission with persistent storage.",
    longDescription:
      "InfoForm is a modern survey automation and data collection web suite engineered for organizations requiring reliable, rapid response aggregation. Leveraging an asynchronous Python/FastAPI backend paired with a reactive Vue.js interface, it delivers seamless dynamic form rendering, real-time submission validation, live analytical telemetry charts, and automated tabular export pipelines.",
    role: "Full-Stack Engineer",
    status: "Live Application (Vercel + Cloud)",
    features: [
      "Dynamic Field Engine supporting conditional logic, regex checks, and multi-step pages",
      "High-Concurrency Async Ingestion via FastAPI ASGI handling thousands of requests/sec",
      "Live Analytics Telemetry with automated response visualization charts and KPI metrics",
      "Automated CSV & JSON Data Export Pipeline with instant batch report generation",
      "Database Migrations & Transactional Integrity via SQLAlchemy and Alembic",
    ],
    architecture: {
      frontend: "Vue.js 3 (Composition API), Vite, Pinia Store, TailwindCSS",
      backend: "Python 3.11, FastAPI, Pydantic Schema Validation, Uvicorn ASGI",
      database: "PostgreSQL Relational DB with SQLAlchemy ORM & Alembic",
      deployment: "Vercel Frontend + Render/Cloud Backend",
    },
    tech: ["Python", "FastAPI", "Vue.js", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/zshivam/info-form",
    live: "https://info-form-my-app.vercel.app",
    gradient: "from-amber-500 to-orange-600",
    icon: "📋",
    image: "/projects/info-form.png",
    category: "SaaS Form Builder & Analytics",
  },
  {
    id: 5,
    title: "Sam's Portfolio",
    description:
      "An interactive 3D developer portfolio showcasing WebGL spatial holograms, Instagram reel-style vertical sticky project reels, continuous marquee loops, and deep architectural dossiers.",
    longDescription:
      "A cutting-edge personal developer showcase built with Next.js 15, Three.js (WebGL), Framer Motion, and TypeScript. Highlights include an interactive 3D character hologram with real-time cursor tracking, dual-tier continuous loop skill marquees, vertical sticky-stacked Instagram reel project stream with full architectural dossiers, and a compact omni-channel social connect desk.",
    role: "Lead Creator & Full-Stack Architect",
    status: "Live Production System",
    features: [
      "Interactive 3D WebGL Hologram with real-time mouse tracking and ambient lighting",
      "Instagram Reel-Style Vertical Stacking Project Stream with frictionless sticky card docking",
      "Dual-Track Continuous Loop Marquee cycling through core tech stack and frameworks",
      "Interactive Fullscreen Architectural Dossier Modals with deep technical specifications",
      "Compact Omni-Channel Social Desk integrating verified links for GitHub, LinkedIn, Instagram, X, and Threads",
    ],
    architecture: {
      frontend: "Next.js 15 (App Router), React 18, TypeScript, Three.js, Framer Motion",
      backend: "Next.js Server Actions, Static Optimization with ISR",
      database: "Vercel Edge Network with asset CDN caching",
      deployment: "Vercel Cloud Platform with CI/CD GitHub integration",
    },
    tech: ["Next.js", "Three.js", "TypeScript", "React", "Framer Motion", "TailwindCSS"],
    github: "https://github.com/zshivam/Sam-Portfolio",
    live: "https://sam-portfolio.vercel.app",
    gradient: "from-cyan-500 to-purple-600",
    icon: "⚡",
    image: "/projects/portfolio.png",
    category: "Interactive 3D Web App",
  },
];
