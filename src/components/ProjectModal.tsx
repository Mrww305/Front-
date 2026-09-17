import { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, CheckCircle2, Layers, Calendar, User, BarChart2, Play, Sparkles, FileText } from 'lucide-react';
import NebulaDashboardPOC from './pocs/NebulaDashboardPOC';
import AuroraCommercePOC from './pocs/AuroraCommercePOC';
import PrismStudioPOC from './pocs/PrismStudioPOC';
import VertexEnginePOC from './pocs/VertexEnginePOC';
import ConstructionBlueprintPOC from './pocs/ConstructionBlueprintPOC';
import IqraAiPOC from './pocs/IqraAiPOC';
import ZalmiFitPOC from './pocs/ZalmiFitPOC';
import JwExecutiveDashboardPOC from './pocs/JwExecutiveDashboardPOC';
import PakTradeIntelligencePOC from './pocs/PakTradeIntelligencePOC';
import SmeGraphQLGatewayPOC from './pocs/SmeGraphQLGatewayPOC';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onLaunchPOC?: (projectId: string) => void;
}

export default function ProjectModal({ project, onClose, onLaunchPOC }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'case-study' | 'poc'>('case-study');

  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0d14] border border-white/15 rounded-3xl p-4 sm:p-9 shadow-2xl text-left pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mb-3 sm:hidden" aria-hidden="true" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2.5 rounded-full bg-black/50 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors touch-spring"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner header */}
        <div
          className="w-full h-44 sm:h-52 rounded-2xl p-5 sm:p-8 flex flex-col justify-end relative overflow-hidden mb-6 border border-white/10"
          style={{ background: project.bgGradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md text-white/90 mb-2.5 border border-white/10">
                {project.category}
              </span>
              <h3 id="modal-title" className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {project.title}
              </h3>
            </div>

            {/* Quick POC Action button */}
            <button
              type="button"
              onClick={() => {
                if (onLaunchPOC) {
                  onLaunchPOC(project.id);
                } else {
                  setActiveTab('poc');
                }
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 shadow-xl flex items-center gap-2 touch-spring shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Live POC</span>
            </button>
          </div>
        </div>

        {/* Tab Selector: Overview vs Interactive POC */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto snap-scroll-x">
          <button
            type="button"
            onClick={() => setActiveTab('case-study')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all touch-spring shrink-0 ${
              activeTab === 'case-study'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Case Study & Architecture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('poc')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all touch-spring shrink-0 ${
              activeTab === 'poc'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md shadow-cyan-500/30 font-bold'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Interactive Proof of Concept (POC)</span>
          </button>
        </div>

        {/* Tab 1: Case Study View */}
        {activeTab === 'case-study' && (
          <div className="animate-in fade-in duration-200">
            {/* Project Meta Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-sm">
              <div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                  <User className="w-3.5 h-3.5 text-violet-400" />
                  <span>Client / Partner</span>
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
                    <span>Impact & Spec</span>
                  </div>
                  <div className="font-medium text-emerald-400">{project.metrics}</div>
                </div>
              )}
            </div>

            {/* Detailed Narrative */}
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-2">Project Overview</h4>
                <p className="text-neutral-300 text-base leading-relaxed font-light">
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
          </div>
        )}

        {/* Tab 2: Embedded Live POC View */}
        {activeTab === 'poc' && (
          <div className="space-y-4 mb-6 animate-in fade-in duration-200">
            {project.id === 'nebula-dashboard' && <NebulaDashboardPOC />}
            {project.id === 'aurora-commerce' && <AuroraCommercePOC />}
            {project.id === 'prism-studio' && <PrismStudioPOC />}
            {project.id === 'vertex-engine' && <VertexEnginePOC />}
            {project.id === 'construction-blueprint' && <ConstructionBlueprintPOC />}
            {project.id === 'iqra-ai' && <IqraAiPOC />}
            {project.id === 'zalmi-fit' && <ZalmiFitPOC />}
            {project.id === 'jw-executive' && <JwExecutiveDashboardPOC />}
            {project.id === 'pak-trade-intelligence' && <PakTradeIntelligencePOC />}
            {project.id === 'sme-graphql-gateway' && <SmeGraphQLGatewayPOC />}
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            Case study & POC developed by Megnitoo Digital Experience
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'case-study' ? 'poc' : 'case-study')}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors"
            >
              {activeTab === 'case-study' ? 'Switch to Live POC' : 'View Architecture'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
