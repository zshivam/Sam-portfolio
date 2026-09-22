"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/lib/data";
import {
  FiGithub,
  FiExternalLink,
  FiEye,
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiCheckCircle,
  FiLayers,
} from "react-icons/fi";

const projectUrls: Record<string, string> = {
  "Rent-A-Vibe": "rentavibe.app",
  "KapCart": "kapcart.store",
  "Pankaj Studio": "pankajstudio.in",
  "InfoForm": "info-form-my-app.vercel.app",
  "sam-portfolio": "sam-portfolio.vercel.app",
};

export default function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [previewProject, setPreviewProject] = useState<typeof projects[0] | null>(null);

  // Close modal on Escape, navigate on Arrow keys
  useEffect(() => {
    if (!previewProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProject(null);
      if (e.key === "ArrowRight") {
        const currIdx = projects.findIndex((p) => p.id === previewProject.id);
        setPreviewProject(projects[(currIdx + 1) % projects.length]);
      }
      if (e.key === "ArrowLeft") {
        const currIdx = projects.findIndex((p) => p.id === previewProject.id);
        setPreviewProject(projects[(currIdx - 1 + projects.length) % projects.length]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewProject]);

  return (
    <section id="projects" className="section grid-pattern" ref={ref} style={{ padding: "4.5rem 0 3rem 0", position: "relative" }}>
      <div className="container">
        {/* Header — Real-World Results eyebrow and headline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.4rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "#94a3b8",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Real-World Results
            </p>
          </div>
          <h2 className="section-title" style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
            Featured Projects
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "580px", fontSize: "0.92rem" }}>
            See how I solve real-world problems into engaging, scalable digital experiences.
          </p>
        </motion.div>

        {/* Vertical Reel Stacking Projects Container */}
        <div
          className="projects-vertical-stack"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3.75rem",
            position: "relative",
            maxWidth: "1100px",
            width: "100%",
            margin: "0 auto",
            paddingBottom: "1.5rem",
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${idx}`}
              className="sticky-project-wrapper"
              style={{
                position: "sticky",
                top: `calc(80px + ${idx * 30}px)`,
                zIndex: idx + 1,
                width: "100%",
              }}
            >
              <div
                className="project-showcase-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.05fr 1fr",
                  borderRadius: "28px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "#131926",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 -10px 30px rgba(0, 0, 0, 0.6), 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(168, 85, 247, 0.08)",
                  minHeight: "440px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Left Column: Project Title, Divider, Bullets, White Action Buttons */}
                <div
                  className="project-card-left"
                  style={{
                    padding: "3rem 2.75rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Project Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        letterSpacing: "-0.5px",
                        lineHeight: 1.18,
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Horizontal Divider */}
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                        margin: "1.4rem 0 1.6rem 0",
                      }}
                    />

                    {/* Checklist (Bullet points with circular check icon) */}
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {project.features.slice(0, 4).map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.85rem",
                          }}
                        >
                          <div
                            style={{
                              flexShrink: 0,
                              marginTop: "2px",
                              color: "rgba(255, 255, 255, 0.85)",
                            }}
                          >
                            <FiCheckCircle size={18} />
                          </div>
                          <span
                            style={{
                              fontSize: "0.95rem",
                              color: "rgba(226, 232, 240, 0.92)",
                              lineHeight: 1.5,
                              fontWeight: 400,
                            }}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Actions Row: Live Demo, Code, Dossier */}
                  <div
                    className="project-actions-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.9rem",
                      flexWrap: "wrap",
                      marginTop: "2.2rem",
                    }}
                  >
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action-live"
                        style={{
                          padding: "0.72rem 1.5rem",
                          fontSize: "0.92rem",
                        }}
                      >
                        <span>Live Demo</span>
                        <span className="btn-icon-launch">
                          <FiExternalLink size={15} />
                        </span>
                      </a>
                    ) : (
                      <button
                        disabled
                        style={{
                          background: "rgba(255, 255, 255, 0.12)",
                          color: "rgba(255, 255, 255, 0.5)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          padding: "0.72rem 1.4rem",
                          borderRadius: "14px",
                          fontFamily: "var(--font-display)",
                          fontSize: "0.88rem",
                          fontWeight: 500,
                          cursor: "not-allowed",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <span>Live Demo</span>
                        <FiExternalLink size={14} />
                      </button>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action-code"
                        style={{
                          padding: "0.72rem 1.5rem",
                          fontSize: "0.92rem",
                        }}
                      >
                        <span>Code</span>
                        <span className="btn-icon-github">
                          <FiGithub size={16} />
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Inset Floating Home Page Preview Card */}
                <div
                  className="project-card-right"
                  style={{
                    padding: "2rem 2rem 2rem 1rem",
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                  }}
                >
                  <div
                    onClick={() => setPreviewProject(project)}
                    className="preview-floating-panel"
                    style={{
                      position: "relative",
                      width: "100%",
                      minHeight: "380px",
                      borderRadius: "22px",
                      overflow: "hidden",
                      background: "radial-gradient(ellipse at center, rgba(30, 41, 59, 0.45) 0%, rgba(10, 15, 26, 0.98) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.55)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Top App Chrome Bar */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.65rem 1.1rem",
                        background: "rgba(15, 23, 42, 0.8)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(8px)",
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.4)" }} />
                        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)" }} />
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "rgba(226, 232, 240, 0.8)",
                          background: "rgba(255, 255, 255, 0.06)",
                          padding: "0.18rem 0.75rem",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.68rem" }}>🔒</span>
                        <span>https://{projectUrls[project.title] || "preview.app"}</span>
                      </div>
                      <span style={{ fontSize: "0.85rem" }}>{project.icon}</span>
                    </div>

                    {/* Centered Minimized Screenshot Viewport (100% Fully Visible, No Blur on Hover) */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        flex: 1,
                        minHeight: "260px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.85rem 1rem",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          minHeight: "240px",
                          borderRadius: "14px",
                          overflow: "hidden",
                          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                          background: "#080c16",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={`${project.title} Preview`}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 960px) 100vw, 550px"
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                          className="project-showcase-img"
                        />
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div
                      style={{
                        padding: "0.55rem 1.1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(11, 17, 30, 0.8)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(226, 232, 240, 0.7)" }}>
                        {project.category || "Full-Stack Project"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "#cbd5e1",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Click to Enlarge</span>
                        <FiMaximize2 size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            View All Repositories on GitHub
          </a>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         INTERACTIVE FULLSCREEN PROJECT PREVIEW & DOSSIER MODAL
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPreviewProject(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(3, 7, 18, 0.88)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-window"
              style={{
                width: "100%",
                maxWidth: "1120px",
                maxHeight: "92vh",
                background: "rgba(11, 17, 34, 0.98)",
                border: "1px solid rgba(168, 85, 247, 0.45)",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 30px 80px rgba(0,0,0,0.85), 0 0 45px rgba(168,85,247,0.25)",
              }}
            >
              {/* Modal Window Browser Top Bar */}
              <div
                style={{
                  padding: "0.8rem 1.4rem",
                  background: "rgba(8, 12, 24, 0.98)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexShrink: 0,
                }}
              >
                {/* Left: Window Dots & Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                    <button
                      onClick={() => setPreviewProject(null)}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.4)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      title="Close"
                    />
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)" }} />
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)" }} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: "1.2rem" }}>{previewProject.icon}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "#ffffff" }}>
                      {previewProject.title}
                    </span>
                    <span
                      className="modal-url-pill"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.74rem",
                        color: "#cbd5e1",
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        padding: "0.2rem 0.65rem",
                        borderRadius: "6px",
                      }}
                    >
                      https://{projectUrls[previewProject.title] || "github.com"}
                    </span>
                  </div>
                </div>

                {/* Right: Controls & Close */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    onClick={() => {
                      const currIdx = projects.findIndex((p) => p.id === previewProject.id);
                      setPreviewProject(projects[(currIdx - 1 + projects.length) % projects.length]);
                    }}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "var(--text-secondary)",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      cursor: "pointer",
                      display: "flex",
                      transition: "all 0.2s ease",
                    }}
                    title="Previous Project (Left Arrow)"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => {
                      const currIdx = projects.findIndex((p) => p.id === previewProject.id);
                      setPreviewProject(projects[(currIdx + 1) % projects.length]);
                    }}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "var(--text-secondary)",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      cursor: "pointer",
                      display: "flex",
                      transition: "all 0.2s ease",
                    }}
                    title="Next Project (Right Arrow)"
                  >
                    <FiChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setPreviewProject(null)}
                    style={{
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.35)",
                      color: "#f87171",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      cursor: "pointer",
                      display: "flex",
                      marginLeft: "0.4rem",
                      transition: "all 0.2s ease",
                    }}
                    title="Close (Esc)"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Body */}
              <div
                className="modal-scroll-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1.5rem 1.75rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.75rem",
                }}
              >
                {/* 1. Large High-Res UI Preview Mockup */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background: "#060914",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  {previewProject.image && (
                    <Image
                      src={previewProject.image}
                      alt={previewProject.title}
                      fill
                      priority
                      sizes="(max-width: 1200px) 100vw, 1100px"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  )}

                  {/* Corner Badges on Image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      left: "14px",
                      display: "flex",
                      gap: "0.6rem",
                      flexWrap: "wrap",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(10, 15, 30, 0.90)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(6, 182, 212, 0.4)",
                        color: "var(--neon-cyan)",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      {previewProject.category}
                    </span>
                    <span
                      style={{
                        background: "rgba(15, 23, 42, 0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        color: "#f1f5f9",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      ● {previewProject.status}
                    </span>
                  </div>
                </div>

                {/* 2. Comprehensive Project Overview & Mission */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid rgba(168, 85, 247, 0.25)",
                    borderRadius: "14px",
                    padding: "1.4rem 1.6rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ color: "var(--neon-cyan)", fontSize: "1.1rem" }}>✦</span>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                        Project Overview & Architecture Mission
                      </h4>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "#cbd5e1",
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        padding: "0.25rem 0.7rem",
                        borderRadius: "6px",
                      }}
                    >
                      Role: {previewProject.role}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.75, margin: 0 }}>
                    {previewProject.longDescription}
                  </p>
                </div>

                {/* 3. Key Features & Engineering Highlights */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "var(--neon-purple)" }}>⚡</span>
                    <span>Core Features & Implementation Capabilities</span>
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {previewProject.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(15, 23, 42, 0.65)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "10px",
                          padding: "0.85rem 1rem",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.65rem",
                        }}
                      >
                        <span style={{ color: "#ffffff", fontSize: "0.95rem", flexShrink: 0, marginTop: "2px" }}>✔</span>
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.55 }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Full-Stack System Architecture Layers */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "var(--neon-cyan)" }}>⚙</span>
                    <span>System Architecture & Stack Breakdown</span>
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                      gap: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(10, 16, 32, 0.8)",
                        border: "1px solid rgba(97, 218, 251, 0.25)",
                        borderRadius: "10px",
                        padding: "0.9rem 1.1rem",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#61dafb", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.35rem" }}>
                        Frontend Layer
                      </span>
                      <p style={{ color: "#e2e8f0", fontSize: "0.84rem", margin: 0, lineHeight: 1.5 }}>
                        {previewProject.architecture.frontend}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "rgba(10, 16, 32, 0.8)",
                        border: "1px solid rgba(168, 85, 247, 0.25)",
                        borderRadius: "10px",
                        padding: "0.9rem 1.1rem",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#c084fc", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.35rem" }}>
                        Backend Engine
                      </span>
                      <p style={{ color: "#e2e8f0", fontSize: "0.84rem", margin: 0, lineHeight: 1.5 }}>
                        {previewProject.architecture.backend}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "rgba(10, 16, 32, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "10px",
                        padding: "0.9rem 1.1rem",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.35rem" }}>
                        Database & Data
                      </span>
                      <p style={{ color: "#e2e8f0", fontSize: "0.84rem", margin: 0, lineHeight: 1.5 }}>
                        {previewProject.architecture.database}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "rgba(10, 16, 32, 0.8)",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                        borderRadius: "10px",
                        padding: "0.9rem 1.1rem",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.35rem" }}>
                        Infrastructure & Host
                      </span>
                      <p style={{ color: "#e2e8f0", fontSize: "0.84rem", margin: 0, lineHeight: 1.5 }}>
                        {previewProject.architecture.deployment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Complete Tech Stack Pills */}
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.5rem" }}>
                    Verified Tech Arsenal:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {previewProject.tech.map((t) => (
                      <span key={t} className="skill-tag" style={{ fontSize: "0.75rem", padding: "0.25rem 0.7rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer / Action Bar */}
              <div
                className="modal-footer"
                style={{
                  padding: "1rem 1.75rem",
                  background: "rgba(8, 12, 24, 0.98)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
                  <span>Tip: Use [←] and [→] arrow keys to cycle through projects</span>
                </div>

                <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
                  {previewProject.github && (
                    <a
                      href={previewProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-action-code"
                      style={{
                        padding: "0.55rem 1.25rem",
                        fontSize: "0.84rem",
                      }}
                    >
                      <span className="btn-icon-github">
                        <FiGithub size={15} />
                      </span>
                      <span>View GitHub Repo</span>
                    </a>
                  )}
                  {previewProject.live && (
                    <a
                      href={previewProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-action-live"
                      style={{
                        padding: "0.55rem 1.25rem",
                        fontSize: "0.84rem",
                      }}
                    >
                      <span>Launch Live Website</span>
                      <span className="btn-icon-launch">
                        <FiExternalLink size={15} />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .projects-vertical-stack {
          position: relative;
        }
        .sticky-project-wrapper {
          transition: transform 0.25s ease;
        }
        .project-showcase-img {
          transition: transform 0.35s ease;
        }
        .project-showcase-card:hover .project-showcase-img {
          transform: scale(1.02);
        }
        @media (max-width: 960px) {
          .project-showcase-card {
            grid-template-columns: 1fr !important;
          }
          .sticky-project-wrapper {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 2rem !important;
          }
          .projects-vertical-stack {
            gap: 2rem !important;
          }
          .project-card-left {
            padding: 2.25rem 2rem !important;
          }
          .project-card-right {
            padding: 0 2rem 2.25rem 2rem !important;
          }
          .preview-floating-panel {
            min-height: 280px !important;
          }
        }
        @media (max-width: 640px) {
          .project-card-left {
            padding: 1.75rem 1.4rem !important;
          }
          .project-card-right {
            padding: 0 1.4rem 1.75rem 1.4rem !important;
          }
          .preview-floating-panel {
            min-height: 220px !important;
            border-radius: 16px !important;
          }
          .project-actions-row {
            gap: 0.6rem !important;
          }
          .project-actions-row a, .project-actions-row button {
            padding: 0.6rem 1.1rem !important;
            font-size: 0.84rem !important;
          }
          .modal-window {
            max-height: 94vh !important;
            border-radius: 14px !important;
          }
          .modal-url-pill {
            display: none !important;
          }
          .modal-footer {
            padding: 1rem !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </section>
  );
}
