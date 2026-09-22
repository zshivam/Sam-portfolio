"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiRotateCcw } from "react-icons/fi";

interface PassionItem {
  id: string;
  emoji: string;
  title: string;
  category: "Creative" | "Sports & Fitness" | "Mind & Growth" | "Work Strengths" | "Hobbies";
  description: string;
  tag: string;
  initialRotate: number;
}

const passionItems: PassionItem[] = [
  {
    id: "gaming",
    emoji: "🎮",
    title: "Gaming",
    category: "Hobbies",
    description: "Fast reflexes, strategic coordination & high-stakes clutch teamwork.",
    tag: "Reflexes & Strategy",
    initialRotate: -2,
  },
  {
    id: "cricket",
    emoji: "🏏",
    title: "Cricket",
    category: "Sports & Fitness",
    description: "Calculated pacing, tactical positioning & high-pressure focus.",
    tag: "Tactics & Team Spirit",
    initialRotate: 3,
  },
  {
    id: "fitness",
    emoji: "💪",
    title: "Fitness & Gym",
    category: "Sports & Fitness",
    description: "Progressive overload, discipline, grit & physical endurance.",
    tag: "Discipline & Health",
    initialRotate: -1.5,
  },
  {
    id: "video-editing",
    emoji: "🎬",
    title: "Video Editing",
    category: "Creative",
    description: "Frame-by-frame pacing, rhythm, visual storytelling & cinematic sound design.",
    tag: "Pacing & Story",
    initialRotate: 2.5,
  },
  {
    id: "chess",
    emoji: "♟️",
    title: "Chess",
    category: "Mind & Growth",
    description: "Deep positional calculation, anticipating counter-moves & mental patience.",
    tag: "Foresight & Logic",
    initialRotate: -3,
  },
  {
    id: "photography",
    emoji: "📸",
    title: "Photography",
    category: "Creative",
    description: "Light composition, perspective framing & capturing candid human emotion.",
    tag: "Light & Perspective",
    initialRotate: 1.5,
  },
  {
    id: "football",
    emoji: "⚽",
    title: "Football",
    category: "Sports & Fitness",
    description: "Non-stop agility, field vision & real-time adaptive team synergy.",
    tag: "Agility & Synergy",
    initialRotate: -2.5,
  },
  {
    id: "music",
    emoji: "🎵",
    title: "Music & Beats",
    category: "Creative",
    description: "Acoustic exploration, flow state frequency & deep auditory immersion.",
    tag: "Flow & Rhythm",
    initialRotate: 3.5,
  },
  {
    id: "bike-riding",
    emoji: "🏍️",
    title: "Bike Riding",
    category: "Hobbies",
    description: "Open highway throttles, raw adrenaline & clearing the mental cache.",
    tag: "Freedom & Adrenaline",
    initialRotate: -1,
  },
  {
    id: "dancing",
    emoji: "🕺",
    title: "Dancing",
    category: "Creative",
    description: "Rhythm intuition, self-expression & positive energetic flow.",
    tag: "Energy & Groove",
    initialRotate: 2,
  },
  {
    id: "reading",
    emoji: "📚",
    title: "Reading",
    category: "Mind & Growth",
    description: "Mental models, tech history, philosophy & continuous perspective broadening.",
    tag: "Curiosity & Wisdom",
    initialRotate: -2,
  },
  {
    id: "sketching",
    emoji: "🎨",
    title: "Sketching",
    category: "Creative",
    description: "Visual thinking, translating raw thoughts into pencil outlines & spatial balance.",
    tag: "Spatial Ideation",
    initialRotate: 1,
  },
  {
    id: "singing",
    emoji: "🎤",
    title: "Singing",
    category: "Creative",
    description: "Pitch balance, vocal warmth & unwinding with acoustic melodies.",
    tag: "Voice & Melody",
    initialRotate: -3.5,
  },
  {
    id: "problem-solving",
    emoji: "🧩",
    title: "First-Principles Thinking",
    category: "Work Strengths",
    description: "Deconstructing ambiguity into foundational truths to solve root bottlenecks.",
    tag: "Ability of Work",
    initialRotate: 2.5,
  },
  {
    id: "fast-learner",
    emoji: "⚡",
    title: "Rapid Learning Curve",
    category: "Work Strengths",
    description: "Absorbing unfamiliar domains in record time and delivering production value.",
    tag: "Adaptability",
    initialRotate: -1.5,
  },
  {
    id: "leadership",
    emoji: "🤝",
    title: "Team Collaboration & Ownership",
    category: "Work Strengths",
    description: "Empathy, unblocking teammates, clear communication & taking end-to-end accountability.",
    tag: "Ownership",
    initialRotate: 3,
  },
];

