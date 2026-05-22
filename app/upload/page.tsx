'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const COUNTRIES = ['IN','US','UAE','GB','DE','CN','JP','AU','CA','SG','AE'];

export default function UploadPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    originCountry: 'IN',
    destinationCountry: 'US',
    shipper: '',
    consignee: '',
    currency: 'USD',
    totalValue: '',
  });
  const [items, setItems] = useState([{ description: '', quantity: 1, value: 0, weight: 0 }]);

  const addItem = () => setItems([...items, { description: '', quantity: 1, value: 0, weight: 0 }]);
  const updateItem = (i: number, field: string, value: any) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    setItems(updated);
  };
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/shipment', {
        ...form,
        totalValue: parseFloat(form.totalValue),
        items: items.map(it => ({ ...it, quantity: +it.quantity, value: +it.value, weight: +it.weight })),
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-400 hover:text-white">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white">New Shipment</h1>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{s}</div>
              {s < 3 && <div className={`h-0.5 w-16 transition-all ${step > s ? 'bg-sky-500' : 'bg-slate-800'}`} />}
            </div>
          ))}
          <div className="ml-4 flex gap-8 text-sm text-slate-400">
            <span className={step === 1 ? 'text-sky-400' : ''}>Route</span>
            <span className={step === 2 ? 'text-sky-400' : ''}>Items</span>
            <span className={step === 3 ? 'text-sky-400' : ''}>Review</span>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 mb-6 text-sm">{error}</div>}

        {/* Step 1: Route */}
        {step === 1 && (
          <div className="card">
            <h2 className="text-lg font-bold text-white mb-6">🗺️ Shipment Route</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Origin Country</label>
                <select className="input" value={form.originCountry} onChange={e => setForm({ ...form, originCountry: e.target.value })}>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Destination Country</label>
                <select className="input" value={form.destinationCountry} onChange={e => setForm({ ...form, destinationCountry: e.target.value })}>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Shipper (Exporter)</label>
                <input className="input" placeholder="Your Company Pvt. Ltd." value={form.shipper} onChange={e => setForm({ ...form, shipper: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Consignee (Importer)</label>
                <input className="input" placeholder="Buyer Company Inc." value={form.consignee} onChange={e => setForm({ ...form, consignee: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Currency</label>
                <select className="input" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
                  {['USD', 'INR', 'EUR', 'GBP', 'AED'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Total Shipment Value</label>
                <input className="input" type="number" placeholder="50000" value={form.totalValue} onChange={e => setForm({ ...form, totalValue: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-primary" onClick={() => setStep(2)}>Next: Add Items →</button>
            </div>
          </div>
        )}

        {/* Step 2: Items */}
        {step === 2 && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">📦 Shipment Items</h2>
              <button onClick={addItem} className="btn-secondary py-2 px-4 text-sm">+ Add Item</button>
            </div>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 text-sm font-medium">Item {i + 1}</span>
                    {items.length > 1 && <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <input className="input" placeholder="Product description (e.g. Cotton T-shirts, Men's)" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} />
                    </div>
                    <input className="input" type="number" placeholder="Quantity" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} />
                    <input className="input" type="number" placeholder={`Value (${form.currency})`} value={item.value} onChange={e => updateItem(i, 'value', e.target.value)} />
                    <input className="input md:col-span-2" type="number" placeholder="Weight (kg)" value={item.weight} onChange={e => updateItem(i, 'weight', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Next: Review →</button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="card">
            <h2 className="text-lg font-bold text-white mb-6">✅ Review & Submit</h2>
            <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
              <h3 className="text-slate-400 text-sm mb-3 font-medium">ROUTE</h3>
              <p className="text-white font-semibold">{form.originCountry} → {form.destinationCountry}</p>
              <p className="text-slate-400 text-sm">{form.shipper} → {form.consignee}</p>
              <p className="text-slate-400 text-sm">{form.currency} {form.totalValue}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-slate-400 text-sm mb-3 font-medium">ITEMS ({items.length})</h3>
              {items.map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-slate-700/50 last:border-0">
                  <span className="text-white">{item.description || 'Unnamed item'}</span>
                  <span className="text-slate-400">{item.quantity} pcs • {form.currency} {item.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4 mb-6">
              <p className="text-sky-400 text-sm">🤖 <strong>AI will now:</strong> Classify HS codes → Check compliance → Calculate duties → Generate all required customs documents</p>
            </div>
            <div className="flex justify-between">
              <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" onClick={submit} disabled={loading}>
                {loading ? '🔄 Processing...' : '🚀 Submit & Process with AI'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
