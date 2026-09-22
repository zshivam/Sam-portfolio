"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/lib/data";
import { FiGithub, FiLinkedin, FiInstagram, FiExternalLink, FiCheck, FiGitBranch, FiStar, FiUsers, FiMapPin } from "react-icons/fi";

export default function SocialProfilesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="social" className="section" ref={ref} style={{ padding: "5rem 0", position: "relative" }}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--neon-cyan)", fontSize: "0.85rem", letterSpacing: "3px", marginBottom: "0.5rem" }}>
            04 / DIGITAL FOOTPRINT
          </p>
          <h2 className="section-title" style={{ fontSize: "2.4rem", marginBottom: "0.75rem" }}>
            Live Social Profiles & Hub
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "620px", margin: "0 auto", fontSize: "0.95rem" }}>
            Connect with me across GitHub, LinkedIn, and Instagram. Explore my open-source code, professional network, and creative updates.
          </p>
        </motion.div>

        {/* 3 Live Profile Cards Grid */}
        <div
          className="social-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.75rem",
            alignItems: "stretch",
          }}
        >
          {/* ─────────────────────────────────────────────────────────
             1. GITHUB LIVE PROFILE CARD
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="social-card github-card"
            style={{
              background: "rgba(13, 17, 23, 0.85)",
              border: "1px solid rgba(240, 246, 252, 0.15)",
              borderRadius: "20px",
              padding: "1.75rem",
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(240,246,252,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Glowing Brand Accent Line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)" }} />

            {/* Header: Avatar, Status & GitHub Badge */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.9rem", alignItems: "center" }}>
                <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", border: "2px solid #30363d" }}>
                  <Image src={personalInfo.avatar} alt="Shivam Sahani" fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f0f6fc", margin: 0, fontFamily: "var(--font-display)" }}>
                      Shivam Sahani
                    </h3>
                    <span style={{ color: "#38bdf8", fontSize: "0.85rem" }} title="Verified Developer">✔</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#8b949e" }}>
                    @zshivam
                  </span>
                </div>
              </div>

              {/* GitHub Octocat Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(240, 246, 252, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f0f6fc",
                }}
              >
                <FiGithub size={20} />
              </div>
            </div>

            {/* Bio */}
            <p style={{ fontSize: "0.86rem", color: "#c9d1d9", lineHeight: 1.6, marginBottom: "1.2rem", flex: 1 }}>
              Full-stack developer building scalable web applications, modern architectures, and algorithmic systems. Active open-source builder.
            </p>

            {/* Live Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem",
                padding: "0.85rem 1rem",
                background: "rgba(22, 27, 34, 0.8)",
                borderRadius: "12px",
                border: "1px solid rgba(48, 54, 61, 0.8)",
                marginBottom: "1.2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiGitBranch size={15} color="#38bdf8" />
                <span style={{ fontSize: "0.8rem", color: "#e6edf3", fontWeight: 600 }}>13+ Repositories</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#238636" }} />
                <span style={{ fontSize: "0.8rem", color: "#e6edf3", fontWeight: 600 }}>Active Commits</span>
              </div>
            </div>

            {/* Pinned Repos Preview */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.45rem" }}>
                Pinned Projects
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ background: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.3)", color: "#38bdf8", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  ★ Rent-A-Vibe
                </span>
                <span style={{ background: "rgba(168, 85, 247, 0.12)", border: "1px solid rgba(168, 85, 247, 0.3)", color: "#c084fc", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  ★ KapCart
                </span>
                <span style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  ★ InfoForm
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.2rem",
                borderRadius: "10px",
                background: "rgba(240, 246, 252, 0.08)",
                border: "1px solid rgba(240, 246, 252, 0.25)",
                color: "#f0f6fc",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#238636";
                e.currentTarget.style.borderColor = "#2ea043";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(240, 246, 252, 0.08)";
                e.currentTarget.style.borderColor = "rgba(240, 246, 252, 0.25)";
              }}
            >
              <FiGithub size={16} />
              <span>Follow @zshivam on GitHub</span>
              <FiExternalLink size={14} style={{ opacity: 0.7 }} />
            </a>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
             2. LINKEDIN LIVE PROFILE CARD
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="social-card linkedin-card"
            style={{
              background: "rgba(10, 20, 42, 0.88)",
              border: "1px solid rgba(10, 102, 194, 0.35)",
              borderRadius: "20px",
              padding: "1.75rem",
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(10,102,194,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Brand Accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#0a66c2" }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.9rem", alignItems: "center" }}>
                <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", border: "2px solid #0a66c2" }}>
                  <Image src={personalInfo.avatar} alt="Shivam Sahani" fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0, fontFamily: "var(--font-display)" }}>
                      Shivam Sahani
                    </h3>
                    <span style={{ color: "#0a66c2", fontSize: "0.85rem" }} title="LinkedIn Verified">✔</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#38bdf8" }}>
                    in/zshivam24
                  </span>
                </div>
              </div>

              {/* LinkedIn Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(10, 102, 194, 0.15)",
                  border: "1px solid rgba(10, 102, 194, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a66c2",
                }}
              >
                <FiLinkedin size={20} />
              </div>
            </div>

            {/* Headline */}
            <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "1.2rem", flex: 1 }}>
              Software Developer | Full-Stack Web Engineer | Specializing in scalable React, Next.js, Node.js, and algorithmic systems.
            </p>

            {/* Badges & Location */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
                padding: "0.85rem 1rem",
                background: "rgba(15, 28, 56, 0.75)",
                borderRadius: "12px",
                border: "1px solid rgba(10, 102, 194, 0.25)",
                marginBottom: "1.2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <FiMapPin size={14} color="#94a3b8" />
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>India (Open to Global)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <FiUsers size={14} color="#0a66c2" />
                  <span style={{ fontSize: "0.78rem", color: "#38bdf8", fontWeight: 600 }}>500+ Connections</span>
                </div>
              </div>

              {/* Open to Work Pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                <span style={{ fontSize: "0.74rem", color: "#34d399", fontWeight: 600 }}>
                  Open to Software Developer Roles
                </span>
              </div>
            </div>

            {/* Core Competencies */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.45rem" }}>
                Endorsed Skillsets
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ background: "rgba(10, 102, 194, 0.15)", border: "1px solid rgba(10, 102, 194, 0.3)", color: "#60a5fa", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  Full-Stack Architecture
                </span>
                <span style={{ background: "rgba(10, 102, 194, 0.15)", border: "1px solid rgba(10, 102, 194, 0.3)", color: "#60a5fa", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  TypeScript & React
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.2rem",
                borderRadius: "10px",
                background: "#0a66c2",
                border: "1px solid #004182",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(10, 102, 194, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#004182";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(10, 102, 194, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0a66c2";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(10, 102, 194, 0.35)";
              }}
            >
              <FiLinkedin size={16} />
              <span>Connect on LinkedIn</span>
              <FiExternalLink size={14} style={{ opacity: 0.8 }} />
            </a>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
             3. INSTAGRAM LIVE PROFILE CARD
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="social-card instagram-card"
            style={{
              background: "rgba(26, 12, 34, 0.88)",
              border: "1px solid rgba(225, 48, 108, 0.35)",
              borderRadius: "20px",
              padding: "1.75rem",
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(225,48,108,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Brand Sunset Gradient Accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }} />

            {/* Header with Story Ring */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.9rem", alignItems: "center" }}>
                {/* Story Gradient Ring */}
                <div
                  style={{
                    padding: "2.5px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    boxShadow: "0 0 14px rgba(225, 48, 108, 0.4)",
                  }}
                >
                  <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", border: "2px solid #1a0c22" }}>
                    <Image src={personalInfo.avatar} alt="Shivam Sahani" fill style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0, fontFamily: "var(--font-display)" }}>
                      Shivam Sahani
                    </h3>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#f43f5e" }}>
                    @hishivam.in
                  </span>
                </div>
              </div>

              {/* Instagram Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(225, 48, 108, 0.15)",
                  border: "1px solid rgba(225, 48, 108, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f43f5e",
                }}
              >
                <FiInstagram size={20} />
              </div>
            </div>

            {/* Bio */}
            <p style={{ fontSize: "0.86rem", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "1.2rem", flex: 1 }}>
              Software Developer & Creative Tech Explorer. Crafting dynamic web experiences, aesthetic interfaces, and behind-the-scenes builds.
            </p>

            {/* Visual Feed Preview Gallery (3 Mini Showcase Tiles) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.5rem",
                marginBottom: "1.2rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Image src="/projects/rent-a-vibe.jpg" alt="Feed 1" fill style={{ objectFit: "cover" }} />
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Image src="/projects/pankaj-studio.jpg" alt="Feed 2" fill style={{ objectFit: "cover" }} />
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Image src="/projects/info-form.jpg" alt="Feed 3" fill style={{ objectFit: "cover" }} />
              </div>
            </div>

            {/* Category / Vibe Pills */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.45rem" }}>
                Highlights & Content
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ background: "rgba(225, 48, 108, 0.15)", border: "1px solid rgba(225, 48, 108, 0.3)", color: "#fb7185", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  ⚡ Tech Setups
                </span>
                <span style={{ background: "rgba(225, 48, 108, 0.15)", border: "1px solid rgba(225, 48, 108, 0.3)", color: "#fb7185", padding: "0.2rem 0.55rem", borderRadius: "6px", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                  🚀 Web Builds
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={personalInfo.links.instagram}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.2rem",
                borderRadius: "10px",
                background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(225, 48, 108, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.15)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(225, 48, 108, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(225, 48, 108, 0.35)";
              }}
            >
              <FiInstagram size={16} />
              <span>Follow @hishivam.in on Instagram</span>
              <FiExternalLink size={14} style={{ opacity: 0.8 }} />
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .social-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 580px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
