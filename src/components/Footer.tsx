"use client";
import { personalInfo } from "@/lib/data";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(168,85,247,0.15)",
        padding: "2.5rem 1.5rem",
        background: "rgba(6,182,212,0.01)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            background: "var(--gradient-hero)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 700,
          }}
        >
          &lt;Sam /&gt;
        </span>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          © {year} {personalInfo.name} — Built with Next.js + Three.js
        </p>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { icon: FiGithub, href: personalInfo.links.github },
            { icon: FiLinkedin, href: personalInfo.links.linkedin },
            { icon: FiTwitter, href: personalInfo.links.twitter },
            { icon: FiInstagram, href: personalInfo.links.instagram },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s ease",
                display: "flex",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--neon-cyan)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
