"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import BeyondCodeSection from "@/components/BeyondCodeSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Dynamic import to avoid SSR issues with Three.js
const ParticleBackground = dynamic(
  () => import("@/components/3d/ParticleBackground"),
  { ssr: false }
);

const CharacterCursor = dynamic(
  () => import("@/components/3d/CharacterCursor"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Techy custom cursor */}
      <CustomCursor />

      {/* Fixed 3D particle background */}
      <ParticleBackground />

      {/* Tiny 3D doodle character — chases the cursor */}
      <CharacterCursor />

      {/* Animated gradient orbs */}
      <div className="animated-bg" />

      {/* Fixed Full Website Character Background (Anchored to right side) */}
      <div
        className="fixed-website-bg-character"
        style={{
          position: "fixed",
          bottom: 0,
          right: "clamp(2%, 4vw, 7%)",
          height: "90vh",
          width: "auto",
          aspectRatio: "356/993",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.45,
          userSelect: "none",
        }}
      >
        <Image
          src="/shivam_bg.png"
          alt="Shivam Background"
          fill
          sizes="(max-width: 768px) 50vw, 32vw"
          style={{
            objectFit: "contain",
            objectPosition: "bottom right",
            filter: "drop-shadow(0 0 35px rgba(0, 0, 0, 0.75))",
          }}
          priority
        />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <BeyondCodeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
