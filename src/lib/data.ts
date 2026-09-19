// Portfolio Data - Shivam Sahani

export const personalInfo = {
  name: "Shivam Sahani",
  title: "Software Developer",
  tagline: "Building dynamic full-stack web experiences",
  bio: "Building dynamic full-stack web experiences while leveraging strong algorithmic foundations and data-driven analytical skills. A multi-talented, adaptable professional eager to drive impact across software engineering, marketing, and strategic growth.",
  email: "Zshivam19@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/142381817?v=4",
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
  { label: "Node.js", color: "#339933", category: "backend" },
  { label: "Express", color: "#000000", category: "backend" },
  { label: "Python", color: "#3776AB", category: "language" },
  { label: "Django", color: "#092E20", category: "backend" },
  { label: "FastAPI", color: "#009688", category: "backend" },
  { label: "HTML5", color: "#E34F26", category: "frontend" },
  { label: "CSS3", color: "#1572B6", category: "frontend" },
  { label: "Tailwind", color: "#06B6D4", category: "frontend" },
  { label: "MongoDB", color: "#47A248", category: "database" },
  { label: "PostgreSQL", color: "#4169E1", category: "database" },
  { label: "MySQL", color: "#4479A1", category: "database" },
  { label: "Docker", color: "#2496ED", category: "devops" },
  { label: "Kubernetes", color: "#326CE5", category: "devops" },
  { label: "Git", color: "#F05032", category: "tools" },
  { label: "GitHub", color: "#181717", category: "tools" },
  { label: "Figma", color: "#F24E1E", category: "design" },
  { label: "Flutter", color: "#02569B", category: "mobile" },
  { label: "Vue.js", color: "#4FC08D", category: "frontend" },
];

export const projects = [
  {
    id: 1,
    title: "Rent-A-Vibe",
    description:
      "A full-stack rental platform connecting people with unique experiences and spaces. Features real-time booking, dynamic pricing, and a seamless user experience for both hosts and renters.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    github: "https://github.com/zshivam/Rent-A-Vibe",
    live: null,
    gradient: "from-purple-600 to-cyan-500",
    icon: "🏠",
  },
  {
    id: 2,
    title: "KapCart",
    description:
      "Hyperlocal Grocery Delivery Platform designed to connect local grocery stores with customers for fast, same-hour delivery. Built with a focus on scalability and performance.",
    tech: ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/zshivam/KapCart",
    live: null,
    gradient: "from-cyan-500 to-emerald-500",
    icon: "🛒",
  },
  {
    id: 3,
    title: "Pankaj Studio",
    description:
      "A professional photography & creative studio website with a stunning gallery, booking system, and portfolio showcase. Delivered a polished, production-ready web presence.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/zshivam/Pankajstudio",
    live: "https://pankajstudio.in",
    gradient: "from-pink-500 to-purple-600",
    icon: "📸",
  },
  {
    id: 4,
    title: "InfoForm",
    description:
      "A full-stack form management platform with a Python/FastAPI backend and Vue.js frontend. Features data collection, analytics, and real-time form submission with persistent storage.",
    tech: ["Python", "FastAPI", "Vue.js", "PostgreSQL"],
    github: "https://github.com/zshivam/info-form",
    live: "https://info-form-frontend.vercel.app",
    gradient: "from-amber-500 to-orange-600",
    icon: "📋",
  },
];

// Keyboard layout rows for the 3D keyboard
export const keyboardRows = [
  ["React", "Next.js", "TypeScript", "Python", "Node.js", "FastAPI"],
  ["MongoDB", "PostgreSQL", "Docker", "Git", "Figma", "Flutter"],
  ["Express", "Tailwind", "HTML5", "CSS3", "MySQL", "Vue.js"],
];
