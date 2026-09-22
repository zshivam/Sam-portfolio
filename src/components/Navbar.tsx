"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Connect" },
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
                      ? "#ffffff"
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

        {/* Desktop Resume Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href={personalInfo.links.resume}
            target="_blank"
            rel="noreferrer"
            className="btn-neon btn-neon-primary nav-desktop"
            style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
          >
            Resume ↗
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className="nav-mobile-toggle"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "var(--text-primary)",
              borderRadius: "10px",
              width: "42px",
              height: "42px",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div style={{ width: "20px", height: "14px", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span
                style={{
                  width: "100%",
                  height: "2px",
                  background: mobileOpen ? "#ffffff" : "var(--text-primary)",
                  transition: "all 0.25s ease",
                  transformOrigin: "left",
                  transform: mobileOpen ? "rotate(45deg) translate(2px, -2px)" : "none",
                }}
              />
              <span
                style={{
                  width: "100%",
                  height: "2px",
                  background: "#ffffff",
                  transition: "all 0.25s ease",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: "100%",
                  height: "2px",
                  background: mobileOpen ? "#ffffff" : "var(--text-primary)",
                  transition: "all 0.25s ease",
                  transformOrigin: "left",
                  transform: mobileOpen ? "rotate(-45deg) translate(2px, 2px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              background: "rgba(8, 12, 24, 0.98)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(20px)",
              padding: "1rem 0 1.5rem",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                padding: "0 0.5rem",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.href);
                      setMobileOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: active === link.href ? "#ffffff" : "var(--text-secondary)",
                      background: active === link.href ? "rgba(255, 255, 255, 0.1)" : "transparent",
                      border: active === link.href ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid transparent",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#94a3b8" }}>
                      →
                    </span>
                  </a>
                </li>
              ))}

              <li style={{ marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <a
                  href={personalInfo.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neon btn-neon-primary"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "0.95rem",
                  }}
                >
                  View Resume ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        .nav-link:hover { color: var(--neon-cyan) !important; }
      `}</style>
    </motion.nav>
  );
}
