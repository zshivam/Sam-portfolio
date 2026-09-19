"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Dynamic import to avoid SSR issues with Three.js
const ParticleBackground = dynamic(
  () => import("@/components/3d/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Fixed 3D particle background */}
      <ParticleBackground />

      {/* Animated gradient orbs */}
      <div className="animated-bg" />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
