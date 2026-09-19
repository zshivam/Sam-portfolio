"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "@/lib/data";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";

const Keyboard3D = dynamic(() => import("@/components/3d/Keyboard3D"), {
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
        fontSize: "0.875rem",
      }}
    >
      Loading 3D scene...
    </div>
  ),
});

const socialLinks = [
  { icon: FiGithub, href: personalInfo.links.github, label: "GitHub" },
  { icon: FiLinkedin, href: personalInfo.links.linkedin, label: "LinkedIn" },
  { icon: FiTwitter, href: personalInfo.links.twitter, label: "Twitter" },
  { icon: FiInstagram, href: personalInfo.links.instagram, label: "Instagram" },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="section grid-pattern"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid content layout */}
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          minHeight: "85vh",
        }}
      >
        {/* Left — Text content */}
        <div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.4rem 1rem",
              borderRadius: "100px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              marginBottom: "1.5rem",
            }}
          >
            <span className="glow-dot" style={{ background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "#10b981",
              }}
            >
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "0.75rem",
              color: "var(--text-primary)",
            }}
          >
            {personalInfo.name.split(" ").map((word, i) => (
              <span
                key={i}
                style={
                  i === 1
                    ? {
                        background: "var(--gradient-hero)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}
                }
              >
                {word}{i < personalInfo.name.split(" ").length - 1 ? " " : ""}
              </span>
            ))}
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "var(--neon-cyan)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "var(--neon-purple)" }}>&gt;</span>
            <TypeAnimation
              sequence={[
                "Software Developer",
                2000,
                "Full-Stack Engineer",
                2000,
                "Problem Solver",
                2000,
                "Open Source Builder",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "500px",
              marginBottom: "2rem",
            }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
          >
            <a href="#projects" className="btn-neon btn-neon-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-neon btn-neon-outline">
              Get In Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  border: "1px solid rgba(168,85,247,0.25)",
                  background: "rgba(168,85,247,0.05)",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--neon-cyan)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.05)";
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Keyboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          style={{
            height: "420px",
            position: "relative",
          }}
        >
          {/* Glow backdrop */}
          <div
            style={{
              position: "absolute",
              inset: "-20%",
              background:
                "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
            <Keyboard3D />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "2px" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(var(--neon-purple), transparent)",
          }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          #hero .container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #hero .container > div:last-child {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
