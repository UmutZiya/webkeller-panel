import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  try {
    const list = await prisma.appointment.findMany({ 
      orderBy: { createdAt: 'desc' },
      include: {
        business: true,
        service: true,
        staff: true,
        customer: true
      }
    });
    console.log('Appointments fetched:', list.length);
    return NextResponse.json(list);
  } catch (e: any) {
    console.error('GET /api/appointments error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Veri alınamadı';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Creating appointment with data:', data);
    
    const created = await prisma.appointment.create({ 
      data: {
        ...data,
        date: new Date(data.date)
      }
    });
    
    console.log('Appointment created:', created);
    return NextResponse.json(created);
  } catch (e: any) {
    console.error('POST /api/appointments error:', e);
    const message = process.env.NODE_ENV !== 'production' ? (e?.message || 'Unknown error') : 'Randevu oluşturulamadı';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


