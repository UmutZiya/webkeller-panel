import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');

// Ensure this route is always dynamic and runs on Node.js runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ 
      where: { username },
      include: { role: true }
    });
    if (!user) return NextResponse.json({ error: 'Geçersiz bilgiler' }, { status: 401 });

    const isValid = user.password.startsWith('$') ? await bcrypt.compare(password, user.password) : user.password === password;
    if (!isValid) return NextResponse.json({ error: 'Geçersiz bilgiler' }, { status: 401 });

    const token = await new SignJWT({ sub: user.id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    const res = NextResponse.json({ 
      ok: true, 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        roleId: user.roleId,
        role: user.role
      }
    });
    res.cookies.set('wk_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e: any) {
    // Log server-side for debugging
    console.error('Login error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Sunucu hatası';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
