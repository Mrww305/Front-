import { useState } from 'react';
import HeroScene from './HeroScene';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const originalTitle = 'MEGNITOO';
  const [displayText, setDisplayText] = useState(originalTitle);
  const [isScrambling, setIsScrambling] = useState(false);

  const handleMouseEnter = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
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
    }, 35);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      aria-label="Hero section with 3D animated background"
    >
      {/* 3D Canvas Background */}
      <HeroScene />

      {/* Atmospheric Glow Elements */}
      <div
        className="glow-violet top-[-100px] right-[-100px] sm:top-[-200px] sm:right-[-200px]"
        aria-hidden="true"
      />
      <div
        className="glow-cyan bottom-[-100px] left-[-100px] sm:bottom-[-200px] sm:left-[-200px]"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-none">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Digital Experience Studio</span>
        </div>

        {/* Dynamic Scrambling Title */}
        <h1
          id="heroTitle"
          onMouseEnter={handleMouseEnter}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 cursor-pointer select-none"
        >
          <span className="gradient-primary inline-block transition-transform duration-300 hover:scale-[1.02]">
            {displayText}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Crafting immersive digital experiences through the fusion of design, technology, and imagination.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo('work')}
            className="btn-primary px-8 py-4 rounded-full text-base font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            Explore Work
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="btn-secondary px-8 py-4 rounded-full text-base font-semibold text-white border border-white/20 hover:border-white/50 bg-white/[0.02] hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-sm"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-neutral-400 text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-white/25 rounded-full relative p-1 flex justify-center">
          <div className="w-1.5 h-2.5 bg-white rounded-full animate-scroll-bounce" />
        </div>
        <span className="flex items-center gap-1 font-mono text-[11px]">
          Scroll <ArrowDown className="w-3 h-3 animate-bounce" />
        </span>
      </div>
    </section>
  );
}
