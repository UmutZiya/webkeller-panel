
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
        'websitem',
        'websiteyonetimi',
        'kullanicilar',
        'kullaniciynetimi'
      ],
    },
  });
  console.log('Admin rolü eklendi:', adminRole);

  // Admin kullanıcı ekle
  const username = 'admin';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.user.findUnique({ where: { username } });
  if (!existingAdmin) {
    const adminUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        roleId: adminRole.id,
      },
    });
    console.log('Admin kullanıcı eklendi:', adminUser);
  } else {
    console.log('Admin kullanıcı zaten mevcut:', existingAdmin);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
