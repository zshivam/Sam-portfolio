"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/lib/data";

const Image3D = dynamic(() => import("@/components/3d/Image3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
      }}
    >
      Loading 3D avatar...
    </div>
  ),
});
import {
  FiCheckCircle,
  FiArrowRight,
  FiCode,
  FiCpu,
  FiZap,
  FiLayers,
  FiCompass,
  FiActivity,
} from "react-icons/fi";

const stats = [
  { value: "13+", label: "GitHub Repos", detail: "Active open-source & production codebases" },
  { value: "5+", label: "Web Applications", detail: "End-to-end full-stack architectures" },
  { value: "2+", label: "Years Coding", detail: "Continuous algorithmic & web engineering" },
  { value: "10+", label: "Tech Stacks", detail: "React, Next.js, Node, Python, Docker & more" },
];

const quickInfo = [
  { label: "Location", value: "India 🇮🇳" },
  { label: "Role", value: "Full-Stack Engineer" },
  { label: "Focus", value: "Scalable Web & Cloud" },
  { label: "Status", value: "Open for Opportunities" },
];

// Interactive Perspectives (Compact, direct, exact engineering details)
const aboutPillars = {
  story: {
    id: "story",
    label: "01. Profile",
    icon: FiCompass,
    badge: "01. Profile & Focus",
    title: "Full-Stack Developer & Problem Solver",
    summary:
      "Full-stack engineer with strong algorithmic foundations and hands-on experience building fast, scalable web apps. Focused on end-to-end architecture, low latency, and intuitive interfaces.",
    points: [
      "End-to-End Execution: Clean database schemas, robust REST APIs, and responsive frontends.",
      "Algorithmic Discipline: Applying optimized data structures and problem-solving patterns.",
      "Production Rigor: Type-safe codebases, smooth micro-interactions, and fast load times.",
    ],
    metric: "Full-Cycle Developer",
  },
  architecture: {
    id: "architecture",
    label: "02. Tech Approach",
    icon: FiCpu,
    badge: "02. Architecture & Standards",
    title: "Speed, Type Safety & Concurrency",
    summary:
      "Engineering modular web systems designed for performance. Combining Next.js, React 18, and TypeScript on the client with Node.js and FastAPI services on the server.",
    points: [
      "Strict Type Safety: Comprehensive TypeScript contracts across frontend and backend boundaries.",
      "Scalable Databases: Indexed PostgreSQL and MongoDB stores with edge caching.",
      "Reliable Deployment: Containerized Docker workflows and automated CI/CD pipelines.",
    ],
    metric: "Sub-50ms APIs",
  },
  impact: {
    id: "impact",
    label: "03. Track Record",
    icon: FiLayers,
    badge: "03. Production Projects",
    title: "Proven Platforms Serving Real Needs",
    summary:
      "Developed production-grade applications with custom business logic—from dual-role reservation platforms to hyperlocal delivery and dynamic form engines.",
    points: [
      "Rent-A-Vibe: Dual-role marketplace with real-time reservation conflict prevention.",
      "KapCart: Hyperlocal delivery platform engineered for high-concurrency order placement.",
      "inFOrm & Pankaj Studio: Modern web systems with 98+ Google Lighthouse performance.",
    ],
    metric: "98+ Lighthouse",
  },
  workflow: {
    id: "workflow",
    label: "04. Philosophy",
    icon: FiActivity,
    badge: "04. Collaboration & Culture",
    title: "Velocity, Ownership & Adaptability",
    summary:
      "Proactive builder who emphasizes clear communication, self-documenting code, and shipping iterative increments that solve real user needs quickly.",
    points: [
      "Agile Delivery: Breaking complex milestones into verifiable sprint deliverables.",
      "Clean Codebase: Modular components, clean git history, and clear API documentation.",
      "Continuous Growth: Rapidly adopting modern web standards and engineering tools.",
    ],
    metric: "High Velocity",
  },
};

