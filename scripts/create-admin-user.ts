import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Önce admin rolünü oluştur veya güncelle (tüm menü yetkilerini ver)
    const adminRole = await prisma.role.upsert({
      where: { name: 'Super Admin' },
      update: {
        allowedMenus: [] // Boş array = tüm menülere erişim
      },
      create: {
        name: 'Super Admin',
        allowedMenus: [] // Boş array = tüm menülere erişim
      },
    });

    console.log('Super Admin rolü oluşturuldu/güncellendi:', adminRole);

    // Admin kullanıcısını oluştur
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        roleId: adminRole.id
      },
      create: {
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        password: hashedPassword,
        roleId: adminRole.id
      },
    });

    console.log('Admin kullanıcısı oluşturuldu/güncellendi:');
    console.log('Kullanıcı Adı: admin');
    console.log('Şifre: admin123');
    console.log('Rol: Super Admin (Tüm yetkiler)');
    console.log('ID:', adminUser.id);

  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();