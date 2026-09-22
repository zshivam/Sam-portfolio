"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse  = useRef({ x: 0, y: 0 });
  const ring   = useRef({ x: 0, y: 0 });
  const animId = useRef<number>(0);

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const clickable = el?.closest("a, button, [role=button], input, textarea, select, label, [onclick]");
      setHovering(!!clickable);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    // Smooth trailing physics loop
    const tick = () => {
      // Ring follows mouse with fast smooth response
      ring.current.x += (mouse.current.x - ring.current.x) * 0.32;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.32;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      animId.current = requestAnimationFrame(tick);
    };
    animId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <>
      {/* Instant center dot */}
      <div
        ref={dotRef}
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
          boxShadow:     hovering
            ? "0 0 10px 2px rgba(255, 255, 255, 0.8)"
            : "0 0 8px 1px rgba(255, 255, 255, 0.5)",
          pointerEvents: "none",
          zIndex:        99999,
          transform:     clicking ? "scale(0.5)" : "scale(1)",
          transition:    "box-shadow 0.2s ease, transform 0.1s ease",
          willChange:    "transform",
        }}
      />

      {/* Smooth trailing ring */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:            0,
          left:           0,
          width:          hovering ? "40px" : "28px",
          height:         hovering ? "40px" : "28px",
          marginLeft:    hovering ? "-20px" : "-14px",
          marginTop:     hovering ? "-20px" : "-14px",
          borderRadius:  "50%",
          border:        `1.5px solid ${hovering ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}`,
          background:    hovering ? "rgba(255, 255, 255, 0.12)" : "transparent",
          boxShadow:     hovering
            ? "0 0 14px rgba(255, 255, 255, 0.4)"
            : "0 0 8px rgba(255, 255, 255, 0.15)",
          pointerEvents: "none",
          zIndex:        99998,
          transform:     clicking ? "scale(0.8)" : "scale(1)",
          transition:    "width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
          willChange:    "transform",
        }}
      />

      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
