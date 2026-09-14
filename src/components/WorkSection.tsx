import { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-28 px-6 sm:px-10 border-t border-white/5" aria-labelledby="work-heading">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4 block">
          Selected Work
        </span>
        <h2
          id="work-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-16"
        >
          Our latest <span className="gradient-text-pink-amber">projects</span>
        </h2>

        {/* 2x2 Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="work-card group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.015]"
              aria-label={`${project.title} project`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveProject(project);
                }
              }}
            >
              {/* Animated Gradient Background */}
              <div
                className="work-card-bg absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ background: project.bgGradient }}
              />

              {/* Decorative dynamic ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              {/* Top-Right Arrow Hover Badge */}
              <div
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-lg"
                aria-hidden="true"
              >
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>

              {/* Bottom Card Content */}
              <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end pointer-events-none">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-violet-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 max-w-md line-clamp-2">
                  {project.description}
                </p>

                {/* Tags on hover */}
                <div className="mt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-black/40 border border-white/15 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
