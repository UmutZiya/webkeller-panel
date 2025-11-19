# 🔄 MySQL'den PostgreSQL'e Veri Transfer Rehberi

## 🎯 Amaç
Mevcut MySQL veritabanınızdaki verileri yeni PostgreSQL veritabanına güvenli bir şekilde aktarmak.

---

## 📊 Veri Durumunuzu Değerlendirin

Öncelikle MySQL veritabanınızda ne kadar veri olduğunu kontrol edin:

```bash
# MySQL'e bağlanın
mysql -u root -p webkeller

# Her tablodaki kayıt sayısını kontrol edin
SELECT 'users' as table_name, COUNT(*) as count FROM User
UNION ALL
SELECT 'roles', COUNT(*) FROM Role
UNION ALL
SELECT 'businesses', COUNT(*) FROM Business
UNION ALL
SELECT 'services', COUNT(*) FROM Service
UNION ALL
SELECT 'staff', COUNT(*) FROM Staff
UNION ALL
SELECT 'customers', COUNT(*) FROM Customer
UNION ALL
SELECT 'appointments', COUNT(*) FROM Appointment
UNION ALL
SELECT 'cash_transactions', COUNT(*) FROM CashTransaction
UNION ALL
SELECT 'settings', COUNT(*) FROM Settings;
```

---

## 🛠️ Yöntem 1: Prisma Studio ile Manuel Transfer (Küçük Veri - <1000 kayıt)

### Adım 1: Her İki Veritabanını da Hazırlayınnn

**MySQL (Mevcut):**
```env
# .env.mysql dosyası oluşturun
DATABASE_URL="mysql://root:password@localhost:3306/webkeller"
```

**PostgreSQL (Yeni):**
```env
# .env dosyası (ana dosya)
DATABASE_URL="postgresql://postgres:password@localhost:5432/webkeller"
```

### Adım 2: MySQL Verilerini Görüntüleyin

```bash
# MySQL için Prisma Studio'yu açın
DATABASE_URL="mysql://root:password@localhost:3306/webkeller" npx prisma studio
```

### Adım 3: PostgreSQL'e Manuel Kopyalayın

1. Her tablonun verilerini not alın
2. Yeni terminal açın:

```bash
# PostgreSQL için Prisma Studio
npx prisma studio
```

3. Verileri elle kopyalayıp yapıştırın

