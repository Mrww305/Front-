import { useState, FormEvent } from 'react';
import { Send, Check, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 4000);
    }, 600);
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-10 border-t border-white/5 relative" aria-labelledby="contact-heading">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4 block">
          Contact
        </span>
        <h2
          id="contact-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
        >
          Let's create<br />
          <span className="gradient-text-cyan">something amazing</span>
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg max-w-lg mx-auto mb-12 font-light">
          Ready to bring your vision to life? Drop us a message and let's start the conversation.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.02] border border-white/8 rounded-3xl p-8 sm:p-12 shadow-2xl text-left space-y-6"
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@studio.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project, timeline, and vision..."
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Response typically within 24 hours</span>
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
                  <span>✓ Message Sent!</span>
                </>
              ) : isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
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
