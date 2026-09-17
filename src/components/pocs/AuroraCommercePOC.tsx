import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ShoppingBag, Eye, Sparkles, Sun, Moon, Flame, Camera, Check, RotateCcw } from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  color: number;
  roughness: number;
  metalness: number;
  emissive?: number;
  price: number;
  strapColor: string;
}

const MATERIALS: MaterialOption[] = [
  { id: 'titanium', name: 'Space Obsidian Titanium', color: 0x181822, roughness: 0.25, metalness: 0.95, price: 1299, strapColor: '#121218' },
  { id: 'rosegold', name: '18K Imperial Rose Gold', color: 0xdf8d7e, roughness: 0.18, metalness: 0.9, price: 2199, strapColor: '#2b1e1d' },
  { id: 'ceramic', name: 'Alpine Ceramic White', color: 0xf1f3f9, roughness: 0.1, metalness: 0.35, price: 1799, strapColor: '#d4d8e2' },
  { id: 'cyan', name: 'Cyber Cyan Anodized', color: 0x06b6d4, roughness: 0.2, metalness: 0.85, emissive: 0x024555, price: 1499, strapColor: '#0c222b' },
];

export default function AuroraCommercePOC() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedMat, setSelectedMat] = useState<MaterialOption>(MATERIALS[0]);
  const [lightingMode, setLightingMode] = useState<'studio' | 'neon' | 'sunset'>('studio');
  const [arMode, setArMode] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // References for Three.js dynamic updates
  const watchMeshRef = useRef<{
    caseMesh: THREE.Mesh;
    bezelMesh: THREE.Mesh;
    strapMesh1: THREE.Mesh;
    strapMesh2: THREE.Mesh;
    p1: THREE.PointLight;
    p2: THREE.PointLight;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const w = canvas.parentElement?.clientWidth || 700;
    const h = canvas.parentElement?.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);

    const p1 = new THREE.PointLight(0xffffff, 2.5, 20);
    p1.position.set(4, 4, 4);
    scene.add(p1);

    const p2 = new THREE.PointLight(0x8b5cf6, 1.8, 20);
    p2.position.set(-4, -3, 3);
    scene.add(p2);

    // Watch Group
    const watchGroup = new THREE.Group();
    scene.add(watchGroup);

    // Watch Case (Cylinder)
    const caseGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.35, 32);
    const caseMat = new THREE.MeshStandardMaterial({
      color: selectedMat.color,
      roughness: selectedMat.roughness,
      metalness: selectedMat.metalness,
    });
    const caseMesh = new THREE.Mesh(caseGeo, caseMat);
    caseMesh.rotation.x = Math.PI / 2;
    watchGroup.add(caseMesh);

    // Watch Bezel Ring
    const bezelGeo = new THREE.TorusGeometry(1.22, 0.08, 16, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: selectedMat.color,
      roughness: 0.1,
      metalness: 0.95,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    watchGroup.add(bezelMesh);

    // Dial Face
    const dialGeo = new THREE.CircleGeometry(1.15, 32);
    const dialMat = new THREE.MeshStandardMaterial({
      color: 0x09090e,
      roughness: 0.3,
      metalness: 0.5,
    });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.position.z = 0.18;
    watchGroup.add(dialMesh);

    // Dial Hour markers
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const markerGeo = new THREE.BoxGeometry(0.04, 0.14, 0.02);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(Math.sin(angle) * 0.95, Math.cos(angle) * 0.95, 0.19);
      marker.rotation.z = -angle;
      watchGroup.add(marker);
    }

    // Hands
    const hourGeo = new THREE.BoxGeometry(0.06, 0.5, 0.02);
    const hourMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hourHand = new THREE.Mesh(hourGeo, hourMat);
    hourHand.position.set(0, 0.25, 0.2);
    watchGroup.add(hourHand);

    const minuteGeo = new THREE.BoxGeometry(0.04, 0.75, 0.02);
    const minuteMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const minuteHand = new THREE.Mesh(minuteGeo, minuteMat);
    minuteHand.position.set(0, 0.35, 0.21);
    watchGroup.add(minuteHand);

    // Crown button
    const crownGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);
    const crownMat = new THREE.MeshStandardMaterial({ color: selectedMat.color, metalness: 0.9, roughness: 0.2 });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.rotation.z = Math.PI / 2;
    crown.position.set(1.3, 0, 0);
    watchGroup.add(crown);

    // Straps
    const strapGeo = new THREE.BoxGeometry(1.0, 1.4, 0.15);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x1c1b22,
      roughness: 0.8,
      metalness: 0.1,
    });
    const strapMesh1 = new THREE.Mesh(strapGeo, strapMat);
    strapMesh1.position.set(0, 1.8, -0.05);
    watchGroup.add(strapMesh1);

    const strapMesh2 = new THREE.Mesh(strapGeo, strapMat);
    strapMesh2.position.set(0, -1.8, -0.05);
    watchGroup.add(strapMesh2);

    watchMeshRef.current = { caseMesh, bezelMesh, strapMesh1, strapMesh2, p1, p2 };

    // Drag-to-spin interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0.3;
    let rotY = 0.4;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotY += dx * 0.008;
      rotX += dy * 0.006;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Animate hands
      minuteHand.rotation.z = -time * 0.6;
      hourHand.rotation.z = -time * 0.08;

      if (!isDragging) {
        rotY += 0.004;
      }

      watchGroup.rotation.y = rotY;
      watchGroup.rotation.x = rotX;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = canvas.parentElement?.clientWidth || 700;
      const height = canvas.parentElement?.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix;
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update materials live when selected
  useEffect(() => {
    if (!watchMeshRef.current) return;
    const { caseMesh, bezelMesh, strapMesh1, strapMesh2 } = watchMeshRef.current;

    (caseMesh.material as THREE.MeshStandardMaterial).color.setHex(selectedMat.color);
    (caseMesh.material as THREE.MeshStandardMaterial).roughness = selectedMat.roughness;
    (caseMesh.material as THREE.MeshStandardMaterial).metalness = selectedMat.metalness;

    (bezelMesh.material as THREE.MeshStandardMaterial).color.setHex(selectedMat.color);
    (bezelMesh.material as THREE.MeshStandardMaterial).roughness = selectedMat.roughness;
    (bezelMesh.material as THREE.MeshStandardMaterial).metalness = selectedMat.metalness;

    const strapCol = new THREE.Color(selectedMat.strapColor);
    (strapMesh1.material as THREE.MeshStandardMaterial).color = strapCol;
    (strapMesh2.material as THREE.MeshStandardMaterial).color = strapCol;
  }, [selectedMat]);

  // Update lighting preset
  useEffect(() => {
    if (!watchMeshRef.current) return;
    const { p1, p2 } = watchMeshRef.current;

    if (lightingMode === 'studio') {
      p1.color.setHex(0xffffff);
      p1.intensity = 2.5;
      p2.color.setHex(0x99aacc);
      p2.intensity = 1.2;
    } else if (lightingMode === 'neon') {
      p1.color.setHex(0x06b6d4);
      p1.intensity = 3.2;
      p2.color.setHex(0xec4899);
      p2.intensity = 2.8;
    } else if (lightingMode === 'sunset') {
      p1.color.setHex(0xf59e0b);
      p1.intensity = 3.0;
      p2.color.setHex(0xef4444);
      p2.intensity = 2.0;
    }
  }, [lightingMode]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="w-full bg-[#07070d] border border-white/10 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Top Configurator Header */}
      <div className="p-3.5 sm:p-6 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Aurora 3D Configurator
          </span>
          <h4 className="font-display text-base sm:text-xl font-bold mt-1 truncate">Chronos Ultra Horizon 44mm</h4>
          <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
            Interactive PBR material shader inspection & WebXR AR simulation
          </p>
        </div>

        {/* Pricing Badge */}
        <div className="text-left sm:text-right self-start sm:self-auto">
          <span className="text-[9px] sm:text-[10px] text-neutral-400 block font-mono">STARTING FROM</span>
          <span className="font-display text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            ${selectedMat.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 3D Viewport with Lighting toggles and AR overlay */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-gradient-to-b from-[#0e0e1a] via-[#07070e] to-[#040407] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* AR Simulation Overlay */}
        {arMode && (
          <div className="absolute inset-0 pointer-events-none border-4 border-cyan-500/50 bg-cyan-950/10 flex flex-col items-center justify-between p-6 animate-pulse">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 text-xs font-mono">
              <Camera className="w-3.5 h-3.5" />
              <span>Simulated WebXR Surface Anchor: Locked</span>
            </div>
            <div className="w-48 h-48 border border-dashed border-cyan-400/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border border-cyan-300 rotate-45" />
            </div>
            <div className="text-xs font-mono text-cyan-300/80 bg-black/60 px-3 py-1 rounded-md">
              Target Scale: 1:1 Physical Metric
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute top-4 left-4 pointer-events-none text-xs text-white/50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono">
          ✦ Drag to rotate watch in 3D 360°
        </div>

        {/* Lighting Mode Selector */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setLightingMode('studio')}
            className={`p-2 rounded-xl transition-all ${
              lightingMode === 'studio' ? 'bg-white/20 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
            title="Studio Lighting"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('neon')}
            className={`p-2 rounded-xl transition-all ${
              lightingMode === 'neon' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/30' : 'text-neutral-400 hover:text-white'
            }`}
            title="Cyberpunk Neon"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('sunset')}
            className={`p-2 rounded-xl transition-all ${
              lightingMode === 'sunset' ? 'bg-amber-500/30 text-amber-300 border border-amber-400/30' : 'text-neutral-400 hover:text-white'
            }`}
            title="Golden Hour Sunset"
          >
            <Flame className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Left AR Toggle */}
        <div className="absolute bottom-4 left-4">
          <button
            type="button"
            onClick={() => setArMode(!arMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md border ${
              arMode
                ? 'bg-cyan-500 text-black border-cyan-300 font-bold'
                : 'bg-black/70 hover:bg-black/90 text-white border-white/15'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{arMode ? 'Exit AR View' : 'Simulate AR Placement'}</span>
          </button>
        </div>
      </div>

      {/* Material Finishes Customizer & Action Bar */}
      <div className="p-5 sm:p-6 border-t border-white/10 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Material Swatches */}
        <div className="w-full md:w-auto">
          <span className="text-xs text-neutral-400 font-mono block mb-2.5">
            FINISH: <strong className="text-white">{selectedMat.name}</strong>
          </span>
          <div className="flex items-center gap-3">
            {MATERIALS.map((mat) => {
              const isSelected = selectedMat.id === mat.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setSelectedMat(mat)}
                  className={`group relative p-1 rounded-2xl border transition-all ${
                    isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-105' : 'border-white/10 hover:border-white/30'
                  }`}
                  title={mat.name}
                >
                  <div
                    className="w-10 h-10 rounded-xl shadow-inner border border-white/20 transition-transform group-hover:scale-95"
                    style={{ backgroundColor: mat.strapColor }}
                  />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Order CTA */}
        <div className="w-full md:w-auto flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
              addedToCart
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/30 hover:scale-105 active:scale-95'
            }`}
          >
            {addedToCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Luxury Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Order Custom Build • ${selectedMat.price.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
