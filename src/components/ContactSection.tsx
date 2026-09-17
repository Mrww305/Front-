import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Send, Check, Sparkles, BarChart2, Mail, Building, User } from 'lucide-react';
import FormAnalytics from './FormAnalytics';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Forms Telemetry & Analytics State
  const [keystrokes, setKeystrokes] = useState(0);
  const [startTime] = useState<number>(Date.now());
  const [timeOnForm, setTimeOnForm] = useState(0);
  const [lastEvent, setLastEvent] = useState('form_view');

  useEffect(() => {
    // Dispatch initial GTM view event
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'form_impression',
        form_name: 'contact_form_megnitoo',
        category: 'lead_generation',
      });
    }

    const timer = setInterval(() => {
      setTimeOnForm(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const recordInteraction = (field: string, val: string) => {
    setKeystrokes((prev) => prev + 1);
    const eventName = `form_field_${field}_input`;
    setLastEvent(eventName);

    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: eventName,
        field_length: val.length,
        time_elapsed: Math.floor((Date.now() - startTime) / 1000),
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setLastEvent('form_submission_attempt');

    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'generate_lead',
        value: 1,
        currency: 'USD',
        lead_source: 'megnitoo_contact_form',
        form_completion_time: timeOnForm,
        keystrokes_total: keystrokes,
        founder: 'Sajid Afridi (mrww305)',
        company: 'MrWorldWide pvt ltd',
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastEvent('form_submission_success');

      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 5000);
    }, 650);
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-10 border-t border-white/5 relative" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 block">
          Initiate Collaboration
        </span>

        <h2
          id="contact-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
        >
          Let's engineer<br />
          <span className="gradient-text-cyan">something extraordinary</span>
        </h2>

        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto mb-8 font-light">
          Whether you require WebGL architectures, custom shader engineering, or next-generation digital products, our team responds swiftly.
        </p>

        {/* Corporate Quick Credentials Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>Company: <strong className="text-white">MrWorldWide pvt ltd</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <User className="w-3.5 h-3.5 text-violet-400" />
            <span>Founder: <strong className="text-white">Sajid Afridi (mrww305)</strong></span>
          </div>
          <a
            href="mailto:ceo@megnitoo.com"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-violet-400 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-pink-400" />
            <span>Email: <strong className="text-white">ceo@megnitoo.com</strong></span>
          </a>
        </div>

        {/* Form & Analytics Toggle Bar */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all border shadow-lg ${
              showAnalytics
                ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>{showAnalytics ? 'Hide Forms Analytics' : 'Live Forms Analytics & GTM Stream'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active
            </span>
          </button>
        </div>

        {/* Active Forms Analytics Panel */}
        {showAnalytics && (
          <div className="mb-10 text-left animate-in fade-in duration-300">
            <FormAnalytics
              currentSession={{
                nameFilled: name.trim().length > 0,
                emailFilled: email.trim().length > 0,
                messageFilled: message.trim().length > 0,
                timeOnForm,
                keystrokes,
                submissionCount: isSubmitted ? 1 : 0,
                lastEvent,
              }}
            />
          </div>
        )}

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.02] border border-white/8 rounded-3xl p-8 sm:p-12 shadow-2xl text-left space-y-6"
          aria-label="Direct Inquiry Form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                  recordInteraction('name', e.target.value);
                }}
                placeholder="Jane Doe"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Work Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                  recordInteraction('email', e.target.value);
                }}
                placeholder="jane@organization.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Project Scope & Requirements
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setMessage(e.target.value);
                recordInteraction('message', e.target.value);
              }}
              placeholder="Outline your project timeline, WebGL goals, technical stack, or required deliverables..."
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-sm"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Direct routing to Sajid Afridi (Founder)</span>
            </div>

            <button
              id="submitBtn"
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                isSubmitted
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>✓ Inquiry Transmitted!</span>
                </>
              ) : isSubmitting ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
