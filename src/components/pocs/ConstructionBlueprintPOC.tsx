import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Building2,
  Layers,
  Eye,
  Ruler,
  Activity,
  Sliders,
  Maximize2,
  Compass,
  CheckCircle2,
  Box,
  Cpu
} from 'lucide-react';

export default function ConstructionBlueprintPOC() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFloor, setActiveFloor] = useState<number>(6); // 1 to 6
  const [materialMode, setMaterialMode] = useState<'steel' | 'concrete' | 'glass'>('steel');
  const [isSeismicActive, setIsSeismicActive] = useState<boolean>(false);
  const [caliperActive, setCaliperActive] = useState<boolean>(false);
  const [measurement, setMeasurement] = useState<string>('Span: 24.80 m (Bay 3-C)');
  const [cameraView, setCameraView] = useState<'iso' | 'top' | 'front'>('iso');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const w = canvas.parentElement?.clientWidth || 700;
    const h = canvas.parentElement?.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(10, 8, 12);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & directional blueprint lighting
    const amb = new THREE.AmbientLight(0x38bdf8, 0.6);
    scene.add(amb);
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(10, 15, 8);
    scene.add(sun);
    const blueFill = new THREE.PointLight(0x0284c7, 1.5, 30);
    blueFill.position.set(-8, 6, -8);
    scene.add(blueFill);

    // Foundation Grid Blueprint
    const grid = new THREE.GridHelper(16, 32, 0x0284c7, 0x0f172a);
    grid.position.y = 0;
    scene.add(grid);

    // Group for the entire architectural model
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Create 6 modular building floor tiers
    const floorGroups: THREE.Group[] = [];
    const floorHeight = 1.1;

    for (let f = 0; f < 6; f++) {
      const fGroup = new THREE.Group();
      fGroup.position.y = f * floorHeight;

      // Slab
      const slabColor = materialMode === 'concrete' ? 0x94a3b8 : materialMode === 'steel' ? 0x0284c7 : 0x38bdf8;
      const slabGeo = new THREE.BoxGeometry(6, 0.12, 6);
      const slabMat = new THREE.MeshStandardMaterial({
        color: slabColor,
        roughness: 0.3,
        metalness: materialMode === 'steel' ? 0.9 : 0.2,
        transparent: materialMode === 'glass',
        opacity: materialMode === 'glass' ? 0.45 : 0.95,
        wireframe: materialMode === 'steel' && f % 2 === 1,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      fGroup.add(slab);

      // Columns (4 corner columns + 4 perimeter columns)
      const colGeo = new THREE.CylinderGeometry(0.1, 0.1, floorHeight, 12);
      const colMat = new THREE.MeshStandardMaterial({
        color: materialMode === 'steel' ? 0xf59e0b : 0x64748b,
        metalness: 0.8,
        roughness: 0.2,
      });

      const offsets = [
        [-2.8, -2.8], [2.8, -2.8], [-2.8, 2.8], [2.8, 2.8],
        [0, -2.8], [0, 2.8], [-2.8, 0], [2.8, 0]
      ];

      offsets.forEach(([ox, oz]) => {
        const col = new THREE.Mesh(colGeo, colMat);
        col.position.set(ox, floorHeight / 2, oz);
        fGroup.add(col);
      });

      // Central elevator/stair core shaft
      const coreGeo = new THREE.BoxGeometry(1.6, floorHeight, 1.6);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(0, floorHeight / 2, 0);
      fGroup.add(core);

      // Perimeter Truss Cross-Beams
      const beamGeo = new THREE.BoxGeometry(5.8, 0.08, 0.08);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const b1 = new THREE.Mesh(beamGeo, beamMat);
      b1.position.set(0, floorHeight - 0.05, 2.8);
      fGroup.add(b1);
      const b2 = new THREE.Mesh(beamGeo, beamMat);
      b2.position.set(0, floorHeight - 0.05, -2.8);
      fGroup.add(b2);

      floorGroups.push(fGroup);
      buildingGroup.add(fGroup);
    }

    // Interactive Drag rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotY += dx * 0.005;
      rotX += dy * 0.003;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Update floor visibility based on slice slider
      floorGroups.forEach((fg, idx) => {
        fg.visible = idx < activeFloor;
      });

      // Camera orientation presets
      if (cameraView === 'iso') {
        camera.position.set(
          12 * Math.cos(time * 0.15 + rotY),
          8 + Math.sin(time * 0.1) * 0.5 + rotX * 5,
          12 * Math.sin(time * 0.15 + rotY)
        );
        camera.lookAt(0, 3, 0);
      } else if (cameraView === 'top') {
        camera.position.set(0, 16, 0.01);
        camera.lookAt(0, 0, 0);
      } else if (cameraView === 'front') {
        camera.position.set(0, 3.5, 14);
        camera.lookAt(0, 3.5, 0);
      }

      // Simulated Seismic deflection
      if (isSeismicActive) {
        buildingGroup.rotation.z = Math.sin(time * 8) * 0.04;
        buildingGroup.rotation.x = Math.cos(time * 6) * 0.03;
      } else {
        buildingGroup.rotation.z = 0;
        buildingGroup.rotation.x = 0;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = canvas.parentElement?.clientWidth || 700;
      const height = canvas.parentElement?.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
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
  }, [activeFloor, materialMode, isSeismicActive, cameraView]);

  return (
    <div className="w-full bg-[#050b14] border border-cyan-500/20 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Header Bar */}
      <div className="p-3.5 sm:p-6 border-b border-cyan-500/20 bg-cyan-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="truncate">Megnitoo Construction 3D CAD</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                BIM Engine
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Interactive structural engineering modeler • Floor slice • Seismic simulation
            </p>
          </div>
        </div>

        {/* Top Camera Presets */}
        <div className="flex items-center gap-1.5 font-mono text-xs self-start sm:self-auto">
          <span className="text-neutral-400 text-[11px] mr-1">Camera:</span>
          {(['iso', 'top', 'front'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setCameraView(mode)}
              className={`px-2.5 py-1 rounded-lg uppercase text-[11px] sm:text-xs transition-all border ${
                cameraView === mode
                  ? 'bg-cyan-500 text-black font-bold border-cyan-300 shadow-md shadow-cyan-500/30'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-radial-at-c from-cyan-950/30 via-[#030712] to-[#020617]">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Measurement HUD */}
        <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono space-y-1.5 shadow-xl">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" />
            <span>Interactive Caliper</span>
          </div>
          <div className="text-white font-semibold">{measurement}</div>
          <div className="text-[10px] text-neutral-400">Elevation: {(activeFloor * 3.4).toFixed(1)}m AGL</div>
        </div>

        {/* Project Technical Spec HUD */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-black/85 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Tower Alpha • Karachi Marina
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Zone 4 Seismic
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[10px] block">TOTAL AREA</span>
              <span className="text-white font-bold">142,500 sq ft</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[10px] block">PROGRESS</span>
              <span className="text-cyan-300 font-bold">84.2% Poured</span>
            </div>
          </div>
        </div>

        {/* Seismic Load Trigger */}
        <div className="absolute top-4 right-4">
          <button
            type="button"
            onClick={() => setIsSeismicActive(!isSeismicActive)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg backdrop-blur-md border ${
              isSeismicActive
                ? 'bg-amber-500 text-black border-amber-300 animate-pulse'
                : 'bg-black/70 hover:bg-black/90 border-white/15 text-neutral-300 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isSeismicActive ? 'Simulating Seismic Load (Zone 4)' : 'Test Seismic Deflection'}</span>
          </button>
        </div>
      </div>

      {/* Control Console Footer */}
      <div className="p-4 sm:p-6 border-t border-cyan-500/20 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Floor-by-Floor Slicing Slider */}
        <div className="w-full md:w-1/2 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Floor Level Slicing:</span>
            </span>
            <span className="text-cyan-300 font-bold">
              {activeFloor === 6 ? 'Full Superstructure (L1 - L6 Roof)' : `Floor L${activeFloor} Cross-Section`}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={activeFloor}
            onChange={(e) => setActiveFloor(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Material Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-2">PBR Material:</span>
          {(['steel', 'concrete', 'glass'] as const).map((mat) => (
            <button
              key={mat}
              type="button"
              onClick={() => setMaterialMode(mat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all border ${
                materialMode === mat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
