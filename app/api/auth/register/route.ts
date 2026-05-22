import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { registerSchema } from '@/lib/validate';

export async function POST(req: NextRequest) {
  try {
    const parsed = registerSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

    await connectDB();
    const { name, email, password, company } = parsed.data;

    if (await User.findOne({ email })) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    const user = await User.create({ name, email, password, company });
    const token = signToken({ userId: user._id, email: user.email, plan: user.plan });
    const res = NextResponse.json({ user: { id: user._id, name, email, plan: user.plan } }, { status: 201 });
    res.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 604800 });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
