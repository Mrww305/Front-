import { useState, useEffect } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../data';
import NebulaDashboardPOC from './NebulaDashboardPOC';
import AuroraCommercePOC from './AuroraCommercePOC';
import PrismStudioPOC from './PrismStudioPOC';
import VertexEnginePOC from './VertexEnginePOC';
import ConstructionBlueprintPOC from './ConstructionBlueprintPOC';
import IqraAiPOC from './IqraAiPOC';
import ZalmiFitPOC from './ZalmiFitPOC';
import JwExecutiveDashboardPOC from './JwExecutiveDashboardPOC';
import PakTradeIntelligencePOC from './PakTradeIntelligencePOC';
import SmeGraphQLGatewayPOC from './SmeGraphQLGatewayPOC';
import {
  X,
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
  Maximize2,
  Minimize2
} from 'lucide-react';

interface POCViewerModalProps {
  initialProjectId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const POC_MAP: Record<string, { name: string; tag: string; icon: any; color: string }> = {
  'nebula-dashboard': { name: 'Nebula Dashboard', tag: '3D Mesh Telemetry', icon: Activity, color: '#8b5cf6' },
  'aurora-commerce': { name: 'Aurora Commerce', tag: 'Luxury 3D Configurator', icon: ShoppingBag, color: '#06b6d4' },
  'prism-studio': { name: 'Prism Studio', tag: 'Procedural Shader Canvas', icon: Palette, color: '#ec4899' },
  'vertex-engine': { name: 'Vertex Engine', tag: 'Interactive 3D Game', icon: Gamepad2, color: '#f59e0b' },
  'construction-blueprint': { name: 'Megnitoo Construction', tag: '3D BIM CAD Engine', icon: Building2, color: '#0ea5e9' },
  'iqra-ai': { name: 'iQRA AI Core', tag: 'JW Enterprise RAG', icon: Cpu, color: '#7c3aed' },
  'zalmi-fit': { name: 'Zalmi Fit', tag: 'PSL Biometric Arena', icon: Trophy, color: '#eab308' },
  'jw-executive': { name: 'JW Executive BI', tag: '7 Verticals Chairman', icon: Shield, color: '#f59e0b' },
  'pak-trade-intelligence': { name: 'Pakistan Trade', tag: 'Macroeconomic Tariffs', icon: Globe2, color: '#10b981' },
  'sme-graphql-gateway': { name: 'SME GraphQL', tag: 'Apollo Studio Sandbox', icon: Code2, color: '#ec4899' },
};

export default function POCViewerModal({ initialProjectId, isOpen, onClose }: POCViewerModalProps) {
  const [activeId, setActiveId] = useState<string>(initialProjectId || 'nebula-dashboard');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (initialProjectId) {
      setActiveId(initialProjectId);
    }
  }, [initialProjectId]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Proof of Concept Viewer"
      className="fixed inset-0 z-[9995] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-[#080812] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
          isFullscreen ? 'h-full max-w-none rounded-none' : 'max-w-6xl max-h-[92vh] sm:max-h-[95vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mt-2 sm:hidden" aria-hidden="true" />

        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-xs sm:text-base text-white flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">POC & Enterprise Lab</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  10 Interactive
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 hidden sm:block">
                Interactive functional prototypes covering 3D WebGL, Enterprise AI, Sports Biometrics, and Macroeconomic Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors touch-spring"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors touch-spring"
              aria-label="Close POC"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Project POC Switcher Tabs */}
        <div className="px-3 sm:px-6 pt-2.5 pb-2 border-b border-white/5 bg-white/[0.01] flex items-center gap-1.5 sm:gap-2 overflow-x-auto snap-scroll-x">
          {PROJECTS.map((proj) => {
            const meta = POC_MAP[proj.id];
            const isActive = activeId === proj.id;
            const Icon = meta?.icon || Sparkles;

            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveId(proj.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 shrink-0 transition-all border touch-spring ${
                  isActive
                    ? 'bg-white/15 text-white border-white/30 shadow-lg'
                    : 'bg-white/[0.02] text-neutral-400 border-white/5 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: meta?.color || '#fff' }} />
                <span>{proj.title}</span>
                <span className="text-[10px] font-mono opacity-60 hidden lg:inline">({meta?.tag})</span>
              </button>
            );
          })}
        </div>

        {/* Main POC Content Container */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1 pb-safe">
          {activeId === 'nebula-dashboard' && <NebulaDashboardPOC />}
          {activeId === 'aurora-commerce' && <AuroraCommercePOC />}
          {activeId === 'prism-studio' && <PrismStudioPOC />}
          {activeId === 'vertex-engine' && <VertexEnginePOC />}
          {activeId === 'construction-blueprint' && <ConstructionBlueprintPOC />}
          {activeId === 'iqra-ai' && <IqraAiPOC />}
          {activeId === 'zalmi-fit' && <ZalmiFitPOC />}
          {activeId === 'jw-executive' && <JwExecutiveDashboardPOC />}
          {activeId === 'pak-trade-intelligence' && <PakTradeIntelligencePOC />}
          {activeId === 'sme-graphql-gateway' && <SmeGraphQLGatewayPOC />}
        </div>
      </div>
    </div>
  );
}
