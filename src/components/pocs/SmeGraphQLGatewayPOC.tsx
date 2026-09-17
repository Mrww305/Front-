import { useState } from 'react';
import {
  Code2,
  Play,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Terminal,
  Layers,
  BookOpen,
  Database
} from 'lucide-react';

const PRESET_QUERIES: { name: string; query: string; response: object }[] = [
  {
    name: 'Get Textile Market Trends',
    query: `query GetMarketTrends {
  getMarketTrends(
    hsCode: "5201.00.00"
    destinationMarket: "European Union"
    limit: 2
  ) {
    hsCode
    commodityName
    volumeMetricTons
    valuationUsd
    yearOverYearGrowthPct
    competitorBenchmark
  }
}`,
    response: {
      data: {
        getMarketTrends: [
          {
            hsCode: "5201.00.00",
            commodityName: "Raw Cotton, Not Carded or Combed",
            volumeMetricTons: 48200.5,
            valuationUsd: 124500000,
            yearOverYearGrowthPct: 8.4,
            competitorBenchmark: "India / Vietnam parity"
          },
          {
            hsCode: "5205.12.00",
            commodityName: "Single Cotton Yarn, Carded Fibres",
            volumeMetricTons: 32100.0,
            valuationUsd: 89400000,
            yearOverYearGrowthPct: 12.1,
            competitorBenchmark: "Bangladesh sourcing advantage"
          }
        ]
      },
      extensions: {
        latencyMs: 22,
        queryDepth: 2,
        cacheStatus: "EDGE_HIT_KARACHI_POP"
      }
    }
  },
  {
    name: 'Calculate EV Tariff & SRO Exemption',
    query: `query CalculateTariff {
  calculateTariff(
    hsCode: "8703.80.00"
    declaredValueUsd: 45000
  ) {
    hsCode
    customsDutyPct
    regulatoryDutyPct
    salesTaxPct
    netEffectiveTariffPct
    sroExemptionReference
  }
}`,
    response: {
      data: {
        calculateTariff: {
          hsCode: "8703.80.00",
          customsDutyPct: 1.0,
          regulatoryDutyPct: 0.0,
          salesTaxPct: 8.5,
          netEffectiveTariffPct: 9.5,
          sroExemptionReference: "SRO 656(I)/2006 (AIDEP 2021-26)"
        }
      },
      extensions: {
        latencyMs: 18,
        queryDepth: 2,
        cacheStatus: "DYNAMIC_EVALUATION"
      }
    }
  },
  {
    name: 'SME Member Quota & Chamber Auth',
    query: `query GetSmeQuota {
  me {
    id
    ntnNumber
    businessName
    chamberAffiliation
    quotaRemaining
  }
}`,
    response: {
      data: {
        me: {
          id: "sme_pk_984210",
          ntnNumber: "7483921-4",
          businessName: "Al-Rehman Tex Mills Sialkot",
          chamberAffiliation: "Lahore Chamber of Commerce (LCCI)",
          quotaRemaining: 9842
        }
      },
      extensions: {
        latencyMs: 14,
        queryDepth: 2,
        rateLimit: "84/100 remaining per min"
      }
    }
  }
];

export default function SmeGraphQLGatewayPOC() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_QUERIES[0]);
  const [activeTab, setActiveTab] = useState<'editor' | 'docs'>('editor');
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string>(
    JSON.stringify(PRESET_QUERIES[0].response, null, 2)
  );
  const [copied, setCopied] = useState(false);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setResponseOutput(JSON.stringify(selectedPreset.response, null, 2));
      setIsExecuting(false);
    }, 280);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedPreset.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#070714] border border-pink-500/30 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* GraphQL Cockpit Header */}
      <div className="p-3.5 sm:p-6 border-b border-pink-500/20 bg-pink-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 shrink-0">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>SME GraphQL Gateway</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0">
                Apollo Studio
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Query Depth Limiter: 6 • LCCI Member Integration • Landed Tariffs
            </p>
          </div>
        </div>

        {/* Security & Rate Limits */}
        <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] sm:text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Armor Active</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-neutral-300">
            <strong className="text-pink-400">84/100</strong> req/m
          </div>
        </div>
      </div>

      {/* Preset Query Switcher Tabs */}
      <div className="p-3 bg-white/[0.02] border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
        {PRESET_QUERIES.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setSelectedPreset(preset);
              setResponseOutput(JSON.stringify(preset.response, null, 2));
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all border ${
              selectedPreset.name === preset.name
                ? 'bg-pink-500/20 text-pink-300 border-pink-400 font-bold'
                : 'bg-white/5 text-neutral-400 hover:text-white border-white/5'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Two-Pane Playground View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Pane: Query Editor */}
        <div className="lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-pink-500/20 bg-black/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-pink-400 font-bold">
                <Terminal className="w-3.5 h-3.5" /> GraphQL Document
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Display Area */}
            <div className="p-4 rounded-2xl bg-[#03040c] border border-white/10 font-mono text-xs leading-relaxed text-cyan-300 overflow-x-auto min-h-[220px]">
              <pre className="whitespace-pre">{selectedPreset.query}</pre>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-neutral-500">
              Endpoint: <span className="text-white">/api/sme/graphql</span>
            </span>
            <button
              type="button"
              onClick={handleRunQuery}
              disabled={isExecuting}
              className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-pink-600/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isExecuting ? 'Executing...' : 'Run Query'}</span>
            </button>
          </div>
        </div>

        {/* Right Pane: Live JSON Response View */}
        <div className="lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between bg-black/60">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Database className="w-3.5 h-3.5" /> Response Payload (JSON)
              </span>
              <span className="text-[11px] text-neutral-400">HTTP 200 OK</span>
            </div>

            {/* Output View */}
            <div className="p-4 rounded-2xl bg-[#03040c] border border-white/10 font-mono text-xs leading-relaxed text-emerald-300 overflow-x-auto min-h-[220px]">
              <pre className="whitespace-pre">{responseOutput}</pre>
            </div>
          </div>

          {/* Response Telemetry Footer */}
          <div className="pt-4 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Latency: <strong className="text-emerald-400">18ms</strong></span>
            <span>Query Depth: <strong className="text-cyan-400">2 / 6 Max</strong></span>
            <span>Resolver: PostgreSQL RLS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
