"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/lib/data";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiSend,
  FiMapPin,
} from "react-icons/fi";

const contactLinks = [
  { icon: FiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "#a855f7" },
  { icon: FiGithub, label: "GitHub", value: "@zshivam", href: personalInfo.links.github, color: "#f1f5f9" },
  { icon: FiLinkedin, label: "LinkedIn", value: "zshivam24", href: personalInfo.links.linkedin, color: "#0077b5" },
  { icon: FiTwitter, label: "X (Twitter)", value: "@zshiwam", href: personalInfo.links.twitter, color: "#1da1f2" },
  { icon: FiInstagram, label: "Instagram", value: "@hishivam.in", href: personalInfo.links.instagram, color: "#e1306c" },
];

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}
        >
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--neon-cyan)", fontSize: "0.875rem", letterSpacing: "3px", marginBottom: "0.75rem" }}>
            04 / CONTACT
          </p>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="section-subtitle">
            Whether it&apos;s a project, opportunity, or just a conversation — my inbox is always open.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
                color: "var(--text-secondary)",
              }}
            >
              <FiMapPin color="var(--neon-cyan)" size={18} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                India 🇮🇳
              </span>
            </div>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                fontSize: "0.95rem",
              }}
            >
              I&apos;m currently available for freelance work and full-time roles. If you have a project
              that needs some creative engineering or just want to say hi, feel free to reach out!
            </p>

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contactLinks.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 8 }}
                  className="glass-card"
                  style={{
                    padding: "0.875rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "var(--text-primary)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color={color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "0.1rem" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                      {value}
                    </div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: "1rem" }}>→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "4rem" }}>🚀</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  Thanks for reaching out. I&apos;ll get back to you soon!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-neon btn-neon-outline"
                  style={{ marginTop: "0.5rem" }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Send me a message
                </h3>

                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Shivam Sahani", key: "name" as const },
                  { id: "email", label: "Your Email", type: "email", placeholder: "you@example.com", key: "email" as const },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--neon-purple)",
                        marginBottom: "0.5rem",
                        letterSpacing: "1px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formState[field.key]}
                      onChange={(e) => setFormState((p) => ({ ...p, [field.key]: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(168,85,247,0.05)",
                        border: "1px solid rgba(168,85,247,0.2)",
                        borderRadius: "8px",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)"; }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--neon-purple)",
                      marginBottom: "0.5rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    placeholder="Hey Shivam, I'd like to talk about..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(168,85,247,0.05)",
                      border: "1px solid rgba(168,85,247,0.2)",
                      borderRadius: "8px",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)"; }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-neon btn-neon-primary"
                  style={{ justifyContent: "center", marginTop: "0.25rem" }}
                >
                  <FiSend size={16} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div[style] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
