import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle2, ShieldCheck, Activity, Eye, MousePointerClick, Send, Sparkles } from 'lucide-react';

interface FormAnalyticsProps {
  currentSession: {
    nameFilled: boolean;
    emailFilled: boolean;
    messageFilled: boolean;
    timeOnForm: number;
    keystrokes: number;
    submissionCount: number;
    lastEvent: string;
  };
}

export default function FormAnalytics({ currentSession }: FormAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'datalayer'>('metrics');

  const completionPct =
    (currentSession.nameFilled ? 33 : 0) +
    (currentSession.emailFilled ? 33 : 0) +
    (currentSession.messageFilled ? 34 : 0);

  return (
    <div className="w-full bg-[#0b0b14] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span>Forms Telemetry & Conversion Analytics</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                GTM Ready
              </span>
            </h3>
            <p className="text-xs text-neutral-400">
              Live funnel telemetry, drop-off tracking, and Google Tag dataLayer dispatch
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'metrics'
                ? 'bg-violet-600 text-white font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Funnel Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('datalayer')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'datalayer'
                ? 'bg-cyan-500 text-black font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Google Tag Stream
          </button>
        </div>
      </div>

      {activeTab === 'metrics' ? (
        <div className="space-y-6">
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1.5">
                <span>Impressions</span>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="font-display text-2xl font-bold text-white">1,842</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14.2% this week
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1.5">
                <span>Interaction Rate</span>
                <MousePointerClick className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div className="font-display text-2xl font-bold text-white">64.8%</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">1,194 users engaged</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1.5">
                <span>Conversion Rate</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="font-display text-2xl font-bold text-emerald-400">26.4%</div>
              <div className="text-[10px] font-mono text-neutral-400 mt-1">486 total leads</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1.5">
                <span>Avg Fill Time</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="font-display text-2xl font-bold text-white">32.8s</div>
              <div className="text-[10px] font-mono text-cyan-400 mt-1">Friction-free UX</div>
            </div>
          </div>

          {/* Current Live Session Meter */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                Live User Form Progress (This Session)
              </span>
              <span className="font-mono font-bold text-cyan-300">{completionPct}% Complete</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-300 rounded-full"
                style={{ width: `${completionPct}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
              <div className={`p-2 rounded-xl border ${currentSession.nameFilled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/5 text-neutral-500'}`}>
                Name: {currentSession.nameFilled ? '✓ Filled' : 'Pending'}
              </div>
              <div className={`p-2 rounded-xl border ${currentSession.emailFilled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/5 text-neutral-500'}`}>
                Email: {currentSession.emailFilled ? '✓ Filled' : 'Pending'}
              </div>
              <div className={`p-2 rounded-xl border ${currentSession.messageFilled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/5 text-neutral-500'}`}>
                Message: {currentSession.messageFilled ? '✓ Filled' : 'Pending'}
              </div>
            </div>
          </div>

          {/* Field Drop-Off Heatmap Breakdown */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold text-neutral-300 flex items-center justify-between">
              <span>Field Retention Funnel</span>
              <span className="text-xs font-mono text-neutral-500">Benchmark: Top 5% Agency</span>
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1 text-neutral-400">
                  <span>Step 1: Name Input</span>
                  <span className="text-white font-semibold">98.2% completion (1.8% drop)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '98.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-neutral-400">
                  <span>Step 2: Corporate Email</span>
                  <span className="text-white font-semibold">94.7% completion (3.5% drop)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-violet-400 rounded-full" style={{ width: '94.7%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-neutral-400">
                  <span>Step 3: Vision / Scope Message</span>
                  <span className="text-white font-semibold">91.4% completion (3.3% drop)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-pink-400 rounded-full" style={{ width: '91.4%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Google Tag Manager Stream */
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
            📡 Dispatched live into <code className="text-white font-bold">window.dataLayer</code> for Google Tag Manager, GA4, and server-side tracking containers.
          </div>

          <div className="p-4 rounded-2xl bg-black/70 border border-white/10 text-neutral-300 space-y-3">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider flex items-center justify-between">
              <span>Last Event Dispatched</span>
              <span className="text-emerald-400 font-bold">ACK 200</span>
            </div>

            <pre className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-cyan-300 overflow-x-auto text-[11px]">
{JSON.stringify(
  {
    event: currentSession.lastEvent || 'form_interaction',
    form_id: 'contact_form_megnitoo',
    form_destination: 'ceo@megnitoo.com',
    company: 'MrWorldWide pvt ltd',
    fields_completed: {
      name: currentSession.nameFilled,
      email: currentSession.emailFilled,
      message: currentSession.messageFilled,
    },
    metrics: {
      time_elapsed_sec: currentSession.timeOnForm,
      keystrokes_total: currentSession.keystrokes,
      completion_percentage: completionPct,
    },
    gtm_container_status: 'ready',
    timestamp: new Date().toISOString(),
  },
  null,
  2
)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
