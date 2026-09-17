import { useState, useEffect, MouseEvent } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import POCViewerModal from './pocs/POCViewerModal';
import { soundFX } from '../utils/soundFX';
import {
  ArrowUpRight,
  Play,
  Sparkles,
  Activity,
  ShoppingBag,
  Palette,
  Gamepad2,
  Building2,
  Cpu,
  Trophy,
  Shield,
  Globe2,
  Code2,
  Layers
} from 'lucide-react';

const POC_ICONS: Record<string, any> = {
  'nebula-dashboard': Activity,
  'aurora-commerce': ShoppingBag,
  'prism-studio': Palette,
  'vertex-engine': Gamepad2,
  'construction-blueprint': Building2,
  'iqra-ai': Cpu,
  'zalmi-fit': Trophy,
  'jw-executive': Shield,
  'pak-trade-intelligence': Globe2,
  'sme-graphql-gateway': Code2,
};

const POC_LABELS: Record<string, string> = {
  'nebula-dashboard': 'Live 3D Telemetry POC',
  'aurora-commerce': '3D Luxury Configurator POC',
  'prism-studio': 'Procedural GLSL Canvas POC',
  'vertex-engine': 'Playable 3D Arcade POC',
  'construction-blueprint': '3D BIM CAD Blueprint POC',
  'iqra-ai': 'Enterprise RAG Agent POC',
  'zalmi-fit': '3D Sports Biometrics POC',
  'jw-executive': 'C-Suite Chairman BI POC',
  'pak-trade-intelligence': 'Macro Trade Tariff POC',
  'sme-graphql-gateway': 'GraphQL Sandbox POC',
};

const CATEGORIES = ['All Work', '3D & Spatial', 'Enterprise & Macro Suite'];

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [pocModalOpen, setPocModalOpen] = useState(false);
  const [selectedPocId, setSelectedPocId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Work');

  useEffect(() => {
    const handleGlobalOpenPOC = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      setSelectedPocId(customEvent.detail?.id || 'construction-blueprint');
      setPocModalOpen(true);
    };

    window.addEventListener('open-poc', handleGlobalOpenPOC);
    return () => window.removeEventListener('open-poc', handleGlobalOpenPOC);
  }, []);

  const handleLaunchPOC = (projectId: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playChime();
    setSelectedPocId(projectId);
    setPocModalOpen(true);
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === 'All Work') return true;
    if (selectedCategory === '3D & Spatial') {
      return ['nebula-dashboard', 'aurora-commerce', 'prism-studio', 'vertex-engine', 'construction-blueprint'].includes(proj.id);
    }
    if (selectedCategory === 'Enterprise & Macro Suite') {
      return ['iqra-ai', 'zalmi-fit', 'jw-executive', 'pak-trade-intelligence', 'sme-graphql-gateway', 'construction-blueprint'].includes(proj.id);
    }
    return true;
  });

  return (
    <section id="work" className="py-28 px-6 sm:px-10 border-t border-white/5 relative" aria-labelledby="work-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Selected Work & Transformation Suite
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                10 Interactive Functional POCs
              </span>
            </div>
            <h2
              id="work-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Enterprise & <span className="gradient-text-pink-amber">Digital POCs</span>
            </h2>
          </div>

          {/* Quick POC All Launcher Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleLaunchPOC('construction-blueprint')}
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-xl shadow-violet-600/30 touch-spring flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Launch 10-POC Interactive Suite</span>
            </button>
          </div>
        </div>

        {/* Category Filter Switcher */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto snap-scroll-x pb-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundFX.playHoverBlip(540);
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all border shrink-0 touch-spring ${
                  isSelected
                    ? 'bg-white text-black font-bold border-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const PocIcon = POC_ICONS[project.id] || Sparkles;
            const pocLabel = POC_LABELS[project.id] || 'Interactive POC';

            return (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="work-card group relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.015]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

                {/* Top Header inside Card: POC Badge & Arrow */}
                <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10">
                  <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
                    <PocIcon className="w-3.5 h-3.5" />
                    <span>{pocLabel}</span>
                  </div>

                  <div
                    className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-none z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      {project.client}
                    </span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-xs font-mono text-white/60">{project.category}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-violet-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/80 max-w-md line-clamp-2 font-light mb-4">
                    {project.description}
                  </p>

                  {/* Interactive Action Row with Live POC trigger */}
                  <div className="flex items-center justify-between gap-4 pointer-events-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/50 border border-white/15 text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Launch POC Pill Button */}
                    <button
                      type="button"
                      onClick={(e) => handleLaunchPOC(project.id, e)}
                      className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white transition-all duration-200 flex items-center gap-1.5 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 shrink-0"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Test POC</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onLaunchPOC={(id) => {
          setActiveProject(null);
          handleLaunchPOC(id);
        }}
      />

      {/* Unified POC Viewer Modal */}
      <POCViewerModal
        initialProjectId={selectedPocId}
        isOpen={pocModalOpen}
        onClose={() => setPocModalOpen(false)}
      />
    </section>
  );
}
