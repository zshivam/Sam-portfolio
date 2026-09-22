"use client";
import { personalInfo } from "@/lib/data";
import {
  SiGithub,
  SiInstagram,
  SiX,
  SiGmail,
  SiThreads,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

const socialLinks = [
  {
    name: "GitHub",
    icon: SiGithub,
    url: personalInfo.links.github,
    className: "social-github",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: personalInfo.links.linkedin,
    className: "social-linkedin",
  },
  {
    name: "X (Twitter)",
    icon: SiX,
    url: personalInfo.links.twitter,
    className: "social-twitter",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    url: personalInfo.links.instagram,
    className: "social-instagram",
  },
  {
    name: "Gmail",
    icon: SiGmail,
    url: `mailto:${personalInfo.email}`,
    className: "social-gmail",
  },
  {
    name: "Threads",
    icon: SiThreads,
    url: "https://www.threads.net/@hishivam.in",
    className: "social-threads",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        padding: "3rem 1.5rem 2.5rem",
        background: "rgba(6, 10, 20, 0.95)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="container footer-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.75rem",
        }}
      >
        {/* Top: Logo & Professional Title */}
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.2rem",
              color: "#ffffff",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            &lt;Sam /&gt;
          </span>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginTop: "0.25rem",
              margin: 0,
            }}
          >
            Shivam Sahani • Full-Stack Software Developer
          </p>
        </div>

        {/* Center: Social Media App Logos (JUST Logos with tailored platform hovers) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.85rem",
            flexWrap: "wrap",
          }}
        >
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                title={item.name}
                aria-label={item.name}
                className={`social-tile-btn ${item.className}`}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Bottom: Copyright & Attribution */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            width: "100%",
            maxWidth: "600px",
            paddingTop: "1.25rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.76rem",
              color: "#64748b",
              margin: 0,
            }}
          >
            © {year} Shivam Sahani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
