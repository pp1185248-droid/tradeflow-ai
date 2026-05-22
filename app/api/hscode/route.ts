import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { classifyHSCode } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  const u = await getUser(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { product, country } = await req.json();
  if (!product) return NextResponse.json({ error: 'Product description required' }, { status: 400 });

  try {
    const result = await classifyHSCode(product, country || 'IN');
    return NextResponse.json({ success: true, result });
  } catch (e: any) {
    return NextResponse.json({ error: 'Classification failed: ' + e.message }, { status: 500 });
  }
}
