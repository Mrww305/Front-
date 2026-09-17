import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroSceneProps {
  onNodeClick?: () => void;
  activeColorMode?: 'celestial' | 'cyberpunk' | 'aurora';
}

export default function HeroScene({ activeColorMode = 'celestial' }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const getWidth = () => canvas.parentElement?.clientWidth || window.innerWidth;
    const getHeight = () => canvas.parentElement?.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(58, getWidth() / getHeight(), 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Color Palette
    const palette = {
      celestial: {
        primary: 0x8b5cf6, // Violet
        wire: 0x06b6d4,    // Cyan
        core: 0xec4899,    // Pink
        light1: 0x8b5cf6,
        light2: 0x06b6d4,
        particles: 0xa78bfa,
      },
      cyberpunk: {
        primary: 0xec4899,
        wire: 0xf59e0b,
        core: 0x8b5cf6,
        light1: 0xec4899,
        light2: 0x06b6d4,
        particles: 0xf43f5e,
      },
      aurora: {
        primary: 0x10b981,
        wire: 0x06b6d4,
        core: 0x6366f1,
        light1: 0x10b981,
        light2: 0x06b6d4,
        particles: 0x34d399,
      }
    }[activeColorMode];

    // Lighting Setup
    const amb = new THREE.AmbientLight(0x2d1b69, 0.7);
    scene.add(amb);

    const p1 = new THREE.PointLight(palette.light1, 2.8, 25);
    p1.position.set(5, 5, 5);
    scene.add(p1);

    const p2 = new THREE.PointLight(palette.light2, 2.2, 25);
    p2.position.set(-5, -3, 3);
    scene.add(p2);

    const p3 = new THREE.PointLight(0xffffff, 1.2, 20);
    p3.position.set(0, 4, -4);
    scene.add(p3);

    // Main Morphing Core Icosahedron with High Subdivision
    const geo = new THREE.IcosahedronGeometry(1.75, 64);
    const posAttr = geo.attributes.position;
    const origPositions = new Float32Array(posAttr.array);
    const mat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      roughness: 0.12,
      metalness: 0.88,
      emissive: palette.primary,
      emissiveIntensity: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Glowing Inner Plasma Core
    const innerGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: palette.core,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer Geometric Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(2.15, 12);
    const wireMat = new THREE.MeshBasicMaterial({
      color: palette.wire,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Double Ring of Spatial Orbiting Quantum Rings
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: palette.wire,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.2, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: palette.core,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // Rich Particle Starfield
    const pCount = 1100;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pScales = new Float32Array(pCount);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 24;
      pScales[i] = Math.random() * 0.035 + 0.015;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: palette.particles,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Satellite Luminous Spheres
    const orbs: THREE.Mesh[] = [];
    const orbColors = [0x06b6d4, 0xec4899, 0xf59e0b, 0x10b981, 0x8b5cf6];
    for (let i = 0; i < 5; i++) {
      const g = new THREE.SphereGeometry(0.18 + (i % 2) * 0.08, 20, 20);
      const m = new THREE.MeshStandardMaterial({
        color: orbColors[i],
        roughness: 0.15,
        metalness: 0.85,
        emissive: orbColors[i],
        emissiveIntensity: 0.45,
      });
      const o = new THREE.Mesh(g, m);
      o.userData = {
        angle: (i / 5) * Math.PI * 2,
        radius: 2.9 + (i % 3) * 0.6,
        speed: 0.4 + (i % 2) * 0.3,
        yOff: ((i % 3) - 1) * 0.8,
      };
      scene.add(o);
      orbs.push(o);
    }

    // Pointer Inertia Tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Render Animation Loop
    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Harmonic Vertex Displacement
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const ox = origPositions[i];
        const oy = origPositions[i + 1];
        const oz = origPositions[i + 2];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len;
        const ny = oy / len;
        const nz = oz / len;

        const noise =
          Math.sin(nx * 3.2 + time * 1.6) *
          Math.cos(ny * 3.2 + time * 1.3) *
          Math.sin(nz * 3.2 + time * 0.9) *
          0.26;

        positions[i] = ox + nx * noise;
        positions[i + 1] = oy + ny * noise;
        positions[i + 2] = oz + nz * noise;
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      // Fluid Rotations with Mouse Spring
      mesh.rotation.y = time * 0.22 + mouseX * 0.35;
      mesh.rotation.x = time * 0.14 + mouseY * 0.25;

      innerMesh.rotation.y = -time * 0.35;
      innerMesh.rotation.z = time * 0.2;

      wireMesh.rotation.y = -time * 0.12;
      wireMesh.rotation.x = time * 0.09;

      ring1.rotation.z = time * 0.18;
      ring2.rotation.z = -time * 0.14;

      particles.rotation.y = time * 0.025;
      particles.rotation.x = time * 0.015;

      orbs.forEach((o) => {
        const d = o.userData;
        d.angle += 0.007 * d.speed;
        o.position.x = Math.cos(d.angle) * d.radius;
        o.position.z = Math.sin(d.angle) * d.radius;
        o.position.y = Math.sin(time * d.speed + d.yOff) * 1.3;
      });

      // Camera Damping
      targetCameraX += (mouseX * 0.7 - targetCameraX) * 0.035;
      targetCameraY += (-mouseY * 0.5 - targetCameraY) * 0.035;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = getWidth();
      const height = getHeight();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      pGeo.dispose();
      pMat.dispose();
      orbs.forEach((o) => {
        o.geometry.dispose();
        if (Array.isArray(o.material)) {
          o.material.forEach((m) => m.dispose());
        } else {
          o.material.dispose();
        }
      });
    };
  }, [activeColorMode]);

  return (
    <canvas
      ref={canvasRef}
      id="heroCanvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
