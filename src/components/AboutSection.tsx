import AboutScene from './AboutScene';
import { STATS } from '../data';
import { Award, Briefcase, Smile, Sparkles } from 'lucide-react';

const STAT_ICONS = [Briefcase, Smile, Award, Sparkles];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 sm:px-10 border-t border-white/5" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4 block">
          About Us
        </span>
        <h2
          id="about-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-16 max-w-3xl"
        >
          We build digital{' '}
          <span className="gradient-text-cyan block sm:inline">
            experiences that matter
          </span>
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-neutral-300 text-lg sm:text-xl font-light leading-relaxed">
            <p>
              At <strong className="text-white font-medium">Megnitoo</strong>, we believe in the power of immersive storytelling. Our team of designers, developers, and creative technologists collaborate to push the boundaries of what is possible on the modern web.
            </p>
            <p className="text-neutral-400">
              From interactive 3D product visualizers to seamless scroll-driven narratives and spatial graphics, we craft digital products that captivate audiences and drive lasting, meaningful engagement.
            </p>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-sm text-neutral-300">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                Studio Engineering Ethos
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Megnitoo is powered by <strong className="text-white">MrWorldWide pvt ltd</strong>, led by founder <strong className="text-white">Sajid Afridi (mrww305)</strong>. Our multidisciplinary lab creates production-ready WebGL experiences, enterprise RAG copilots, and multi-vertical analytics hubs.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-6">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050508] bg-gradient-to-tr from-violet-600 to-indigo-400 flex items-center justify-center text-xs font-bold">M</div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050508] bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">E</div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050508] bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-xs font-bold">G</div>
              </div>
              <div className="text-sm text-neutral-400">
                <span className="text-white font-semibold">Award-winning</span> digital artisans
              </div>
            </div>
          </div>

          {/* 3D Torus Animation */}
          <div className="h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl relative">
            <AboutScene />
            <div className="absolute top-4 left-4 text-[11px] font-mono tracking-wider uppercase text-white/50 bg-black/40 px-3 py-1 rounded-full border border-white/5 pointer-events-none backdrop-blur-sm">
              WebGL 3D Topology Knot
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16">
          {STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <div
                key={stat.label}
                className="stat-card group relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight gradient-text-cyan mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
