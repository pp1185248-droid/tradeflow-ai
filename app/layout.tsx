import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TradeFlow AI — Autonomous Customs & Logistics Agent',
  description: 'AI-powered cross-border logistics. Automate customs paperwork, classify HS codes, check compliance, and optimize trade routes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-slate-950 text-white min-h-screen'}>
        {children}
      </body>
    </html>
  );
}
