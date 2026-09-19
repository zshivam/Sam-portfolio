"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 1.5rem",
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(2, 4, 8, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(168,85,247,0.15)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            fontWeight: 700,
            textDecoration: "none",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              background: "var(--gradient-hero)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            &lt;Sam /&gt;
          </span>
        </motion.a>

        {/* Desktop Links */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActive(link.href)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color:
                    active === link.href
                      ? "var(--neon-cyan)"
                      : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  position: "relative",
                  paddingBottom: "2px",
                }}
                className="nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <a
          href={personalInfo.links.resume}
          target="_blank"
          rel="noreferrer"
          className="btn-neon btn-neon-primary"
          style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
        >
          Resume ↗
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
        .nav-link:hover { color: var(--neon-cyan) !important; }
      `}</style>
    </motion.nav>
  );
}
