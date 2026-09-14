import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const getWidth = () => canvas.parentElement?.clientWidth || window.innerWidth;
    const getHeight = () => canvas.parentElement?.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, getWidth() / getHeight(), 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const amb = new THREE.AmbientLight(0x4422aa, 0.6);
    scene.add(amb);
    const p1 = new THREE.PointLight(0x8b5cf6, 2.5, 25);
    p1.position.set(5, 5, 5);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x06b6d4, 2, 25);
    p2.position.set(-5, -3, 3);
    scene.add(p2);
    const p3 = new THREE.PointLight(0xec4899, 1.5, 25);
    p3.position.set(0, 5, -5);
    scene.add(p3);

    // Central morphing sphere
    const geo = new THREE.IcosahedronGeometry(1.8, 64);
    const posAttr = geo.attributes.position;
    const origPositions = new Float32Array(posAttr.array);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.15,
      metalness: 0.9,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(2.05, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.14
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Particles system
    const pCount = 800;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.035,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Orbiting luminous spheres
    const orbs: THREE.Mesh[] = [];
    const orbColors = [0x06b6d4, 0xec4899, 0xf59e0b, 0x10b981];
    for (let i = 0; i < 4; i++) {
      const g = new THREE.SphereGeometry(0.22 + Math.random() * 0.12, 24, 24);
      const m = new THREE.MeshStandardMaterial({
        color: orbColors[i],
        roughness: 0.2,
        metalness: 0.8,
        emissive: orbColors[i],
        emissiveIntensity: 0.4
      });
      const o = new THREE.Mesh(g, m);
      o.userData = {
        angle: Math.random() * Math.PI * 2,
        radius: 3 + Math.random() * 1.5,
        speed: 0.4 + Math.random() * 0.3,
        yOff: Math.random() * 2 - 1
      };
      scene.add(o);
      orbs.push(o);
    }

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let targetCameraX = 0;
    let targetCameraY = 0;

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Distort vertices
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
          Math.sin(nx * 3 + time * 1.5) *
          Math.cos(ny * 3 + time * 1.2) *
          Math.sin(nz * 3 + time) *
          0.25;
        positions[i] = ox + nx * noise;
        positions[i + 1] = oy + ny * noise;
        positions[i + 2] = oz + nz * noise;
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      mesh.rotation.y = time * 0.2 + mouseX * 0.3;
      mesh.rotation.x = time * 0.15 + mouseY * 0.2;

      wireMesh.rotation.y = -time * 0.1;
      wireMesh.rotation.x = time * 0.08;

      particles.rotation.y = time * 0.03;
      particles.rotation.x = time * 0.02;

      orbs.forEach((o) => {
        const d = o.userData;
        d.angle += 0.006 * d.speed;
        o.position.x = Math.cos(d.angle) * d.radius;
        o.position.z = Math.sin(d.angle) * d.radius;
        o.position.y = Math.sin(time * d.speed + d.yOff) * 1.4;
      });

      targetCameraX += (mouseX * 0.6 - targetCameraX) * 0.03;
      targetCameraY += (-mouseY * 0.4 - targetCameraY) * 0.03;
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

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="heroCanvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
