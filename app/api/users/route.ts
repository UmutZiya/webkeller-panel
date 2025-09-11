import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username,
    createdAt: u.createdAt
  })));
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, username, password } = await req.json();
    if (!firstName || !lastName || !username || !password) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({ data: { firstName, lastName, username, password: hashed } });
    return NextResponse.json({ id: created.id });
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}


