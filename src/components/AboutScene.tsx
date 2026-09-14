import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AboutScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0x4422aa, 0.5);
    scene.add(amb);
    const p1 = new THREE.PointLight(0x8b5cf6, 2.5, 20);
    p1.position.set(5, 5, 5);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x06b6d4, 1.8, 20);
    p2.position.set(-5, -3, 3);
    scene.add(p2);

    const torusGeo = new THREE.TorusKnotGeometry(1, 0.35, 128, 32);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.12,
      metalness: 0.88,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // Orbiting spheres
    const orbiters: THREE.Mesh[] = [];
    const colors = [0x8b5cf6, 0x06b6d4, 0xec4899, 0xf59e0b, 0x10b981];
    for (let i = 0; i < 5; i++) {
      const g = new THREE.SphereGeometry(0.14, 20, 20);
      const m = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      });
      const o = new THREE.Mesh(g, m);
      o.userData = {
        angle: i * ((Math.PI * 2) / 5),
        radius: 2.1 + (i % 2) * 0.4,
        speed: 0.6 + i * 0.1,
      };
      scene.add(o);
      orbiters.push(o);
    }

    let isHovered = false;
    const onEnter = () => { isHovered = true; };
    const onLeave = () => { isHovered = false; };
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;
      const speedMult = isHovered ? 1.6 : 1.0;

      torus.rotation.x = time * 0.3 * speedMult;
      torus.rotation.y = time * 0.5 * speedMult;

      orbiters.forEach((o) => {
        const d = o.userData;
        d.angle += 0.012 * d.speed * speedMult;
        o.position.x = Math.cos(d.angle) * d.radius;
        o.position.z = Math.sin(d.angle) * d.radius;
        o.position.y = Math.sin(time * d.speed) * 0.85;
      });

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
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      orbiters.forEach((o) => {
        o.geometry.dispose();
        if (Array.isArray(o.material)) {
          o.material.forEach((m) => m.dispose());
        } else {
          o.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="about3d"
      className="w-full h-full relative cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden"
      aria-label="Interactive 3D decorative Torus animation"
      role="img"
    />
  );
}
