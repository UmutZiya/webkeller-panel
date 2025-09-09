import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(roles);
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const trimmed = (name || '').trim();
    if (!trimmed) return NextResponse.json({ error: 'Geçersiz isim' }, { status: 400 });
    const created = await prisma.role.create({ data: { name: trimmed } });
    return NextResponse.json(created);
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}


