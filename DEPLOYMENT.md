# Vercel Deployment Kılavuzu

## 🔧 Düzeltilen Sorunlar

### 1. ✅ Prisma Schema - DATABASE_URL
**Sorun:** `schema.prisma` dosyasında veritabanı bağlantı bilgileri hardcoded yazılmıştı.
**Çözüm:** `env("DATABASE_URL")` kullanımına geçildi.

### 2. ✅ API Routes - Error Handling
**Sorun:** `/api/users` ve `/api/roles` gibi endpoint'lerde GET metodlarında try-catch eksikti.
**Çözüm:** Tüm API route'larına detaylı error handling ve console.error logging eklendi.

### 3. ✅ Runtime Configuration
**Sorun:** Vercel'de Supabase ile çalışırken gerekli runtime yapılandırmaları eksikti.
**Çözüm:** Tüm API route'larına şu export'lar eklendi:
```typescript
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;
```

### 4. ✅ Database Connection Test
**Sorun:** Prisma bağlantısı başarısız olduğunda sessizce başarısız oluyordu.
**Çözüm:** `lib/prisma.ts` dosyasına connection test ve logging eklendi.

## 🚀 Vercel'de Environment Variables

Vercel dashboard'da şu environment variables'ı eklemeniz gerekiyor:

### Zorunlu Variables:

```env
DATABASE_URL=postgresql://postgres.xxymkuzvimqfswuwyoce:Umutziya8688@aws-1-eu-central-1.pooler.supabase.com:6543/postgres
JWT_SECRET=your-secure-jwt-secret-here
NODE_ENV=production
```

### Environment Variables Nasıl Eklenir:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Her bir variable için:
   - **Key**: Yukarıdaki isimler (DATABASE_URL, JWT_SECRET, etc.)
   - **Value**: İlgili değerler
   - **Environment**: Production, Preview, Development (hepsini seç)
3. Save diyerek kaydet

## 📝 Deployment Öncesi Checklist

- [x] `prisma/schema.prisma` - DATABASE_URL env variable kullanıyor
- [x] Tüm API routes - try-catch error handling var
- [x] Tüm API routes - runtime configuration var
- [x] `lib/prisma.ts` - connection test var
- [ ] Vercel'de DATABASE_URL environment variable eklendi
- [ ] Vercel'de JWT_SECRET environment variable eklendi
- [ ] Vercel'de NODE_ENV=production eklendi

## 🐛 Deployment Sonrası Hata Takibi

### Vercel Logs Nasıl Kontrol Edilir:

1. Vercel Dashboard → Project → Deployments
2. En son deployment'a tıkla
3. "Functions" sekmesine git
4. Her bir API route'un loglarını kontrol et

### Yaygın Hatalar ve Çözümleri:

#### 1. "PrismaClientInitializationError"
**Sebep:** DATABASE_URL environment variable yanlış veya eksik
**Çözüm:** Vercel environment variables'ı kontrol et

#### 2. "Cannot find module '@prisma/client'"
**Sebep:** Prisma client generate edilmemiş
**Çözüm:** Bu zaten `package.json`'da `postinstall` script'inde var, otomatik çalışmalı

#### 3. Login çalışmıyor
**Sebep:** JWT_SECRET environment variable eksik
**Çözüm:** Vercel'de JWT_SECRET ekle

#### 4. 500 Internal Server Error
**Sebep:** Şimdi artık console.error ile detaylı hata logları var
**Çözüm:** Vercel logs'a bak, hatayı görürsün

## 🔐 Güvenlik Notları

⚠️ **ÖNEMLİ:** 
- JWT_SECRET için güçlü, rastgele bir string kullan (en az 32 karakter)
- Production'da DATABASE_URL'i asla kod içinde bırakma
- Vercel environment variables'lar otomatik şifrelenir, güvenlidir

## 📦 Build Command Kontrolü

Vercel otomatik olarak şu komutu çalıştırmalı:
```bash
npm run build
```

`package.json` içinde build script:
```json
"build": "prisma generate && next build"
```

Bu otomatik olarak:
1. Prisma client'ı generate eder
2. Next.js build yapar

## 🎯 Deployment Adımları

1. **Vercel'e Proje Push Et:**
   ```bash
   git add .
   git commit -m "Fixed API routes and Prisma configuration for Vercel deployment"
   git push
   ```

2. **Vercel Dashboard'da Environment Variables Ekle**
   - DATABASE_URL
   - JWT_SECRET
   - NODE_ENV=production

3. **Redeploy Tetikle**
   - Vercel otomatik deploy edecek
   - Veya manuel: Deployments → ... → Redeploy

4. **Logs Kontrol Et**
   - Deployment başarılı olduktan sonra
   - Functions loglarını kontrol et
   - "✅ Database connected successfully" mesajını gör

## ✨ Başarı Göstergeleri

Deployment başarılı olduğunda:
- ✅ Build başarılı (yeşil tick)
- ✅ Logs'ta "Database connected successfully" görünür
- ✅ `/api/users` endpoint çalışır (500 hatası vermez)
- ✅ `/api/roles` endpoint çalışır (500 hatası vermez)
- ✅ Login işlemi çalışır (bcrypt password compare doğru çalışır)

## 🆘 Hala Sorun mu Var?

1. **Vercel Logs'u Kopyala:** Deployment → Functions → API route → Logs
2. **Console'da Hata Mesajı:** Network tab → Failed request → Response
3. **Database Connection:** Supabase Dashboard → Settings → Database → Connection string doğru mu?

---

**Not:** Tüm değişiklikler yapıldı ve test edilmeye hazır! 🚀

