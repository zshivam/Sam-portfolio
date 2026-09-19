"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/lib/data";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="section grid-pattern" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--neon-cyan)", fontSize: "0.875rem", letterSpacing: "3px", marginBottom: "0.75rem" }}>
            03 / PROJECTS
          </p>
          <h2 className="section-title">What I&apos;ve Built</h2>
          <p className="section-subtitle">
            A selection of projects from my GitHub — built with care, shipped with purpose.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="glass-card"
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Card top gradient bar */}
              <div
                style={{
                  height: "4px",
                  background: `linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))`,
                  backgroundImage: `linear-gradient(90deg, ${
                    project.gradient.includes("purple") ? "#a855f7" : "#06b6d4"
                  }, ${
                    project.gradient.includes("cyan") ? "#06b6d4" : "#a855f7"
                  })`,
                }}
              />

              {/* Card header */}
              <div
                style={{
                  padding: "1.75rem 1.75rem 0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    filter: "drop-shadow(0 0 12px rgba(168,85,247,0.4))",
                  }}
                >
                  {project.icon}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      style={{
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0.4rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(168,85,247,0.2)",
                        background: "rgba(168,85,247,0.05)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--neon-purple)";
                        e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)";
                      }}
                    >
                      <FiGithub size={16} />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Demo"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      style={{
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0.4rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(6,182,212,0.2)",
                        background: "rgba(6,182,212,0.05)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--neon-cyan)";
                        e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.borderColor = "rgba(6,182,212,0.2)";
                      }}
                    >
                      <FiExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Card content */}
              <div style={{ padding: "1.25rem 1.75rem 1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <a
            href="https://github.com/zshivam"
            target="_blank"
            rel="noreferrer"
            className="btn-neon btn-neon-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FiGithub size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
