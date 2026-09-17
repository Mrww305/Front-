import { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Terminal,
  Layers,
  Building,
  RefreshCw,
  Zap,
  Lock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'iqra';
  text: string;
  timestamp: string;
  reasoningSteps?: string[];
  sources?: string[];
  confidence?: number;
  latencyMs?: number;
}

const PRESET_QUERIES = [
  'Summarize JW Automobile Q3 EBITDA and localization ratio',
  'Find tax exemptions on imported EV components under SRO 656',
  'Chairman briefing: Peshawar Logistics Corridor feasibility',
  'Compare textile export volumes between Punjab and Sindh clusters',
];

const ANSWERS_DB: Record<string, {
  text: string;
  steps: string[];
  sources: string[];
  confidence: number;
  latency: number;
}> = {
  'Summarize JW Automobile Q3 EBITDA and localization ratio': {
    text: "JW Automobile division generated an EBITDA margin of 18.4% in Q3 FY2024, an increase of 2.1% YoY. Local parts localization has reached 42.6% for commercial utility chassis, in compliance with the Auto Industry Development & Export Policy (AIDEP). Assembly line throughput at Lahore plant achieved 94.2% operational capacity.",
    steps: [
      'Authenticating C-Suite token: tenant_id="jw_corp_pakistan"',
      'Querying Milvus vector collection: jw_corp_financial_records',
      'Cross-referencing AIDEP localization quota metrics',
      'Synthesizing via Dual-LLM Guardrail (Reasoning Tier)'
    ],
    sources: ['JW-Corp-Annual-Audit-Q3.pdf (p.14)', 'AIDEP-2021-26-Regulation.pdf', 'Plant-Telemetry-LHE-01'],
    confidence: 99.1,
    latency: 38
  },
  'Find tax exemptions on imported EV components under SRO 656': {
    text: "Under FBR SRO 656(I)/2006 amended via Finance Act 2024, CKD kits for electric vehicle powertrains, lithium-ion battery modules, and BMS controllers qualify for 1% Custom Duty (CD) and 0% Additional Customs Duty (ACD). Sales tax remains capped at 8.5% conditional upon Engineering Development Board (EDB) vendor quota authorization.",
    steps: [
      'Scanning Pakistan Customs Tariff (PCT Chapter 87)',
      'Parsing FBR Statutory Regulatory Orders (SRO 656 amended)',
      'Validating EDB quota clearance requirements',
      'Evaluating net effective tariff landed cost formula'
    ],
    sources: ['FBR-Customs-Tariff-2024-Schedule.pdf', 'SRO-656-EDB-Exemption-Circular.docx', 'Pakistan-Customs-WeBOC-Tariff-API'],
    confidence: 98.7,
    latency: 44
  },
  'Chairman briefing: Peshawar Logistics Corridor feasibility': {
    text: "The Peshawar Logistics Corridor expansion under JW Logistics reports an IRR of 21.4% with expected operational commencement in Q2 2025. Proximity to Torkham border terminal lowers transit turnaround times to Central Asian Republics by 36 hours. Capital expenditure is budgeted at PKR 1.85 Billion with 65% debt financing secured.",
    steps: [
      'Accessing Chairman Confidential Vault (Role: CHAIRMAN)',
      'Aggregating freight transit telematics via Peshawar Zalmi Hub',
      'Running discounted cash flow (DCF) sensitivity simulation',
      'Synthesizing executive briefing summary'
    ],
    sources: ['JW-Logistics-Board-Proposal-Peshawar.pdf', 'Customs-Torkham-Border-Transit-Stats', 'Khyber-Infrastructure-Feasibility-2024'],
    confidence: 97.9,
    latency: 51
  },
  'Compare textile export volumes between Punjab and Sindh clusters': {
    text: "Punjab textile mills accounted for 64.2% ($10.6B) of total textile exports in FY2024, dominated by knitwear and bed linen. Sindh (principally Karachi SITE and Korangi) represented 35.8% ($5.9B), with higher concentration in denim and value-added woven apparel. Sindh clusters maintained a 6.8% lower freight-on-board (FOB) turnaround cost due to direct Port Qasim sea access.",
    steps: [
      'Ingesting Pakistan Bureau of Statistics (PBS) monthly export tables',
      'Disaggregating All Pakistan Textile Mills Association (APTMA) regional data',
      'Normalizing FOB port shipping costs (Karachi vs Dry Port Sialkot)',
      'Formulating regional macroeconomic comparative analysis'
    ],
    sources: ['PBS-Export-Receipts-FY24-Full.xlsx', 'APTMA-Regional-Benchmarking-Report', 'Port-Qasim-Authority-Container-Log'],
    confidence: 98.4,
    latency: 42
  }
};

