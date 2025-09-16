# WebKeller Panel - İşletme Yönetim Sistemi

## 📋 İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Kurulum](#kurulum)
- [Veritabanı Yapılandırması](#veritabanı-yapılandırması)
- [Proje Yapısı](#proje-yapısı)
- [API Endpoints](#api-endpoints)
- [Veritabanı Şeması](#veritabanı-şeması)
- [Kullanıcı Rolleri ve Yetkilendirme](#kullanıcı-rolleri-ve-yetkilendirme)
- [Geliştirme](#geliştirme)
- [Deployment](#deployment)

## 🎯 Proje Hakkında

WebKeller Panel, işletmelerin günlük operasyonlarını yönetmelerini sağlayan modern bir web uygulamasıdır. Randevu yönetimi, müşteri takibi, personel yönetimi, hizmet tanımlama ve kasa işlemleri gibi temel işletme fonksiyonlarını tek bir platformda birleştirir.

### Ana Özellikler
- 🏢 Çoklu işletme yönetimi
- 👥 Müşteri ve personel yönetimi
- 📅 Randevu sistemi
- 💰 Kasa ve finansal raporlama
- 🔐 Rol tabanlı yetkilendirme sistemi
- 📊 Dashboard ve istatistikler

## 🚀 Özellikler

### İşletme Yönetimi
- İşletme bilgileri ekleme/düzenleme/silme
- Vergi bilgileri yönetimi
- İletişim bilgileri

### Hizmet Yönetimi
- Hizmet tanımlama
- Fiyatlandırma
- KDV oranı belirleme
- Hizmet açıklamaları

### Personel Yönetimi
- Personel kayıtları
- Personel-hizmet eşleştirme (çoktan çoğa ilişki)
- İletişim ve kimlik bilgileri
- Notlar

### Müşteri Yönetimi
- Bireysel ve kurumsal müşteri kayıtları
- İletişim bilgileri
- Vergi bilgileri (kurumsal müşteriler için)
- Müşteri notları

### Randevu Sistemi
- Randevu oluşturma
- Durum takibi (bekliyor, onaylandı, tamamlandı, iptal)
- Personel ve hizmet atama
- Randevu notları

### Kasa Yönetimi
- Gelir/gider kayıtları
- Ödeme tipi takibi (nakit, kart, banka, diğer)
- Belge numarası takibi
- KDV hesaplama
- Kasa raporu

### Kullanıcı ve Yetkilendirme
- Kullanıcı yönetimi
- Rol tabanlı yetkilendirme
- Menü erişim kontrolü
- Güvenli kimlik doğrulama

## 🛠 Teknoloji Stack

### Frontend
- **Framework:** Next.js 13.5.1 (App Router)
- **UI Library:** React 18.2.0
- **Styling:** Tailwind CSS 3.3.3
- **UI Components:** Radix UI
- **Form Management:** React Hook Form + Zod
- **State Management:** React Context API
- **Date Management:** date-fns
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **API Routes:** Next.js API Routes
- **Authentication:** JWT (jose)
- **Password Hashing:** bcryptjs

### Database
- **ORM:** Prisma 5.16.1
- **Database:** MySQL
- **Migrations:** Prisma Migrate

### Development Tools
- **Language:** TypeScript 5.9.2
- **Linting:** ESLint
- **Package Manager:** npm

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- MySQL 8.0+
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone [repository-url]
cd webkeller-panel
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```env
DATABASE_URL="mysql://username:password@localhost:3306/webkeller_db"
JWT_SECRET="your-secret-key-here"
```

4. **Veritabanını oluşturun ve migration'ları çalıştırın**
```bash
npx prisma migrate dev
```

5. **Seed verilerini yükleyin (roller için)**
```bash
npm run prisma:seed
```

6. **Admin kullanıcısı oluşturun**
```bash
npm run create-admin
```

7. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🗄 Veritabanı Yapılandırması

### Prisma Schema Özeti

Proje aşağıdaki ana modelleri içerir:

- **User**: Sistem kullanıcıları
- **Role**: Kullanıcı rolleri ve yetkileri
- **Business**: İşletme bilgileri
- **Service**: Hizmet tanımları
- **Staff**: Personel kayıtları
- **Customer**: Müşteri bilgileri
- **Appointment**: Randevu kayıtları
- **CashTransaction**: Kasa hareketleri

## 📁 Proje Yapısı

```
webkeller-panel/
├── app/                      # Next.js App Router
│   ├── api/                 # API endpoints
│   │   ├── appointments/    # Randevu API'leri
│   │   ├── auth/           # Kimlik doğrulama API'leri
│   │   ├── businesses/     # İşletme API'leri
│   │   ├── cash-transactions/ # Kasa API'leri
│   │   ├── customers/      # Müşteri API'leri
│   │   ├── roles/          # Rol API'leri
│   │   ├── services/       # Hizmet API'leri
│   │   ├── staff/          # Personel API'leri
│   │   └── users/          # Kullanıcı API'leri
│   ├── dashboard/          # Dashboard sayfaları
│   │   ├── isletmem/      # İşletme yönetimi sayfaları
│   │   ├── kullanicilar/  # Kullanıcı yönetimi
│   │   ├── musteriler/    # Müşteri yönetimi
│   │   └── randevu/       # Randevu yönetimi
│   ├── login/             # Giriş sayfası
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── layout/           # Layout bileşenleri
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── auth/
│   │       └── AuthGuard.tsx
│   └── ui/               # UI bileşenleri (Radix UI)
├── contexts/             # React Context'leri
│   └── AppContext.tsx    # Global state yönetimi
├── hooks/                # Custom React hooks
├── lib/                  # Yardımcı fonksiyonlar
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility fonksiyonları
├── prisma/              # Veritabanı yapılandırması
│   ├── schema.prisma    # Veritabanı şeması
│   ├── seed-role.ts     # Rol seed script'i
│   └── migrations/      # Veritabanı migration'ları
├── public/              # Statik dosyalar
├── scripts/             # Yardımcı script'ler
│   └── create-admin-user.ts
└── package.json         # Proje bağımlılıkları
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Kullanıcı çıkışı

### Businesses
- `GET /api/businesses` - Tüm işletmeleri listele
- `POST /api/businesses` - Yeni işletme ekle
- `PATCH /api/businesses/[id]` - İşletme güncelle
- `DELETE /api/businesses/[id]` - İşletme sil

### Services
- `GET /api/services` - Tüm hizmetleri listele
- `POST /api/services` - Yeni hizmet ekle
- `PATCH /api/services/[id]` - Hizmet güncelle
- `DELETE /api/services/[id]` - Hizmet sil

### Staff
- `GET /api/staff` - Tüm personeli listele
- `POST /api/staff` - Yeni personel ekle
- `PATCH /api/staff/[id]` - Personel güncelle
- `DELETE /api/staff/[id]` - Personel sil

### Customers
- `GET /api/customers` - Tüm müşterileri listele
- `POST /api/customers` - Yeni müşteri ekle
- `PATCH /api/customers/[id]` - Müşteri güncelle
- `DELETE /api/customers/[id]` - Müşteri sil

### Appointments
- `GET /api/appointments` - Tüm randevuları listele
- `POST /api/appointments` - Yeni randevu oluştur
- `PATCH /api/appointments/[id]` - Randevu güncelle
- `DELETE /api/appointments/[id]` - Randevu sil

### Cash Transactions
- `GET /api/cash-transactions` - Tüm kasa işlemlerini listele
- `POST /api/cash-transactions` - Yeni kasa işlemi ekle
- `PATCH /api/cash-transactions/[id]` - Kasa işlemi güncelle
- `DELETE /api/cash-transactions/[id]` - Kasa işlemi sil

### Users
- `GET /api/users` - Tüm kullanıcıları listele
- `POST /api/users` - Yeni kullanıcı ekle
- `PUT /api/users` - Kullanıcı güncelle
- `DELETE /api/users?id=[id]` - Kullanıcı sil

### Roles
- `GET /api/roles` - Tüm rolleri listele
- `POST /api/roles` - Yeni rol ekle

## 🗃 Veritabanı Şeması

### User Tablosu
```prisma
model User {
  id        String   @id @default(cuid())
  firstName String
  lastName  String
  username  String   @unique
  password  String   // Hashed
  roleId    String?
  role      Role?    @relation(fields: [roleId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Business Tablosu
```prisma
model Business {
  id        String   @id @default(cuid())
  name      String
  address   String
  phone     String
  email     String
  city      String
  district  String
  taxOffice String
  taxNumber String
  // Relations
  services         Service[]
  staff            Staff[]
  customers        Customer[]
  appointments     Appointment[]
  cashTransactions CashTransaction[]
}
```

### Service Tablosu
```prisma
model Service {
  id          String   @id @default(cuid())
  businessId  String
  name        String
  description String
  taxRate     Int      // KDV oranı (%)
  price       Int      // Fiyat (kuruş cinsinden)
  // Relations
  business     Business      @relation(...)
  appointments Appointment[]
  staff        Staff[]       @relation("StaffServices")
}
```

### Staff Tablosu
```prisma
model Staff {
  id         String   @id @default(cuid())
  businessId String
  name       String
  email      String
  phone      String
  nationalId String   // TC Kimlik No
  address    String
  notes      String?
  // Relations
  business     Business      @relation(...)
  services     Service[]     @relation("StaffServices")
  appointments Appointment[]
}
```

### Customer Tablosu
```prisma
model Customer {
  id           String   @id @default(cuid())
  businessId   String
  name         String
  email        String
  phone        String
  taxNumber    String?  // Vergi No
  taxOffice    String?  // Vergi Dairesi
  companyName  String?  // Firma Adı
  city         String?
  district     String?
  customerType String?  // 'corporate' | 'individual'
  website      String?
  address      String?
  notes        String?
  // Relations
  business     Business      @relation(...)
  appointments Appointment[]
}
```

### Appointment Tablosu
```prisma
model Appointment {
  id         String   @id @default(cuid())
  businessId String
  serviceId  String
  staffId    String
  customerId String
  date       DateTime
  status     String   // 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes      String?
  // Relations
  business Business @relation(...)
  service  Service  @relation(...)
  staff    Staff    @relation(...)
  customer Customer @relation(...)
}
```

### CashTransaction Tablosu
```prisma
model CashTransaction {
  id          String   @id @default(cuid())
  businessId  String
  type        String   // 'income' | 'expense'
  amount      Int      // Tutar (kuruş cinsinden)
  paymentType String   // 'cash' | 'card' | 'bank' | 'other'
  taxRate     Int      // KDV oranı (%)
  company     String?  // Firma adı
  documentNo  String?  // Belge no
  date        DateTime
  description String?
  // Relations
  business Business @relation(...)
}
```

## 🔐 Kullanıcı Rolleri ve Yetkilendirme

### Rol Sistemi
Sistem, rol tabanlı erişim kontrolü (RBAC) kullanır. Her rol, erişebileceği menüleri tanımlayan `allowedMenus` dizisine sahiptir.

### Örnek Roller
```javascript
{
  name: "Admin",
  allowedMenus: ["isletmem", "musteriler", "randevu", "kullanicilar"]
}

{
  name: "Personel",
  allowedMenus: ["randevu", "musteriler"]
}

{
  name: "Muhasebe",
  allowedMenus: ["isletmem", "kasa"]
}
```

### Menü Yetkileri
- `isletmem`: İşletme yönetimi menüsü
- `musteriler`: Müşteri yönetimi menüsü
- `randevu`: Randevu yönetimi menüsü
- `kullanicilar`: Kullanıcı yönetimi menüsü (sadece admin)
- `kasa`: Kasa işlemleri menüsü

## 🔧 Geliştirme

### Geliştirme Ortamını Başlatma
```bash
npm run dev
```

### Veritabanı İşlemleri

**Yeni migration oluşturma:**
```bash
npx prisma migrate dev --name migration_name
```

**Prisma Studio'yu açma (veritabanı görselleştirme):**
```bash
npx prisma studio
```

**Veritabanını sıfırlama:**
```bash
npx prisma migrate reset
```

### Kod Standartları

- TypeScript kullanımı zorunludur
- React bileşenleri fonksiyonel olmalıdır
- Custom hooks `hooks/` klasöründe olmalıdır
- API route'ları RESTful prensiplere uygun olmalıdır
- Tailwind CSS utility-first yaklaşımı kullanılmalıdır

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Production Sunucusu
```bash
npm start
```

### Ortam Değişkenleri (Production)
```env
DATABASE_URL="mysql://prod_user:prod_password@prod_host:3306/webkeller_prod"
JWT_SECRET="strong-production-secret"
NODE_ENV="production"
```

### Vercel Deployment
Proje Next.js kullandığı için Vercel'e kolayca deploy edilebilir:

1. Projeyi GitHub'a yükleyin
2. Vercel hesabınıza giriş yapın
3. "Import Project" seçeneğini kullanın
4. Ortam değişkenlerini Vercel dashboard'dan ekleyin
5. Deploy butonuna tıklayın

### Docker Deployment (Opsiyonel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Lisans

Bu proje özel lisans altındadır. Tüm hakları saklıdır.

## 🤝 Destek

Sorularınız veya önerileriniz için WebKeller destek ekibiyle iletişime geçebilirsiniz.

---

**WebKeller Panel** - Modern İşletme Yönetim Çözümü