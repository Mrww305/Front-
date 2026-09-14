import { useRef } from 'react';
import { SERVICES } from '../data';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function ServicesScroll() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const distance = 420;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="services-section"
      className="py-28 px-6 sm:px-10 border-t border-white/5 relative overflow-hidden"
      aria-labelledby="services"
    >
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 block">
            Services
          </span>
          <h2
            id="services"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            What we <span className="gradient-text-amber-pink">do best</span>
          </h2>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll services left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll services right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        id="hscrollTrack"
        className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SERVICES.map((service) => (
          <div
            key={service.num}
            className="hscroll-card shrink-0 w-[300px] sm:w-[380px] h-[430px] rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-2xl snap-start transition-all duration-300 hover:-translate-y-2 hover:border-white/25 group"
            style={{ background: service.gradient }}
          >
            {/* Background subtle noise & light shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />

            {/* Giant Stylized Index Number */}
            <div className="hscroll-card-num absolute top-6 right-6 font-display text-7xl font-black text-white/[0.08] group-hover:text-white/[0.14] transition-colors select-none pointer-events-none">
              {service.num}
            </div>

            {/* Top Tag */}
            <div className="relative z-10">
              <span
                className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-medium text-white/90 border border-white/15 backdrop-blur-md"
                style={{ backgroundColor: `${service.accentColor}25` }}
              >
                Service {service.num}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {service.description}
              </p>

              {/* Deliverables checklist */}
              <div className="space-y-2 pt-4 border-t border-white/15">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-medium text-white/85">
                    <Check className="w-3.5 h-3.5 text-white/70 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
