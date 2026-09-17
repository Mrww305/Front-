import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ShowcaseScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

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
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const amb = new THREE.AmbientLight(0x332255, 0.5);
    scene.add(amb);
    const p1 = new THREE.PointLight(0x8b5cf6, 2.5, 20);
    p1.position.set(5, 5, 5);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xec4899, 2, 20);
    p2.position.set(-5, -5, 3);
    scene.add(p2);
    const p3 = new THREE.PointLight(0x06b6d4, 1.5, 20);
    p3.position.set(0, 5, -5);
    scene.add(p3);

    // Central Chamfered / Subdivided Box
    const boxGeo = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.12,
      metalness: 0.9,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    scene.add(box);

    // Inner glowing core
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    box.add(core);

    // Orbiting geometries
    const shapes: THREE.Mesh[] = [];
    const geos = [
      new THREE.OctahedronGeometry(0.35),
      new THREE.TetrahedronGeometry(0.35),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.IcosahedronGeometry(0.3),
      new THREE.ConeGeometry(0.25, 0.5, 8),
      new THREE.TorusGeometry(0.25, 0.1, 8, 16),
    ];
    const colors = [0x8b5cf6, 0x06b6d4, 0xec4899, 0xf59e0b, 0x10b981, 0xef4444];

    for (let i = 0; i < 6; i++) {
      const m = new THREE.MeshStandardMaterial({
        color: colors[i],
        roughness: 0.2,
        metalness: 0.8,
        emissive: colors[i],
        emissiveIntensity: 0.35,
      });
      const mesh = new THREE.Mesh(geos[i], m);
      mesh.userData = {
        angle: i * ((Math.PI * 2) / 6),
        radius: 3.4,
        speed: 0.35 + (i % 3) * 0.1,
        yFreq: 0.6 + i * 0.15,
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Particles cloud
    const pCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 15;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Interactive Drag to Rotate with velocity damping
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0;
    let rotY = 0;
    let velX = 0;
    let velY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velY = dx * 0.006;
      velX = dy * 0.006;
      rotY += velY;
      rotX += velX;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        setTimeout(() => setIsInteracting(false), 800);
      }
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      velY = dx * 0.006;
      velX = dy * 0.006;
      rotY += velY;
      rotX += velX;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        rotX += velX;
        rotY += velY;
      }

      box.rotation.y = time * 0.3 + rotY;
      box.rotation.x = time * 0.2 + rotX;

      core.rotation.y = -time * 0.5;
      core.rotation.x = -time * 0.4;

      shapes.forEach((s) => {
        const d = s.userData;
        d.angle += 0.009 * d.speed;
        s.position.x = Math.cos(d.angle) * d.radius;
        s.position.z = Math.sin(d.angle) * d.radius;
        s.position.y = Math.sin(time * d.yFreq) * 1.5;
        s.rotation.x = time * 1.2;
        s.rotation.y = time * 0.8;
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
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      boxMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      geos.forEach((g) => g.dispose());
      shapes.forEach((s) => {
        if (Array.isArray(s.material)) {
          s.material.forEach((m) => m.dispose());
        } else {
          s.material.dispose();
        }
      });
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full group">
      <div
        ref={containerRef}
        id="showcase3d"
        className="w-full h-full min-h-[360px] md:min-h-[480px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 bg-white/[0.02] touch-pan-y"
        aria-label="Interactive 3D product showcase - drag to rotate"
        role="img"
      />
      <div
        className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide backdrop-blur-md border transition-all pointer-events-none ${
          isInteracting
            ? 'bg-violet-600/40 border-violet-400 text-white shadow-lg shadow-violet-500/20'
            : 'bg-black/60 border-white/10 text-white/70'
        }`}
      >
        ✦ {isInteracting ? 'Rotating 3D Scene' : 'Click & Drag to Rotate'}
      </div>
    </div>
  );
}
