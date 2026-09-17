import { useState, FormEvent } from 'react';
import {
  Building2,
  TrendingUp,
  ShieldAlert,
  Lock,
  Unlock,
  Layers,
  DollarSign,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Car,
  Briefcase,
  Cpu,
  Package,
  ShoppingBag,
  Truck
} from 'lucide-react';

interface VerticalData {
  id: string;
  name: string;
  icon: typeof Building2;
  revenuePkr: string;
  ebitdaMargin: string;
  headcount: string;
  status: 'Outperforming' | 'Stable' | 'Capital Expansion';
  kpis: { label: string; val: string }[];
  alerts: string[];
}

const VERTICALS: VerticalData[] = [
  {
    id: 'auto',
    name: 'JW Automobile',
    icon: Car,
    revenuePkr: 'PKR 44.2 Billion',
    ebitdaMargin: '18.4%',
    headcount: '2,840 Employees',
    status: 'Outperforming',
    kpis: [
      { label: 'Plant Utilization (Lahore)', val: '94.2%' },
      { label: 'Local Parts Localization', val: '42.6%' },
      { label: 'Units Delivered (FY24)', val: '14,820' },
      { label: 'EV Conversion Pipeline', val: 'Q3 2025' }
    ],
    alerts: [
      'Raw steel tariff concession approved under SRO 656',
      'Lahore assembly line expansion completed ahead of schedule'
    ]
  },
  {
    id: 'realestate',
    name: 'JW Construction & Lands',
    icon: Building2,
    revenuePkr: 'PKR 32.8 Billion',
    ebitdaMargin: '24.1%',
    headcount: '1,420 Employees',
    status: 'Capital Expansion',
    kpis: [
      { label: 'Active Development Footprint', val: '4.8M sq ft' },
      { label: 'Tower Alpha Structural Pour', val: '84.2%' },
      { label: 'Commercial Pre-Lease Rate', val: '78.0%' },
      { label: 'Seismic Zone 4 Compliance', val: '100%' }
    ],
    alerts: [
      'Karachi Marina Tower passed ISO 14001 environmental safety inspection',
      'Cement bulk procurement locked at hedge rate'
    ]
  },
  {
    id: 'tech',
    name: 'JW Technology & iQRA AI',
    icon: Cpu,
    revenuePkr: 'PKR 12.6 Billion',
    ebitdaMargin: '38.5%',
    headcount: '650 Engineers',
    status: 'Outperforming',
    kpis: [
      { label: 'Enterprise RAG Latency', val: '38ms TTFT' },
      { label: 'Milvus Cluster High-Avail', val: '99.99%' },
      { label: 'Corporate Agent Queries', val: '1.4M / mo' },
      { label: 'LCCI Agent Members Served', val: '46,200+' }
    ],
    alerts: [
      'BGE-M3 multilingual Urdu-English embedding deployed to sovereign DC',
      'SOC2 Type II compliance audit passed without observations'
    ]
  },
  {
    id: 'textile',
    name: 'JW Textile & Apparel',
    icon: Layers,
    revenuePkr: 'PKR 28.4 Billion',
    ebitdaMargin: '14.8%',
    headcount: '4,200 Employees',
    status: 'Stable',
    kpis: [
      { label: 'Export Volume (EU & US)', val: '$98.4M USD' },
      { label: 'OEKO-TEX Certified Looms', val: '340 Units' },
      { label: 'Rooftop Solar Offset', val: '4.2 MW' },
      { label: 'Dyehouse Water Recycling', val: '82.0%' }
    ],
    alerts: [
      'GSP+ status extended, guaranteeing tariff-free European export quota',
      'Port Qasim container shipment dispatch clearing turnaround within 18 hours'
    ]
  },
  {
    id: 'logistics',
    name: 'JW Supply Chain & Logistics',
    icon: Truck,
    revenuePkr: 'PKR 16.5 Billion',
    ebitdaMargin: '16.2%',
    headcount: '1,100 Employees',
    status: 'Capital Expansion',
    kpis: [
      { label: 'Fleet Prime Movers', val: '420 Trucks' },
      { label: 'GPS IoT Conduction Rate', val: '100%' },
      { label: 'Transit Time: KHI to LHE', val: '26 Hours' },
      { label: 'Peshawar Corridor Transit', val: 'Active' }
    ],
    alerts: [
      'Torkham cross-border transit protocol validated with Customs WeBOC',
      'Cold-chain reefer logistics expanded for citrus agricultural exports'
    ]
  },
  {
    id: 'packaging',
    name: 'JW Industrial Packaging',
    icon: Package,
    revenuePkr: 'PKR 9.8 Billion',
    ebitdaMargin: '21.0%',
    headcount: '540 Employees',
    status: 'Stable',
    kpis: [
      { label: 'Corrugated Board Output', val: '120,000 MT' },
      { label: 'Bio-Degradable Poly Resins', val: '44% Mix' },
      { label: 'FMCG Contract Retention', val: '98.2%' },
      { label: 'Zero-Waste Scrap Recycled', val: '99.1%' }
    ],
    alerts: [
      'Import substitution of Kraft linerboard saved $4.2M in foreign exchange'
    ]
  },
  {
    id: 'retail',
    name: 'JW Retail & Distribution',
    icon: ShoppingBag,
    revenuePkr: 'PKR 14.1 Billion',
    ebitdaMargin: '12.6%',
    headcount: '1,800 Staff',
    status: 'Stable',
    kpis: [
      { label: 'Nationwide Retail Outlets', val: '210 Stores' },
      { label: 'Omnichannel POS Sync', val: '<250ms' },
      { label: 'Same-Day City Delivery', val: '86.4%' },
      { label: 'Customer NPS Score', val: '+74' }
    ],
    alerts: [
      'Unified ERP inventory sync deployed across all provincial flagship hubs'
    ]
  }
];

