import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const users = await prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(users.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username,
    role: u.role.name,
    createdAt: u.createdAt
  })));
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, username, password, role } = await req.json();
    if (!firstName || !lastName || !username || !password || !role) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }
    const r = await prisma.role.findUnique({ where: { name: role } });
    if (!r) return NextResponse.json({ error: 'Rol bulunamadı' }, { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({ data: { firstName, lastName, username, password: hashed, roleId: r.id } });
    return NextResponse.json({ id: created.id });
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}