**Transfer Sırası (Önemli!):**
1. ✅ Role (bağımlılık yok)
2. ✅ User (Role'e bağımlı)
3. ✅ Business (bağımlılık yok)
4. ✅ Service (Business'a bağımlı)
5. ✅ Staff (Business'a bağımlı)
6. ✅ Customer (Business'a bağımlı)
7. ✅ Appointment (hepsine bağımlı)
8. ✅ CashTransaction (Business'a bağımlı)
9. ✅ Settings (bağımlılık yok)

---

## 🚀 Yöntem 2: Node.js Migration Script (Orta/Büyük Veri)

### Migration Script Oluşturun

`scripts/migrate-mysql-to-postgres.ts` dosyası oluşturun:

```typescript
import { PrismaClient as MySQLPrismaClient } from '@prisma/client';
import { PrismaClient as PostgresPrismaClient } from '@prisma/client';

// MySQL connection
const mysqlPrisma = new MySQLPrismaClient({
  datasources: {
    db: {
      url: process.env.MYSQL_DATABASE_URL
    }
  }
});

// PostgreSQL connection
const postgresPrisma = new PostgresPrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function migrateData() {
  console.log('🚀 Starting migration from MySQL to PostgreSQL...\n');

  try {
    // 1. Migrate Roles
    console.log('📋 Migrating Roles...');
    const roles = await mysqlPrisma.role.findMany();
    for (const role of roles) {
      await postgresPrisma.role.create({
        data: {
          id: role.id,
          name: role.name,
          allowedMenus: role.allowedMenus,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${roles.length} roles\n`);

    // 2. Migrate Users
    console.log('👤 Migrating Users...');
    const users = await mysqlPrisma.user.findMany();
    for (const user of users) {
      await postgresPrisma.user.create({
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: user.password,
          roleId: user.roleId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${users.length} users\n`);

    // 3. Migrate Businesses
    console.log('🏢 Migrating Businesses...');
    const businesses = await mysqlPrisma.business.findMany();
    for (const business of businesses) {
      await postgresPrisma.business.create({
        data: {
          id: business.id,
          name: business.name,
          address: business.address,
          phone: business.phone,
          email: business.email,
          city: business.city,
          district: business.district,
          taxOffice: business.taxOffice,
          taxNumber: business.taxNumber,
          createdAt: business.createdAt,
          updatedAt: business.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${businesses.length} businesses\n`);

    // 4. Migrate Services
    console.log('🛠️ Migrating Services...');
    const services = await mysqlPrisma.service.findMany();
    for (const service of services) {
      await postgresPrisma.service.create({
        data: {
          id: service.id,
          businessId: service.businessId,
          name: service.name,
          description: service.description,
          taxRate: service.taxRate,
          price: service.price,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${services.length} services\n`);

    // 5. Migrate Staff
    console.log('👨‍💼 Migrating Staff...');
    const staff = await mysqlPrisma.staff.findMany({
      include: { services: true }
    });
    for (const member of staff) {
      await postgresPrisma.staff.create({
        data: {
          id: member.id,
          businessId: member.businessId,
          name: member.name,
          email: member.email,
          phone: member.phone,
          nationalId: member.nationalId,
          address: member.address,
          notes: member.notes,
          createdAt: member.createdAt,
          updatedAt: member.updatedAt,
          services: {
            connect: member.services.map(s => ({ id: s.id }))
          }
        }
      });
    }
    console.log(`✅ Migrated ${staff.length} staff members\n`);

    // 6. Migrate Customers
    console.log('👥 Migrating Customers...');
    const customers = await mysqlPrisma.customer.findMany();
    for (const customer of customers) {
      await postgresPrisma.customer.create({
        data: {
          id: customer.id,
          businessId: customer.businessId,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          taxNumber: customer.taxNumber,
          taxOffice: customer.taxOffice,
          companyName: customer.companyName,
          city: customer.city,
          district: customer.district,
          customerType: customer.customerType,
          website: customer.website,
          address: customer.address,
          notes: customer.notes,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${customers.length} customers\n`);

    // 7. Migrate Appointments
    console.log('📅 Migrating Appointments...');
    const appointments = await mysqlPrisma.appointment.findMany();
    for (const appointment of appointments) {
      await postgresPrisma.appointment.create({
        data: {
          id: appointment.id,
          businessId: appointment.businessId,
          serviceId: appointment.serviceId,
          staffId: appointment.staffId,
          customerId: appointment.customerId,
          date: appointment.date,
          status: appointment.status,
          notes: appointment.notes,
          createdAt: appointment.createdAt,
          updatedAt: appointment.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${appointments.length} appointments\n`);

    // 8. Migrate Cash Transactions
    console.log('💰 Migrating Cash Transactions...');
    const transactions = await mysqlPrisma.cashTransaction.findMany();
    for (const transaction of transactions) {
      await postgresPrisma.cashTransaction.create({
        data: {
          id: transaction.id,
          businessId: transaction.businessId,
          type: transaction.type,
          amount: transaction.amount,
          paymentType: transaction.paymentType,
          taxRate: transaction.taxRate,
          company: transaction.company,
          documentNo: transaction.documentNo,
          date: transaction.date,
          description: transaction.description,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${transactions.length} transactions\n`);

    // 9. Migrate Settings
    console.log('⚙️ Migrating Settings...');
    const settings = await mysqlPrisma.settings.findMany();
    for (const setting of settings) {
      await postgresPrisma.settings.create({
        data: {
          id: setting.id,
          logoLight: setting.logoLight,
          logoDark: setting.logoDark,
          businessName: setting.businessName,
          businessEmail: setting.businessEmail,
          businessPhone: setting.businessPhone,
          businessAddress: setting.businessAddress,
          darkMode: setting.darkMode,
          compactMode: setting.compactMode,
          showAnimations: setting.showAnimations,
          emailNotifications: setting.emailNotifications,
          smsNotifications: setting.smsNotifications,
          pushNotifications: setting.pushNotifications,
          appointmentReminders: setting.appointmentReminders,
          createdAt: setting.createdAt,
          updatedAt: setting.updatedAt,
        }
      });
    }
    console.log(`✅ Migrated ${settings.length} settings\n`);

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await mysqlPrisma.$disconnect();
    await postgresPrisma.$disconnect();
  }
}

migrateData()
  .then(() => {
    console.log('✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
```

### Script'i Çalıştırın

1. `package.json`'a script ekleyin:

```json
"scripts": {
  "migrate-to-postgres": "ts-node ./scripts/migrate-mysql-to-postgres.ts"
}
```

2. Environment variables ayarlayın:

```bash
# .env dosyası
DATABASE_URL="postgresql://postgres:password@localhost:5432/webkeller"
MYSQL_DATABASE_URL="mysql://root:password@localhost:3306/webkeller"
```

3. Migration'ı çalıştırın:

```bash
npm run migrate-to-postgres
```

---

## 🗄️ Yöntem 3: pgloader Kullanarak (En Hızlı - Büyük Veri)

`pgloader` otomatik olarak MySQL'den PostgreSQL'e veri aktarır.

### Kurulum

**Windows:**
```bash
# WSL kullanarak (Windows Subsystem for Linux)
wsl --install
# WSL içinde:
sudo apt-get install pgloader
```

**Mac:**
```bash
brew install pgloader
```

**Linux:**
```bash
sudo apt-get install pgloader
```

### Kullanım

1. `migration.load` dosyası oluşturun:

```
LOAD DATABASE
  FROM mysql://root:password@localhost:3306/webkeller
  INTO postgresql://postgres:password@localhost:5432/webkeller

WITH include drop, create tables, create indexes, reset sequences

SET maintenance_work_mem to '128MB',
    work_mem to '12MB'

CAST type datetime to timestamptz
     drop default drop not null using zero-dates-to-null;
```

2. Çalıştırın:

```bash
pgloader migration.load
```

---

## ✅ Migration Sonrası Kontrol

### Veri Doğrulama

```sql
-- PostgreSQL'de kayıt sayılarını kontrol edin
SELECT 'users' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'roles', COUNT(*) FROM "Role"
UNION ALL
SELECT 'businesses', COUNT(*) FROM "Business"
UNION ALL
SELECT 'services', COUNT(*) FROM "Service"
UNION ALL
SELECT 'staff', COUNT(*) FROM "Staff"
UNION ALL
SELECT 'customers', COUNT(*) FROM "Customer"
UNION ALL
SELECT 'appointments', COUNT(*) FROM "Appointment"
UNION ALL
SELECT 'cash_transactions', COUNT(*) FROM "CashTransaction"
UNION ALL
SELECT 'settings', COUNT(*) FROM "Settings";
```

### Uygulama Testi

```bash
# Local'de PostgreSQL ile test edin
npm run dev
```

- ✅ Login test edin
- ✅ Müşteri listesini kontrol edin
- ✅ Randevu oluşturun
- ✅ Kasa işlemi yapın

---

## 🎯 Hangi Yöntemi Seçmeliyim?

| Veri Miktarı | Önerilen Yöntem | Süre |
|--------------|-----------------|------|
| < 100 kayıt | Prisma Studio (Manuel) | 15-30 dk |
| 100-1000 kayıt | Node.js Script | 5-10 dk |
| > 1000 kayıt | pgloader | 1-2 dk |

---

## 🆘 Sorun Giderme

### "Foreign key constraint failed"
- Transfer sırasını takip edin (yukarıda belirtilen sıra)
- Önce bağımlılığı olmayan tabloları transfer edin

### "Duplicate entry"
- PostgreSQL veritabanını temizleyin ve tekrar deneyin:
```bash
npx prisma migrate reset --force
```

### "Cannot connect to MySQL"
- MySQL servisinin çalıştığından emin olun:
```bash
# Windows
net start MySQL80

# Mac/Linux
sudo service mysql start
```

---

## 📝 Migration Checklist

- [ ] MySQL verilerini yedekledim
- [ ] PostgreSQL veritabanını oluşturdum
- [ ] Prisma schema'yı PostgreSQL'e güncelledim
- [ ] Migration yöntemimi seçtim
- [ ] Verileri transfer ettim
- [ ] Veri doğrulaması yaptım
- [ ] Uygulamayı test ettim
- [ ] Tüm fonksiyonlar çalışıyor

---

Başarılar! Herhangi bir sorunla karşılaşırsanız bana bildirin. 🚀

