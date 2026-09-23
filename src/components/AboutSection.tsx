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

// Interactive Perspectives
const aboutPillars = {
  story: {
    id: "story",
    label: "01. Story & Drive",
    icon: FiCompass,
    badge: "01. The Human Behind the Code",
    title: "Curious Problem Solver with an Obsession for Craft",
    lead: "I am a full-stack developer with strong algorithmic foundations and a passion for turning complex problems into intuitive, high-velocity digital products.",
    description:
      "My journey started with a fascination for algorithmic thinking and system optimization. Over the years, that curiosity grew into designing and launching full-scale production platforms—from multi-filter booking systems to hyperlocal high-concurrency delivery apps. I care as much about user delight, zero-CLS interfaces, and fluid micro-interactions as I do about clean database modeling and efficient REST APIs.",
    points: [
      "User-Centric Architecture: Engineering software that feels instantaneous, looks clean, and solves practical human needs.",
      "Algorithmic Precision: Applying solid data structures, optimization patterns, and logical discipline across every feature.",
      "End-to-End Ownership: Leading features from whiteboarding and database schema design through to testing and Vercel/Docker deployment.",
    ],
    metric: "End-to-End Execution",
  },
  architecture: {
    id: "architecture",
    label: "02. How I Build",
    icon: FiCpu,
    badge: "02. System Architecture & Standards",
    title: "Engineered for High Concurrency, Speed & Reliability",
    lead: "I believe speed is a core product feature. I engineer systems to respond in milliseconds and scale without friction.",
    description:
      "Modern full-stack development requires seamless cohesion between frontend dynamism and backend stability. On the client, I leverage Next.js App Router, React 18, and TypeScript for full type safety. On the server, I build modular, asynchronous REST services in Node.js and FastAPI, paired with indexed PostgreSQL or MongoDB datastores and edge caching to achieve consistent sub-50ms response times.",
    points: [
      "Type-Safe Everywhere: Strict TypeScript contracts across frontends, server actions, and API boundaries.",
      "Database Scalability: Compound indexing, relational normalization, and geospatial queries tuned for peak performance.",
      "Resilient Edge & Cloud: Deploying with CI/CD automation, edge caching headers, and containerized Docker environments.",
    ],
    metric: "Sub-50ms API Responses",
  },
  impact: {
    id: "impact",
    label: "03. Real Impact",
    icon: FiLayers,
    badge: "03. Delivered Production Value",
    title: "Real Platforms Serving Real Users with High Reliability",
    lead: "Every project in my portfolio is an engineered solution built with deliberate business logic and production rigor.",
    description:
      "Rather than cookie-cutter templates, I build platforms that solve distinctive market problems. From Rent-A-Vibe's dynamic availability scheduling and dual-role portals, to KapCart's hyperlocal grocery routing, and inFOrm's dynamic data collection engine—each application demonstrates quantifiable uptime, responsive architecture, and 98+ Google Lighthouse scores.",
    points: [
      "Rent-A-Vibe: Dual-role marketplace with real-time reservation conflict prevention and dynamic pricing algorithms.",
      "KapCart: Hyperlocal delivery architecture designed for high-concurrency order placement and live status updates.",
      "inFOrm & Pankaj Studio: Modern web systems delivering high conversion rates, accessibility compliance, and silky-smooth animations.",
    ],
    metric: "98+ Lighthouse & Production Proof",
  },
  workflow: {
    id: "workflow",
    label: "04. Work Philosophy",
    icon: FiActivity,
    badge: "04. Collaboration & Culture",
    title: "High Velocity, Clear Communication & Adaptability",
    lead: "Software development is a team sport where clear technical communication and rapid iteration lead to winning products.",
    description:
      "I bring proactive communication, clean documentation, and an adaptable mindset to every engineering team. Whether working alongside product managers, designers, or backend peers, I prioritize unblocking teammates, writing self-documenting code, and shipping iterative increments that gather real user feedback quickly.",
    points: [
      "Agile & Fast Iteration: Breaking ambitious product milestones into clean, deliverable sprints with verifiable quality.",
      "Self-Documenting Code: Clean commit histories, modular component hierarchies, and comprehensive API documentation.",
      "Continuous Learning: Actively exploring emerging web standards, cloud patterns, and developer tools to keep products modern.",
    ],
    metric: "Fast Onboarding & High Velocity",
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
          style={{ marginBottom: "3rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "#94a3b8",
              fontSize: "0.85rem",
              letterSpacing: "3px",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            01 / ABOUT
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
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
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Column — Avatar & Metric Highlights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-avatar-col"
            style={{ position: "relative" }}
          >
            {/* 3D Bouncing Character in White Circle */}
            <div
              className="about-avatar-wrapper"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "320px",
                aspectRatio: "1/1",
                margin: "0 auto",
                borderRadius: "50%",
                background: "#ffffff",
                border: "4px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 16px 45px rgba(0, 0, 0, 0.55), 0 0 35px rgba(255, 255, 255, 0.25)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                marginTop: "1.75rem",
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

            {/* Dynamic Pillar Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "#131926",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "18px",
                  padding: "1.8rem 2rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      fontWeight: 700,
                    }}
                  >
                    {currentPillar.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#ffffff",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      padding: "0.25rem 0.65rem",
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
                    fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 0.75rem 0",
                    lineHeight: 1.3,
                  }}
                >
                  {currentPillar.title}
                </h3>

                <p
                  style={{
                    color: "rgba(226, 232, 240, 0.92)",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    marginBottom: "0.85rem",
                  }}
                >
                  {currentPillar.lead}
                </p>

                <p
                  style={{
                    color: "rgba(203, 213, 225, 0.82)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                  }}
                >
                  {currentPillar.description}
                </p>

                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
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
                        gap: "0.65rem",
                        fontSize: "0.88rem",
                        color: "rgba(226, 232, 240, 0.88)",
                        lineHeight: 1.55,
                      }}
                    >
                      <div style={{ flexShrink: 0, marginTop: "2px", color: "#ffffff" }}>
                        <FiCheckCircle size={15} />
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
