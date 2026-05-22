'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/auth/me'),
      axios.get('/api/shipment'),
    ]).then(([userRes, shipRes]) => {
      setUser(userRes.data.user);
      setShipments(shipRes.data.shipments || []);
    }).catch(() => {
      window.location.href = '/login';
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-slate-400 animate-pulse">Loading dashboard...</div>
    </div>
  );

  const planLimits: Record<string, number> = { free: 5, starter: 50, pro: 9999 };
  const limit = planLimits[user?.plan] || 5;
  const used = user?.shipmentsUsed || 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Nav */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <span className="text-lg font-bold">TradeFlow <span className="text-sky-400">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user?.plan === 'pro' ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700 text-slate-300'}`}>
              {user?.plan?.toUpperCase()} PLAN
            </span>
            <span className="text-slate-400 text-sm">{user?.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-slate-400 mt-1">Your AI customs agent is ready to process shipments.</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Shipments Used', value: `${used}/${limit === 9999 ? '∞' : limit}`, icon: '📦', color: 'text-sky-400' },
            { label: 'Documents Generated', value: shipments.filter(s => s.status === 'docs_ready').length.toString(), icon: '📋', color: 'text-emerald-400' },
            { label: 'Compliant Shipments', value: shipments.filter(s => s.status !== 'processing').length.toString(), icon: '✅', color: 'text-emerald-400' },
            { label: 'HS Codes Classified', value: shipments.filter(s => s.status !== 'processing').length.toString(), icon: '🏷️', color: 'text-yellow-400' },
          ].map(s => (
            <div key={s.label} className="card flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{s.label}</p>
                <p className={`text-3xl font-black mt-1 ${s.color}`}>{s.value}</p>
              </div>
              <span className="text-3xl">{s.icon}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { href: '/upload', icon: '📤', title: 'New Shipment', desc: 'Upload invoice & auto-process', color: 'border-sky-500/50 hover:bg-sky-500/10' },
            { href: '/hscode', icon: '🔢', title: 'HS Code Lookup', desc: 'Find tariff code for any product', color: 'border-emerald-500/50 hover:bg-emerald-500/10' },
            { href: '/compliance', icon: '⚖️', title: 'Check Compliance', desc: 'Verify trade rules & duties', color: 'border-yellow-500/50 hover:bg-yellow-500/10' },
            { href: '/documents', icon: '📄', title: 'My Documents', desc: 'View & download generated docs', color: 'border-purple-500/50 hover:bg-purple-500/10' },
          ].map(a => (
            <Link key={a.href} href={a.href} className={`card-hover border ${a.color} transition-all`}>
              <div className="text-3xl mb-3">{a.icon}</div>
              <h3 className="font-bold text-white">{a.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{a.desc}</p>
            </Link>
          ))}
        </div>

        {/* Upgrade Banner */}
        {user?.plan === 'free' && (
          <div className="card border-sky-500/30 bg-gradient-to-r from-sky-900/20 to-indigo-900/20 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Upgrade to Starter ⚡</h3>
              <p className="text-slate-400 text-sm">Get 50 shipments/month, full document generation, and priority support — just ₹4,999/month</p>
            </div>
            <Link href="/pricing" className="btn-primary whitespace-nowrap">Upgrade Now</Link>
          </div>
        )}

        {/* Recent Shipments */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Shipments</h2>
            <Link href="/upload" className="btn-primary py-2 px-4 text-sm">+ New Shipment</Link>
          </div>
          {shipments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-white font-semibold mb-2">No shipments yet</h3>
              <p className="text-slate-400 text-sm mb-6">Upload your first invoice to get started</p>
              <Link href="/upload" className="btn-primary">Upload Invoice</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="text-left py-3 px-4">Route</th>
                    <th className="text-left py-3 px-4">Consignee</th>
                    <th className="text-left py-3 px-4">Value</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((s: any) => (
                    <tr key={s._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">{s.originCountry} → {s.destinationCountry}</td>
                      <td className="py-3 px-4 text-slate-300">{s.consignee || 'N/A'}</td>
                      <td className="py-3 px-4 text-slate-300">{s.currency} {s.totalValue?.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`badge-${s.status === 'docs_ready' ? 'green' : s.status === 'compliant' ? 'blue' : 'yellow'}`}>
                          {s.status?.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
