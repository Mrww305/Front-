import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalleryScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      100
    );
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0x332255, 0.4);
    scene.add(amb);
    const p1 = new THREE.PointLight(0xec4899, 2.2, 20);
    p1.position.set(5, 5, 5);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x8b5cf6, 1.8, 20);
    p2.position.set(-5, -5, 3);
    scene.add(p2);

    // Outer Ring: 12 Dodecahedrons with dynamic HSL spectral distribution
    const shapes: THREE.Mesh[] = [];
    const outerGeo = new THREE.DodecahedronGeometry(0.48);

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const r = 4.2;
      const hue = i / 12;
      const color = new THREE.Color().setHSL(hue, 0.75, 0.55);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.75,
        emissive: color,
        emissiveIntensity: 0.2,
      });
      const mesh = new THREE.Mesh(outerGeo, mat);
      mesh.position.set(Math.cos(angle) * r, Math.sin(i * 0.8) * 2, Math.sin(angle) * r);
      mesh.userData = {
        baseY: mesh.position.y,
        phase: i * 0.5,
        angle,
        radius: r
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Inner Ring: 8 Octahedrons
    const innerGeo = new THREE.OctahedronGeometry(0.32);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.35;
      const r = 2.2;
      const color = new THREE.Color().setHSL((i / 8 + 0.5) % 1, 0.85, 0.6);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.25,
      });
      const mesh = new THREE.Mesh(innerGeo, mat);
      mesh.position.set(Math.cos(angle) * r, Math.sin(i) * 1, Math.sin(angle) * r);
      mesh.userData = {
        baseY: mesh.position.y,
        phase: i * 0.7 + 2,
        angle,
        radius: r
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Stellar Particles
    const sCount = 500;
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 30;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
    });
    const stars = new THREE.Points(sGeo, sMat);
    scene.add(stars);

    let mouseX = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      shapes.forEach((s) => {
        s.position.y = s.userData.baseY + Math.sin(time + s.userData.phase) * 0.55;
        s.rotation.x = time * 0.5;
        s.rotation.y = time * 0.3;
      });

      stars.rotation.y = time * 0.015;

      camera.position.x += (Math.sin(time * 0.15) * 1.2 + mouseX - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      sGeo.dispose();
      sMat.dispose();
      shapes.forEach((s) => {
        if (Array.isArray(s.material)) {
          s.material.forEach((m) => m.dispose());
        } else {
          s.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="gallery3d"
      className="w-full h-[400px] md:h-[520px] rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10"
      aria-label="3D gallery with floating geometric shapes"
      role="img"
    />
  );
}
