import { useEffect, useRef, useState } from 'react';
import { Sliders, Code2, Sparkles, Download, RefreshCw, Play, Pause, Layers } from 'lucide-react';

interface ShaderPreset {
  id: string;
  name: string;
  speed: number;
  freq: number;
  warp: number;
  colorScheme: 'violet-pink' | 'cyan-emerald' | 'gold-fire' | 'iridescent';
}

const PRESETS: ShaderPreset[] = [
  { id: 'plasma', name: 'Cosmic Plasma', speed: 1.2, freq: 3.5, warp: 1.4, colorScheme: 'violet-pink' },
  { id: 'cyber', name: 'Cyber Liquid', speed: 0.8, freq: 5.0, warp: 0.9, colorScheme: 'cyan-emerald' },
  { id: 'solar', name: 'Solar Flare', speed: 1.5, freq: 2.8, warp: 1.8, colorScheme: 'gold-fire' },
  { id: 'quantum', name: 'Quantum Aurora', speed: 1.0, freq: 4.2, warp: 1.2, colorScheme: 'iridescent' },
];

export default function PrismStudioPOC() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<ShaderPreset>(PRESETS[0]);
  const [speed, setSpeed] = useState(1.2);
  const [freq, setFreq] = useState(3.5);
  const [warp, setWarp] = useState(1.4);
  const [colorScheme, setColorScheme] = useState<'violet-pink' | 'cyan-emerald' | 'gold-fire' | 'iridescent'>('violet-pink');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [fps, setFps] = useState(60);

  // Mouse warp
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  // Apply preset
  const applyPreset = (preset: ShaderPreset) => {
    setSelectedPreset(preset);
    setSpeed(preset.speed);
    setFreq(preset.freq);
    setWarp(preset.warp);
    setColorScheme(preset.colorScheme);
  };

  const randomize = () => {
    setSpeed(parseFloat((Math.random() * 2 + 0.5).toFixed(2)));
    setFreq(parseFloat((Math.random() * 6 + 1.5).toFixed(2)));
    setWarp(parseFloat((Math.random() * 2 + 0.2).toFixed(2)));
    const schemes: ('violet-pink' | 'cyan-emerald' | 'gold-fire' | 'iridescent')[] = [
      'violet-pink',
      'cyan-emerald',
      'gold-fire',
      'iridescent',
    ];
    setColorScheme(schemes[Math.floor(Math.random() * schemes.length)]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let time = 0;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      // Measure FPS
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      if (!isPlaying) return;

      time += 0.012 * speed;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Color scheme vectors
      let rMult = 1, gMult = 0.5, bMult = 1.2;
      if (colorScheme === 'cyan-emerald') {
        rMult = 0.2; gMult = 1.2; bMult = 1.1;
      } else if (colorScheme === 'gold-fire') {
        rMult = 1.4; gMult = 0.8; bMult = 0.2;
      } else if (colorScheme === 'iridescent') {
        rMult = 1.1; gMult = 1.1; bMult = 1.1;
      }

      // Procedural trigonometric pixel field
      // To ensure high performance on high-DPI displays, calculate across resolution
      const step = 2; // pixel block step for smooth 60fps
      for (let y = 0; y < h; y += step) {
        const ny = (y / h - 0.5) * 2;
        for (let x = 0; x < w; x += step) {
          const nx = (x / w - 0.5) * 2;

          // Distance to mouse
          const dx = nx - (mx - 0.5) * 2;
          const dy = ny - (my - 0.5) * 2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Warp wave formulation
          const v1 = Math.sin(nx * freq + time) + Math.cos(ny * freq - time);
          const v2 = Math.sin(Math.sqrt(nx * nx + ny * ny) * freq * 1.5 - time * 2);
          const v3 = Math.sin((nx * Math.cos(time * 0.5) + ny * Math.sin(time * 0.5)) * freq);
          const mouseDistortion = Math.exp(-dist * 2.5) * warp;

          const val = (v1 + v2 + v3) / 3 + mouseDistortion;

          const r = Math.min(255, Math.max(0, Math.floor((Math.sin(val * Math.PI) * 0.5 + 0.5) * 255 * rMult)));
          const g = Math.min(255, Math.max(0, Math.floor((Math.sin(val * Math.PI + 2) * 0.5 + 0.5) * 255 * gMult)));
          const b = Math.min(255, Math.max(0, Math.floor((Math.sin(val * Math.PI + 4) * 0.5 + 0.5) * 255 * bMult)));

          for (let dy = 0; dy < step && y + dy < h; dy++) {
            for (let dx = 0; dx < step && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    animId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [speed, freq, warp, colorScheme, isPlaying]);

  const downloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `prism-shader-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shaderCode = `// Prism Studio v2.4 GLSL Fragment Shader
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_speed; // ${speed}
uniform float u_freq;  // ${freq}
uniform float u_warp;  // ${warp}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
    float t = u_time * ${speed.toFixed(2)};
    
    // Multi-frequency Harmonic Field
    float v1 = sin(st.x * ${freq.toFixed(2)} + t) + cos(st.y * ${freq.toFixed(2)} - t);
    float v2 = sin(length(st) * ${(freq * 1.5).toFixed(2)} - t * 2.0);
    float v3 = sin(dot(st, vec2(cos(t * 0.5), sin(t * 0.5))) * ${freq.toFixed(2)});
    
    float mouseWarp = exp(-length(st - u_mouse) * 2.5) * ${warp.toFixed(2)};
    float field = (v1 + v2 + v3) / 3.0 + mouseWarp;
    
    vec3 color = 0.5 + 0.5 * cos(field * 3.14159 + vec3(0.0, 2.0, 4.0));
    gl_FragColor = vec4(color, 1.0);
}`;

  return (
    <div className="w-full bg-[#080811] border border-white/10 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Top Header */}
      <div className="p-3.5 sm:p-6 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
            Prism Shader Studio
          </span>
          <h4 className="font-display text-base sm:text-xl font-bold mt-1 truncate">Generative Procedural Canvas</h4>
          <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
            Real-time GLSL algorithm execution with interactive parameter matrix
          </p>
        </div>

        {/* Status Indicators & Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 self-start sm:self-auto flex-wrap">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{fps} FPS</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={randomize}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 border border-violet-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Randomize Matrix"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Random</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              showCode ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">GLSL</span>
          </button>

          <button
            type="button"
            onClick={downloadSnapshot}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            title="Export High-Res Snapshot"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Shader Canvas */}
      <div className="relative w-full h-[360px] sm:h-[430px] bg-black flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={280}
          height={190}
          className="w-full h-full object-cover cursor-crosshair"
        />

        {/* Watermark helper */}
        <div className="absolute top-4 left-4 pointer-events-none text-xs text-white/60 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono">
          ✦ Hover & move mouse to warp procedural waves
        </div>

        {/* Live GLSL Code Drawer Overlay */}
        {showCode && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-6 overflow-y-auto font-mono text-xs text-cyan-300 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 text-neutral-400 pb-2 border-b border-white/10">
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-pink-400" />
                Active Fragment Shader Source (GLSL)
              </span>
              <button
                type="button"
                onClick={() => setShowCode(false)}
                className="text-white hover:text-pink-300 font-sans text-sm"
              >
                ✕ Close
              </button>
            </div>
            <pre className="text-white/90 whitespace-pre-wrap">{shaderCode}</pre>
          </div>
        )}
      </div>

      {/* Preset bar & Real-time Parameter Sliders */}
      <div className="p-5 sm:p-6 border-t border-white/10 bg-white/[0.01] space-y-5">
        {/* Preset Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedPreset.id === p.id
                  ? 'bg-pink-600/30 border-pink-400 text-white shadow-lg shadow-pink-600/20 scale-105'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Real-time Parameter Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span>ANIMATION SPEED</span>
              <span className="text-white font-bold">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-pink-500 bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span>WAVE FREQUENCY</span>
              <span className="text-white font-bold">{freq.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.2"
              value={freq}
              onChange={(e) => setFreq(parseFloat(e.target.value))}
              className="w-full accent-violet-500 bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400">
              <span>WARP INTENSITY</span>
              <span className="text-white font-bold">{warp.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={warp}
              onChange={(e) => setWarp(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
