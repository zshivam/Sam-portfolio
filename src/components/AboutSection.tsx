"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

const stats = [
  { value: "13+", label: "GitHub Repos" },
  { value: "4+", label: "Live Projects" },
  { value: "2+", label: "Years Coding" },
  { value: "10+", label: "Tech Stacks" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--neon-cyan)",
              fontSize: "0.875rem",
              letterSpacing: "3px",
              marginBottom: "0.75rem",
            }}
          >
            01 / ABOUT
          </p>
          <h2 className="section-title">Who am I?</h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left — Avatar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "320px",
                aspectRatio: "1/1",
              }}
            >
              {/* Glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: "-4px",
                  borderRadius: "50%",
                  background: "var(--gradient-hero)",
                  zIndex: 0,
                  filter: "blur(2px)",
                }}
              />
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                width={320}
                height={320}
                style={{
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  border: "4px solid var(--bg-primary)",
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
                priority
              />
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="glass-card"
                  style={{ padding: "1rem", textAlign: "center" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      background: "var(--gradient-hero)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      letterSpacing: "1px",
                      marginTop: "0.25rem",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio & Details */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              Hey, I&apos;m{" "}
              <span
                style={{
                  background: "var(--gradient-hero)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Shivam
              </span>{" "}
              👋
            </h3>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
                fontSize: "1rem",
              }}
            >
              {personalInfo.bio}
            </p>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "2rem",
                fontSize: "1rem",
              }}
            >
              I enjoy turning complex problems into elegant, scalable solutions. From architecting
              full-stack applications to crafting pixel-perfect UIs, I thrive in the intersection
              of engineering and creativity. Always learning, always building.
            </p>

            {/* Detail items */}
            {[
              { label: "Location", value: "India 🇮🇳" },
              { label: "Email", value: personalInfo.email },
              { label: "GitHub", value: "@zshivam" },
              { label: "Status", value: "Open to Work ✅" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--neon-purple)",
                    minWidth: "80px",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    width: "1px",
                    height: "16px",
                    background: "var(--border-color)",
                  }}
                />
                <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  {item.value}
                </span>
              </div>
            ))}

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <a
                href={personalInfo.links.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-neon btn-neon-primary"
              >
                Download Resume ↓
              </a>
              <a href="#contact" className="btn-neon btn-neon-outline">
                Hire Me
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div[style] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
