import { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  Building2,
  Cpu,
  Trophy,
  Shield,
  Globe2,
  Code2,
  Activity,
  ShoppingBag,
  Palette,
  Gamepad2,
  ArrowRight,
  Command,
  ExternalLink,
  Mail,
  Zap
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchPOC: (id: string) => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'POC' | 'Navigation' | 'Contact & Social';
  icon: any;
  color: string;
  action: () => void;
  badge?: string;
}

export default function CommandPalette({ isOpen, onClose, onLaunchPOC, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const ALL_COMMANDS: CommandItem[] = [
    {
      id: 'poc-construction',
      title: 'Construction Sector 3D BIM CAD',
      subtitle: 'Megnitoo Architectural CAD with floor slicing & seismic stress test',
      category: 'POC',
      icon: Building2,
      color: '#0ea5e9',
      badge: 'BIM 3D',
      action: () => {
        onLaunchPOC('construction-blueprint');
        onClose();
      }
    },
    {
      id: 'poc-iqra',
      title: 'iQRA AI Enterprise Agent',
      subtitle: 'JW Corporation RAG intelligence grounded on FBR SROs & Milvus DB',
      category: 'POC',
      icon: Cpu,
      color: '#7c3aed',
      badge: 'RAG Agent',
      action: () => {
        onLaunchPOC('iqra-ai');
        onClose();
      }
    },
    {
      id: 'poc-zalmi',
      title: 'Zalmi Fit Sports Biometrics',
      subtitle: 'Peshawar Zalmi 3D holographic athlete rig & injury diagnostics',
      category: 'POC',
      icon: Trophy,
      color: '#eab308',
      badge: 'PSL 3D',
      action: () => {
        onLaunchPOC('zalmi-fit');
        onClose();
      }
    },
    {
      id: 'poc-jw',
      title: 'JW Corporation Executive Chairman BI',
      subtitle: 'Consolidated 7-vertical governance with biometric chairman vault',
      category: 'POC',
      icon: Shield,
      color: '#f59e0b',
      badge: 'C-Suite',
      action: () => {
        onLaunchPOC('jw-executive');
        onClose();
      }
    },
    {
      id: 'poc-trade',
      title: 'Pakistan Trade Intelligence System',
      subtitle: 'PBS macroeconomic analytics & Pakistan Customs HS-Code calculator',
      category: 'POC',
      icon: Globe2,
      color: '#10b981',
      badge: 'WeBOC',
      action: () => {
        onLaunchPOC('pak-trade-intelligence');
        onClose();
      }
    },
    {
      id: 'poc-graphql',
      title: 'SME GraphQL Gateway Sandbox',
      subtitle: 'Apollo Studio developer console with AST query depth limitation',
      category: 'POC',
      icon: Code2,
      color: '#ec4899',
      badge: 'GraphQL',
      action: () => {
        onLaunchPOC('sme-graphql-gateway');
        onClose();
      }
    },
    {
      id: 'poc-nebula',
      title: 'Nebula 3D Dashboard',
      subtitle: 'eBPF low-latency mesh telemetry & runtime debugger',
      category: 'POC',
      icon: Activity,
      color: '#8b5cf6',
      badge: 'eBPF',
      action: () => {
        onLaunchPOC('nebula-dashboard');
        onClose();
      }
    },
    {
      id: 'poc-aurora',
      title: 'Aurora Commerce 3D Configurator',
      subtitle: 'Luxury WebXR augmented reality try-on & material switcher',
      category: 'POC',
      icon: ShoppingBag,
      color: '#06b6d4',
      badge: 'WebXR',
      action: () => {
        onLaunchPOC('aurora-commerce');
        onClose();
      }
    },
    {
      id: 'poc-prism',
      title: 'Prism Studio GLSL Shader Canvas',
      subtitle: 'Procedural noise fragment shader & generative geometry studio',
      category: 'POC',
      icon: Palette,
      color: '#ec4899',
      badge: 'GLSL',
      action: () => {
        onLaunchPOC('prism-studio');
        onClose();
      }
    },
    {
      id: 'poc-vertex',
      title: 'Vertex 3D Game Arcade Engine',
      subtitle: 'Playable orbital physics game running in 48KB WebGL runtime',
      category: 'POC',
      icon: Gamepad2,
      color: '#f59e0b',
      badge: 'Arcade',
      action: () => {
        onLaunchPOC('vertex-engine');
        onClose();
      }
    },
    {
      id: 'nav-work',
      title: 'Go to Work & POC Showcase',
      subtitle: 'View all 10 interactive enterprise and 3D prototypes',
      category: 'Navigation',
      icon: Sparkles,
      color: '#a855f7',
      action: () => {
        onNavigate('work');
        onClose();
      }
    },
    {
      id: 'nav-showcase',
      title: 'Go to 3D WebGL Showcase',
      subtitle: 'Explore real-time 3D shaders, physics, and configurators',
      category: 'Navigation',
      icon: Zap,
      color: '#06b6d4',
      action: () => {
        onNavigate('showcase');
        onClose();
      }
    },
    {
      id: 'nav-faq',
      title: 'Go to Knowledge Base & FAQs',
      subtitle: 'Answers on 3D FPS optimization, iQRA AI, and architecture',
      category: 'Navigation',
      icon: Globe2,
      color: '#10b981',
      action: () => {
        onNavigate('faq');
        onClose();
      }
    },
    {
      id: 'ext-email',
      title: 'Email Executive Desk',
      subtitle: 'Direct dispatch to ceo@megnitoo.com',
      category: 'Contact & Social',
      icon: Mail,
      color: '#f43f5e',
      action: () => {
        window.location.href = 'mailto:ceo@megnitoo.com';
        onClose();
      }
    },
    {
      id: 'ext-github',
      title: 'Visit GitHub (Mrww305)',
      subtitle: 'Explore open source prototypes and shader repos',
      category: 'Contact & Social',
      icon: ExternalLink,
      color: '#ffffff',
      action: () => {
        window.open('https://github.com/Mrww305', '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ];

  const filteredCommands = ALL_COMMANDS.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.badge && cmd.badge.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent or event
          const btn = document.getElementById('openCommandPaletteBtn');
          btn?.click();
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Omni Command Palette"
      className="fixed inset-0 z-[9999] flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#090a14] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] sm:max-h-[75vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, POC name, or architecture topic..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base outline-none font-medium"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 border border-white/10 text-[11px] font-mono text-neutral-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="p-2 sm:p-3 overflow-y-auto divide-y divide-white/5 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-sm font-light">
              No matching commands or POCs found for "{query}".
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 text-left transition-all ${
                    isSelected
                      ? 'bg-white/10 text-white shadow-md'
                      : 'bg-transparent text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs sm:text-sm text-white flex items-center gap-2 truncate">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-neutral-300">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5 font-light">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'translate-x-0.5 text-cyan-400 opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="p-3 px-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 mr-1">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 mr-1">↓</kbd>
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 mr-1">↵</kbd>
              Execute
            </span>
          </div>
          <span>10 Interactive POCs Loaded</span>
        </div>
      </div>
    </div>
  );
}
