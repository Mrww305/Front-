import { useState } from 'react';
import {
  Globe2,
  TrendingUp,
  Search,
  Calculator,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Check,
  BarChart2,
  PieChart
} from 'lucide-react';

interface SectorTradeData {
  sector: string;
  volumeUsd: string;
  sharePct: number;
  yoyGrowth: string;
  topDestination: string;
  color: string;
}

const SECTORS: SectorTradeData[] = [
  {
    sector: 'Textiles & Woven Apparel',
    volumeUsd: '$16.54 Billion',
    sharePct: 54.2,
    yoyGrowth: '+3.8%',
    topDestination: 'European Union (GSP+)',
    color: '#06b6d4'
  },
  {
    sector: 'Information Technology & BPO',
    volumeUsd: '$3.22 Billion',
    sharePct: 10.5,
    yoyGrowth: '+24.6%',
    topDestination: 'United States & GCC',
    color: '#8b5cf6'
  },
  {
    sector: 'Food Group & Super Basmati Rice',
    volumeUsd: '$3.92 Billion',
    sharePct: 12.8,
    yoyGrowth: '+18.2%',
    topDestination: 'Middle East & Africa',
    color: '#10b981'
  },
  {
    sector: 'Surgical & Medical Instruments',
    volumeUsd: '$512 Million',
    sharePct: 1.7,
    yoyGrowth: '+7.4%',
    topDestination: 'Germany & USA',
    color: '#f59e0b'
  },
  {
    sector: 'Sports Goods (FIFA Match Balls)',
    volumeUsd: '$680 Million',
    sharePct: 2.2,
    yoyGrowth: '+11.5%',
    topDestination: 'Global Tournament Dist.',
    color: '#ec4899'
  }
];

interface TariffItem {
  hsCode: string;
  commodity: string;
  customsDuty: number;
  regulatoryDuty: number;
  salesTax: number;
  acd: number;
  sroRef: string;
}

const HS_DATABASE: TariffItem[] = [
  {
    hsCode: '5201.00.00',
    commodity: 'Raw Cotton, Not Carded or Combed',
    customsDuty: 0,
    regulatoryDuty: 0,
    salesTax: 0,
    acd: 0,
    sroRef: 'Zero-Rated Textile Raw Material SRO'
  },
  {
    hsCode: '8703.80.00',
    commodity: 'Electric Vehicles (EV) Completely Knocked Down (CKD)',
    customsDuty: 1,
    regulatoryDuty: 0,
    salesTax: 8.5,
    acd: 0,
    sroRef: 'SRO 656(I)/2006 (AIDEP 2021-26)'
  },
  {
    hsCode: '8504.40.90',
    commodity: 'Solar Photovoltaic Inverters & Storage Controllers',
    customsDuty: 0,
    regulatoryDuty: 0,
    salesTax: 0,
    acd: 0,
    sroRef: 'Clean Energy Duty Free Concession SRO 571'
  },
  {
    hsCode: '9018.90.00',
    commodity: 'Stainless Steel Surgical Instruments & Appliances',
    customsDuty: 3,
    regulatoryDuty: 0,
    salesTax: 18,
    acd: 2,
    sroRef: 'Standard Manufacturing Schedule'
  }
];

export default function PakTradeIntelligencePOC() {
  const [searchQuery, setSearchQuery] = useState('8703.80.00');
  const [declaredValUsd, setDeclaredValUsd] = useState<number>(50000);
  const [exchangeRate, setExchangeRate] = useState<number>(278.5); // PKR per USD

  const activeTariff =
    HS_DATABASE.find((t) => t.hsCode.includes(searchQuery) || t.commodity.toLowerCase().includes(searchQuery.toLowerCase())) ||
    HS_DATABASE[1];

  const cdAmount = (declaredValUsd * activeTariff.customsDuty) / 100;
  const rdAmount = (declaredValUsd * activeTariff.regulatoryDuty) / 100;
  const acdAmount = (declaredValUsd * activeTariff.acd) / 100;
  const subtotalDuty = declaredValUsd + cdAmount + rdAmount + acdAmount;
  const stAmount = (subtotalDuty * activeTariff.salesTax) / 100;
  const totalTaxUsd = cdAmount + rdAmount + acdAmount + stAmount;
  const landedCostUsd = declaredValUsd + totalTaxUsd;
  const landedCostPkr = landedCostUsd * exchangeRate;

  return (
    <div className="w-full bg-[#050913] border border-emerald-500/30 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl">
      {/* Header */}
      <div className="p-3.5 sm:p-6 border-b border-emerald-500/20 bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-lg font-bold flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>Pak Trade Intelligence</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                PBS & FBR
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1 sm:line-clamp-none">
              Macroeconomic Trade Analytics • Pakistan Customs HS-Code Calculator
            </p>
          </div>
        </div>

        {/* Live USD/PKR Peg Status */}
        <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
            <span className="text-neutral-400">Interbank:</span>
            <span className="text-emerald-400 font-bold">1 USD = {exchangeRate} PKR</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sector Telemetry vs Interactive Tariff Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Top Pakistani Export Commodities Bar */}
        <div className="lg:col-span-6 p-4 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-emerald-500/20 bg-white/[0.01]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" /> Top Pakistani Export Sectors (FY24)
            </span>
            <span className="text-xs text-neutral-400 font-mono">Total: $30.8 Billion</span>
          </div>

          <div className="space-y-3 pt-2">
            {SECTORS.map((sec, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{sec.sector}</span>
                  <span className="font-mono text-emerald-400 font-bold">{sec.volumeUsd}</span>
                </div>
                {/* Visual Progress Ratio */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${sec.sharePct}%`, backgroundColor: sec.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Market: {sec.topDestination}</span>
                  <span className="text-cyan-300 font-bold">{sec.yoyGrowth} YoY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: HS-Code Tariff Calculator & Simulator */}
        <div className="lg:col-span-6 p-4 sm:p-6 space-y-5 bg-black/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> Live Pakistan Customs Tariff Calculator
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              WeBOC Compliant
            </span>
          </div>

          {/* Search / Select HS-Code */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-neutral-400 block">Select or Search HS-Code:</label>
            <div className="grid grid-cols-2 gap-2">
              {HS_DATABASE.map((item) => (
                <button
                  key={item.hsCode}
                  type="button"
                  onClick={() => setSearchQuery(item.hsCode)}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                    activeTariff.hsCode === item.hsCode
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[11px] block">{item.hsCode}</span>
                  <span className="text-[10px] text-neutral-400 truncate block">{item.commodity}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Consignment Valuation Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-400">Declared Consignment Value (USD):</span>
              <span className="text-white font-bold">${declaredValUsd.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={250000}
              step={5000}
              value={declaredValUsd}
              onChange={(e) => setDeclaredValUsd(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Duty Breakdown Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/20 space-y-2.5 font-mono text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Customs Duty ({activeTariff.customsDuty}%):</span>
              <span className="text-white">${cdAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Sales Tax ({activeTariff.salesTax}%):</span>
              <span className="text-white">${stAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Add. Customs Duty ({activeTariff.acd}%):</span>
              <span className="text-white">${acdAmount.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm">
              <span className="text-emerald-400">Net Landed Cost (PKR):</span>
              <span className="text-emerald-300">PKR {landedCostPkr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="text-[10px] text-neutral-500 pt-1">
              SRO Exemption: <strong className="text-neutral-300">{activeTariff.sroRef}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