type PillarKey = keyof typeof aboutPillars;

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<PillarKey>("story");

  const currentPillar = aboutPillars[activeTab];

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "1.75rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "#94a3b8",
              fontSize: "0.85rem",
              letterSpacing: "3px",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            01 / ABOUT
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Who am I?
          </h2>
        </motion.div>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.65fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Column — Avatar & Metric Highlights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.0, delay: 0.0 }}
            className="about-avatar-col"
            style={{ position: "relative" }}
          >
            {/* 3D Floating Avatar in Studio Badge Circle */}
            <div
              className="about-avatar-wrapper"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "280px",
                aspectRatio: "1/1",
                margin: "0 auto",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 50% 32%, #293548 0%, #151d2a 55%, #090e17 100%)",
                border: "2px solid rgba(255, 255, 255, 0.22)",
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(255, 255, 255, 0.06), 0 0 30px rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer soft ambient halo */}
              <div
                style={{
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 60%, rgba(255, 255, 255, 0.1) 100%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
                <Image3D />
              </div>
            </div>

            {/* Stats Cards */}
            <div
              className="about-stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
                marginTop: "1.25rem",
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  className="glass-card"
                  style={{
                    padding: "1rem 0.9rem",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "rgba(15, 23, 42, 0.65)",
                    transition: "all 0.25s ease",
                  }}
                  whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.25)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#94a3b8",
                      letterSpacing: "0.5px",
                      marginTop: "0.2rem",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Info Pills */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem",
                marginTop: "1rem",
              }}
            >
              {quickInfo.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    padding: "0.55rem 0.8rem",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Interactive Narrative & Interactive Q&A Console */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Interactive Perspective Tabs */}
            <div
              style={{
                display: "flex",
                gap: "0.55rem",
                flexWrap: "wrap",
                marginBottom: "1.5rem",
              }}
            >
              {(Object.keys(aboutPillars) as PillarKey[]).map((key) => {
                const isSelected = activeTab === key;
                const pillar = aboutPillars[key];
                const IconComponent = pillar.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      padding: "0.55rem 1.15rem",
                      borderRadius: "100px",
                      border: isSelected
                        ? "1px solid #ffffff"
                        : "1px solid rgba(255, 255, 255, 0.15)",
                      background: isSelected ? "#ffffff" : "rgba(15, 23, 42, 0.75)",
                      color: isSelected ? "#0a0f18" : "#cbd5e1",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.2s ease",
                      boxShadow: isSelected
                        ? "0 4px 14px rgba(255, 255, 255, 0.2)"
                        : "none",
                    }}
                  >
                    <IconComponent size={14} color={isSelected ? "#0a0f18" : "#94a3b8"} />
                    <span>{pillar.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Pillar Card (Compact & exact) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                style={{
                  background: "#131926",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "16px",
                  padding: "1.35rem 1.65rem",
                  marginBottom: "1.25rem",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                      fontWeight: 700,
                    }}
                  >
                    {currentPillar.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "#ffffff",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "100px",
                      fontWeight: 600,
                    }}
                  >
                    {currentPillar.metric}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.15rem, 1.8vw, 1.38rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 0.5rem 0",
                    lineHeight: 1.3,
                  }}
                >
                  {currentPillar.title}
                </h3>

                <p
                  style={{
                    color: "rgba(226, 232, 240, 0.88)",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    marginBottom: "0.95rem",
                  }}
                >
                  {currentPillar.summary}
                </p>

                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.48rem",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {currentPillar.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.55rem",
                        fontSize: "0.84rem",
                        color: "rgba(226, 232, 240, 0.86)",
                        lineHeight: 1.45,
                      }}
                    >
                      <div style={{ flexShrink: 0, marginTop: "2px", color: "#22c55e" }}>
                        <FiCheckCircle size={14} />
                      </div>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons — Clean White & Frosted Glass */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={personalInfo.links.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-action-resume"
                style={{
                  padding: "0.8rem 1.6rem",
                  fontSize: "0.92rem",
                }}
              >
                <span>View Resume</span>
                <span className="btn-icon-arrow-out">
                  <FiArrowRight size={15} />
                </span>
              </a>
              <a
                href="#contact"
                className="btn-action-connect"
                style={{
                  padding: "0.8rem 1.6rem",
                  fontSize: "0.92rem",
                }}
              >
                <span className="btn-icon-wave" style={{ fontSize: "1rem" }}>👋</span>
                <span>Get in Touch</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-avatar-col {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .about-avatar-wrapper {
            max-width: 240px !important;
          }
          .about-stats-grid {
            width: 100%;
            max-width: 360px;
          }
        }
      `}</style>
    </section>
  );
}
