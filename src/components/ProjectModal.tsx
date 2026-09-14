import { Project } from '../types';
import { X, ExternalLink, CheckCircle2, Layers, Calendar, User, BarChart2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner header */}
        <div
          className="w-full h-44 sm:h-56 rounded-2xl p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden mb-8 border border-white/10"
          style={{ background: project.bgGradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md text-white/90 mb-3 border border-white/10">
              {project.category}
            </span>
            <h3 id="modal-title" className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Project Meta Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-sm">
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
              <User className="w-3.5 h-3.5 text-violet-400" />
              <span>Client</span>
            </div>
            <div className="font-medium text-white">{project.client}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Year</span>
            </div>
            <div className="font-medium text-white">{project.year}</div>
          </div>
          {project.metrics && (
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                <BarChart2 className="w-3.5 h-3.5 text-pink-400" />
                <span>Impact</span>
              </div>
              <div className="font-medium text-emerald-400">{project.metrics}</div>
            </div>
          )}
        </div>

        {/* Detailed Narrative */}
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-2">Project Overview</h4>
            <p className="text-neutral-300 text-base leading-relaxed">
              {project.fullDetails}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-3">Key Technical Innovations</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Case study created by Megnitoo Studio
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
