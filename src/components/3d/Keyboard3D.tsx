"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { keyboardRows, skills } from "@/lib/data";

// Build a rounded-box geometry manually (simple chamfered box)
function createKeycapGeometry(w: number, h: number, d: number): THREE.BoxGeometry {
  return new THREE.BoxGeometry(w, h, d);
}

function createTextCanvas(label: string, color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 256);

  // Key cap background
  ctx.fillStyle = "#0d1829";
  ctx.roundRect(8, 8, 240, 240, 20);
  ctx.fill();

  // Glow border
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.shadowBlur = 20;
  ctx.shadowColor = color;
  ctx.roundRect(8, 8, 240, 240, 20);
  ctx.stroke();

  // Text
  ctx.shadowBlur = 10;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.font = "bold 38px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Word wrap for long labels
  const words = label.split("/");
  if (words.length > 1) {
    ctx.font = "bold 30px 'Courier New', monospace";
    words.forEach((word, i) => {
      ctx.fillText(word.trim(), 128, 110 + i * 42);
    });
  } else if (label.length > 8) {
    ctx.font = "bold 28px 'Courier New', monospace";
    ctx.fillText(label, 128, 128);
  } else {
    ctx.fillText(label, 128, 128);
  }

  return canvas;
}

export default function Keyboard3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 4.5, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const purpleLight = new THREE.PointLight(0xa855f7, 3, 20);
    purpleLight.position.set(0, 8, 0);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 20);
    cyanLight.position.set(5, 3, 5);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xec4899, 1.5, 15);
    pinkLight.position.set(-5, 3, -5);
    scene.add(pinkLight);

    // Keyboard body
    const bodyGeo = new THREE.BoxGeometry(7.4, 0.22, 4.0);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x080f1f, roughness: 0.5, metalness: 0.6 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = -0.25;
    scene.add(body);

    // Keyboard glow edge
    const edgeGeo = new THREE.BoxGeometry(7.44, 0.03, 4.04);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 0.5,
      transparent: true, opacity: 0.5,
    });
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.y = -0.11;
    scene.add(edge);

    // Build skill color map
    const skillColorMap: Record<string, string> = {};
    skills.forEach((s) => { skillColorMap[s.label] = s.color; });

    const neonColors = ["#a855f7", "#06b6d4", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];
    const keycaps: THREE.Mesh[] = [];
    const floatOffsets: number[] = [];

    // Create keycaps
    keyboardRows.forEach((row, rowIdx) => {
      row.forEach((label, colIdx) => {
        const x = (colIdx - (row.length - 1) / 2) * 0.9;
        const z = (rowIdx - (keyboardRows.length - 1) / 2) * 0.92;
        const color = skillColorMap[label] || neonColors[colIdx % neonColors.length];

        // Texture from canvas
        const canvas = createTextCanvas(label, color);
        const texture = new THREE.CanvasTexture(canvas);

        // Cap
        const capGeo = createKeycapGeometry(0.76, 0.16, 0.76);
        const capMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.3,
          metalness: 0.4,
        });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.set(x, 0.06, z);
        cap.castShadow = true;
        scene.add(cap);
        keycaps.push(cap);
        floatOffsets.push(rowIdx * 0.5 + colIdx * 0.2);

        // Base/stem
        const baseGeo = new THREE.BoxGeometry(0.72, 0.28, 0.72);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1e, roughness: 0.8, metalness: 0.2 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.set(x, -0.1, z);
        scene.add(base);

        // Glow top strip
        const glowGeo = new THREE.BoxGeometry(0.7, 0.015, 0.7);
        const threeColor = new THREE.Color(color);
        const glowMat = new THREE.MeshStandardMaterial({
          color: threeColor,
          emissive: threeColor,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(x, 0.148, z);
        scene.add(glow);
      });
    });

    // Space bar
    const spaceCanvas = createTextCanvas("FULL-STACK", "#06b6d4");
    const spaceTexture = new THREE.CanvasTexture(spaceCanvas);
    const spaceGeo = new THREE.BoxGeometry(4.0, 0.16, 0.76);
    const spaceMat = new THREE.MeshStandardMaterial({ map: spaceTexture, roughness: 0.3, metalness: 0.4 });
    const spacebar = new THREE.Mesh(spaceGeo, spaceMat);
    spacebar.position.set(0, 0.06, 1.62);
    scene.add(spacebar);

    const spaceBaseGeo = new THREE.BoxGeometry(4.0, 0.28, 0.72);
    const spaceBaseMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1e, roughness: 0.8 });
    const spaceBase = new THREE.Mesh(spaceBaseGeo, spaceBaseMat);
    spaceBase.position.set(0, -0.1, 1.62);
    scene.add(spaceBase);

    // Group all to rotate together
    const group = new THREE.Group();
    scene.children.forEach((child) => {
      if (child !== ambient && child !== purpleLight && child !== cyanLight && child !== pinkLight) {
        group.add(child);
      }
    });
    scene.add(group);

    // Animation
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle group sway
      group.rotation.y = Math.sin(t * 0.2) * 0.18;
      group.rotation.x = -0.28 + Math.sin(t * 0.15) * 0.04;

      // Float individual keycaps
      keycaps.forEach((cap, i) => {
        const originalY = 0.06;
        cap.position.y = originalY + Math.sin(t * 0.8 + floatOffsets[i]) * 0.035;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
