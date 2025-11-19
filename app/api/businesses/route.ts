import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  try {
    const list = await prisma.business.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(list);
  } catch (e: any) {
    console.error('GET /api/businesses error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Sunucu hatası';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const created = await prisma.business.create({ data });
    return NextResponse.json(created);
  } catch (e: any) {
    console.error('POST /api/businesses error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Sunucu hatası';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


