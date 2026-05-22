import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Shipment from '@/models/Shipment';
import User from '@/models/User';
import { getUser } from '@/lib/auth';
import { classifyHSCode, checkCompliance } from '@/lib/gemini';

export async function GET(req: NextRequest) {
  const u = await getUser(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const shipments = await Shipment.find({ userId: u.userId }).sort({ createdAt: -1 }).limit(20);
  return NextResponse.json({ shipments });
}

export async function POST(req: NextRequest) {
  const u = await getUser(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const user = await User.findById(u.userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const planLimits: Record<string, number> = { free: 5, starter: 50, pro: 99999 };
  const limit = planLimits[user.plan] || 5;
  if (user.shipmentsUsed >= limit) return NextResponse.json({ error: `Plan limit reached. Upgrade to process more shipments.` }, { status: 403 });

  const body = await req.json();
  const { originCountry, destinationCountry, items, totalValue, currency, shipper, consignee } = body;

  // Create shipment
  const shipment = await Shipment.create({
    userId: u.userId, originCountry, destinationCountry,
    items, totalValue, currency: currency || 'USD',
    shipper, consignee, status: 'processing',
  });

  // Async AI processing
  (async () => {
    try {
      // Step 1: Classify HS codes for each item
      const classifiedItems = await Promise.all(
        items.map(async (item: any) => {
          try {
            const result = await classifyHSCode(item.description, originCountry);
            return { ...item, hsCode: result.hsCode, dutyRate: result.dutyRate };
          } catch { return item; }
        })
      );

      await Shipment.findByIdAndUpdate(shipment._id, { items: classifiedItems, status: 'classified' });

      // Step 2: Compliance check
      const compliance = await checkCompliance(
        { items: classifiedItems, totalValue, currency },
        originCountry, destinationCountry
      );

      await Shipment.findByIdAndUpdate(shipment._id, {
        status: 'compliant',
        complianceResult: compliance,
        estimatedDuty: compliance.estimatedDuty,
        requiredDocuments: compliance.requiredDocuments,
      });

      // Step 3: Mark docs ready
      await Shipment.findByIdAndUpdate(shipment._id, { status: 'docs_ready' });

      // Increment usage
      await User.findByIdAndUpdate(u.userId, { $inc: { shipmentsUsed: 1 } });

    } catch (e) { console.error('AI processing error:', e); }
  })();

  return NextResponse.json({ shipment, message: 'Shipment created. AI processing started.' }, { status: 201 });
}
