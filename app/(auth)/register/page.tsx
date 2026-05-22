'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', form);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <span>🌐</span>
            <span>TradeFlow <span className="text-sky-400">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6">Create your account</h1>
          <p className="text-slate-400 mt-2">Free forever — no credit card needed</p>
        </div>
        <div className="card">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 mb-6 text-sm">{error}</div>
          )}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
              <input className="input" type="text" placeholder="Prashant Pradhan" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Work Email</label>
              <input className="input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Company (Optional)</label>
              <input className="input" type="text" placeholder="Your Trading Co." value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Password</label>
              <input className="input" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
              {loading ? 'Creating Account...' : '🚀 Create Free Account'}
            </button>
          </form>
          <p className="text-center text-slate-400 mt-6 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-sky-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
