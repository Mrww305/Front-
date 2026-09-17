import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Activity,
  Zap,
  Filter,
  Radio,
  Terminal,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Gauge,
  Cpu,
  Workflow,
  Network
} from 'lucide-react';

interface ClusterNode {
  id: string;
  name: string;
  category: 'Edge' | 'Compute' | 'Database' | 'Queue' | 'Storage';
  pos: [number, number, number];
  color: number;
  status: 'optimal' | 'syncing' | 'heavy-load';
  load: number;
  latency: number;
  ip: string;
}

interface DebugLog {
  id: string;
  timestamp: string;
  level: 'TRACE' | 'METRIC' | 'HEALTH' | 'ACK';
  node: string;
  message: string;
  latency: number;
}

const NODES_DATA: ClusterNode[] = [
  { id: 'core', name: 'Global Dispatch Core', category: 'Edge', pos: [0, 0, 0], color: 0x8b5cf6, status: 'optimal', load: 38, latency: 0.9, ip: '10.0.0.1' },
  { id: 'us-east', name: 'Compute Node East-1', category: 'Compute', pos: [2.5, 1.2, 0.8], color: 0x06b6d4, status: 'optimal', load: 45, latency: 1.8, ip: '10.0.1.12' },
  { id: 'eu-west', name: 'Compute Node West-2', category: 'Compute', pos: [-2.4, 1.4, -0.6], color: 0x06b6d4, status: 'optimal', load: 42, latency: 2.1, ip: '10.0.2.15' },
  { id: 'ap-south', name: 'Vector DB Spanner', category: 'Database', pos: [1.8, -1.8, 1.2], color: 0xec4899, status: 'optimal', load: 52, latency: 1.4, ip: '10.0.3.8' },
  { id: 'sa-east', name: 'Telemetry Stream Queue', category: 'Queue', pos: [-2.0, -1.5, -1.0], color: 0xf59e0b, status: 'optimal', load: 48, latency: 2.2, ip: '10.0.4.5' },
  { id: 'edge-cache', name: 'NVMe L1 Edge Cluster', category: 'Edge', pos: [0.2, 2.5, -1.5], color: 0x10b981, status: 'optimal', load: 31, latency: 0.7, ip: '10.0.5.2' },
  { id: 'geo-dns', name: 'Anycast DNS Fabric', category: 'Storage', pos: [-1.2, 0.6, 2.4], color: 0x3b82f6, status: 'optimal', load: 28, latency: 1.1, ip: '10.0.6.9' },
];

