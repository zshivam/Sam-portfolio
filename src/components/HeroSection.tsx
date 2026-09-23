"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";


export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "100px 1.5rem 60px 1.5rem",
      }}
    >
      {/* Centered Hero Content */}
      <div
        className="container hero-centered-container"
        style={{
          maxWidth: "860px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.45rem 1.15rem",
            borderRadius: "100px",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 0 24px rgba(0, 0, 0, 0.6)",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ position: "relative", display: "flex", width: "8px", height: "8px" }}>
            <span
              className="animate-ping"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "#22c55e",
                opacity: 0.75,
              }}
            />
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "50%",
                width: "8px",
                height: "8px",
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "0.5px",
            }}
          >
            Available for Software Developer Roles
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "1rem",
            color: "#ffffff",
            letterSpacing: "-0.5px",
            textShadow: "0 4px 30px rgba(0,0,0,0.8)",
          }}
        >
          Hi, I&apos;m <span style={{ color: "#ffffff" }}>Shivam</span> 👋
          <br />
          <span
            style={{
              fontSize: "clamp(1.35rem, 2.8vw, 2.2rem)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
              marginTop: "0.35rem",
              lineHeight: 1.25,
            }}
          >
            Full-Stack Software Developer
          </span>
        </motion.h1>

        {/* Punchy Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.12rem)",
            color: "#94a3b8",
            lineHeight: 1.68,
            marginBottom: "1.4rem",
            maxWidth: "620px",
            margin: "0 auto 1.4rem auto",
            textShadow: "0 2px 14px rgba(0,0,0,0.8)",
          }}
        >
          Specializing in React, Next.js, Node.js, and Python. Building fast, secure, and production-ready applications with clean architecture and real user value.
        </motion.p>

        {/* Animated role ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.88rem, 1.5vw, 1.02rem)",
            color: "#cbd5e1",
            marginBottom: "2rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.4rem 1.1rem",
            borderRadius: "100px",
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ color: "#22c55e" }}>&gt;</span>
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "MERN & Next.js Specialist",
              2000,
              "Python & Backend Engineer",
              2000,
              "Creative Problem Solving",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "0.5rem",
          }}
        >
          <a
            href="#projects"
            className="btn-action-explore"
            style={{
              padding: "0.85rem 1.75rem",
              fontSize: "0.95rem",
            }}
          >
            <span>Explore My Work</span>
            <span className="btn-icon-down">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            className="btn-action-connect"
            style={{
              padding: "0.85rem 1.75rem",
              fontSize: "0.95rem",
            }}
          >
            <span className="btn-icon-wave" style={{ fontSize: "1.1rem" }}>👋</span>
            <span>Let&apos;s Connect</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "2px" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(var(--neon-purple), transparent)",
          }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 600px) {
          #hero {
            padding-top: 85px !important;
            padding-bottom: 50px !important;
          }
        }
      `}</style>
    </section>
  );
}
