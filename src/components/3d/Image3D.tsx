"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────
   Bottom Alpha Blend Shader:
   Smoothly dissolves the lower 22% of the character to transparent,
   so it floats in the air with no harsh cutoff line.
───────────────────────────────────────────────────────────────────── */
function applyBottomFade(mat: THREE.MeshBasicMaterial) {
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>
       varying vec2 vCustomUv;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_vertex>",
      `#include <uv_vertex>
       vCustomUv = uv;`
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
       varying vec2 vCustomUv;`
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `#include <dithering_fragment>
       // Smoothly blend out the bottom 22% so it floats seamlessly in the air
       float bFade = smoothstep(0.0, 0.22, vCustomUv.y);
       gl_FragColor.a *= bFade;`
    );
  };
}

/* ─────────────────────────────────────────────────────────────────────
   Subtle Curved Standee Geometry:
   A gentle curve along X for natural 3D depth when rotating.
───────────────────────────────────────────────────────────────────── */
function createCurvedStandeeGeometry(w: number, h: number): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(w, h, 32, 32);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const nx = x / (w * 0.5); // -1 to +1
    // Gentle cylindrical curvature
    const curveZ = (1.0 - Math.cos(nx * 0.85)) * 0.06;
    pos.setZ(i, -curveZ);
  }
  geo.computeVertexNormals();
  return geo;
}

export default function Image3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth, H = mount.clientHeight;

    /* ── WebGL Renderer ── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    /* ── Camera: Centered comfortably on the floating character ── */
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 0.06, 5.2);
    camera.lookAt(0, 0.06, 0);

    /* ── Clean Neutral Studio Lighting ── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2.0, 3.5, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.2);
    fillLight.position.set(-2.5, 1.5, 3.5);
    scene.add(fillLight);

    const backRim = new THREE.PointLight(0xffffff, 2.0, 8);
    backRim.position.set(0, 2.5, -2.0);
    scene.add(backRim);

    /* ── Bouncing Character Group ── */
    const rotGroup = new THREE.Group();
    scene.add(rotGroup);

    /* ─────────────────────────────────────────────────────────────
       BOUNCING 3D CHARACTER (Single photo, blended from bottom)
    ───────────────────────────────────────────────────────────── */
    const CHAR_H = 2.85;
    const CHAR_W = 2.85 * (392 / 1024); // ~1.09
    const charGeo = createCurvedStandeeGeometry(CHAR_W, CHAR_H);

    // Front Material (single user photo: shivam_single.png)
    const frontMat = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      alphaTest: 0.015,
    });
    applyBottomFade(frontMat);

    const frontMesh = new THREE.Mesh(charGeo, frontMat);
    frontMesh.position.set(0, 0, 0);
    rotGroup.add(frontMesh);

    // Subtle soft acrylic depth rim
    const rMat = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      alphaTest: 0.02,
      opacity: 0.22,
    });
    applyBottomFade(rMat);
    const rMesh = new THREE.Mesh(charGeo, rMat);
    rMesh.position.set(0, 0, -0.015);
    rotGroup.add(rMesh);

    /* ── Single Texture Loading ── */
    const loader = new THREE.TextureLoader();
    loader.load("/shivam_single.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      frontMat.map = tex;
      frontMat.needsUpdate = true;

      rMat.map = tex;
      rMat.needsUpdate = true;
    });

    /* ── Soft Floating Atmospheric Dust Motes ── */
    const PC = 30;
    const pp = new Float32Array(PC * 3);
    const pvy = new Float32Array(PC);
    for (let i = 0; i < PC; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.4 + Math.random() * 0.8;
      pp[i * 3] = Math.cos(a) * r;
      pp[i * 3 + 1] = -1.2 + Math.random() * 2.6;
      pp[i * 3 + 2] = Math.sin(a) * r;
      pvy[i] = 0.003 + Math.random() * 0.004;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pp.slice(), 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── Mouse Parallax / Interactive Tilt (Zero forced reflows) ── */
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible || !isTabVisible) return;
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── Animation Loop: Lively Buoyant Bounce (Only runs when in view) ── */
    let animId: number;
    const clock = new THREE.Clock();
    const ppa = pGeo.attributes.position;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible || !isTabVisible) return;

      const t = clock.getElapsedTime();

      // No continuous 360° rotation! Character stays facing forward with gentle interactive tilt
      rotGroup.rotation.y = mouseX * 0.14;
      rotGroup.rotation.x = -mouseY * 0.08 + Math.sin(t * 1.1) * 0.02;

      // Slow, serene floating & gentle bounce
      rotGroup.position.y = Math.sin(t * 0.85) * 0.06;

      // Micro squash & stretch bounce effect (slow & subtle)
      const bounceSquash = Math.sin(t * 0.85);
      rotGroup.scale.y = 1.0 + bounceSquash * 0.008;
      rotGroup.scale.x = 1.0 - bounceSquash * 0.005;

      // Soft particles floating upward
      for (let i = 0; i < PC; i++) {
        let y = ppa.getY(i) + pvy[i];
        if (y > 1.6) y = -1.4;
        ppa.setY(i, y);
      }
      ppa.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    /* ── IntersectionObserver: Pause when out of view ── */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    /* ── Tab visibility ── */
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* ── Resize Handler ── */
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      charGeo.dispose();
      frontMat.dispose();
      rMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
