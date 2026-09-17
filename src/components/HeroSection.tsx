import { useState } from 'react';
import HeroScene from './HeroScene';
import AwardAccoladesRibbon from './AwardAccoladesRibbon';
import { ArrowDown, Sparkles, Play, Compass, Terminal, Shield, Palette } from 'lucide-react';
import { soundFX } from '../utils/soundFX';

export default function HeroSection() {
  const originalTitle = 'MEGNITOO';
  const [displayText, setDisplayText] = useState(originalTitle);
  const [isScrambling, setIsScrambling] = useState(false);
  const [colorMode, setColorMode] = useState<'celestial' | 'cyberpunk' | 'aurora'>('celestial');

  const handleMouseEnter = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    soundFX.playHoverBlip(620);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        originalTitle
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalTitle[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalTitle.length) {
        clearInterval(interval);
        setDisplayText(originalTitle);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 32);
  };

  const scrollTo = (id: string) => {
    soundFX.playHoverBlip(480);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleColorModeChange = (mode: 'celestial' | 'cyberpunk' | 'aurora') => {
    setColorMode(mode);
    soundFX.playHoverBlip(mode === 'celestial' ? 520 : mode === 'cyberpunk' ? 740 : 440);
  };

  const openPOCLab = () => {
    soundFX.playChime();
    window.dispatchEvent(new CustomEvent('open-poc', { detail: { id: 'construction-blueprint' } }));
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20"
      aria-label="Hero section with interactive 3D digital experience"
    >
      {/* 3D Canvas Background with dynamic spatial mode */}
      <HeroScene activeColorMode={colorMode} />

      {/* Atmospheric Multi-spectral Glow Elements */}
      <div
        className="glow-violet top-[-80px] right-[-80px] sm:top-[-150px] sm:right-[-150px]"
        aria-hidden="true"
      />
      <div
        className="glow-cyan bottom-[-80px] left-[-80px] sm:bottom-[-150px] sm:left-[-150px]"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center select-none flex flex-col items-center">
        
        {/* Top Floating Badge Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-violet-200 shadow-lg shadow-violet-500/10">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>Award-Winning Experience Studio</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-950/30 backdrop-blur-md text-xs font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>WebGL 3D Core Active</span>
          </div>
        </div>

        {/* Dynamic Scrambling Mega Display Title */}
        <h1
          id="heroTitle"
          onMouseEnter={handleMouseEnter}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 cursor-pointer select-none transition-all"
        >
          <span className="gradient-primary inline-block transition-transform duration-300 hover:scale-[1.02] filter drop-shadow-[0_10px_35px_rgba(139,92,246,0.3)]">
            {displayText}
          </span>
        </h1>

        {/* Studio Subheading & Mission */}
        <p className="text-base sm:text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed mb-8">
          Fusing high-performance <strong className="text-white font-medium">3D WebGL engineering</strong>, generative spatial interfaces, and enterprise cloud architecture into unforgettable digital milestones.
        </p>

        {/* 3D Atmosphere Color Mode Switcher */}
        <div className="flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Palette className="w-3 h-3 text-violet-400" />
            <span>Theme:</span>
          </span>
          {(['celestial', 'cyberpunk', 'aurora'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleColorModeChange(mode)}
              className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all ${
                colorMode === mode
                  ? 'bg-white/20 text-white font-semibold border border-white/30 shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Primary Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={openPOCLab}
            className="btn-primary px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2.5 border border-white/20"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Interactive POCs (10)</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('work')}
            className="btn-secondary px-8 py-4 rounded-full text-base font-semibold text-white border border-white/20 hover:border-white/50 bg-white/[0.04] hover:bg-white/[0.1] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-md flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore Portfolio</span>
          </button>
        </div>

        {/* Accolades & Awards Ribbon */}
        <AwardAccoladesRibbon />
      </div>

      {/* Gentle Scroll Down Indicator */}
      <div
        onClick={() => scrollTo('about')}
        className="mt-14 z-10 flex flex-col items-center gap-2 text-neutral-400 text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-white/25 rounded-full relative p-1 flex justify-center">
          <div className="w-1.5 h-2.5 bg-white rounded-full animate-scroll-bounce" />
        </div>
        <span className="flex items-center gap-1 font-mono text-[11px]">
          Discover Studio <ArrowDown className="w-3 h-3 animate-bounce" />
        </span>
      </div>
    </section>
  );
}
