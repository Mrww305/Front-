import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Search, Command } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        id="scrollProgress"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 z-[1000] origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Navigation Bar */}
      <header
        id="nav"
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 px-6 sm:px-10 py-5 flex items-center justify-between border-b ${
          isScrolled
            ? 'bg-[#050508]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/40'
            : 'bg-transparent border-transparent'
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl sm:text-2xl font-black tracking-tight gradient-text-cyan hover:opacity-90 transition-opacity"
          aria-label="Megnitoo - Home"
        >
          MEGNITOO
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-violet-500 hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('work');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Projects & POCs
          </a>
          <a
            href="#showcase"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('showcase');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300"
          >
            3D Showcase
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services-section');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('faq');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            FAQ
          </a>
          <a
            href="#community"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('community');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Community
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-violet-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </a>
          <a
            href="https://sajidafridi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white transition-all duration-300 shadow-sm"
            title="Visit Founder's Site (opens in new tab)"
          >
            <span>sajidafridi.com</span>
            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
          </a>
        </nav>

        {/* CTA & Quick Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono text-neutral-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all duration-200 touch-spring"
              title="Search & POCs (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">⌘K</kbd>
            </button>
          )}

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="nav-cta group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 touch-spring"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Header Actions */}
        <div className="lg:hidden flex items-center gap-2">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="p-2 rounded-xl text-neutral-300 hover:text-white bg-white/5 border border-white/10 touch-spring"
              aria-label="Open Command Search"
            >
              <Search className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          <button
            type="button"
            id="menuBtn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-white/80 hover:text-white focus:outline-none touch-spring"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobileMenu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[899] bg-[#050508]/96 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('work');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          Projects & POCs
        </a>
        <a
          href="#showcase"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('showcase');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          3D Showcase
        </a>
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('services-section');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          Services
        </a>
        <a
          href="#faq"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('faq');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          FAQ
        </a>
        <a
          href="#community"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('community');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          Community
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
          className="font-display text-xl font-bold text-neutral-300 hover:text-white transition-colors"
        >
          Contact
        </a>
        <a
          href="https://sajidafridi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-base font-semibold text-cyan-300 hover:text-white transition-colors flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30"
          title="Visit Founder's Site (opens in new tab)"
        >
          <span>sajidafridi.com</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="mt-4 px-8 py-3 rounded-full text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-xl shadow-violet-600/40"
        >
          Start Project
        </button>
      </div>
    </>
  );
}
