import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const u = await getUser(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const user = await User.findById(u.userId).select('-password');
  return user ? NextResponse.json({ user }) : NextResponse.json({ error: 'User not found' }, { status: 404 });
}
