import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as any;

export async function getUser(req: NextRequest) {
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try { return verifyToken(token); } catch { return null; }
}
