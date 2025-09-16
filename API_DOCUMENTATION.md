# WebKeller Panel API Dokümantasyonu

## 📋 İçindekiler

- [Genel Bilgiler](#genel-bilgiler)
- [Kimlik Doğrulama](#kimlik-doğrulama)
- [API Endpoints](#api-endpoints)
  - [Authentication API](#authentication-api)
  - [Business API](#business-api)
  - [Service API](#service-api)
  - [Staff API](#staff-api)
  - [Customer API](#customer-api)
  - [Appointment API](#appointment-api)
  - [Cash Transaction API](#cash-transaction-api)
  - [User API](#user-api)
  - [Role API](#role-api)
- [Hata Kodları](#hata-kodları)
- [Rate Limiting](#rate-limiting)

## 🌐 Genel Bilgiler

### Base URL
```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

### Request Headers
```http
Content-Type: application/json
Authorization: Bearer {token} (kimlik doğrulama gerektiren endpoint'ler için)
```

### Response Format
Tüm API yanıtları JSON formatındadır.

#### Başarılı Yanıt
```json
{
  "data": {...},
  "message": "İşlem başarılı"
}
```

#### Hata Yanıtı
```json
{
  "error": "Hata mesajı",
  "code": "ERROR_CODE",
  "details": {...}
}
```

## 🔐 Kimlik Doğrulama

### Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "kullanici_adi",
  "password": "sifre"
}
```

**Response:**
```json
{
  "user": {
    "id": "cuid",
    "firstName": "Ad",
    "lastName": "Soyad",
    "username": "kullanici_adi",
    "roleId": "role_id",
    "role": {
      "id": "role_id",
      "name": "Admin",
      "allowedMenus": ["isletmem", "musteriler", "randevu", "kullanicilar"]
    }
  },
  "token": "jwt_token"
}
```

### Logout
**Endpoint:** `POST /api/auth/logout`

**Headers:**
```http
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Çıkış başarılı"
}
```

## 📚 API Endpoints

### Authentication API

#### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Auth Required:** Hayır
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

#### Logout
- **URL:** `/api/auth/logout`
- **Method:** `POST`
- **Auth Required:** Evet

---

### Business API

#### Tüm İşletmeleri Listele
- **URL:** `/api/businesses`
- **Method:** `GET`
- **Auth Required:** Evet
- **Query Parameters:**
  - `page` (optional): Sayfa numarası
  - `limit` (optional): Sayfa başına kayıt sayısı
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "name": "İşletme Adı",
      "address": "Adres",
      "phone": "+90 555 123 4567",
      "email": "info@isletme.com",
      "city": "İstanbul",
      "district": "Kadıköy",
      "taxOffice": "Kadıköy Vergi Dairesi",
      "taxNumber": "1234567890",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### İşletme Detayı
- **URL:** `/api/businesses/{id}`
- **Method:** `GET`
- **Auth Required:** Evet
- **Response:** Tek işletme objesi

#### Yeni İşletme Ekle
- **URL:** `/api/businesses`
- **Method:** `POST`
- **Auth Required:** Evet
- **Body:**
  ```json
  {
    "name": "İşletme Adı",
    "address": "Adres",
    "phone": "+90 555 123 4567",
    "email": "info@isletme.com",
    "city": "İstanbul",
    "district": "Kadıköy",
    "taxOffice": "Kadıköy Vergi Dairesi",
    "taxNumber": "1234567890"
  }
  ```

#### İşletme Güncelle
- **URL:** `/api/businesses/{id}`
- **Method:** `PATCH`
- **Auth Required:** Evet
- **Body:** Güncellenecek alanlar

#### İşletme Sil
- **URL:** `/api/businesses/{id}`
- **Method:** `DELETE`
- **Auth Required:** Evet

---

### Service API

#### Tüm Hizmetleri Listele
- **URL:** `/api/services`
- **Method:** `GET`
- **Auth Required:** Evet
- **Query Parameters:**
  - `businessId` (optional): İşletme ID'sine göre filtrele
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "businessId": "business_id",
      "name": "Saç Kesimi",
      "description": "Erkek saç kesimi ve şekillendirme",
      "taxRate": 18,
      "price": 15000,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "business": {...},
      "staff": [...]
    }
  ]
  ```

#### Hizmet Detayı
- **URL:** `/api/services/{id}`
- **Method:** `GET`
- **Auth Required:** Evet

#### Yeni Hizmet Ekle
- **URL:** `/api/services`
- **Method:** `POST`
- **Auth Required:** Evet
- **Body:**
  ```json
  {
    "businessId": "business_id",
    "name": "Hizmet Adı",
    "description": "Hizmet açıklaması",
    "taxRate": 18,
    "price": 15000
  }
  ```

#### Hizmet Güncelle
- **URL:** `/api/services/{id}`
- **Method:** `PATCH`
- **Auth Required:** Evet
- **Body:** Güncellenecek alanlar

#### Hizmet Sil
- **URL:** `/api/services/{id}`
- **Method:** `DELETE`
- **Auth Required:** Evet

---

### Staff API

#### Tüm Personeli Listele
- **URL:** `/api/staff`
- **Method:** `GET`
- **Auth Required:** Evet
- **Query Parameters:**
  - `businessId` (optional): İşletme ID'sine göre filtrele
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "businessId": "business_id",
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com",
      "phone": "+90 555 123 4567",
      "nationalId": "12345678901",
      "address": "Adres bilgisi",
      "notes": "Notlar",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "business": {...},
      "services": [...]
    }
  ]
  ```

#### Personel Detayı
- **URL:** `/api/staff/{id}`
- **Method:** `GET`
- **Auth Required:** Evet

#### Yeni Personel Ekle
- **URL:** `/api/staff`
- **Method:** `POST`
- **Auth Required:** Evet
- **Body:**
  ```json
  {
    "businessId": "business_id",
    "name": "Ad Soyad",
    "email": "email@example.com",
    "phone": "+90 555 123 4567",
    "nationalId": "12345678901",
    "address": "Adres",
    "notes": "Notlar (opsiyonel)",
    "serviceIds": ["service_id_1", "service_id_2"]
  }
  ```

#### Personel Güncelle
- **URL:** `/api/staff/{id}`
- **Method:** `PATCH`
- **Auth Required:** Evet
- **Body:** Güncellenecek alanlar

#### Personel Sil
- **URL:** `/api/staff/{id}`
- **Method:** `DELETE`
- **Auth Required:** Evet

---

### Customer API

#### Tüm Müşterileri Listele
- **URL:** `/api/customers`
- **Method:** `GET`
- **Auth Required:** Evet
- **Query Parameters:**
  - `businessId` (optional): İşletme ID'sine göre filtrele
  - `customerType` (optional): 'individual' veya 'corporate'
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "businessId": "business_id",
      "name": "Müşteri Adı",
      "email": "musteri@example.com",
      "phone": "+90 555 123 4567",
      "taxNumber": "1234567890",
      "taxOffice": "Vergi Dairesi",
      "companyName": "Firma Adı",
      "city": "İstanbul",
      "district": "Kadıköy",
      "customerType": "corporate",
      "website": "https://example.com",
      "address": "Adres",
      "notes": "Notlar",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### Müşteri Detayı
- **URL:** `/api/customers/{id}`
- **Method:** `GET`
- **Auth Required:** Evet

#### Yeni Müşteri Ekle
- **URL:** `/api/customers`
- **Method:** `POST`
- **Auth Required:** Evet
- **Body:**
  ```json
  {
    "businessId": "business_id",
    "name": "Müşteri Adı",
    "email": "musteri@example.com",
    "phone": "+90 555 123 4567",
    "taxNumber": "1234567890",
    "taxOffice": "Vergi Dairesi",
    "companyName": "Firma Adı",
    "city": "İstanbul",
    "district": "Kadıköy",
    "customerType": "corporate",
    "website": "https://example.com",
    "address": "Adres",
    "notes": "Notlar"
  }
  ```

#### Müşteri Güncelle
- **URL:** `/api/customers/{id}`
- **Method:** `PATCH`
- **Auth Required:** Evet
- **Body:** Güncellenecek alanlar

#### Müşteri Sil
- **URL:** `/api/customers/{id}`
- **Method:** `DELETE`
- **Auth Required:** Evet

---

### Appointment API

#### Tüm Randevuları Listele
- **URL:** `/api/appointments`
- **Method:** `GET`
- **Auth Required:** Evet
- **Query Parameters:**
  - `businessId` (optional): İşletme ID'sine göre filtrele
  - `staffId` (optional): Personel ID'sine göre filtrele
  - `customerId` (optional): Müşteri ID'sine göre filtrele
  - `status` (optional): pending, confirmed, completed, cancelled
  - `startDate` (optional): Başlangıç tarihi (ISO 8601)
  - `endDate` (optional): Bitiş tarihi (ISO 8601)
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "businessId": "business_id",
      "serviceId": "service_id",
      "staffId": "staff_id",
      "customerId": "customer_id",
      "date": "2024-01-01T10:00:00Z",
      "status": "confirmed",
      "notes": "Randevu notları",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "business": {...},
      "service": {...},
      "staff": {...},
      "customer": {...}
    }
  ]
  ```

#### Randevu Detayı
- **URL:** `/api/appointments/{id}`
- **Method:** `GET`
- **Auth Required:** Evet

#### Yeni Randevu Oluştur
- **URL:** `/api/appointments`
- **Method:** `POST`
- **Auth Required:** Evet
- **Body:**
  ```json
  {
    "businessId": "business_id",
    "serviceId": "service_id",
    "staffId": "staff_id",
    "customerId": "customer_id",
    "date": "2024-01-01T10:00:00Z",
    "status": "pending",
    "notes": "Randevu notları"
  }
  ```

#### Randevu Güncelle
- **URL:** `/api/appointments/{id}`
- **Method:** `PATCH`
- **Auth Required:** Evet
- **Body:** Güncellenecek alanlar
  ```json
  {
    "status": "confirmed",
    "date": "2024-01-01T11:00:00Z",
    "notes": "Güncellenen notlar"
  }
  ```

#### Randevu Sil
- **URL:** `/api/appointments/{id}`
- **Method:** `DELETE`
- **Auth Required:** Evet

---

### Cash Transaction API

#### Tüm Kasa İşlemlerini Listele
- **URL:** `/api/cash-transactions`
- **Method:** `GET`
- **Auth Required:** Evet
- **Query Parameters:**
  - `businessId` (optional): İşletme ID'sine göre filtrele
  - `type` (optional): 'income' veya 'expense'
  - `paymentType` (optional): 'cash', 'card', 'bank', 'other'
  - `startDate` (optional): Başlangıç tarihi
  - `endDate` (optional): Bitiş tarihi
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "businessId": "business_id",
      "type": "income",
      "amount": 50000,
      "paymentType": "cash",
      "taxRate": 18,
      "company": "ABC Şirketi",
      "documentNo": "FTR-2024-001",
      "date": "2024-01-01T00:00:00Z",
      "description": "Hizmet ödemesi",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### Kasa İşlemi Detayı
- **URL:** `/api/cash-transactions/{id}`
- **Method:** `GET`
- **Auth Required:** Evet

#### Yeni Kasa İşlemi Ekle
- **URL:** `/api/cash-transactions`
- **Method:** `POST`
- **Auth Required:** Evet
- **Body:**
  ```json
  {
    "businessId": "business_id",
    "type": "income",
    "amount": 50000,
    "paymentType": "cash",
    "taxRate": 18,
    "company": "ABC Şirketi",
    "documentNo": "FTR-2024-001",
    "date": "2024-01-01T00:00:00Z",
    "description": "Hizmet ödemesi"
  }
  ```

#### Kasa İşlemi Güncelle
- **URL:** `/api/cash-transactions/{id}`
- **Method:** `PATCH`
- **Auth Required:** Evet
- **Body:** Güncellenecek alanlar

#### Kasa İşlemi Sil
- **URL:** `/api/cash-transactions/{id}`
- **Method:** `DELETE`
- **Auth Required:** Evet

---

### User API

#### Tüm Kullanıcıları Listele
- **URL:** `/api/users`
- **Method:** `GET`
- **Auth Required:** Evet (Admin rolü gerekli)
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "firstName": "Ad",
      "lastName": "Soyad",
      "username": "kullanici_adi",
      "roleId": "role_id",
      "role": {
        "id": "role_id",
        "name": "Admin",
        "allowedMenus": ["isletmem", "musteriler", "randevu", "kullanicilar"]
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### Kullanıcı Detayı
- **URL:** `/api/users/{id}`
- **Method:** `GET`
- **Auth Required:** Evet (Admin rolü gerekli)

#### Yeni Kullanıcı Ekle
- **URL:** `/api/users`
- **Method:** `POST`
- **Auth Required:** Evet (Admin rolü gerekli)
- **Body:**
  ```json
  {
    "firstName": "Ad",
    "lastName": "Soyad",
    "username": "kullanici_adi",
    "password": "sifre",
    "roleId": "role_id"
  }
  ```

#### Kullanıcı Güncelle
- **URL:** `/api/users`
- **Method:** `PUT`
- **Auth Required:** Evet (Admin rolü gerekli)
- **Body:**
  ```json
  {
    "id": "user_id",
    "firstName": "Yeni Ad",
    "lastName": "Yeni Soyad",
    "roleId": "new_role_id"
  }
  ```

#### Kullanıcı Sil
- **URL:** `/api/users?id={id}`
- **Method:** `DELETE`
- **Auth Required:** Evet (Admin rolü gerekli)

---

### Role API

#### Tüm Rolleri Listele
- **URL:** `/api/roles`
- **Method:** `GET`
- **Auth Required:** Evet
- **Response:**
  ```json
  [
    {
      "id": "cuid",
      "name": "Admin",
      "allowedMenus": ["isletmem", "musteriler", "randevu", "kullanicilar"],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### Yeni Rol Ekle
- **URL:** `/api/roles`
- **Method:** `POST`
- **Auth Required:** Evet (Admin rolü gerekli)
- **Body:**
  ```json
  {
    "name": "Rol Adı",
    "allowedMenus": ["isletmem", "musteriler"]
  }
  ```

## 🚨 Hata Kodları

### HTTP Status Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı |
| 201 | Oluşturuldu |
| 400 | Geçersiz istek |
| 401 | Yetkisiz erişim |
| 403 | Yasaklanmış |
| 404 | Bulunamadı |
| 409 | Çakışma (örn: duplicate kayıt) |
| 422 | İşlenemeyen varlık |
| 500 | Sunucu hatası |

### Özel Hata Kodları

| Kod | Açıklama |
|-----|----------|
| AUTH_INVALID_CREDENTIALS | Geçersiz kullanıcı adı veya şifre |
| AUTH_TOKEN_EXPIRED | Token süresi dolmuş |
| AUTH_TOKEN_INVALID | Geçersiz token |
| AUTH_UNAUTHORIZED | Yetkisiz erişim |
| VALIDATION_ERROR | Doğrulama hatası |
| DUPLICATE_ENTRY | Duplicate kayıt |
| RESOURCE_NOT_FOUND | Kaynak bulunamadı |
| BUSINESS_LIMIT_EXCEEDED | İşletme limiti aşıldı |
| APPOINTMENT_CONFLICT | Randevu çakışması |

### Hata Yanıt Örnekleri

#### Doğrulama Hatası
```json
{
  "error": "Doğrulama hatası",
  "code": "VALIDATION_ERROR",
  "details": {
    "fields": {
      "email": "Geçerli bir email adresi giriniz",
      "phone": "Telefon numarası zorunludur"
    }
  }
}
```

#### Yetkisiz Erişim
```json
{
  "error": "Bu işlem için yetkiniz bulunmamaktadır",
  "code": "AUTH_UNAUTHORIZED"
}
```

#### Kaynak Bulunamadı
```json
{
  "error": "İstenen kaynak bulunamadı",
  "code": "RESOURCE_NOT_FOUND",
  "details": {
    "resource": "appointment",
    "id": "requested_id"
  }
}
```

## ⚡ Rate Limiting

API istekleri rate limiting'e tabidir:

- **Genel Limit:** 100 istek/dakika per IP
- **Auth Endpoints:** 5 istek/dakika per IP
- **Data Endpoints:** 60 istek/dakika per user

Rate limit aşıldığında:
```json
{
  "error": "Rate limit aşıldı",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 60
}
```

Headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
```

## 📊 Pagination

Liste endpoint'leri pagination destekler:

**Query Parameters:**
- `page`: Sayfa numarası (default: 1)
- `limit`: Sayfa başına kayıt sayısı (default: 20, max: 100)
- `sort`: Sıralama alanı (örn: 'createdAt')
- `order`: Sıralama yönü ('asc' veya 'desc')

**Response Headers:**
```http
X-Total-Count: 250
X-Page-Count: 13
X-Current-Page: 1
X-Per-Page: 20
```

**Response Body:**
```json
{
  "data": [...],
  "pagination": {
    "total": 250,
    "pages": 13,
    "currentPage": 1,
    "perPage": 20,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔍 Filtering & Search

Liste endpoint'leri filtreleme ve arama destekler:

**Örnek:**
```
GET /api/customers?search=ahmet&customerType=individual&city=istanbul
```

**Desteklenen Operatörler:**
- `eq`: Eşit (default)
- `ne`: Eşit değil
- `gt`: Büyük
- `gte`: Büyük eşit
- `lt`: Küçük
- `lte`: Küçük eşit
- `like`: Benzer (string alanlar için)
- `in`: Liste içinde

**Örnek:**
```
GET /api/appointments?status[in]=pending,confirmed&date[gte]=2024-01-01
```

---

**WebKeller Panel API** - v1.0.0