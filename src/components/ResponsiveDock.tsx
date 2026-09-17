import { useState, useEffect } from 'react';
import {
  Home,
  Layers,
  Sparkles,
  Search,
  Activity,
  Compass,
  MessageSquare
} from 'lucide-react';

interface ResponsiveDockProps {
  onOpenPOCLab: () => void;
  onOpenCommandPalette: () => void;
  onTogglePerformanceHUD: () => void;
  isPerformanceHUDOpen: boolean;
}

export default function ResponsiveDock({
  onOpenPOCLab,
  onOpenCommandPalette,
  onTogglePerformanceHUD,
  isPerformanceHUDOpen
}: ResponsiveDockProps) {
  const [activeSection, setActiveSection] = useState<'home' | 'work' | 'showcase' | 'faq' | 'contact'>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const workEl = document.getElementById('work');
      const showcaseEl = document.getElementById('showcase');
      const faqEl = document.getElementById('faq');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (faqEl && scrollPos >= faqEl.offsetTop) {
        setActiveSection('faq');
      } else if (showcaseEl && scrollPos >= showcaseEl.offsetTop) {
        setActiveSection('showcase');
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveSection('work');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Quick Action Floating Dock"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-[850] w-[90%] max-w-sm pointer-events-auto"
    >
      <div className="relative flex items-center justify-around px-3 py-1.5 sm:py-2 rounded-full bg-[#080812]/92 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/90 ring-1 ring-white/10">
        
        {/* Home Tab */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl touch-spring transition-colors ${
            activeSection === 'home'
              ? 'text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
          aria-label="Scroll to Top"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        {/* Work & Projects Tab */}
        <button
          type="button"
          onClick={() => scrollToSection('work')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl touch-spring transition-colors ${
            activeSection === 'work'
              ? 'text-white font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
          aria-label="View Projects"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5">Work</span>
        </button>

        {/* Central Prominent POC LAB Trigger Button */}
        <button
          type="button"
          id="dockPOCLabBtn"
          onClick={onOpenPOCLab}
          className="relative -top-3 px-4 py-2 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-violet-600/40 hover:shadow-violet-600/60 touch-spring flex items-center gap-1.5 border border-white/30 shrink-0"
          aria-label="Open 10 Interactive Proof of Concepts Lab"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-bold font-display tracking-tight uppercase">POCs</span>
          <span className="px-1.5 py-0.2 text-[9px] font-mono font-black rounded-full bg-white/30 text-white">
            10
          </span>
        </button>

        {/* Omni Command Search Button */}
        <button
          type="button"
          id="openCommandPaletteBtn"
          onClick={onOpenCommandPalette}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl touch-spring text-neutral-400 hover:text-cyan-400 transition-colors"
          aria-label="Open Command Palette (Cmd+K)"
          title="Search & POCs (Cmd+K)"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-0.5">Search</span>
        </button>
      </div>
    </aside>
  );
}
