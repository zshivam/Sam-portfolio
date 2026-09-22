"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/lib/data";
import {
  FiSend,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiCheckCircle,
  FiMail,
  FiClock,
} from "react-icons/fi";

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section" ref={ref} style={{ padding: "3.5rem 0", position: "relative" }}>
      <div className="container">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "1.75rem" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.4rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "#94a3b8",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              05 / CONTACT
            </p>
          </div>
          <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>
            Get In Touch
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "520px", fontSize: "0.88rem", lineHeight: 1.5 }}>
            Open for Software Developer roles, freelance projects, and collaborations.
          </p>
        </motion.div>

        {/* Compact Professional Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            background: "#131926",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "18px",
            padding: "1.75rem 2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "2rem",
            alignItems: "center",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5)",
            maxWidth: "760px",
            margin: "0 auto",
          }}
          className="contact-desk-card"
        >
          {/* Left Column: Direct Info */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.5rem" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  color: "#cbd5e1",
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                }}
              >
                Available for Hire
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 0.35rem 0",
              }}
            >
              Direct Outreach
            </h3>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.84rem", lineHeight: 1.55, margin: "0 0 1rem 0" }}>
              Have an opening or project in mind? Reach out directly via email or send a message.
            </p>

            {/* Email Box with Copy Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 0.85rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                marginBottom: "0.65rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiMail color="#ffffff" size={15} />
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  {personalInfo.email}
                </a>
              </div>
              <button
                onClick={copyEmailToClipboard}
                style={{
                  background: copiedEmail ? "#ffffff" : "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: copiedEmail ? "#0a0f18" : "#ffffff",
                  padding: "0.3rem 0.65rem",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "all 0.2s ease",
                }}
              >
                {copiedEmail ? <FiCheck size={12} /> : <FiCopy size={12} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Location Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.85rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "0.65rem",
              }}
            >
              <FiMapPin color="#cbd5e1" size={14} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text-secondary)" }}>
                India 🇮🇳 • Global Remote
              </span>
            </div>

            {/* Response Time Note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              <FiClock color="#94a3b8" size={13} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#94a3b8" }}>
                Response time: &lt; 24 hours
              </span>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <FiCheckCircle size={32} color="#ffffff" style={{ margin: "0 auto 0.6rem auto" }} />
                <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem 0" }}>
                  Message Dispatched!
                </h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", margin: "0 0 1rem 0" }}>
                  Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "#ffffff",
                    color: "#0a0f18",
                    padding: "0.45rem 1rem",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }} className="contact-form-row">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "0.55rem 0.8rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "0.84rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#ffffff"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formState.email}
                      onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "0.55rem 0.8rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "0.84rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#ffffff"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; }}
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    placeholder="Hi Shivam, let's discuss an opportunity or project..."
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.8rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "0.84rem",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#ffffff"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-action-send"
                  style={{
                    width: "100%",
                    padding: "0.7rem 1.2rem",
                    fontSize: "0.88rem",
                  }}
                >
                  <span>Send Message</span>
                  <span className="btn-icon-fly">
                    <FiSend size={14} />
                  </span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-desk-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 560px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
