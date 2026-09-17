import { Building, User, Mail, MessageSquare, Github, Shield, Globe } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 pt-20 pb-12 px-6 sm:px-10 bg-[#040407]" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand info & Entity details */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-2xl font-black tracking-tight gradient-text-cyan inline-block"
              aria-label="Megnitoo home"
            >
              MEGNITOO
            </a>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm font-light">
              Crafting immersive digital experiences through the fusion of design, 3D WebGL technology, and imagination.
            </p>

            {/* Corporate Identification */}
            <div className="pt-2 space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Parent Company: <strong className="text-neutral-200">MrWorldWide pvt ltd</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span>Founder: <strong className="text-neutral-200">Sajid Afridi (mrww305)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>Direct Contact: <a href="mailto:ceo@megnitoo.com" className="text-cyan-400 hover:underline">ceo@megnitoo.com</a></span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('work')}
                  className="hover:text-white transition-colors"
                >
                  Projects & POCs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('showcase')}
                  className="hover:text-white transition-colors"
                >
                  3D Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('services-section')}
                  className="hover:text-white transition-colors"
                >
                  Core Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-white transition-colors"
                >
                  WebGL Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge & Community */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ & Tech Stack
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('community')}
                  className="hover:text-white transition-colors"
                >
                  Developer Community
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('testimonials')}
                  className="hover:text-white transition-colors"
                >
                  Client Praise
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Direct Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Ecosystem */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a
                  href="https://sajidafridi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>sajidafridi.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com/channels/1509473503475142746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#5865F2] transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discord (ID: 15094735...)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mrww305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub (@Mrww305)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ceo@megnitoo.com"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>ceo@megnitoo.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <p>© 2026 MEGNITOO — A unit of MrWorldWide pvt ltd. Founded by Sajid Afridi (mrww305).</p>
          <div className="flex items-center gap-6">
            <span>ISO Web Standards & Accessibility Compliant</span>
            <span>•</span>
            <span className="text-emerald-400">Google Tag & AI Search Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
