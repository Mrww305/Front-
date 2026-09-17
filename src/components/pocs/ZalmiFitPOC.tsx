import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Zap,
  Flame,
  Heart,
  Activity,
  Trophy,
  Award,
  ChevronRight,
  TrendingUp,
  Shield,
  UserCheck
} from 'lucide-react';

interface BiometricZone {
  id: string;
  name: string;
  status: 'Optimal' | 'Fatigued' | 'Elevated Stress';
  metric: string;
  recommendation: string;
}

const ZONES: BiometricZone[] = [
  {
    id: 'shoulder',
    name: 'Right Rotator Cuff (Bowling Arm)',
    status: 'Elevated Stress',
    metric: '142.4 km/h release torque • 86% capacity',
    recommendation: 'Cryotherapy protocol + 20 min isometric rotator cuff stabilization.'
  },
  {
    id: 'knee',
    name: 'Left Patellar Tendon (Delivery Stride)',
    status: 'Fatigued',
    metric: '5.8x bodyweight ground impact load',
    recommendation: 'Eccentric decline board squats; reduce high-impact sprint drill volume.'
  },
  {
    id: 'core',
    name: 'Thoracolumbar Spine & Core',
    status: 'Optimal',
    metric: 'Core rotational torque: 420 Nm',
    recommendation: 'Baseline maintained; proceed with plyometric medicine ball throws.'
  },
  {
    id: 'hamstring',
    name: 'Biceps Femoris (Sprinting Deceleration)',
    status: 'Optimal',
    metric: 'Peak sprint: 31.4 km/h between wickets',
    recommendation: 'Optimal muscular elasticity; dynamic stretching complete.'
  }
];

