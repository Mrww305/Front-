import GalleryScene from './GalleryScene';
import { Compass } from 'lucide-react';

export default function GallerySection() {
  return (
    <section className="py-28 px-6 sm:px-10 border-t border-white/5" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-4 inline-flex items-center gap-1.5 justify-center">
          <Compass className="w-3.5 h-3.5" />
          Gallery
        </span>
        <h2
          id="gallery-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
        >
          Creative <span className="gradient-text-violet-pink">explorations</span>
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto mb-12 font-light">
          R&D generative geometry, algorithmic spatial harmony, and experimental WebGL particle choreography.
        </p>

        {/* 3D Orbiting Polyhedra Matrix */}
        <div className="relative">
          <GalleryScene />
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span>Interactive Real-time Polyhedral Field</span>
          </div>
        </div>
      </div>
    </section>
  );
}