export default function IqraAiPOC() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'iqra',
      text: "Salam. I am iQRA AI, the central intelligence gateway for JW Corporation Pakistan. I am grounded on enterprise databases across our 7 business verticals, FBR customs tariffs, and macroeconomic trade telemetry. How may I assist corporate governance today?",
      timestamp: '10:00 AM',
      confidence: 99.8,
      latencyMs: 24,
      sources: ['JW-Corp-Master-System-Prompt', 'FBR-Tax-DB-2024']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentReasoningStep, setCurrentReasoningStep] = useState<string>('');

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    const match = ANSWERS_DB[queryText] || {
      text: `Based on current multi-tenant vector records for "${queryText}", our RAG pipeline evaluated 18 document nodes across JW Corporation subsidiaries. Verified data confirms adherence to regulatory statutory frameworks with optimal capital allocation.`,
      steps: [
        'Evaluating semantic vector proximity across 7 verticals',
        'Applying Row-Level Security tenant filter: jw_corp_pakistan',
        'Validating against FBR SRO compliance rules',
        'Synthesizing grounded response'
      ],
      sources: ['JW-Multi-Vertical-DB', 'Pakistan-Corporate-Regulatory-Index'],
      confidence: 96.5,
      latency: 49
    };

    // Step-by-step reasoning simulation
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < match.steps.length) {
        setCurrentReasoningStep(match.steps[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setCurrentReasoningStep('');
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'iqra',
          text: match.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reasoningSteps: match.steps,
          sources: match.sources,
          confidence: match.confidence,
          latencyMs: match.latency
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    }, 450);
  };

  return (
    <div className="w-full bg-[#070913] border border-violet-500/20 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Cockpit Header */}
      <div className="p-4 sm:p-6 border-b border-violet-500/20 bg-violet-950/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-500/30 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>iQRA AI Core</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 shrink-0">
                JW Corp RAG
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Multi-Agent RAG Engine • BGE-M3 Embeddings • FBR SRO Grounding
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] sm:text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Milvus DB</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-400 text-[10px] sm:text-[11px]">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>JW_CORP</span>
          </div>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="p-2.5 sm:p-3 bg-white/[0.02] border-b border-white/5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs snap-scroll-x">
        <span className="text-neutral-500 text-[10px] sm:text-[11px] font-mono py-0.5 px-1.5 shrink-0 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" /> Prompts:
        </span>
        {PRESET_QUERIES.map((query, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(query)}
            disabled={isProcessing}
            className="px-2.5 py-1 sm:px-3 rounded-xl bg-white/5 hover:bg-violet-600/30 hover:border-violet-400/50 border border-white/10 text-neutral-300 hover:text-white transition-all text-[11px] sm:text-xs shrink-0 whitespace-nowrap"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto font-sans">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-violet-600 text-white rounded-br-none shadow-lg shadow-violet-600/20 font-medium'
                  : 'bg-white/[0.04] border border-white/10 text-neutral-200 rounded-bl-none shadow-xl'
              }`}
            >
              {m.sender === 'iqra' && (
                <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-white/10 text-xs font-mono text-neutral-400">
                  <span className="text-violet-400 font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> iQRA Verified Core
                  </span>
                  {m.latencyMs && (
                    <span className="text-[11px] text-emerald-400">
                      TTFT: {m.latencyMs}ms • Grounded {m.confidence}%
                    </span>
                  )}
                </div>
              )}
              <p>{m.text}</p>

              {/* Source Document Tags */}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                  <span className="text-neutral-400">Grounding Citations:</span>
                  {m.sources.map((src, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 flex items-center gap-1"
                    >
                      <FileText className="w-2.5 h-2.5" />
                      {src}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] font-mono text-neutral-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {/* Active Multi-Step Reasoning HUD */}
        {isProcessing && (
          <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 max-w-[80%] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-violet-300">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Multi-Agent Reasoning in Progress...</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 text-[11px] font-mono text-cyan-300 border border-cyan-500/20 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>&gt; {currentReasoningStep || 'Routing to Hybrid Agent...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputValue);
        }}
        className="p-4 border-t border-white/10 bg-black/40 flex items-center gap-3"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask iQRA AI regarding JW Corp verticals, tariffs, or financial metrics..."
          disabled={isProcessing}
          className="flex-1 bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all font-sans"
        />
        <button
          type="submit"
          disabled={isProcessing || !inputValue.trim()}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-violet-600/30"
        >
          <span>Query</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
