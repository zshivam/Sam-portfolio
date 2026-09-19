"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox, Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { keyboardRows, skills } from "@/lib/data";

// Individual Keycap component
function Keycap({
  label,
  position,
  color,
  delay = 0,
}: {
  label: string;
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.04;
    if (baseRef.current) {
      baseRef.current.position.y = position[1] - 0.12 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* Key base/stem */}
      <RoundedBox
        ref={baseRef}
        args={[0.72, 0.28, 0.72]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.12, 0]}
      >
        <meshStandardMaterial
          color="#0a0f1e"
          roughness={0.8}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Key cap */}
      <RoundedBox
        ref={meshRef}
        args={[0.72, 0.16, 0.72]}
        radius={0.06}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#0d1829"
          roughness={0.3}
          metalness={0.5}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Glow border on top face */}
      <RoundedBox args={[0.68, 0.02, 0.68]} radius={0.04} smoothness={4} position={[0, 0.09, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </RoundedBox>

      {/* Label */}
      <Text
        position={[0, 0.12, 0.01]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.13}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceMono-Bold.ttf"
        maxWidth={0.65}
      >
        {label}
      </Text>
    </group>
  );
}

// The full keyboard
function Keyboard3DScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle auto-rotation
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    groupRef.current.rotation.x = -0.3 + Math.sin(t * 0.15) * 0.05;
  });

  const skillColorMap: Record<string, string> = {};
  skills.forEach((s) => { skillColorMap[s.label] = s.color; });

  const neonColors = ["#a855f7", "#06b6d4", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

  return (
    <group ref={groupRef}>
      {/* Keyboard body */}
      <RoundedBox args={[7.2, 0.22, 3.6]} radius={0.15} smoothness={6} position={[0, -0.22, 0]}>
        <meshStandardMaterial
          color="#080f1f"
          roughness={0.5}
          metalness={0.6}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* Keyboard glow edge */}
      <RoundedBox args={[7.24, 0.04, 3.64]} radius={0.16} smoothness={4} position={[0, -0.1, 0]}>
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </RoundedBox>

      {/* Keys */}
      {keyboardRows.map((row, rowIdx) =>
        row.map((keyLabel, colIdx) => {
          const x = (colIdx - (row.length - 1) / 2) * 0.88;
          const z = (rowIdx - (keyboardRows.length - 1) / 2) * 0.88;
          const color = skillColorMap[keyLabel] || neonColors[colIdx % neonColors.length];
          return (
            <Keycap
              key={`${rowIdx}-${colIdx}`}
              label={keyLabel}
              position={[x, 0.06, z]}
              color={color}
              delay={rowIdx * 0.5 + colIdx * 0.2}
            />
          );
        })
      )}

      {/* Space bar at bottom */}
      <group position={[0, 0.06, 1.55]}>
        <RoundedBox args={[3.8, 0.16, 0.72]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#0d1829" roughness={0.3} metalness={0.5} />
        </RoundedBox>
        <RoundedBox args={[3.76, 0.02, 0.68]} radius={0.04} smoothness={4} position={[0, 0.09, 0]}>
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </RoundedBox>
        <Text
          position={[0, 0.12, 0.01]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.12}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
        >
          FULL-STACK DEV
        </Text>
      </group>
    </group>
  );
}

export default function Keyboard3D() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={45} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 8, 0]} intensity={2} color="#a855f7" />
        <pointLight position={[5, 3, 5]} intensity={1} color="#06b6d4" />
        <pointLight position={[-5, 3, -5]} intensity={0.8} color="#ec4899" />
        <spotLight
          position={[0, 10, 5]}
          angle={0.4}
          penumbra={0.5}
          intensity={3}
          color="#ffffff"
          castShadow
        />
        <Environment preset="night" />
        <Float
          speed={1.2}
          rotationIntensity={0.1}
          floatIntensity={0.3}
          floatingRange={[-0.1, 0.1]}
        >
          <Keyboard3DScene />
        </Float>
      </Canvas>
    </div>
  );
}
