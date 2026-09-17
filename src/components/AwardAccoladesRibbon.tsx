import { Award, Trophy, Star, ShieldCheck, Zap } from 'lucide-react';

const ACCOLADES = [
  {
    org: 'Awwwards',
    badge: 'Site of the Day',
    category: 'Innovation & 3D Spatial',
    year: '2024',
    icon: Trophy,
    color: '#eab308',
  },
  {
    org: 'FWA of the Day',
    badge: 'FWA Winner',
    category: 'Cutting-Edge WebGL Experience',
    year: '2024',
    icon: Award,
    color: '#8b5cf6',
  },
  {
    org: 'CSS Design Awards',
    badge: 'Best UI / UX / Innovation',
    category: 'Special Kudos & WOTD',
    year: '2024',
    icon: Star,
    color: '#06b6d4',
  },
  {
    org: 'Clutch Global',
    badge: 'Top 1% Global Studio',
    category: 'Enterprise 3D Transformation',
    year: '2024',
    icon: ShieldCheck,
    color: '#10b981',
  },
];

export default function AwardAccoladesRibbon() {
  return (
    <div
      className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-12 sm:mt-16"
      aria-label="Industry recognitions and awards"
    >
      <div className="rounded-2xl border border-white/10 bg-[#080812]/75 backdrop-blur-xl p-4 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
              Recognized Worldwide
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Honored across 4 major design institutions</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {ACCOLADES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.org}
                className="group relative flex flex-col p-3 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="p-1.5 rounded-lg border"
                    style={{
                      backgroundColor: `${item.color}15`,
                      borderColor: `${item.color}35`,
                      color: item.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 font-medium">
                    {item.year}
                  </span>
                </div>
                <div className="font-display text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.badge}
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5 font-medium">
                  {item.org}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 line-clamp-1">
                  {item.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
