import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Navbar */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            <span className="text-xl font-bold text-white">TradeFlow <span className="text-sky-400">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors">Sign In</Link>
            <Link href="/register" className="btn-primary py-2 px-5 text-sm">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-slate-950 to-indigo-900/20" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 rounded-full px-4 py-1.5 text-sky-400 text-sm mb-8">
            🤖 AI-Powered • Autonomous • Real-time
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Cross-Border Trade<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              On Autopilot
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Upload your shipping invoice. Our AI automatically classifies HS codes, checks compliance, calculates duties, and generates all customs documents — in seconds, not days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg px-10 py-4">
              🚀 Start Free — No Credit Card
            </Link>
            <Link href="#how-it-works" className="btn-secondary text-lg px-10 py-4">
              See How It Works
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">✓ Free tier: 5 shipments/month &nbsp; ✓ No setup fees &nbsp; ✓ India ↔ US & UAE corridors</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '95%', label: 'Faster clearance' },
            { value: '₹2L+', label: 'Avg savings/shipment' },
            { value: '180+', label: 'Countries supported' },
            { value: '99.2%', label: 'HS Code accuracy' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black text-sky-400">{s.value}</div>
              <div className="text-slate-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">How TradeFlow AI Works</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">4 steps. Fully automated. From raw invoice to customs-ready documents.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '📤', title: 'Upload Invoice', desc: 'Upload your commercial invoice or packing list (PDF/Excel)' },
              { step: '02', icon: '🔢', title: 'AI Classifies', desc: 'Gemini AI classifies each item with correct HS tariff code' },
              { step: '03', icon: '⚖️', title: 'Compliance Check', desc: 'Real-time check against destination country trade laws & duties' },
              { step: '04', icon: '📋', title: 'Get Documents', desc: 'Download Bill of Lading, Shipping Bill, Certificate of Origin' },
            ].map(s => (
              <div key={s.step} className="card text-center relative">
                <div className="absolute top-4 right-4 text-slate-700 font-black text-lg">{s.step}</div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Everything You Need</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🤖', title: 'AI Document Parser', desc: 'Extracts data from any invoice format — PDF, Excel, scan' },
              { icon: '🏷️', title: 'HS Code Classifier', desc: 'AI matches products to correct 6-digit tariff codes with 99%+ accuracy' },
              { icon: '📊', title: 'Duty Calculator', desc: 'Real-time customs duty calculation for 180+ countries' },
              { icon: '📝', title: 'Document Generator', desc: 'Auto-generates Bill of Lading, COO, Shipping Bill, Customs Entry' },
              { icon: '🗺️', title: 'Route Optimizer', desc: 'AI suggests optimal shipping routes avoiding port congestion' },
              { icon: '🔔', title: 'Compliance Alerts', desc: 'Real-time alerts when trade regulations change for your corridors' },
            ].map(f => (
              <div key={f.title} className="card-hover">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Simple Pricing</h2>
          <p className="text-slate-400 text-center mb-12">Start free, scale as you grow</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Free', price: '₹0', period: '/month', features: ['5 shipments/month', 'HS Code lookup', 'Basic compliance check', 'Email support'], cta: 'Start Free', highlight: false },
              { name: 'Starter', price: '₹4,999', period: '/month', features: ['50 shipments/month', 'AI document parser', 'Full compliance suite', 'Document generation', 'Priority support'], cta: 'Start Starter', highlight: true },
              { name: 'Pro', price: '₹14,999', period: '/month', features: ['Unlimited shipments', 'API access', 'Custom corridors', 'Dedicated account manager', 'SLA guarantee'], cta: 'Contact Sales', highlight: false },
            ].map(p => (
              <div key={p.name} className={`card relative ${p.highlight ? 'border-sky-500/50 bg-gradient-to-b from-sky-900/20 to-slate-900' : ''}`}>
                {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <span className="text-slate-400 mb-1">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2 text-slate-300 text-sm">
                      <span className="text-emerald-400 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={p.highlight ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card border-sky-500/30 bg-gradient-to-br from-sky-900/20 to-indigo-900/20">
            <h2 className="text-3xl font-bold text-white mb-4">Stop Losing Money on Customs Delays</h2>
            <p className="text-slate-400 mb-8">Join import-export businesses using TradeFlow AI to clear customs 95% faster.</p>
            <Link href="/register" className="btn-primary text-lg px-10 py-4 inline-block">
              🚀 Start Free Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <span className="font-bold text-white">TradeFlow AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 TradeFlow AI. All rights reserved.</p>
          <p className="text-slate-600 text-xs">⚠️ For educational/commercial use. Always verify with licensed customs broker.</p>
        </div>
      </footer>
    </main>
  );
}
