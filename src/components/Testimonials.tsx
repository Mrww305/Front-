import { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeTestimonial = TESTIMONIALS[currentIdx];

  return (
    <section className="py-28 px-6 sm:px-10 border-t border-white/5" aria-labelledby="testimonials-heading">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4 block">
          Testimonials
        </span>
        <h2
          id="testimonials-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-16"
        >
          What clients <span className="gradient-text-emerald-cyan">say</span>
        </h2>

        {/* Testimonial card container */}
        <div
          className="relative min-h-[260px] flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/8 shadow-2xl transition-all duration-500"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-live="polite"
          aria-label="Client testimonials"
        >
          <Quote className="w-10 h-10 text-emerald-400/30 mb-6 shrink-0" />

          <blockquote className="font-light text-lg sm:text-2xl text-neutral-200 leading-relaxed italic max-w-2xl mb-8 min-h-[90px] flex items-center justify-center">
            "{activeTestimonial.quote}"
          </blockquote>

          <div className="flex flex-col items-center">
            <div className="font-display font-bold text-lg text-white">
              {activeTestimonial.author}
            </div>
            <div className="text-sm text-neutral-400 mt-1">
              {activeTestimonial.role}, <span className="text-neutral-300 font-medium">{activeTestimonial.company}</span>
            </div>
          </div>
        </div>

        {/* Tab/Dot Navigation */}
        <div
          className="flex items-center justify-center gap-3 mt-10"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {TESTIMONIALS.map((item, index) => {
            const isActive = index === currentIdx;
            return (
              <button
                key={item.author}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Testimonial ${index + 1}`}
                onClick={() => setCurrentIdx(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 bg-emerald-400 shadow-md shadow-emerald-400/30'
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
