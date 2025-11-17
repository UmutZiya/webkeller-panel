import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Ayarları getir
export async function GET() {
  try {
    // İlk ayar kaydını getir (tek bir ayar kaydı olacak)
    let settings = await prisma.settings.findFirst();
    
    // Eğer ayar yoksa default oluştur
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          businessName: 'WebKeller Panel',
          businessEmail: 'info@webkeller.com',
          businessPhone: '+90 555 123 4567',
        },
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { error: 'Ayarlar yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT - Ayarları güncelle
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // İlk ayar kaydını bul
    let settings = await prisma.settings.findFirst();
    
    if (!settings) {
      // Yoksa oluştur
      settings = await prisma.settings.create({
        data: body,
      });
    } else {
      // Varsa güncelle
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: body,
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json(
      { error: 'Ayarlar güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

