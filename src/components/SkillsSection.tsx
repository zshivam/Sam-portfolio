"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/data";

const categories = ["all", "frontend", "backend", "language", "database", "devops", "tools", "design", "mobile"];

const categoryLabels: Record<string, string> = {
  all: "All Skills",
  frontend: "Frontend",
  backend: "Backend",
  language: "Languages",
  database: "Database",
  devops: "DevOps",
  tools: "Tools",
  design: "Design",
  mobile: "Mobile",
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
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section id="skills" className="section" ref={ref} style={{ background: "rgba(6,182,212,0.01)" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--neon-cyan)", fontSize: "0.875rem", letterSpacing: "3px", marginBottom: "0.75rem" }}>
            02 / SKILLS
          </p>
          <h2 className="section-title">My Tech Arsenal</h2>
          <p className="section-subtitle">
            Every key on the keyboard above represents a skill I&apos;ve mastered. Browse by category below.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                cursor: "pointer",
                border: "1px solid",
                transition: "all 0.2s ease",
                background: activeCategory === cat ? "var(--neon-purple)" : "transparent",
                borderColor: activeCategory === cat ? "var(--neon-purple)" : "rgba(168,85,247,0.3)",
                color: activeCategory === cat ? "white" : "var(--text-secondary)",
                boxShadow: activeCategory === cat ? "0 0 15px rgba(168,85,247,0.4)" : "none",
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.label}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="glass-card"
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "default",
                  borderColor: `${skill.color}30`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                  }}
                />

                {/* Color dot */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${skill.color}20`,
                    border: `1px solid ${skill.color}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: skill.color,
                      boxShadow: `0 0 8px ${skill.color}`,
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    textAlign: "center",
                  }}
                >
                  {skill.label}
                </span>

                {/* Category tag */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: categoryColors[skill.category] || "var(--text-muted)",
                    background: `${categoryColors[skill.category] || "#888"}15`,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "100px",
                  }}
                >
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
