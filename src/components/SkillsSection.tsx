"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/data";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiFastapi,
  SiHtml5,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiFigma,
  SiFlutter,
  SiVuedotjs,
  SiCplusplus,
} from "react-icons/si";
import { FaCss3Alt, FaFileExcel } from "react-icons/fa6";
import { IconType } from "react-icons";

// Map each skill name to its official brand logo icon
const skillIconMap: Record<string, IconType> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "C++": SiCplusplus,
  "Python": SiPython,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "Django": SiDjango,
  "FastAPI": SiFastapi,
  "HTML5": SiHtml5,
  "CSS3": FaCss3Alt,
  "Tailwind": SiTailwindcss,
  "Vue.js": SiVuedotjs,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "Docker": SiDocker,
  "Kubernetes": SiKubernetes,
  "Git": SiGit,
  "GitHub": SiGithub,
  "Excel": FaFileExcel,
  "Figma": SiFigma,
  "Flutter": SiFlutter,
};

const categoryColors: Record<string, string> = {
  frontend: "#61dafb",
  backend: "#339933",
  language: "#a855f7",
  database: "#4479A1",
  devops: "#2496ED",
  tools: "#F05032",
  design: "#F24E1E",
  mobile: "#02569B",
};

export default function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Divide skills into 2 balanced rows for the two-line marquee
  const midIndex = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, midIndex);
  const row2 = skills.slice(midIndex);

  // Duplicate each row to ensure seamless infinite looping without gaps
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  const renderSkillCard = (skill: typeof skills[0], idx: number) => {
    const Icon = skillIconMap[skill.label];

    return (
      <div
        key={`${skill.label}-${idx}`}
        className="tech-tile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.85rem",
          padding: "0.75rem 1.25rem",
          borderRadius: "14px",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(14px)",
          border: `1.5px solid ${skill.color}35`,
          boxShadow: `0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)`,
          flexShrink: 0,
          cursor: "default",
          transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Brand Icon Box */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: `${skill.color}18`,
            border: `1.5px solid ${skill.color}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 12px ${skill.color}30`,
            flexShrink: 0,
          }}
        >
          {Icon ? (
            <Icon
              size={20}
              color={skill.color}
              style={{ filter: `drop-shadow(0 0 6px ${skill.color}80)` }}
            />
          ) : (
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: skill.color,
                boxShadow: `0 0 10px ${skill.color}`,
              }}
            />
          )}
        </div>

        {/* Title and Category */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.92rem",
              color: "#ffffff",
              whiteSpace: "nowrap",
              letterSpacing: "0.2px",
            }}
          >
            {skill.label}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.7px",
                fontWeight: 600,
              }}
            >
              {skill.category}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="section" ref={ref} style={{ padding: "3.2rem 0 2.2rem 0", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ marginBottom: "1.75rem" }}>
        {/* Compact, Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            02 / TECH ARSENAL
          </p>
          <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.1rem)", marginBottom: "0.5rem" }}>
            Technologies &amp; Frameworks
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "540px", fontSize: "0.88rem" }}>
            Core tools, languages, databases, and cloud platforms I engineer with daily.
          </p>
        </motion.div>
      </div>

      {/* 2-Line Infinite Loop Carousel (Flowing Right to Left) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="marquee-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          position: "relative",
          width: "100%",
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Line 1: Right-to-Left */}
        <div className="marquee-wrapper">
          <div className="marquee-track track-line-1">
            {marqueeRow1.map((skill, i) => renderSkillCard(skill, i))}
          </div>
        </div>

        {/* Line 2: Right-to-Left (Offset speed for organic flow) */}
        <div className="marquee-wrapper">
          <div className="marquee-track track-line-2">
            {marqueeRow2.map((skill, i) => renderSkillCard(skill, i))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .marquee-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          will-change: transform;
        }

        .track-line-1 {
          animation: scrollRightToLeft 28s linear infinite;
        }

        .track-line-2 {
          animation: scrollRightToLeft 34s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused !important;
        }

        .tech-tile:hover {
          transform: translateY(-4px) scale(1.03);
          background: rgba(22, 32, 60, 0.95) !important;
          border-color: rgba(6, 182, 212, 0.7) !important;
          box-shadow: 0 10px 24px rgba(6, 182, 212, 0.25), inset 0 1px 0 rgba(255,255,255,0.2) !important;
        }

        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
