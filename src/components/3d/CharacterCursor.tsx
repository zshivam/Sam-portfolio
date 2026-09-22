"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
 * Doodle Character State Machine
 * ─────────────────────────────
 *  run        → fast cursor movement
 *  walk       → slow cursor movement
 *  idle       → cursor stopped < 2.5s
 *  sit_down   → transition (0.8s) when idle for 2.5s
 *  sit        → sitting; randomly triggers: dance | look | wave | spin | sleep
 *  stand_up   → transition (0.6s) back when cursor moves
 *  dance      → grooves for 5s then back to sit
 *  look       → head turns L→R→C for 3s then back to sit
 *  wave       → arm waves for 2.5s then back to sit
 *  spin       → spins 720° in 2s then back to sit
 *  sleep      → sleeps with floating Zs; wakes when cursor moves
 */

type State =
  | "run" | "walk" | "idle"
  | "sit_down" | "sit" | "stand_up"
  | "dance" | "look" | "wave" | "spin" | "sleep";

const SIT_IDLE_ACTIONS: State[] = ["dance", "look", "wave", "spin", "sleep"];

/** linear interpolation */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** smooth-step ease */
const ease = (t: number) => t * t * (3 - 2 * t);

export default function CharacterCursor() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ───────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ─────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    /* ── Screen → World helper ──────────────────────────── */
    const toWorld = (cx: number, cy: number) => {
      const v   = new THREE.Vector3((cx/window.innerWidth)*2-1, -(cy/window.innerHeight)*2+1, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const t   = -camera.position.z / dir.z;
      return camera.position.clone().addScaledVector(dir, t);
    };

    /* ── Lights ─────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const topL  = new THREE.PointLight(0xffffff, 3.5, 20); topL.position.set(0,5,5);   scene.add(topL);
    const sideL1 = new THREE.PointLight(0xe2e8f0, 2.5, 12); sideL1.position.set(-3,2,4); scene.add(sideL1);
    const sideL2 = new THREE.PointLight(0xcbd5e1, 2.0, 12); sideL2.position.set(3,-1,4); scene.add(sideL2);

    /* ── Materials ──────────────────────────────────────── */
    const mSkin  = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.6 });
    const mHair  = new THREE.MeshStandardMaterial({ color: 0x3b1f0a, roughness: 0.8 });
    const mShirt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const mSash  = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.4, metalness: 0.2 });
    const mPants = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.7 });
    const mShoe  = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.9 });
    const mGlass = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.1, metalness: 0.8 });
    const mShadow= new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.18 });
    const mZ     = new THREE.MeshStandardMaterial({ color: 0x818cf8, emissive: 0x4338ca, emissiveIntensity: 1.5, transparent: true, opacity: 0.9 });

    const S = 0.70; // scale

    /* ── Character group ────────────────────────────────── */
    const charGroup = new THREE.Group();
    scene.add(charGroup);

    /* HEAD group (for look/sleep rotation) */
    const headG = new THREE.Group();
    charGroup.add(headG);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14*S,16,12), mSkin);
    head.position.y = 0.66*S; headG.add(head);
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.145*S,12,8), mHair);
    hair.scale.y = 0.55; hair.position.y = 0.73*S; headG.add(hair);
    [[-0.06],[0.06]].forEach(([ox])=>{
      const g = new THREE.Mesh(new THREE.TorusGeometry(0.04*S,0.008*S,6,20),mGlass);
      g.position.set(ox*S,0.66*S,0.12*S); headG.add(g);
    });
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.005*S,0.005*S,0.06*S,4),mGlass);
    bridge.rotation.z=Math.PI/2; bridge.position.set(0,0.66*S,0.12*S); headG.add(bridge);

    /* NECK */
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.04*S,0.04*S,0.06*S,8),mSkin);
    neck.position.y = 0.50*S; charGroup.add(neck);

    /* TORSO */
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.1*S,0.11*S,0.28*S,10),mShirt);
    torso.position.y = 0.33*S; charGroup.add(torso);
    const sash = new THREE.Mesh(new THREE.BoxGeometry(0.04*S,0.22*S,0.06*S),mSash);
    sash.position.set(0.02*S,0.33*S,0.10*S); charGroup.add(sash);

    /* ARM factory */
    const makeArm = (side: 1|-1) => {
      const g = new THREE.Group();
      g.position.set(side*0.13*S, 0.43*S, 0);
      const up = new THREE.Mesh(new THREE.CylinderGeometry(0.035*S,0.03*S,0.2*S,7),mShirt);
      up.position.y=-0.1*S; g.add(up);
      const lo = new THREE.Mesh(new THREE.CylinderGeometry(0.03*S,0.025*S,0.18*S,7),mSkin);
      lo.position.y=-0.29*S; g.add(lo);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.035*S,8,6),mSkin);
      hand.position.y=-0.39*S; g.add(hand);
      charGroup.add(g); return g;
    };
    const lArm = makeArm(-1);
    const rArm = makeArm(1);

    /* LEG factory */
    const makeLeg = (side: 1|-1) => {
      const g = new THREE.Group();
      g.position.set(side*0.055*S, 0.18*S, 0);
      const up = new THREE.Mesh(new THREE.CylinderGeometry(0.05*S,0.045*S,0.22*S,8),mPants);
      up.position.y=-0.11*S; g.add(up);
      const lo = new THREE.Mesh(new THREE.CylinderGeometry(0.04*S,0.038*S,0.2*S,8),mPants);
      lo.position.y=-0.32*S; g.add(lo);
      const shoe= new THREE.Mesh(new THREE.BoxGeometry(0.07*S,0.04*S,0.10*S),mShoe);
      shoe.position.set(0,-0.43*S,0.015*S); g.add(shoe);
      charGroup.add(g); return g;
    };
    const lLeg = makeLeg(-1);
    const rLeg = makeLeg(1);

    /* SHADOW */
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.12*S,24),mShadow);
    shadow.rotation.x=-Math.PI/2; shadow.position.y=-0.47*S; charGroup.add(shadow);

    /* ── Floating Z particles (for sleep state) ─────────── */
    const zGroup = new THREE.Group();
    charGroup.add(zGroup);
    type ZParticle = { mesh: THREE.Mesh; startY: number; phase: number; speed: number };
    const zParticles: ZParticle[] = [];
    for (let i = 0; i < 4; i++) {
      // Simple "Z" — just a small glowing box with letter-like shape
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.04*S*(1-i*0.15), 0.035*S*(1-i*0.15), 0.005*S),
        mZ.clone()
      );
      mesh.position.set((0.12+i*0.04)*S, (0.85+i*0.12)*S, 0.05*S);
      mesh.visible = false;
      zGroup.add(mesh);
      zParticles.push({ mesh, startY: (0.85+i*0.12)*S, phase: i*0.8, speed: 0.18+i*0.06 });
    }

    /* ── State machine ──────────────────────────────────── */
    let state: State = "idle";
    let stateTime    = 0;
    let idleTime     = 0;
    let cycleIndex   = 0;          // which action we're on in the loop
    const CYCLE_DURATION = 2.0;    // seconds per action
    const CYCLE_ACTIONS: State[] = ["dance","look","wave","spin","sleep"];

    /* Smoothed pose targets */
    const pose = {
      lArmX: 0, lArmZ: 0,
      rArmX: 0, rArmZ: 0,
      lLegX: 0, lLegZ: 0,
      rLegX: 0, rLegZ: 0,
      bodyY: 0,
      headY: 0, headZ: 0,
      lean:  0,
    };

    /* ── Movement tracking ──────────────────────────────── */
    const cursorWorld  = new THREE.Vector3();
    const charPos      = new THREE.Vector3();
    const charVelocity = new THREE.Vector3();
    let targetAngle    = 0;
    let currentAngle   = 0;
    let spinAngle      = 0;

    const onMouseMove = (e: MouseEvent) => {
      const w = toWorld(e.clientX, e.clientY);
      cursorWorld.set(w.x, w.y, 0);
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Helper: transition to new state ───────────────── */
    const goTo = (s: State) => { state = s; stateTime = 0; };

    /* ── Animation loop ─────────────────────────────────── */
    let animId: number;
    const clock = new THREE.Clock();
    let lastT   = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t  = clock.getElapsedTime();
      const dt = Math.min(t - lastT, 0.05);
      lastT    = t;
      stateTime += dt;

      /* ── Physics: move char toward cursor ─── */
      const toTarget = cursorWorld.clone().sub(charPos);
      const dist = toTarget.length();
      let speed = 0;

      if (dist > 0.05 * S) {
        const spd = Math.min(dist * 8.5, 14.0);
        const step = toTarget.normalize().multiplyScalar(spd * dt);
        charVelocity.lerp(step, 0.28);
        charPos.add(charVelocity);
        targetAngle = Math.atan2(charVelocity.x, charVelocity.z);
      } else {
        charVelocity.multiplyScalar(0.72);
      }
      speed = charVelocity.length() / dt;

      const angleDiff = ((targetAngle - currentAngle + Math.PI) % (Math.PI * 2)) - Math.PI;
      currentAngle += angleDiff * 0.28;

      /* ── State transitions ─── */
      const isMoving = speed > 0.25;

      if (isMoving) {
        idleTime = 0;
        const inRestAction = ["sit", "sit_down", "dance", "look", "wave", "spin", "sleep"].includes(state);
        if (inRestAction) {
          if (state === "spin") currentAngle = spinAngle;
          goTo("stand_up");
        } else if (state === "stand_up" && stateTime > 0.4) {
          goTo(speed > 1.5 ? "run" : "walk");
        } else if (state !== "stand_up") {
          goTo(speed > 1.5 ? "run" : "walk");
        }
      } else {
        idleTime += dt;
        if ((state === "run" || state === "walk") && speed < 0.2) goTo("idle");
        if (state === "idle" && idleTime > 1.0) goTo("sit_down");
        if (state === "sit_down" && stateTime > 0.6) goTo("sit");
        if (state === "stand_up" && stateTime > 0.5) goTo("idle");

        // ── 2-second action loop while cursor is at rest ──
        if (state === "sit") {
          // Enter first action in cycle
          const next = CYCLE_ACTIONS[cycleIndex % CYCLE_ACTIONS.length];
          if (next === "spin") spinAngle = currentAngle;
          goTo(next);
        }
        // Each action runs for exactly CYCLE_DURATION (2.0s), then moves to next
        const isAction = ["dance", "look", "wave", "spin", "sleep"].includes(state);
        if (isAction && stateTime >= CYCLE_DURATION) {
          if (state === "spin") currentAngle = spinAngle;
          cycleIndex++;
          const next = CYCLE_ACTIONS[cycleIndex % CYCLE_ACTIONS.length];
          if (next === "spin") spinAngle = currentAngle;
          goTo(next);
        }
      }

      /* ── Update position / base rotation ─── */
      charGroup.position.copy(charPos);
      charGroup.rotation.y = currentAngle;

      /* ── Pose targets per state ─── */
      const p = pose;

      if (state === "run") {
        const phase = t * 9;
        p.lArmX = Math.sin(phase) * 0.9; p.rArmX = -Math.sin(phase) * 0.9;
        p.lArmZ = 0; p.rArmZ = 0;
        p.lLegX = -Math.sin(phase) * 0.9; p.rLegX = Math.sin(phase) * 0.9;
        p.lLegZ = 0; p.rLegZ = 0;
        p.bodyY = Math.abs(Math.sin(phase)) * 0.04;
        p.lean  = -0.2; p.headY = 0; p.headZ = 0;
      } else if (state === "walk") {
        const phase = t * 5;
        p.lArmX = Math.sin(phase) * 0.45; p.rArmX = -Math.sin(phase) * 0.45;
        p.lArmZ = 0; p.rArmZ = 0;
        p.lLegX = -Math.sin(phase) * 0.5; p.rLegX = Math.sin(phase) * 0.5;
        p.lLegZ = 0; p.rLegZ = 0;
        p.bodyY = Math.abs(Math.sin(phase)) * 0.015;
        p.lean  = -0.08; p.headY = 0; p.headZ = 0;
      } else if (state === "idle") {
        p.lArmX = Math.sin(t*1.2)*0.08; p.rArmX = -Math.sin(t*1.2)*0.08;
        p.lArmZ = 0.12; p.rArmZ = -0.12;
        p.lLegX = 0; p.rLegX = 0; p.lLegZ = 0; p.rLegZ = 0;
        p.bodyY = Math.sin(t*1.8)*0.012;
        p.lean  = 0; p.headY = 0; p.headZ = Math.sin(t*1.2)*0.06;
      } else if (state === "sit_down") {
        const prog = ease(Math.min(stateTime / 0.85, 1));
        p.lLegX = lerp(0, -1.3, prog); p.rLegX = lerp(0, -1.3, prog);
        p.lLegZ = lerp(0,  0.35, prog); p.rLegZ = lerp(0, -0.35, prog);
        p.lArmX = lerp(0, 0.6, prog); p.rArmX = lerp(0, 0.6, prog);
        p.lArmZ = lerp(0.12, 0.5, prog); p.rArmZ = lerp(-0.12, -0.5, prog);
        p.bodyY = lerp(0, -0.28*S, prog);
        p.lean  = 0; p.headY = 0; p.headZ = 0;
      } else if (state === "sit") {
        p.lLegX = -1.3; p.rLegX = -1.3;
        p.lLegZ =  0.35; p.rLegZ = -0.35;
        p.lArmX = 0.6; p.rArmX = 0.6;
        p.lArmZ = 0.5; p.rArmZ = -0.5;
        p.bodyY = -0.28*S;
        p.lean  = 0.05;
        // Gentle sit sway
        p.headZ = Math.sin(t*0.9)*0.07;
        p.headY = 0;
      } else if (state === "stand_up") {
        const prog = ease(Math.min(stateTime / 0.6, 1));
        p.lLegX = lerp(-1.3, 0, prog); p.rLegX = lerp(-1.3, 0, prog);
        p.lLegZ = lerp(0.35, 0, prog); p.rLegZ = lerp(-0.35, 0, prog);
        p.lArmX = lerp(0.6, 0, prog); p.rArmX = lerp(0.6, 0, prog);
        p.lArmZ = lerp(0.5, 0.12, prog); p.rArmZ = lerp(-0.5, -0.12, prog);
        p.bodyY = lerp(-0.28*S, 0, prog);
        p.lean  = 0; p.headY = 0; p.headZ = 0;
      } else if (state === "dance") {
        // ── Disco groove ──
        const phase = t * 4.5;
        const beat  = t * 9;
        p.lArmX = -Math.sin(phase) * 1.0;      // big arm waves
        p.rArmX =  Math.sin(phase) * 1.0;
        p.lArmZ =  0.3 + Math.cos(phase) * 0.5;
        p.rArmZ = -0.3 - Math.cos(phase) * 0.5;
        p.lLegX = -1.1 + Math.sin(beat)*0.15;  // slight leg bounce
        p.rLegX = -1.1 - Math.sin(beat)*0.15;
        p.lLegZ =  0.35; p.rLegZ = -0.35;
        p.bodyY = -0.28*S + Math.abs(Math.sin(beat))*0.05;
        p.lean  = Math.sin(phase)*0.12;
        p.headZ = Math.sin(phase*1.5)*0.18;
        p.headY = 0;
      } else if (state === "look") {
        // ── Look L → R → C ──
        const pt = stateTime / 3.0;
        p.lArmX = 0.6; p.rArmX = 0.6;
        p.lArmZ = 0.5; p.rArmZ = -0.5;
        p.lLegX = -1.3; p.rLegX = -1.3;
        p.lLegZ = 0.35; p.rLegZ = -0.35;
        p.bodyY = -0.28*S; p.lean = 0;
        // head turn sequence
        if      (pt < 0.2)  p.headY = lerp(0, -0.6, pt/0.2);   // turn left
        else if (pt < 0.45) p.headY = -0.6;                      // hold left
        else if (pt < 0.65) p.headY = lerp(-0.6, 0.6, (pt-0.45)/0.2); // sweep right
        else if (pt < 0.85) p.headY = 0.6;                       // hold right
        else                p.headY = lerp(0.6, 0, (pt-0.85)/0.15);   // back center
        p.headZ = 0;
      } else if (state === "wave") {
        // ── Right arm waves hi! ──
        p.lArmX = 0.6; p.lArmZ = 0.5;
        p.lLegX = -1.3; p.rLegX = -1.3;
        p.lLegZ = 0.35; p.rLegZ = -0.35;
        p.bodyY = -0.28*S; p.lean = 0;
        // Right arm raised high, waving
        p.rArmX = -1.3;
        p.rArmZ = -0.2 + Math.sin(t * 7) * 0.5;
        p.headY = 0; p.headZ = Math.sin(t*2)*0.08;
      } else if (state === "spin") {
        // ── 720° spin on the spot ──
        const prog = Math.min(stateTime / 2.2, 1);
        charGroup.rotation.y = spinAngle + prog * Math.PI * 4; // 720°
        p.lArmZ = -0.8; p.rArmZ = 0.8;  // arms out for spin
        p.lArmX = 0; p.rArmX = 0;
        p.lLegX = 0; p.rLegX = 0; p.lLegZ = 0.15; p.rLegZ = -0.15;
        p.bodyY = Math.sin(prog * Math.PI) * 0.08; // slight rise and fall
        p.lean  = 0; p.headY = 0; p.headZ = 0;
      } else if (state === "sleep") {
        // ── Sleeping ──
        p.lLegX = -1.3; p.rLegX = -1.3;
        p.lLegZ =  0.35; p.rLegZ = -0.35;
        p.lArmX =  0.3; p.rArmX =  0.3;
        p.lArmZ =  0.5; p.rArmZ = -0.5;
        p.bodyY = -0.28*S; p.lean = 0.15;
        p.headZ = 0; p.headY = 0;
        // Head droops
        headG.rotation.x = lerp(headG.rotation.x, 0.45, 0.06);
      }

      /* ── Apply pose with smooth lerp ─── */
      const spd = state === "spin" ? 0 : 0.14;  // skip lerp during spin (direct control)
      lArm.rotation.x = lerp(lArm.rotation.x, p.lArmX, 0.14);
      lArm.rotation.z = lerp(lArm.rotation.z, p.lArmZ, 0.14);
      rArm.rotation.x = lerp(rArm.rotation.x, p.rArmX, 0.14);
      rArm.rotation.z = lerp(rArm.rotation.z, p.rArmZ, 0.14);
      lLeg.rotation.x = lerp(lLeg.rotation.x, p.lLegX, 0.14);
      lLeg.rotation.z = lerp(lLeg.rotation.z, p.lLegZ, 0.14);
      rLeg.rotation.x = lerp(rLeg.rotation.x, p.rLegX, 0.14);
      rLeg.rotation.z = lerp(rLeg.rotation.z, p.rLegZ, 0.14);
      charGroup.position.y = lerp(charGroup.position.y, charPos.y + p.bodyY, 0.10);
      charGroup.rotation.x = lerp(charGroup.rotation.x, p.lean, 0.10);

      if (state !== "sleep") {
        headG.rotation.x = lerp(headG.rotation.x, 0, 0.08);
      }
      headG.rotation.y = lerp(headG.rotation.y, p.headY, 0.10);
      headG.rotation.z = lerp(headG.rotation.z, p.headZ, 0.10);

      void spd; // suppress lint

      /* ── Z particles (sleep) ─── */
      const isSleeping = state === "sleep";
      zParticles.forEach(({ mesh, startY, phase, speed: spd2 }) => {
        mesh.visible = isSleeping;
        if (isSleeping) {
          const prog2 = ((t * spd2 + phase) % 1.8) / 1.8;
          mesh.position.y = startY + prog2 * 0.5 * S;
          mesh.position.x = (0.12 + Math.sin(prog2 * Math.PI * 2) * 0.05) * S;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.opacity = prog2 < 0.1 ? prog2/0.1 : prog2 > 0.8 ? (1-prog2)/0.2 : 1;
        }
      });

      /* ── Shadow ─── */
      const shadowScale = state.startsWith("sit") || state === "dance" || state === "look"
        || state === "wave" || state === "sleep" ? 1.3 : 1.0 + (speed * 0.04);
      shadow.scale.setScalar(shadowScale);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ─────────────────────────────────────────── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        className="character-cursor-wrap"
        style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}
      />
      <style>{`
        @media (max-width: 768px), (pointer: coarse) {
          .character-cursor-wrap { display: none !important; }
        }
      `}</style>
    </>
  );
}
