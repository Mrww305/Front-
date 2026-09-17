import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, RotateCcw, Trophy, Shield, Zap, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';

interface Particle {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  life: number;
}

export default function VertexEnginePOC() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1250);
  const [shield, setShield] = useState(100);
  const [speedLevel, setSpeedLevel] = useState(1);

  // Input states
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  // Game internal state ref
  const gameRef = useRef<{
    playerX: number;
    playerSpeedX: number;
    score: number;
    shield: number;
    speed: number;
    active: boolean;
  }>({
    playerX: 0,
    playerSpeedX: 0,
    score: 0,
    shield: 100,
    speed: 0.28,
    active: false,
  });

  const startGame = () => {
    gameRef.current.playerX = 0;
    gameRef.current.playerSpeedX = 0;
    gameRef.current.score = 0;
    gameRef.current.shield = 100;
    gameRef.current.speed = 0.28;
    gameRef.current.active = true;

    setScore(0);
    setShield(100);
    setSpeedLevel(1);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    const scene = new THREE.Scene();

    const w = canvas.parentElement?.clientWidth || 700;
    const h = canvas.parentElement?.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 2.5, 5);
    camera.lookAt(0, 1.2, -5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Fog
    scene.fog = new THREE.FogExp2(0x06060c, 0.05);

    // Lights
    const amb = new THREE.AmbientLight(0x221133, 1.2);
    scene.add(amb);
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 10, 5);
    scene.add(light);

    // Endless Grid floor
    const grid1 = new THREE.GridHelper(60, 40, 0x8b5cf6, 0x241144);
    grid1.position.set(0, 0, -20);
    scene.add(grid1);

    const grid2 = new THREE.GridHelper(60, 40, 0x8b5cf6, 0x241144);
    grid2.position.set(0, 0, -80);
    scene.add(grid2);

    // Player Neon Craft
    const playerGroup = new THREE.Group();
    scene.add(playerGroup);

    // Body
    const bodyGeo = new THREE.ConeGeometry(0.45, 1.4, 4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    playerGroup.add(body);

    // Wings
    const wingGeo = new THREE.BoxGeometry(1.6, 0.05, 0.5);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.6,
    });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.set(0, 0, 0.2);
    playerGroup.add(wings);

    // Engine Thruster glow
    const thrusterGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });
    const thruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    thruster.position.set(0, 0, 0.8);
    playerGroup.add(thruster);

    playerGroup.position.set(0, 0.5, 1.5);

    // Collectibles (Orbs) and Hazards (Monoliths)
    const orbs: THREE.Mesh[] = [];
    const hazards: THREE.Mesh[] = [];
    const orbGeo = new THREE.OctahedronGeometry(0.25);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.8,
    });

    const hazardGeo = new THREE.BoxGeometry(0.8, 1.4, 0.8);
    const hazardMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });

    // Spawn initial pool
    for (let i = 0; i < 12; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set((Math.random() - 0.5) * 6, 0.6, -10 - i * 8);
      scene.add(orb);
      orbs.push(orb);

      const haz = new THREE.Mesh(hazardGeo, hazardMat);
      haz.position.set((Math.random() - 0.5) * 6, 0.7, -14 - i * 10);
      scene.add(haz);
      hazards.push(haz);
    }

    // Particle bursts
    const particles: Particle[] = [];
    const pGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const pMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const spawnBurst = (pos: THREE.Vector3, color: number) => {
      for (let i = 0; i < 16; i++) {
        const p = new THREE.Mesh(pGeo, new THREE.MeshBasicMaterial({ color }));
        p.position.copy(pos);
        scene.add(p);
        particles.push({
          mesh: p,
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            Math.random() * 0.15,
            (Math.random() - 0.5) * 0.15
          ),
          life: 1.0,
        });
      }
    };

    let scoreAccumulator = 0;

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      // Handle input
      if (gameRef.current.active) {
        if (keysRef.current.left) {
          gameRef.current.playerSpeedX -= 0.015;
        } else if (keysRef.current.right) {
          gameRef.current.playerSpeedX += 0.015;
        } else {
          gameRef.current.playerSpeedX *= 0.88;
        }

        gameRef.current.playerX += gameRef.current.playerSpeedX;
        // Clamp boundaries
        if (gameRef.current.playerX < -3.4) {
          gameRef.current.playerX = -3.4;
          gameRef.current.playerSpeedX = 0;
        }
        if (gameRef.current.playerX > 3.4) {
          gameRef.current.playerX = 3.4;
          gameRef.current.playerSpeedX = 0;
        }

        playerGroup.position.x = gameRef.current.playerX;
        playerGroup.rotation.z = -gameRef.current.playerSpeedX * 8;
        playerGroup.rotation.y = -gameRef.current.playerSpeedX * 4;

        // Animate Grid moving forward
        grid1.position.z += gameRef.current.speed;
        grid2.position.z += gameRef.current.speed;
        if (grid1.position.z >= 40) grid1.position.z = -80;
        if (grid2.position.z >= 40) grid2.position.z = -80;

        // Move Orbs
        orbs.forEach((orb) => {
          orb.position.z += gameRef.current.speed;
          orb.rotation.y = time * 3;
          orb.rotation.x = time * 2;

          // Check Collision with player
          const dist = orb.position.distanceTo(playerGroup.position);
          if (dist < 0.9) {
            spawnBurst(orb.position, 0x10b981);
            orb.position.set((Math.random() - 0.5) * 6, 0.6, -70 - Math.random() * 20);
            gameRef.current.score += 150;
            setScore(gameRef.current.score);
            if (gameRef.current.score > highScore) setHighScore(gameRef.current.score);
          } else if (orb.position.z > 5) {
            orb.position.set((Math.random() - 0.5) * 6, 0.6, -70 - Math.random() * 20);
          }
        });

        // Move Hazards
        hazards.forEach((haz) => {
          haz.position.z += gameRef.current.speed;
          haz.rotation.y = time * 1.5;

          const dist = haz.position.distanceTo(playerGroup.position);
          if (dist < 0.95) {
            spawnBurst(haz.position, 0xef4444);
            haz.position.set((Math.random() - 0.5) * 6, 0.7, -70 - Math.random() * 20);
            gameRef.current.shield -= 34;
            setShield(Math.max(0, gameRef.current.shield));

            if (gameRef.current.shield <= 0) {
              gameRef.current.active = false;
              setGameState('gameover');
            }
          } else if (haz.position.z > 5) {
            haz.position.set((Math.random() - 0.5) * 6, 0.7, -70 - Math.random() * 20);
          }
        });

        // Passive distance score
        scoreAccumulator += 1;
        if (scoreAccumulator % 10 === 0) {
          gameRef.current.score += 2;
          setScore(gameRef.current.score);
        }

        // Increase speed slightly
        gameRef.current.speed = Math.min(0.55, 0.28 + gameRef.current.score * 0.00008);
        setSpeedLevel(Math.floor(gameRef.current.speed * 10) - 1);
      } else {
        // Idle hover animation
        playerGroup.position.y = 0.5 + Math.sin(time * 2) * 0.1;
        playerGroup.rotation.z = Math.sin(time * 1.5) * 0.05;
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.add(p.vel);
        p.life -= 0.035;
        p.mesh.scale.setScalar(p.life);
        if (p.life <= 0) {
          scene.remove(p.mesh);
          particles.splice(i, 1);
        }
      }

      thruster.scale.setScalar(1 + Math.sin(time * 20) * 0.3);

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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [highScore]);

  return (
    <div className="w-full bg-[#06060c] border border-white/10 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Game Cockpit Top Bar */}
      <div className="p-3.5 sm:p-6 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Vertex Game Engine
          </span>
          <h4 className="font-display text-base sm:text-xl font-bold mt-1 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span className="truncate">Cyber Glider 3D Arcade</span>
          </h4>
          <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
            WebGL physics, collision matrix & particle bursts
          </p>
        </div>

        {/* In-game HUD metrics */}
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 font-mono text-xs sm:text-sm w-full sm:w-auto">
          <div>
            <span className="text-[9px] sm:text-[10px] text-neutral-400 block">SCORE</span>
            <span className="text-base sm:text-xl font-black text-amber-400">{score.toLocaleString()}</span>
          </div>

          <div className="hidden xs:block">
            <span className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-yellow-500" /> BEST
            </span>
            <span className="text-neutral-300 font-bold text-xs sm:text-sm">{highScore.toLocaleString()}</span>
          </div>

          <div>
            <span className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-cyan-400" /> SHIELD
            </span>
            <div className="w-16 sm:w-28 h-2 bg-white/10 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-300 ${
                  shield > 50 ? 'bg-emerald-400' : shield > 25 ? 'bg-amber-400' : 'bg-red-500'
                }`}
                style={{ width: `${shield}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-[#05050a] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-400 shadow-xl shadow-amber-500/10">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-2">
              Ready to Launch?
            </h3>
            <p className="text-sm text-neutral-300 max-w-sm mb-6 leading-relaxed">
              Dodge red obstacle monoliths and collect green energy prisms to test Vertex Engine's 60fps rendering pipeline.
            </p>
            <button
              type="button"
              onClick={startGame}
              className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-pink-500 text-black shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start WebGL Engine</span>
            </button>
            <div className="mt-4 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
              <span>Use Left/Right Arrows or A/D keys</span>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="text-red-500 font-mono text-xs tracking-widest uppercase mb-2">
              SHIELD DEPLETED
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
              Simulation Concluded
            </h3>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 my-4 text-center min-w-[200px]">
              <span className="text-xs text-neutral-400 block font-mono">FINAL SCORE</span>
              <span className="font-display text-3xl font-extrabold text-amber-400">{score.toLocaleString()}</span>
            </div>
            <button
              type="button"
              onClick={startGame}
              className="px-8 py-3.5 rounded-full font-bold text-sm bg-white text-black hover:bg-neutral-200 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reboot Simulation</span>
            </button>
          </div>
        )}

        {/* In-game Mobile Controls HUD */}
        {gameState === 'playing' && (
          <div className="absolute bottom-4 inset-x-4 flex justify-between items-center pointer-events-none">
            <button
              type="button"
              onPointerDown={() => { keysRef.current.left = true; }}
              onPointerUp={() => { keysRef.current.left = false; }}
              onPointerLeave={() => { keysRef.current.left = false; }}
              className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white active:bg-violet-600 active:scale-95 transition-all sm:hidden"
              aria-label="Steer Left"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <div className="text-[11px] font-mono text-white/50 bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm hidden sm:block">
              ✦ Use Left / Right arrows or A / D keys
            </div>

            <button
              type="button"
              onPointerDown={() => { keysRef.current.right = true; }}
              onPointerUp={() => { keysRef.current.right = false; }}
              onPointerLeave={() => { keysRef.current.right = false; }}
              className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white active:bg-violet-600 active:scale-95 transition-all sm:hidden"
              aria-label="Steer Right"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        )}
      </div>

      {/* Engine Controls and Diagnostics */}
      <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.01] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 text-neutral-400">
          <span>PIPELINE: <strong className="text-white">Three.js WebGL 2.0</strong></span>
          <span>SPEED: <strong className="text-amber-400">Lvl {speedLevel}</strong></span>
        </div>

        {gameState === 'playing' && (
          <button
            type="button"
            onClick={startGame}
            className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        )}
      </div>
    </div>
  );
}