export default function NebulaDashboardPOC() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<ClusterNode>(NODES_DATA[0]);
  const [eventsPerSec, setEventsPerSec] = useState(4820150);
  const [surgeActive, setSurgeActive] = useState(false);
  const [activeRegion, setActiveRegion] = useState<'ALL' | 'EDGE' | 'COMPUTE' | 'DB'>('ALL');
  const [lowLatencyProtocol, setLowLatencyProtocol] = useState(true);
  const [showDebugger, setShowDebugger] = useState(false);
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([
    { id: '1', timestamp: '00:00:01.042', level: 'HEALTH', node: 'core', message: 'All 7 cluster nodes synchronized in full mesh topology', latency: 0.9 },
    { id: '2', timestamp: '00:00:01.118', level: 'ACK', node: 'edge-cache', message: 'QUIC zero-RTT socket connected to Anycast DNS Fabric', latency: 0.7 },
    { id: '3', timestamp: '00:00:01.194', level: 'TRACE', node: 'us-east', message: 'Bi-directional Conduit packet route established', latency: 1.8 },
  ]);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [logFilter, setLogFilter] = useState<'ALL' | 'TRACE' | 'HEALTH' | 'ACK'>('ALL');

  // Live real-time debug log feed
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomNode = NODES_DATA[Math.floor(Math.random() * NODES_DATA.length)];
      const levels: ('TRACE' | 'METRIC' | 'HEALTH' | 'ACK')[] = ['TRACE', 'ACK', 'HEALTH', 'METRIC'];
      const lvl = levels[Math.floor(Math.random() * levels.length)];

      const baseLatency = lowLatencyProtocol ? (Math.random() * 1.2 + 0.8) : (Math.random() * 2.8 + 2.0);
      const messages = [
        `Conduit sync ACK received via node ${randomNode.name}`,
        `Packet pipeline flushed 128KB frame with zero dropped packets`,
        `Kernel eBPF filter verified socket throughput`,
        `Direct memory map IPC channel open`,
        `Full-mesh route verified: 21 interconnected channels active`,
      ];

      const newLog: DebugLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: timeStr,
        level: lvl,
        node: randomNode.id,
        message: messages[Math.floor(Math.random() * messages.length)],
        latency: parseFloat(baseLatency.toFixed(2)),
      };

      setDebugLogs((prev) => [newLog, ...prev.slice(0, 39)]);
      setEventsPerSec((prev) => prev + Math.floor((Math.random() - 0.48) * 1500));
    }, 900);

    return () => clearInterval(interval);
  }, [lowLatencyProtocol]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const w = canvas.parentElement?.clientWidth || 700;
    const h = canvas.parentElement?.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 1.8, 6.8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const amb = new THREE.AmbientLight(0x332255, 0.9);
    scene.add(amb);
    const p1 = new THREE.PointLight(0x8b5cf6, 2.5, 25);
    p1.position.set(5, 5, 5);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x06b6d4, 2.5, 25);
    p2.position.set(-5, -5, 3);
    scene.add(p2);

    // Floor Grid
    const grid = new THREE.GridHelper(12, 24, 0x8b5cf6, 0x1e1b4b);
    grid.position.y = -2.6;
    scene.add(grid);

    // Node & Line Groups
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    const nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; data: ClusterNode }[] = [];

    // Create all 7 nodes
    NODES_DATA.forEach((n) => {
      const isCore = n.id === 'core';
      const geo = isCore
        ? new THREE.IcosahedronGeometry(0.55, 2)
        : new THREE.SphereGeometry(0.3, 24, 24);

      const mat = new THREE.MeshStandardMaterial({
        color: n.color,
        emissive: n.color,
        emissiveIntensity: isCore ? 0.7 : 0.45,
        roughness: 0.18,
        metalness: 0.85,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...n.pos);

      // Orbiting wireframe halo
      const haloGeo = new THREE.SphereGeometry(isCore ? 0.75 : 0.42, 14, 14);
      const haloMat = new THREE.MeshBasicMaterial({
        color: n.color,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(mesh.position);

      nodeGroup.add(mesh);
      nodeGroup.add(halo);
      nodeMeshes.push({ mesh, halo, data: n });
    });

    // FULL-MESH INTERCONNECTIONS (Every node connected to core + redundant rings + cross-layer bridges)
    const connections: [THREE.Vector3, THREE.Vector3, number][] = [];
    const corePos = new THREE.Vector3(...NODES_DATA[0].pos);

    // 1. Core to all peripheral nodes
    for (let i = 1; i < NODES_DATA.length; i++) {
      const p = new THREE.Vector3(...NODES_DATA[i].pos);
      connections.push([corePos, p, NODES_DATA[i].color]);
    }

    // 2. Peripheral Ring (Node i to Node i+1)
    for (let i = 1; i < NODES_DATA.length; i++) {
      const nextIdx = i === NODES_DATA.length - 1 ? 1 : i + 1;
      connections.push([
        new THREE.Vector3(...NODES_DATA[i].pos),
        new THREE.Vector3(...NODES_DATA[nextIdx].pos),
        0x06b6d4,
      ]);
    }

    // 3. Cross-layer bridges (e.g. Edge to Database, Compute to Queue)
    connections.push([
      new THREE.Vector3(...NODES_DATA[1].pos), // Compute East
      new THREE.Vector3(...NODES_DATA[3].pos), // Vector DB
      0xec4899,
    ]);
    connections.push([
      new THREE.Vector3(...NODES_DATA[2].pos), // Compute West
      new THREE.Vector3(...NODES_DATA[4].pos), // Stream Queue
      0xf59e0b,
    ]);
    connections.push([
      new THREE.Vector3(...NODES_DATA[5].pos), // Edge cache
      new THREE.Vector3(...NODES_DATA[6].pos), // Geo DNS
      0x10b981,
    ]);

    // Build the visual line segments
    connections.forEach(([start, end, col]) => {
      const geom = new THREE.BufferGeometry().setFromPoints([start, end]);
      const line = new THREE.Line(
        geom,
        new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.28 })
      );
      linesGroup.add(line);
    });

    // Packets flowing continuously along ALL conduits
    const packetCount = 42;
    const packetGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const packets: { mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[] = [];

    for (let i = 0; i < packetCount; i++) {
      const conn = connections[i % connections.length];
      const pMat = new THREE.MeshBasicMaterial({ color: conn[2] });
      const pMesh = new THREE.Mesh(packetGeo, pMat);
      scene.add(pMesh);

      // Alternate direction
      const forward = i % 2 === 0;
      packets.push({
        mesh: pMesh,
        start: forward ? conn[0] : conn[1],
        end: forward ? conn[1] : conn[0],
        progress: Math.random(),
        speed: (lowLatencyProtocol ? 0.016 : 0.009) + Math.random() * 0.012,
      });
    }

    // Drag-to-rotate interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.006;
      targetRotX += dy * 0.004;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Raycaster for node clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((m) => m.mesh));
      if (intersects.length > 0) {
        const hit = nodeMeshes.find((m) => m.mesh === intersects[0].object);
        if (hit) setSelectedNode(hit.data);
      }
    };

    canvas.addEventListener('click', onClick);

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Group rotation
      nodeGroup.rotation.y = time * 0.12 + targetRotY;
      nodeGroup.rotation.x = Math.sin(time * 0.2) * 0.05 + targetRotX;
      linesGroup.rotation.copy(nodeGroup.rotation);

      // Rotate node halos
      nodeMeshes.forEach((nm, idx) => {
        nm.halo.rotation.y = time * (0.4 + idx * 0.1);
        nm.halo.rotation.x = time * (0.3 + idx * 0.08);
      });

      // Move packets along connected conduit paths
      const speedMultiplier = (surgeActive ? 2.6 : 1.0) * (lowLatencyProtocol ? 1.6 : 1.0);
      packets.forEach((p) => {
        p.progress += p.speed * speedMultiplier;
        if (p.progress >= 1) p.progress = 0;

        const v = new THREE.Vector3().lerpVectors(p.start, p.end, p.progress);
        v.applyEuler(nodeGroup.rotation);
        p.mesh.position.copy(v);
      });

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
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      packetGeo.dispose();
    };
  }, [surgeActive, lowLatencyProtocol]);

  const triggerSurge = () => {
    setSurgeActive(true);
    setEventsPerSec((prev) => prev + 1250000);
    setTimeout(() => setSurgeActive(false), 3500);
  };

  const runDiagnosticPing = () => {
    setDiagnosticRunning(true);
    setTimeout(() => {
      setDiagnosticRunning(false);
      const pingLog: DebugLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toTimeString().split(' ')[0],
        level: 'HEALTH',
        node: 'all-7-nodes',
        message: 'Active Diagnostic Ping: All 7 nodes responded in 1.1ms average. Packet loss: 0.00%',
        latency: 1.1,
      };
      setDebugLogs((prev) => [pingLog, ...prev]);
    }, 1200);
  };

  const filteredLogs = debugLogs.filter((log) => {
    if (logFilter === 'ALL') return true;
    return log.level === logFilter;
  });

  const filteredNodes = NODES_DATA.filter((n) => {
    if (activeRegion === 'ALL') return true;
    if (activeRegion === 'EDGE') return n.category === 'Edge' || n.category === 'Storage';
    if (activeRegion === 'COMPUTE') return n.category === 'Compute';
    if (activeRegion === 'DB') return n.category === 'Database' || n.category === 'Queue';
    return true;
  });

  return (
    <div className="w-full bg-[#080811] border border-white/10 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Top Header Cockpit Ticker */}
      <div className="p-3.5 sm:p-6 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="min-w-0">
            <h4 className="font-display text-sm sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Network className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              <span>Nebula Cluster</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                7 Nodes Live
              </span>
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Full-mesh topology • QUIC Zero-RTT • Active runtime debugging
            </p>
          </div>
        </div>

        {/* Live Counters & Latency Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 font-mono text-xs w-full sm:w-auto">
          <div className="text-left sm:text-right">
            <span className="text-neutral-400 block text-[9px] sm:text-[10px]">THROUGHPUT</span>
            <span className="text-cyan-400 font-bold tracking-tight text-xs sm:text-sm">
              {eventsPerSec.toLocaleString()} <span className="text-[9px] text-neutral-400">evt/s</span>
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-neutral-400 block text-[9px] sm:text-[10px]">P99 LATENCY</span>
            <span className="text-emerald-400 font-bold text-xs sm:text-sm">
              {lowLatencyProtocol ? (surgeActive ? '2.4ms' : '1.2ms') : (surgeActive ? '14.8ms' : '8.6ms')}
            </span>
          </div>

          {/* Low Latency Protocol Toggle */}
          <button
            type="button"
            onClick={() => setLowLatencyProtocol(!lowLatencyProtocol)}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all border flex items-center gap-1.5 shrink-0 ${
              lowLatencyProtocol
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
            title="Toggle eBPF Zero-RTT Low Latency mode"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{lowLatencyProtocol ? 'eBPF' : 'TCP'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-radial-at-c from-violet-950/20 via-[#05050a] to-[#040407]">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* 3D Instructions watermark */}
        <div className="absolute top-4 left-4 pointer-events-none text-xs text-white/50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono">
          ✦ All 7 nodes connected • Click any node or drag to rotate
        </div>

        {/* Selected Node Floating HUD */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-black/85 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Node Inspector
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {selectedNode.status.toUpperCase()}
            </span>
          </div>
          <div className="font-display font-bold text-white text-base mb-1">{selectedNode.name}</div>
          <div className="text-xs text-neutral-400 mb-3 flex items-center justify-between">
            <span>Layer: {selectedNode.category}</span>
            <span className="font-mono text-[11px] text-neutral-500">IP: {selectedNode.ip}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[10px] block">CPU UTIL</span>
              <span className="text-white font-bold">{selectedNode.load}%</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[10px] block">ROUNDTRIP PING</span>
              <span className="text-cyan-300 font-bold">
                {lowLatencyProtocol ? (selectedNode.latency * 0.7).toFixed(1) : (selectedNode.latency * 3.5).toFixed(1)} ms
              </span>
            </div>
          </div>
        </div>

        {/* Right Interactive Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={triggerSurge}
            disabled={surgeActive}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg backdrop-blur-md border ${
              surgeActive
                ? 'bg-pink-600/40 border-pink-400 text-pink-200 animate-pulse'
                : 'bg-violet-600 hover:bg-violet-500 border-violet-400/40 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{surgeActive ? 'Surge Simulated!' : 'Simulate Traffic Surge'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDebugger(!showDebugger)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg backdrop-blur-md border ${
              showDebugger
                ? 'bg-cyan-500 text-black border-cyan-300 font-bold'
                : 'bg-black/70 hover:bg-black/90 border-white/15 text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{showDebugger ? 'Hide Debugger' : 'Active Debugger'}</span>
          </button>
        </div>

        {/* Active Debugging Drawer Overlay */}
        {showDebugger && (
          <div className="absolute inset-0 bg-[#06060c]/95 backdrop-blur-xl p-5 overflow-hidden flex flex-col z-20 border border-cyan-500/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">Active Runtime Debugger & Conduit Telemetry</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={runDiagnosticPing}
                  disabled={diagnosticRunning}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-violet-600/40 hover:bg-violet-600 border border-violet-400/50 text-white flex items-center gap-1.5 transition-all"
                >
                  <Activity className={`w-3 h-3 ${diagnosticRunning ? 'animate-spin' : ''}`} />
                  <span>{diagnosticRunning ? 'Testing Pings...' : 'Run Diagnostic Ping'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDebugger(false)}
                  className="text-neutral-400 hover:text-white text-xs px-2 py-1 font-mono"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-3 text-[11px] font-mono">
              <span className="text-neutral-400">Filter:</span>
              {(['ALL', 'TRACE', 'HEALTH', 'ACK'] as const).map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setLogFilter(flt)}
                  className={`px-2.5 py-0.5 rounded-md transition-colors ${
                    logFilter === flt ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>

            {/* Live Logs Stream */}
            <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-1 select-text">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-start justify-between gap-3 text-neutral-300"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-neutral-500 text-[10px]">{log.timestamp}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        log.level === 'HEALTH'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : log.level === 'TRACE'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : log.level === 'ACK'
                          ? 'bg-violet-500/20 text-violet-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="text-white/90">{log.message}</span>
                  </div>
                  <span className="text-emerald-400 text-[11px] font-semibold shrink-0">{log.latency}ms</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Node Selector Pills */}
      <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.01] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs text-neutral-400 font-mono flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-neutral-400" /> Layer:
          </span>
          {(['ALL', 'EDGE', 'COMPUTE', 'DB'] as const).map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setActiveRegion(layer)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                activeRegion === layer
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Quick select buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {filteredNodes.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelectedNode(n)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                selectedNode.id === n.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                  : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {n.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
