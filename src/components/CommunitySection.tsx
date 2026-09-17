import { useState } from 'react';
import { MessageSquare, Github, Mail, Copy, Check, ExternalLink, ShieldCheck, Users, Sparkles, Building, Terminal } from 'lucide-react';

export default function CommunitySection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="community" className="py-28 px-6 sm:px-10 border-t border-white/5 relative" aria-labelledby="community-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Developer Ecosystem
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-neutral-400">Global Network</span>
          </div>

          <h2
            id="community-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
          >
            Join the <span className="gradient-text-pink-amber">community</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-light">
            Connect with creative technologists, 3D graphics engineers, and the core team behind MEGNITOO and MrWorldWide pvt ltd.
          </p>
        </div>

        {/* 3-Column Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Discord Hub */}
          <div className="rounded-3xl bg-[#0a0a14] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#5865F2]/50 hover:shadow-2xl hover:shadow-[#5865F2]/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#5865F2]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Guild
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Official Discord
              </h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed font-light">
                Collaborate on GLSL shaders, Three.js performance tuning, creative WebGL showcases, and beta testing.
              </p>

              {/* Server ID Box */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">Discord Guild ID</span>
                  <span className="font-mono text-sm font-semibold text-white truncate block select-all">
                    1509473503475142746
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('1509473503475142746', 'discord')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors shrink-0"
                  aria-label="Copy Discord Guild ID"
                  title="Copy Server ID"
                >
                  {copiedField === 'discord' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <a
              href="https://discord.com/channels/1509473503475142746"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#5865F2] hover:bg-[#4752c4] text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#5865F2]/20"
            >
              <span>Connect on Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: GitHub Open Source Hub */}
          <div className="rounded-3xl bg-[#0a0a14] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Github className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Open Source
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                GitHub Repositories
              </h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed font-light">
                Inspect public WebGL boilerplates, shader experiments, React-Three-Fiber modules, and developer tooling.
              </p>

              {/* GitHub Handle Box */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">Workspace Profile</span>
                  <span className="font-mono text-sm font-semibold text-white truncate block">
                    github.com/Mrww305
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('https://github.com/Mrww305', 'github')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors shrink-0"
                  aria-label="Copy GitHub URL"
                  title="Copy GitHub URL"
                >
                  {copiedField === 'github' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <a
              href="https://github.com/Mrww305"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center gap-2 transition-all border border-white/15"
            >
              <span>Explore @Mrww305</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Founder & Executive Desk */}
          <div className="rounded-3xl bg-[#0a0a14] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Building className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Leadership
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Executive Desk
              </h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed font-light">
                Direct enterprise communication with the founder and parent corporate studio for contracts and bespoke graphics.
              </p>

              {/* Founder / Company Info Box */}
              <div className="space-y-2 mb-6">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">Founder:</span>
                  <span className="text-white font-semibold">Sajid Afridi (mrww305)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">Company:</span>
                  <span className="text-white font-semibold">MrWorldWide pvt ltd</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">Direct Desk:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('ceo@megnitoo.com', 'email')}
                    className="text-cyan-300 hover:underline flex items-center gap-1 font-mono font-bold"
                  >
                    <span>ceo@megnitoo.com</span>
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <a
              href="mailto:ceo@megnitoo.com?subject=Enterprise%20Inquiry%20-%20Megnitoo"
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center gap-2 transition-all font-bold shadow-lg shadow-cyan-500/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Executive Desk</span>
            </a>
          </div>
        </div>

        {/* Community Trust Banner */}
        <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Empowering worldwide brands through immersive 3D digital technology.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Verified Identity: <strong>MrWorldWide pvt ltd</strong></span>
            <span>•</span>
            <span className="text-cyan-300">Security & Privacy Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
