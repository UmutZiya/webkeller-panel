import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  const users = await prisma.user.findMany({ 
    include: { role: true },
    orderBy: { createdAt: 'desc' } 
  });
  return NextResponse.json(users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username,
    roleId: u.roleId,
    role: u.role,
    createdAt: u.createdAt
  })));
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, username, password, roleId } = await req.json();
    if (!firstName || !lastName || !username || !password) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({ 
      data: { firstName, lastName, username, password: hashed, roleId } 
    });
    return NextResponse.json({ id: created.id });
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, firstName, lastName, username, password, roleId } = await req.json();
    if (!id || !firstName || !lastName || !username) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }
    const updateData: any = { firstName, lastName, username, roleId };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    await prisma.user.update({ where: { id }, data: updateData });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}