export default function ZalmiFitPOC() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedZone, setSelectedZone] = useState<BiometricZone>(ZONES[0]);
  const [fanSteps, setFanSteps] = useState<number>(12840);
  const [heartRate, setHeartRate] = useState<number>(144);
  const [calories, setCalories] = useState<number>(842);
  const [isSimulatingRun, setIsSimulatingRun] = useState<boolean>(false);

  // Three.js Hologram Player Rig
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const w = canvas.parentElement?.clientWidth || 500;
    const h = canvas.parentElement?.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Zalmi Yellow / Cyan lighting
    const amb = new THREE.AmbientLight(0xfacc15, 0.4);
    scene.add(amb);
    const p1 = new THREE.PointLight(0xfacc15, 2, 20);
    p1.position.set(3, 4, 3);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x38bdf8, 1.5, 20);
    p2.position.set(-3, -2, 2);
    scene.add(p2);

    // Player Hologram Wireframe Nodes
    const playerGroup = new THREE.Group();
    scene.add(playerGroup);

    // Head
    const headGeo = new THREE.IcosahedronGeometry(0.35, 2);
    const holoMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      wireframe: true,
      emissive: 0xca8a04,
      emissiveIntensity: 0.3
    });
    const head = new THREE.Mesh(headGeo, holoMat);
    head.position.y = 2.1;
    playerGroup.add(head);

    // Torso / Chest
    const torsoGeo = new THREE.CylinderGeometry(0.5, 0.35, 1.2, 8);
    const torso = new THREE.Mesh(torsoGeo, holoMat);
    torso.position.y = 1.2;
    playerGroup.add(torso);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 1.1, 6);
    const leftArm = new THREE.Mesh(armGeo, holoMat);
    leftArm.position.set(-0.7, 1.2, 0);
    leftArm.rotation.z = 0.3;
    playerGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, holoMat);
    rightArm.position.set(0.7, 1.2, 0);
    rightArm.rotation.z = -0.3;
    playerGroup.add(rightArm);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.15, 0.1, 1.4, 6);
    const leftLeg = new THREE.Mesh(legGeo, holoMat);
    leftLeg.position.set(-0.35, -0.2, 0);
    playerGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, holoMat);
    rightLeg.position.set(0.35, -0.2, 0);
    playerGroup.add(rightLeg);

    // Interactive Marker Spheres for Zones
    const shoulderMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    shoulderMarker.position.set(0.65, 1.7, 0.1);
    playerGroup.add(shoulderMarker);

    const kneeMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    kneeMarker.position.set(-0.35, -0.3, 0.15);
    playerGroup.add(kneeMarker);

    // Holographic Base Ring
    const ringGeo = new THREE.RingGeometry(1.2, 1.6, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, wireframe: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.9;
    scene.add(ring);

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;
      playerGroup.rotation.y = Math.sin(time * 0.8) * 0.5;
      ring.rotation.z = time * 0.5;

      const pulse = 1 + Math.sin(time * 6) * 0.2;
      shoulderMarker.scale.set(pulse, pulse, pulse);
      kneeMarker.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = canvas.parentElement?.clientWidth || 500;
      const height = canvas.parentElement?.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Live Workout Simulation
  useEffect(() => {
    if (!isSimulatingRun) return;
    const interval = setInterval(() => {
      setFanSteps((s) => s + 12);
      setCalories((c) => c + 1);
      setHeartRate((h) => (h < 165 ? h + 1 : 162 + Math.floor(Math.random() * 4)));
    }, 400);
    return () => clearInterval(interval);
  }, [isSimulatingRun]);

  return (
    <div className="w-full bg-[#050814] border border-yellow-500/30 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Zalmi Branded Header */}
      <div className="p-3.5 sm:p-6 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-950/40 via-[#050814] to-yellow-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-yellow-400 text-black font-black flex items-center justify-center font-display text-base sm:text-lg shadow-lg shadow-yellow-400/30 shrink-0">
            Z
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg font-black tracking-wide flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-yellow-400">ZALMI FIT</span>
              <span className="text-[11px] sm:text-xs text-neutral-300 font-semibold">• PESHAWAR ZALMI</span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Elite Athlete Biometrics • Fan Arena • Babar Benchmark
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsSimulatingRun(!isSimulatingRun)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold font-mono flex items-center gap-1.5 sm:gap-2 transition-all shadow-md ${
              isSimulatingRun
                ? 'bg-yellow-400 text-black animate-pulse'
                : 'bg-white/10 hover:bg-white/15 text-white border border-yellow-500/30'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isSimulatingRun ? 'Live Active' : 'Start HIIT Run'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Biometric Rig vs Fan Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: 3D Hologram Stage */}
        <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] bg-radial-at-c from-yellow-900/20 via-[#040612] to-black border-b lg:border-b-0 lg:border-r border-yellow-500/20 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Hologram Overlay Banner */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-yellow-500/30 text-xs font-mono">
            <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
              Zalmi Fast Bowler Telemetry
            </span>
            <span className="text-white font-bold">Rig: PSL Match Intensity #07</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar">
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all border ${
                  selectedZone.id === zone.id
                    ? 'bg-yellow-400 text-black font-bold border-yellow-300'
                    : 'bg-black/70 text-neutral-300 border-white/10 hover:border-yellow-400/50'
                }`}
              >
                {zone.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Telemetry & Fan Challenge Dashboard */}
        <div className="lg:col-span-6 p-4 sm:p-6 space-y-6 flex flex-col justify-between bg-black/40">
          {/* Selected Biometric Inspection Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-yellow-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold">
                {selectedZone.name}
              </span>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  selectedZone.status === 'Optimal'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : selectedZone.status === 'Fatigued'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {selectedZone.status}
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-200">{selectedZone.metric}</p>
            <div className="p-2.5 rounded-xl bg-black/60 text-xs text-neutral-300 border border-white/5 flex items-start gap-2">
              <Shield className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <span>{selectedZone.recommendation}</span>
            </div>
          </div>

          {/* Fan Live Telemetry Counters */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-neutral-400 font-mono mb-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> Steps
              </div>
              <div className="font-display text-lg sm:text-xl font-black text-yellow-400">
                {fanSteps.toLocaleString()}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-neutral-400 font-mono mb-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> BPM
              </div>
              <div className="font-display text-lg sm:text-xl font-black text-rose-400">
                {heartRate}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-neutral-400 font-mono mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> KCal
              </div>
              <div className="font-display text-lg sm:text-xl font-black text-amber-300">
                {calories}
              </div>
            </div>
          </div>

          {/* Babar Azam Benchmark Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">PSL Fan Challenge #4</span>
                <span className="text-[11px] text-neutral-400">
                  Target: 15,000 steps • Babar Azam Score: 98.6%
                </span>
              </div>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-yellow-400 font-bold">{((fanSteps / 15000) * 100).toFixed(0)}%</span>
              <span className="text-[10px] text-neutral-500 block">Rank #142</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
