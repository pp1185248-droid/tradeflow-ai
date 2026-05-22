import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const protectedPaths = ['/dashboard', '/upload', '/hscode', '/compliance', '/documents'];
  const isProtected = protectedPaths.some(p => req.nextUrl.pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*', '/hscode/:path*', '/compliance/:path*', '/documents/:path*'],
};
