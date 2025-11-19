import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Ensure this route is always dynamic and runs on Node.js runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  try {
    const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(roles);
  } catch (e: any) {
    console.error('GET /api/roles error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Sunucu hatası';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, allowedMenus } = await req.json();
    const trimmed = (name || '').trim();
    if (!trimmed || !allowedMenus) return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
    const created = await prisma.role.create({ data: { name: trimmed, allowedMenus } });
    return NextResponse.json(created);
  } catch (e: any) {
    console.error('POST /api/roles error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Sunucu hatası';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