const categoryPillColors: Record<PassionItem["category"], string> = {
  "Creative": "rgba(236, 72, 153, 0.15)",
  "Sports & Fitness": "rgba(59, 130, 246, 0.15)",
  "Mind & Growth": "rgba(168, 85, 247, 0.15)",
  "Work Strengths": "rgba(255, 255, 255, 0.15)",
  "Hobbies": "rgba(245, 158, 11, 0.15)",
};

const categoryTextColors: Record<PassionItem["category"], string> = {
  "Creative": "#f472b6",
  "Sports & Fitness": "#60a5fa",
  "Mind & Growth": "#c084fc",
  "Work Strengths": "#f1f5f9",
  "Hobbies": "#fbbf24",
};

export default function BeyondCodeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <section
      id="beyond-code"
      className="section"
      ref={ref}
      style={{
        position: "relative",
        padding: "3.5rem 0 3rem 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "1.75rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
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
                04 / BEYOND THE CODE
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                  margin: 0,
                }}
              >
                The Human Side &amp; Passions
              </h2>
            </div>

            {/* Reset Positions Action */}
            <button
              onClick={handleReset}
              title="Reset tiles to original positions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                color: "#cbd5e1",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#0a0f18";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.color = "#cbd5e1";
                e.currentTarget.style.transform = "none";
              }}
            >
              <FiRotateCcw size={14} />
              <span>Reset Positions</span>
            </button>
          </div>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
              maxWidth: "680px",
              marginTop: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            Engineering is driven by curiosity, balance, and lived experience. These are the hobbies, creative pursuits, sports, and core work abilities that shape how I think and build.
          </p>
        </motion.div>

        {/* ── DRAGGABLE PLAYGROUND BOUNDARY ── */}
        <div
          ref={containerRef}
          key={resetKey}
          style={{
            position: "relative",
            minHeight: "340px",
            borderRadius: "20px",
            background: "radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.03) 0%, rgba(6, 10, 20, 0.4) 100%)",
            border: "1px dashed rgba(255, 255, 255, 0.15)",
            padding: "1.75rem 1.5rem",
            overflow: "hidden",
            boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Subtle background playground grid dots */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
              opacity: 0.5,
            }}
          />

          {/* Unordered / Non-sequenced organic short tiles layout */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 2,
              padding: "1rem 0",
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            {passionItems.map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.15}
                  dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    rotate: item.initialRotate,
                    y: 15,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          scale: 1,
                          rotate: item.initialRotate,
                          y: 0,
                        }
                      : { opacity: 0, scale: 0.85, y: 15 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.04 * (index % 10),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 20,
                    boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.4)",
                    transition: { duration: 0.15 },
                  }}
                  whileDrag={{
                    scale: 1.18,
                    rotate: 0,
                    zIndex: 100,
                    cursor: "grabbing",
                    boxShadow: "0 18px 35px rgba(0, 0, 0, 0.65), 0 0 0 2px rgba(255, 255, 255, 0.8)",
                  }}
                  style={{
                    cursor: "grab",
                    background: "rgba(15, 23, 42, 0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    borderRadius: "100px",
                    padding: "0.6rem 1.25rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.35)",
                    userSelect: "none",
                    touchAction: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.25rem",
                      display: "inline-flex",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                  >
                    {item.emoji}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      letterSpacing: "0.2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
