import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Admin rolünü ekle (tüm menülere erişim)
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      allowedMenus: [
        'dashboard',
        'isletmem',
        'isletmelerim', 
        'hizmetler',
        'personel',
        'personelytimi',
        'kasa',
        'kasaraporu',
        'musteriler',
        'musteriekle',
        'musterilistesi',
        'randevu',
        'yenirandevu',
        'randevulistesi',
        'kullanicilar',
        'kullaniciynetimi'
      ],
    },
  });
  console.log('Admin rolü eklendi:', adminRole);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
