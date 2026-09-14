import ShowcaseScene from './ShowcaseScene';
import { Cpu, Eye, Smartphone, Zap } from 'lucide-react';

const FEATURES = [
  { label: 'Real-time 3D Rendering', desc: 'Hardware-accelerated WebGL with dynamic shadows and reflections', icon: Zap },
  { label: 'Interactive Product Views', desc: 'Manipulate geometry in 360 degrees with smooth drag controls', icon: Eye },
  { label: 'WebGL & Three.js', desc: 'Custom shader pipelines tailored for 60fps performance', icon: Cpu },
  { label: 'Cross-platform Support', desc: 'Optimized touch handling for mobile, tablets, and desktop workstations', icon: Smartphone },
];

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="py-28 px-6 sm:px-10 border-t border-white/5" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-4 block">
              Interactive 3D
            </span>
            <h2
              id="showcase-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Next-gen <span className="gradient-text-violet-pink">3D experiences</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 font-light">
              We leverage cutting-edge WebGL technology to create immersive 3D experiences that run smoothly across all modern browsers without requiring plugins or heavy downloads.
            </p>

            <ul className="space-y-5">
              {FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-base">{item.label}</div>
                      <div className="text-neutral-400 text-sm">{item.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column 3D Showcase */}
          <div className="relative">
            <ShowcaseScene />
          </div>
        </div>
      </div>
    </section>
  );
}
