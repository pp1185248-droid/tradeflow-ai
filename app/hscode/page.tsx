'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function HSCodePage() {
  const [product, setProduct] = useState('');
  const [country, setCountry] = useState('IN');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const classify = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post('/api/hscode', { product, country });
      setResult(res.data.result);
      setHistory(prev => [{ product, country, result: res.data.result, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Classification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-400 hover:text-white">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white">🏷️ HS Code Classifier</h1>
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-bold text-white mb-2">Find the Right Tariff Code</h2>
          <p className="text-slate-400 text-sm mb-6">Enter any product description — AI will find the correct 6-digit HS (Harmonized System) code with duty rates.</p>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="text-sm text-slate-400 mb-2 block">Product Description</label>
              <input
                className="input"
                placeholder="e.g. Men's cotton t-shirts, plain weave, 200 GSM"
                value={product}
                onChange={e => setProduct(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && classify()}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Origin Country</label>
              <select className="input" value={country} onChange={e => setCountry(e.target.value)}>
                {['IN','US','UAE','GB','DE','CN','JP'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={classify} disabled={loading || !product.trim()}>
            {loading ? '🔄 Classifying...' : '🔢 Classify with AI'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-sm">{error}</div>}

        {result && (
          <div className="card border-emerald-500/30 bg-gradient-to-br from-emerald-900/10 to-slate-900 mb-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Classification Result</h3>
              <span className="badge-green">✓ Classified</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-slate-400 text-xs mb-1">HS CODE</p>
                <p className="text-3xl font-black text-emerald-400">{result.hsCode}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-slate-400 text-xs mb-1">DUTY RATE</p>
                <p className="text-3xl font-black text-yellow-400">{result.dutyRate}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-slate-400 text-xs mb-1">TARIFF DESCRIPTION</p>
                <p className="text-white text-sm font-medium">{result.description}</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-2">AI REASONING</p>
              <p className="text-slate-300 text-sm">{result.reasoning}</p>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="card">
            <h3 className="font-bold text-white mb-4">Recent Lookups</h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0 cursor-pointer hover:bg-slate-800/30 rounded-lg px-2" onClick={() => { setProduct(h.product); setResult(h.result); }}>
                  <span className="text-slate-300 text-sm">{h.product}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-mono text-sm">{h.result.hsCode}</span>
                    <span className="text-slate-500 text-xs">{h.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
