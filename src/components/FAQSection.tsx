import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, Sparkles, Code, Gauge, Users } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'all' | '3d' | 'enterprise' | 'performance' | 'process' | 'agency';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'agency',
    question: 'Who owns and leads MEGNITOO?',
    answer:
      'MEGNITOO is founded and spearheaded by Sajid Afridi (mrww305), Lead Creative Technologist & Systems Architect, operating under MrWorldWide pvt ltd. For high-priority enterprise inquiries, collaborations, and partnerships, our executive desk can be reached directly at ceo@megnitoo.com.',
  },
  {
    id: 'faq-enterprise-1',
    category: 'enterprise',
    question: 'What is iQRA AI and how does it integrate with JW Corporation?',
    answer:
      'iQRA AI is an enterprise-grade multi-agent RAG engine developed for JW Corporation Pakistan. Grounded on Milvus vector databases with BGE-M3 embeddings, it indexes FBR statutory regulatory orders (SROs), customs tariffs, and real-time operational records across JW Corp’s 7 business verticals with sub-40ms time-to-first-token.',
  },
  {
    id: 'faq-enterprise-2',
    category: 'enterprise',
    question: 'How does the Construction Sector 3D BIM & CAD blueprint viewer function?',
    answer:
      'The Megnitoo Construction BIM platform is a browser-native 3D CAD engine built on Three.js. It features multi-level floor slicing, real-time material swapping (structural steel, reinforced concrete, low-E glazing), live measurement calipers, and simulated seismic zone-4 load stress testing.',
  },
  {
    id: 'faq-enterprise-3',
    category: 'enterprise',
    question: 'How does the SME GraphQL Gateway and Pakistan Trade Intelligence system protect data?',
    answer:
      'The SME GraphQL Gateway employs GraphQL Armor with AST query depth limiters (max depth: 6) to prevent recursive DoS attacks, rate limits of 100 req/min per NTN number, and PostgreSQL Row-Level Security (RLS) guaranteeing strict multi-tenant isolation between competing chamber exporters.',
  },
  {
    id: 'faq-2',
    category: '3d',
    question: 'How does MEGNITOO achieve stable 60 FPS in 3D WebGL on mobile devices?',
    answer:
      'We engineer memory-conscious Three.js and custom GLSL shader pipelines utilizing adaptive Level-of-Detail (LOD), geometry instancing, frustum culling, and resolution capping based on device DPR. This guarantees smooth, thermal-throttling-free performance across both flagship workstations and entry mobile browsers.',
  },
  {
    id: 'faq-3',
    category: 'performance',
    question: 'How do your WebGL platforms achieve high Lighthouse scores and AI search indexation?',
    answer:
      'We implement a hybrid architecture: 3D canvases operate as progressive enhancements while the underlying DOM delivers 100% semantic HTML5, Schema.org JSON-LD microdata, OpenGraph headers, and server-side metadata. AI search engines like Google Gemini, Claude, and Perplexity parse our entity relationships with zero friction.',
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'What is the typical timeline for an interactive digital experience or POC?',
    answer:
      'Prototyping a high-fidelity Proof of Concept (POC) typically requires 5 to 10 business days. Full-scale commercial platforms with custom PBR asset workflows, sound design, and enterprise integrations span 4 to 8 weeks in collaborative agile sprints.',
  },
  {
    id: 'faq-5',
    category: 'agency',
    question: 'How can developers join the MEGNITOO community or access open source labs?',
    answer:
      'You can join our developer Discord server (ID: 1509473503475142746) to discuss graphics programming, shader hacks, and 3D web trends. Our public codebases, shaders, and prototypes are maintained on GitHub at https://github.com/Mrww305.',
  },
  {
    id: 'faq-6',
    category: '3d',
    question: 'Do your 3D experiences support WebXR, Augmented Reality (AR), and spatial web?',
    answer:
      'Yes. Our 3D product configurators and spatial environments support WebXR session initiation, simulated mobile AR placement via device orientation sensors, and camera surface-tracking feeds.',
  },
  {
    id: 'faq-7',
    category: 'performance',
    question: 'What analytics and telemetry standards are built into your applications?',
    answer:
      'Every interface integrates custom event telemetry dispatched into Google Tag Manager (window.dataLayer), tracking funnel completion, field-level micro-interactions, FPS profiling, and conversion funnels compliant with privacy regulations.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'enterprise' | '3d' | 'performance' | 'process' | 'agency'>('all');

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-28 px-6 sm:px-10 border-t border-white/5 relative" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Knowledge Base
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-neutral-400">Structured Answers</span>
          </div>

          <h2
            id="faq-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
          >
            Frequently asked <span className="gradient-text-pink-amber">questions</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto font-light">
            Everything you need to know about our enterprise suite, 3D CAD engines, AI architectures, and founder leadership.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search iQRA AI, CAD blueprints, 3D FPS, SEO indexing, founder details..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-sm transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'enterprise', label: 'Enterprise & AI' },
              { id: '3d', label: '3D & WebGL' },
              { id: 'performance', label: 'SEO & Performance' },
              { id: 'process', label: 'Process & Timeline' },
              { id: 'agency', label: 'Founder & Agency' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30'
                    : 'bg-white/[0.02] text-neutral-400 border-white/5 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-neutral-400 text-sm">
              No matching questions found for "{searchQuery}". Contact{' '}
              <a href="mailto:ceo@megnitoo.com" className="text-cyan-400 hover:underline">
                ceo@megnitoo.com
              </a>{' '}
              directly for custom inquiries.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white/[0.04] border-violet-500/40 shadow-xl shadow-violet-950/20'
                      : 'bg-white/[0.015] border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`answer-${faq.id}`}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-violet-600/30 text-violet-300' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`answer-${faq.id}`}
                      role="region"
                      aria-labelledby={faq.id}
                      className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed font-light border-t border-white/5 animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
