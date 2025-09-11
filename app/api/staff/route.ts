import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const list = await (prisma.staff as any).findMany({
    orderBy: { createdAt: 'desc' },
    include: { services: true }
  });
  // Her staff için serviceIds dizisi ekle
  const withServiceIds = (list as any[]).map(staff => ({
    ...staff,
    serviceIds: staff.services ? (staff.services as any[]).map((s: any) => s.id) : [],
  }));
  return NextResponse.json(withServiceIds);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // serviceIds dizisini Prisma'nın N:N ilişkisi için dönüştür
    const { serviceIds, ...rest } = data;
    const prismaData = {
      ...rest,
      ...(serviceIds && Array.isArray(serviceIds)
        ? { services: { connect: serviceIds.map((id: string) => ({ id })) } }
        : {})
    };
    const created = await prisma.staff.create({ data: prismaData });
    return NextResponse.json(created);
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}


