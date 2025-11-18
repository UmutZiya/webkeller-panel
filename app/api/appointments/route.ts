import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
  } catch (e) {
    console.error('GET appointments error:', e);
    return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 });
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
  } catch (e) {
    console.error('POST appointment error:', e);
    return NextResponse.json({ error: 'Randevu oluşturulamadı', details: e }, { status: 500 });
  }
}


