import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const roles = await prisma.role.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(roles);
}

export async function POST(req: NextRequest) {
  try {
    const { name, allowedMenus } = await req.json();
    const trimmed = (name || '').trim();
    if (!trimmed || !allowedMenus) return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
    const created = await prisma.role.create({ data: { name: trimmed, allowedMenus } });
    return NextResponse.json(created);
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}