export default function JwExecutiveDashboardPOC() {
  const [selectedVertical, setSelectedVertical] = useState<VerticalData>(VERTICALS[0]);
  const [isChairmanUnlocked, setIsChairmanUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showError, setShowError] = useState(false);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'JW-7788' || passcode.trim() === 'CHAIRMAN') {
      setIsChairmanUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="w-full bg-[#060813] border border-amber-500/30 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* C-Suite Governance Header */}
      <div className="p-3.5 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-[#060813] to-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center font-display text-base sm:text-lg border border-amber-500/40 shadow-lg shadow-amber-500/20 shrink-0">
            JW
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>JW CORPORATION</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                Chairman BI
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Consolidated 7-Vertical Governance • Real-Time EBITDA Telemetry • Vault
            </p>
          </div>
        </div>

        {/* Chairman Secret Vault Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isChairmanUnlocked ? (
            <button
              type="button"
              onClick={() => setIsChairmanUnlocked(false)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-[11px] sm:text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/30"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Chairman Active (Lock)</span>
            </button>
          ) : (
            <form onSubmit={handleUnlock} className="flex items-center gap-1.5">
              <input
                type="password"
                placeholder="JW-7788"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="bg-white/5 border border-amber-500/30 rounded-xl px-2.5 py-1 sm:py-1.5 text-xs text-white placeholder:text-neutral-500 w-28 sm:w-36 outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-1 sm:py-1.5 rounded-xl bg-white/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1 transition-all shrink-0"
              >
                <Lock className="w-3 h-3" />
                <span>Unlock</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {showError && (
        <div className="px-6 py-2 bg-rose-950/40 border-b border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Invalid Chairman credentials. Passcode is JW-7788 or CHAIRMAN for demo inspection.</span>
        </div>
      )}

      {/* Chairman Classified Vault Banner (When Unlocked) */}
      {isChairmanUnlocked && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/20 via-amber-950/40 to-transparent border-b border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              CLASSIFIED // CHAIRMAN DESK (MR. CHAIRMAN)
            </span>
            <span className="font-display text-lg font-black text-white">
              Total Consolidated Treasury: PKR 145.7 Billion ($524M USD)
            </span>
          </div>
          <div className="text-xs font-mono text-neutral-300 space-y-1">
            <div className="text-emerald-400 font-bold">Unencumbered Cash Reserves: PKR 24.2B</div>
            <div className="text-[11px] text-neutral-400">Board Resolution: CapEx allocation approved for Q4</div>
          </div>
        </div>
      )}

      {/* 7 Verticals Switcher Pills */}
      <div className="p-3 bg-white/[0.02] border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
        {VERTICALS.map((vert) => {
          const IconComponent = vert.icon;
          const isSelected = selectedVertical.id === vert.id;
          return (
            <button
              key={vert.id}
              type="button"
              onClick={() => setSelectedVertical(vert)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono shrink-0 transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-white/5 text-neutral-400 hover:text-white border-white/5'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{vert.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Inspection View */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Top KPI Cards for Selected Vertical */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-xs font-mono block">ANNUALIZED REVENUE</span>
            <span className="font-display text-xl sm:text-2xl font-black text-white mt-1 block">
              {selectedVertical.revenuePkr}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14.2% YoY Growth
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-xs font-mono block">OPERATIONAL EBITDA</span>
            <span className="font-display text-xl sm:text-2xl font-black text-amber-400 mt-1 block">
              {selectedVertical.ebitdaMargin}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono block mt-1">
              Status: <strong className="text-white">{selectedVertical.status}</strong>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-xs font-mono block">CORPORATE WORKFORCE</span>
            <span className="font-display text-xl sm:text-2xl font-black text-cyan-300 mt-1 block">
              {selectedVertical.headcount}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono block mt-1">
              Provincial Compliance: 100%
            </span>
          </div>
        </div>

        {/* Drill-down Operational Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Operating Telemetry & Industrial Audits
            </span>
            <div className="grid grid-cols-2 gap-3">
              {selectedVertical.kpis.map((kpi, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[11px] text-neutral-400 block">{kpi.label}</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{kpi.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold block">
              Executive Governance Stream & Regulatory Approvals
            </span>
            <div className="space-y-2">
              {selectedVertical.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-emerald-500/20 text-xs text-neutral-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{alert}</span>
                </div>
              ))}
              <div className="p-2.5 rounded-xl bg-white/[0.01] text-[11px] font-mono text-neutral-500">
                [AUDIT LOG] Signed by Group Chief Financial Officer (CFO) on 14-Sep-2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
