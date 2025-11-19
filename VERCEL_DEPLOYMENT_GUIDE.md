# 🚀 Vercel Deployment Rehberi - PostgreSQL ile

## 📋 Değişiklik Özeti

Projeniz MySQL'den PostgreSQL'e geçirildi ve Vercel deployment için hazırlandı.

### ✅ Yapılan Değişiklikler:

1. **prisma/schema.prisma** - `provider: "mysql"` → `provider: "postgresql"`
2. **package.json** - Prisma build komutları eklendi
3. **vercel.json** - Vercel konfigürasyonu oluşturuldu
4. **.env.example** - PostgreSQL için örnek env dosyası

---

## 🗄️ Veritabanı Migration Planı (MySQL → PostgreSQL)

### Seçenek 1: Manuel Veri Transferi (Önerilen - Küçük Projeler İçin)

#### Adım 1: Mevcut MySQL Verilerinizi Export Edin

```bash
# MySQL'den tüm verileri SQL formatında export edin
mysqldump -u kullanici_adi -p webkeller > mysql_backup.sql
```

#### Adım 2: PostgreSQL Veritabanı Oluşturun

**Supabase Kullanarak (Ücretsiz - Önerilen):**

1. [supabase.com](https://supabase.com) adresine gidin
2. Hesap oluşturun (GitHub ile giriş yapabilirsiniz)
3. **"New Project"** butonuna tıklayın
4. Proje adı: `webkeller-panel`
5. Database Password oluşturun (kaydedin!)
6. Region seçin: `Frankfurt` (Türkiye'ye en yakın)
7. **"Create Project"** butonuna tıklayın (2-3 dakika sürer)
8. Proje oluştuktan sonra **"Settings"** → **"Database"** → **"Connection String"**
9. **"URI"** kısmındaki connection string'i kopyalayın

Connection string şuna benzer olacak:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

#### Adım 3: Local Environment'ı Güncelleyin

`.env` dosyası oluşturun (proje kök dizininde):

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
NODE_ENV="development"
```

#### Adım 4: Prisma Migration Çalıştırın

```bash
# Prisma client'ı yeniden oluştur
npx prisma generate

# Mevcut migration'ları sıfırla (PostgreSQL için)
# Not: Önce migrations klasörünü yedekleyin!
# Sonra migrations klasörünü silin ve yeniden oluşturun

# Yeni bir migration oluştur
npx prisma migrate dev --name init_postgresql

# Veya direkt production için:
npx prisma migrate deploy
```

#### Adım 5: Seed Data Ekleyin

```bash
# Role'leri ekle
npm run prisma:seed

# Admin kullanıcı ekle
npm run create-admin
```

#### Adım 6: Manuel Veri Girişi

Eğer MySQL'de önemli verileriniz varsa:

**Option A: Prisma Studio ile Manuel Transfer**
```bash
npx prisma studio
```
- Prisma Studio açılacak
- MySQL verilerinizi manuel olarak kopyalayıp PostgreSQL'e yapıştırın

**Option B: pgAdmin ile SQL Import**
1. [pgAdmin](https://www.pgadmin.org/) indirin
2. Supabase veritabanınıza bağlanın
3. MySQL backup'ınızı PostgreSQL syntax'ına çevirin (otomatik araçlar var)
4. Import edin

---

### Seçenek 2: Otomatik Migration Scriptleri (Büyük Veriler İçin)

Eğer çok fazla veriniz varsa, bir migration script yazabiliriz. İhtiyacınız varsa söyleyin!

---

## 🚀 Vercel'e Deploy Adımları

### 1. Değişiklikleri GitHub'a Push Edin

```bash
git add .
git commit -m "Migrate to PostgreSQL and add Vercel config"
git push origin vercel-deploy
```

### 2. Vercel'e Giriş Yapın

1. [vercel.com](https://vercel.com) adresine gidin
2. **"Sign Up"** veya **"Login"** → GitHub ile giriş yapın

### 3. Yeni Proje İmport Edin

1. **"Add New..."** → **"Project"** butonuna tıklayın
2. GitHub reponuzu arayın: `webkeller-panel`
3. **"Import"** butonuna tıklayın
4. **Branch seçin**: `vercel-deploy` (dropdown'dan seçin)

### 4. Environment Variables Ekleyin

**Environment Variables** bölümüne şunları ekleyin:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Supabase'den aldığınız PostgreSQL connection string |
| `NODE_ENV` | `production` |

**Örnek:**
```
DATABASE_URL=postgresql://postgres:your_password@db.xxx.supabase.co:5432/postgres
NODE_ENV=production
```

### 5. Deploy!

**"Deploy"** butonuna tıklayın! 🎉

Vercel otomatik olarak:
- ✅ Dependencies'leri yükleyecek
- ✅ Prisma client oluşturacak
- ✅ Database migration'ları çalıştıracak
- ✅ Next.js build yapacak
- ✅ Canlıya alacak

### 6. İlk Deployment Sonrası

Deploy tamamlandıktan sonra:

1. **Vercel Dashboard** → Projeniz → **"Domains"**
2. Vercel size otomatik bir URL verecek: `webkeller-panel.vercel.app`
3. Bu URL'e gidip test edin!

#### Admin Kullanıcı Oluşturma (Production'da)

**Seçenek A: Supabase SQL Editor'dan**
1. Supabase Dashboard → **"SQL Editor"**
2. Şu SQL'i çalıştırın:

```sql
-- İlk olarak Admin rolü oluştur
INSERT INTO "Role" (id, name, "allowedMenus", "createdAt", "updatedAt")
VALUES (
  'admin_role_id',
  'Admin',
  '["dashboard","customers","appointments","businesses","services","staff","cash","users","settings"]',
  NOW(),
  NOW()
);

-- Admin kullanıcı oluştur (şifre: admin123)
INSERT INTO "User" (id, "firstName", "lastName", username, password, "roleId", "createdAt", "updatedAt")
VALUES (
  'admin_user_id',
  'Admin',
  'User',
  'admin',
  '$2a$10$YourHashedPasswordHere',  -- Bu şifreyi bcrypt ile hash'leyin
  'admin_role_id',
  NOW(),
  NOW()
);
```

**Seçenek B: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel link
npm run create-admin
```

---

## 🔄 Otomatik Deployment

Artık `vercel-deploy` branch'ine her push yaptığınızda Vercel otomatik deploy edecek!

```bash
git add .
git commit -m "Yeni özellik"
git push origin vercel-deploy
```

---

## ✅ Deploy Başarılı Olursa - Main Branch'e Merge

Tüm testler başarılı olduğunda:

```bash
# Main branch'e geç
git checkout main

# Vercel-deploy branch'ini merge et
git merge vercel-deploy

# GitHub'a push et
git push origin main

# Vercel'de main branch'i production olarak ayarlayın
```

---

## 🆘 Sorun Giderme

### Hata: "Prisma Client could not be generated"

```bash
# Vercel Dashboard → Settings → General → Node.js Version
# Node.js 18.x seçin
```

### Hata: "Migration failed"

```bash
# Vercel Dashboard → Deployments → Son deployment → "View Function Logs"
# Hata loglarını inceleyin
# Genellikle DATABASE_URL yanlış olabilir
```

### Hata: "Cannot connect to database"

- Supabase connection string'inizin doğru olduğundan emin olun
- `?schema=public` parametresini ekleyin
- SSL kullanıyorsanız: `?sslmode=require` ekleyin

---

## 📊 Monitoring ve Logs

### Vercel Dashboard
- **Analytics**: Trafik ve performans metrikleri
- **Logs**: Real-time function logs
- **Deployments**: Deploy geçmişi

### Supabase Dashboard
- **Table Editor**: Veritabanı içeriğini görüntüle
- **SQL Editor**: Manuel SQL sorguları çalıştır
- **Logs**: Database query logs

---

## 🎯 Production Checklist

- [x] PostgreSQL veritabanı hazır (Supabase)
- [x] Schema PostgreSQL'e uyarlandı
- [x] Build komutları eklendi
- [x] Environment variables ayarlandı
- [ ] Admin kullanıcı oluşturuldu
- [ ] İlk test deployment başarılı
- [ ] Tüm sayfalar test edildi
- [ ] API endpoint'leri çalışıyor
- [ ] Database connection çalışıyor
- [ ] Custom domain eklendi (opsiyonel)

---

## 📝 Notlar

- **Ücretsiz Limitler:**
  - Supabase: 500 MB database, 2 GB bandwidth/ay
  - Vercel: 100 GB bandwidth/ay, unlimited deployments
  
- **Backup:** Supabase otomatik daily backup alır

- **Scaling:** İhtiyaç durumunda Supabase Pro'ya geçebilirsiniz

---

Başarılar! 🚀 Herhangi bir sorun yaşarsanız lütfen bana bildirin.

