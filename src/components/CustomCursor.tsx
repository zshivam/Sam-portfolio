"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse     = useRef({ x: -100, y: -100 });
  const ring      = useRef({ x: -100, y: -100 });
  const animId    = useRef<number>(0);
  const isClicking = useRef(false);
  const isHovering = useRef(false);
  const isEnabled  = useRef(true);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(hover: hover)").matches;
    if (isTouch) {
      isEnabled.current = false;
      return;
    }

    setMounted(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${isClicking.current ? 0.5 : 1})`;
      }
    };

    const onDown = () => {
      isClicking.current = true;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) scale(0.5)`;
      }
    };

    const onUp = () => {
      isClicking.current = false;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) scale(1)`;
      }
    };

    // Use event delegation for hover state - ZERO forced layout reflows
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [role=button], input, textarea, select, label, .clickable, .tech-tile")) {
        isHovering.current = true;
        if (ringRef.current) ringRef.current.classList.add("cursor-hover");
        if (dotRef.current) dotRef.current.classList.add("cursor-hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest("a, button, [role=button], input, textarea, select, label, .clickable, .tech-tile")) {
        isHovering.current = false;
        if (ringRef.current) ringRef.current.classList.remove("cursor-hover");
        if (dotRef.current) dotRef.current.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup",   onUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout",  onMouseOut, { passive: true });

    // Hardware accelerated physics loop for trailing ring
    let currentRingScale = 1;

    const tick = () => {
      // Ring follows mouse with smooth lerp
      ring.current.x += (mouse.current.x - ring.current.x) * 0.35;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.35;

      const targetRingScale = isClicking.current ? 0.75 : isHovering.current ? 1.4 : 1;
      currentRingScale += (targetRingScale - currentRingScale) * 0.25;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${currentRingScale})`;
      }

      animId.current = requestAnimationFrame(tick);
    };
    animId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout",  onMouseOut);
      cancelAnimationFrame(animId.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Instant center dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position:     "fixed",
          top:           0,
          left:          0,
          width:         "6px",
          height:        "6px",
          marginLeft:   "-3px",
          marginTop:    "-3px",
          borderRadius: "50%",
          background:    "#ffffff",
          boxShadow:     "0 0 8px 1px rgba(255, 255, 255, 0.6)",
          pointerEvents: "none",
          zIndex:        99999,
          willChange:    "transform",
        }}
      />

      {/* Smooth trailing ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position:      "fixed",
          top:            0,
          left:           0,
          width:          "28px",
          height:         "28px",
          marginLeft:    "-14px",
          marginTop:     "-14px",
          borderRadius:  "50%",
          border:        "1.5px solid rgba(255, 255, 255, 0.45)",
          background:    "transparent",
          boxShadow:     "0 0 8px rgba(255, 255, 255, 0.15)",
          pointerEvents: "none",
          zIndex:        99998,
          transition:    "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
          willChange:    "transform",
        }}
      />

      <style>{`
        html.has-custom-cursor, html.has-custom-cursor * {
          cursor: none !important;
        }
        .custom-cursor-ring.cursor-hover {
          border-color: #ffffff !important;
          background: rgba(255, 255, 255, 0.14) !important;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.45) !important;
        }
        .custom-cursor-dot.cursor-hover {
          box-shadow: 0 0 12px 2px rgba(255, 255, 255, 0.9) !important;
        }
      `}</style>
    </>
  );
}
