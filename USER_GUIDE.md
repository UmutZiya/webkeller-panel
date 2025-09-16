# WebKeller Panel - Kullanıcı Kılavuzu

## 📋 İçindekiler

- [Giriş](#giriş)
- [Sisteme Giriş](#sisteme-giriş)
- [Ana Panel (Dashboard)](#ana-panel-dashboard)
- [İşletme Yönetimi](#işletme-yönetimi)
- [Hizmet Yönetimi](#hizmet-yönetimi)
- [Personel Yönetimi](#personel-yönetimi)
- [Müşteri Yönetimi](#müşteri-yönetimi)
- [Randevu Yönetimi](#randevu-yönetimi)
- [Kasa Yönetimi](#kasa-yönetimi)
- [Kullanıcı Yönetimi](#kullanıcı-yönetimi)
- [Raporlar](#raporlar)
- [Ayarlar](#ayarlar)
- [Sık Sorulan Sorular](#sık-sorulan-sorular)

## 🎯 Giriş

WebKeller Panel, işletmenizin tüm operasyonlarını tek bir platformdan yönetmenizi sağlayan kapsamlı bir yönetim sistemidir. Bu kılavuz, sistemin tüm özelliklerini etkin bir şekilde kullanmanız için hazırlanmıştır.

### Sistem Özellikleri

- 🏢 **Çoklu İşletme Desteği**: Birden fazla işletmeyi tek panelden yönetebilirsiniz
- 👥 **Müşteri Takibi**: Müşteri bilgilerini detaylı şekilde kayıt altına alabilirsiniz
- 📅 **Randevu Sistemi**: Randevuları kolayca planlayıp takip edebilirsiniz
- 💰 **Kasa Yönetimi**: Gelir-gider takibi ve finansal raporlama yapabilirsiniz
- 🔐 **Güvenli Erişim**: Rol tabanlı yetkilendirme sistemi ile güvenli erişim

## 🔐 Sisteme Giriş

### Giriş Yapma

1. Tarayıcınızda sistem adresini açın: `https://panel.webkeller.com`
2. Kullanıcı adı ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

![Login Screen](docs/images/login.png)

### İlk Giriş

İlk girişinizde:
- Sistem yöneticinizden kullanıcı adı ve geçici şifre alın
- Giriş yaptıktan sonra şifrenizi değiştirin
- Profil bilgilerinizi güncelleyin

### Şifre Sıfırlama

Şifrenizi unuttuysanız:
1. Giriş ekranında "Şifremi Unuttum" linkine tıklayın
2. Kayıtlı e-posta adresinizi girin
3. E-postanıza gelen linke tıklayarak yeni şifre oluşturun

## 📊 Ana Panel (Dashboard)

Ana panel, işletmenizin genel durumunu bir bakışta görmenizi sağlar.

### Dashboard Bileşenleri

#### 1. İstatistik Kartları
- **Toplam İşletme**: Sistemde kayıtlı işletme sayısı
- **Aktif Personel**: Çalışan personel sayısı
- **Bu Hafta Randevu**: Haftalık randevu özeti
- **Toplam Gelir**: Aylık gelir toplamı

#### 2. Son Aktiviteler
- En son eklenen randevular
- Son kasa hareketleri
- Yeni müşteri kayıtları

#### 3. Hızlı İşlemler
- Yeni Randevu
- Müşteri Ekle
- İşletme Ekle
- Hizmet Ekle
- Kasa İşlemi

### Dashboard Kullanımı

```
💡 İpucu: Dashboard'daki kartlara tıklayarak ilgili detay sayfalarına hızlıca ulaşabilirsiniz.
```

## 🏢 İşletme Yönetimi

### İşletme Ekleme

1. Sol menüden **İşletmem > İşletmelerim** seçin
2. **"Yeni İşletme Ekle"** butonuna tıklayın
3. Gerekli bilgileri doldurun:
   - İşletme Adı*
   - Adres*
   - Telefon*
   - E-posta*
   - Şehir*
   - İlçe*
   - Vergi Dairesi*
   - Vergi Numarası*
4. **"Kaydet"** butonuna tıklayın

### İşletme Bilgilerini Düzenleme

1. İşletmeler listesinden düzenlemek istediğiniz işletmeyi bulun
2. Satır sonundaki **"Düzenle"** (kalem) ikonuna tıklayın
3. Bilgileri güncelleyin
4. **"Güncelle"** butonuna tıklayın

### İşletme Silme

```
⚠️ Uyarı: İşletme silindiğinde, ilişkili tüm veriler (hizmetler, personel, randevular) de silinecektir.
```

1. Silmek istediğiniz işletmenin satırında **"Sil"** (çöp kutusu) ikonuna tıklayın
2. Onay penceresinde **"Evet, Sil"** butonuna tıklayın

## 💼 Hizmet Yönetimi

### Hizmet Ekleme

1. **İşletmem > Hizmetler** menüsüne gidin
2. **"Yeni Hizmet Ekle"** butonuna tıklayın
3. Form alanlarını doldurun:
   - İşletme Seçimi*
   - Hizmet Adı*
   - Açıklama*
   - Fiyat (TL)*
   - KDV Oranı (%)*
4. **"Kaydet"** butonuna tıklayın

### Hizmet Düzenleme

1. Hizmetler listesinden düzenlemek istediğiniz hizmeti bulun
2. **"Düzenle"** butonuna tıklayın
3. Gerekli değişiklikleri yapın
4. **"Güncelle"** butonuna tıklayın

### Fiyat Güncelleme

```
💡 İpucu: Toplu fiyat güncellemesi için Excel'den veri aktarımı özelliğini kullanabilirsiniz.
```

## 👥 Personel Yönetimi

### Personel Ekleme

1. **İşletmem > Personel Yönetimi** sayfasına gidin
2. **"Yeni Personel Ekle"** butonuna tıklayın
3. Personel bilgilerini girin:
   - Ad Soyad*
   - TC Kimlik No*
   - Telefon*
   - E-posta*
   - Adres*
   - İşletme*
   - Verebileceği Hizmetler*
   - Notlar (opsiyonel)
4. **"Kaydet"** butonuna tıklayın

### Personel-Hizmet Eşleştirme

1. Personel düzenleme sayfasına gidin
2. **"Hizmetler"** bölümünden personelin verebileceği hizmetleri seçin
3. Birden fazla hizmet seçebilirsiniz
4. **"Güncelle"** butonuna tıklayın

### Personel Performans Takibi

Dashboard'da personel bazlı raporları görüntüleyebilirsiniz:
- Aylık randevu sayısı
- Tamamlanan hizmetler
- Müşteri memnuniyeti

## 👤 Müşteri Yönetimi

### Müşteri Türleri

Sistem iki tip müşteri kaydı destekler:

#### Bireysel Müşteri
- Ad Soyad
- Telefon
- E-posta
- Adres
- Notlar

#### Kurumsal Müşteri
- Firma Adı
- Vergi Numarası
- Vergi Dairesi
- Yetkili Kişi
- Web Sitesi

### Müşteri Ekleme

1. **Müşteriler > Müşteri Ekle** menüsüne gidin
2. Müşteri tipini seçin (Bireysel/Kurumsal)
3. Gerekli bilgileri doldurun:
   - Ad Soyad/Firma Adı*
   - Telefon*
   - E-posta*
   - Müşteri Tipi
   - Vergi Bilgileri (kurumsal için)
   - Adres
   - Notlar
4. **"Kaydet"** butonuna tıklayın

### Müşteri Arama

1. **Müşteriler > Müşteri Listesi** sayfasına gidin
2. Arama kutusuna:
   - İsim
   - Telefon
   - E-posta
   - Vergi numarası
   yazarak arama yapabilirsiniz
3. Filtreler:
   - Müşteri Tipi
   - Şehir
   - Kayıt Tarihi

### Müşteri Geçmişi

Müşteri detay sayfasında görebileceğiniz bilgiler:
- Randevu geçmişi
- Alınan hizmetler
- Ödeme geçmişi
- Notlar ve özel bilgiler

## 📅 Randevu Yönetimi

### Yeni Randevu Oluşturma

1. **Randevu > Yeni Randevu** sayfasına gidin
2. Randevu bilgilerini girin:
   - İşletme Seçimi*
   - Müşteri Seçimi* (veya yeni müşteri ekle)
   - Hizmet Seçimi*
   - Personel Seçimi*
   - Tarih ve Saat*
   - Randevu Notu
3. **"Randevu Oluştur"** butonuna tıklayın

### Randevu Durumları

- 🟡 **Bekliyor**: Onay bekleyen randevular
- 🔵 **Onaylandı**: Onaylanmış randevular
- 🟢 **Tamamlandı**: Gerçekleşen randevular
- 🔴 **İptal Edildi**: İptal edilen randevular

### Randevu Takvimi

Takvim görünümünde:
- Günlük, haftalık ve aylık görünüm seçenekleri
- Personel bazlı filtreleme
- Sürükle-bırak ile randevu zamanı değiştirme
- Renk kodlu hizmet gösterimi

### Randevu Hatırlatmaları

```
💡 İpucu: Müşterilere otomatik SMS/E-posta hatırlatması göndermek için Ayarlar > Bildirimler bölümünü yapılandırın.
```

## 💰 Kasa Yönetimi

### Gelir Girişi

1. **İşletmem > Kasa** sayfasına gidin
2. **"Yeni İşlem"** butonuna tıklayın
3. İşlem tipini **"Gelir"** olarak seçin
4. Bilgileri doldurun:
   - İşletme*
   - Tutar*
   - Ödeme Tipi* (Nakit/Kart/Banka/Diğer)
   - KDV Oranı*
   - Firma/Kişi
   - Belge No
   - Tarih*
   - Açıklama
5. **"Kaydet"** butonuna tıklayın

### Gider Girişi

1. İşlem tipini **"Gider"** olarak seçin
2. Gider bilgilerini girin:
   - Gider Kategorisi
   - Tutar
   - Ödeme Tipi
   - Firma
   - Fatura/Fiş No
   - Açıklama
3. **"Kaydet"** butonuna tıklayın

### Kasa Raporu

**İşletmem > Kasa Raporu** sayfasında:

#### Özet Bilgiler
- Toplam Gelir
- Toplam Gider
- Net Kar/Zarar
- KDV Toplamı

#### Detaylı Raporlar
- Tarih aralığına göre filtreleme
- Ödeme tipine göre dağılım
- Kategori bazlı analiz
- Excel/PDF olarak dışa aktarma

### Kasa Kapama

Gün sonu kasa kapama işlemi:
1. **"Kasa Kapat"** butonuna tıklayın
2. Nakit sayımını girin
3. Sistem farkı otomatik hesaplar
4. Onaylayarak günü kapatın

## 👤 Kullanıcı Yönetimi

### Kullanıcı Rolleri

Sistemde tanımlı roller:

#### Admin
- Tüm modüllere erişim
- Kullanıcı yönetimi
- Sistem ayarları
- Veri silme yetkisi

#### Yönetici
- İşletme yönetimi
- Raporlama
- Personel yönetimi
- Kasa yönetimi

#### Personel
- Randevu yönetimi
- Müşteri görüntüleme
- Kendi randevularını görme

#### Muhasebe
- Kasa işlemleri
- Finansal raporlar
- Fatura yönetimi

### Yeni Kullanıcı Ekleme

1. **Kullanıcılar > Kullanıcı Yönetimi** sayfasına gidin
2. **"Yeni Kullanıcı"** butonuna tıklayın
3. Kullanıcı bilgilerini girin:
   - Ad*
   - Soyad*
   - Kullanıcı Adı*
   - E-posta*
   - Şifre*
   - Rol Seçimi*
4. **"Kullanıcı Oluştur"** butonuna tıklayın

### Yetki Yönetimi

1. Kullanıcı düzenleme sayfasına gidin
2. **"Yetkiler"** sekmesine tıklayın
3. Erişim izni verilecek modülleri seçin:
   - ✅ İşletme Yönetimi
   - ✅ Müşteri Yönetimi
   - ✅ Randevu Yönetimi
   - ✅ Kasa Yönetimi
   - ✅ Raporlar
4. **"Yetkileri Güncelle"** butonuna tıklayın

## 📈 Raporlar

### Mevcut Raporlar

#### İşletme Raporları
- Aylık gelir-gider analizi
- Hizmet bazlı gelir dağılımı
- Personel performans raporu
- Müşteri analizi

#### Randevu Raporları
- Doluluk oranları
- İptal/erteleme istatistikleri
- En çok talep edilen hizmetler
- Personel bazlı randevu dağılımı

#### Finansal Raporlar
- Gelir tablosu
- KDV raporu
- Nakit akış raporu
- Tahsilat raporu

### Rapor Oluşturma

1. **Raporlar** menüsünden rapor tipini seçin
2. Filtre kriterlerini belirleyin:
   - Tarih aralığı
   - İşletme
   - Personel
   - Hizmet
3. **"Rapor Oluştur"** butonuna tıklayın
4. Raporu görüntüleyin veya dışa aktarın

### Rapor Dışa Aktarma

Raporları şu formatlarda dışa aktarabilirsiniz:
- 📊 Excel (.xlsx)
- 📄 PDF
- 📈 CSV
- 🖨️ Yazdırma

## ⚙️ Ayarlar

### Profil Ayarları

1. Sağ üst köşedeki profil ikonuna tıklayın
2. **"Profil Ayarları"** seçeneğini seçin
3. Güncelleyebileceğiniz bilgiler:
   - Ad Soyad
   - E-posta
   - Telefon
   - Şifre Değiştirme
   - Profil Fotoğrafı

### Bildirim Ayarları

Bildirim tercihlerinizi yönetin:
- ✉️ E-posta bildirimleri
- 📱 SMS bildirimleri
- 🔔 Uygulama içi bildirimler

Bildirim türleri:
- Yeni randevu
- Randevu iptali
- Ödeme hatırlatması
- Sistem güncellemeleri

### Tema Ayarları

- 🌞 Açık Tema
- 🌙 Koyu Tema
- 🖥️ Sistem Teması (otomatik)

### Dil Ayarları

Desteklenen diller:
- 🇹🇷 Türkçe
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇫🇷 Français

## ❓ Sık Sorulan Sorular

### Genel Sorular

**S: Şifremi unuttum, ne yapmalıyım?**
C: Giriş ekranında "Şifremi Unuttum" linkine tıklayarak e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz.

**S: Aynı anda birden fazla cihazdan giriş yapabilir miyim?**
C: Evet, hesabınızla aynı anda birden fazla cihazdan giriş yapabilirsiniz.

**S: Verilerin yedeklenmesi nasıl yapılıyor?**
C: Sistem otomatik olarak günlük yedekleme yapar. Manuel yedekleme için sistem yöneticinizle iletişime geçin.

### Randevu Yönetimi

**S: Randevu saatlerini nasıl ayarlayabilirim?**
C: İşletme ayarlarından çalışma saatlerinizi ve randevu aralıklarını belirleyebilirsiniz.

**S: Müşteri randevusunu kendisi iptal edebilir mi?**
C: Müşterilere gönderilen onay linkinden randevularını iptal edebilirler.

**S: Tatil günlerini nasıl belirleyebilirim?**
C: Ayarlar > İşletme > Tatil Günleri bölümünden tatil günlerinizi ekleyebilirsiniz.

### Kasa Yönetimi

**S: Geçmiş tarihli kasa girişi yapabilir miyim?**
C: Evet, tarih seçerek geçmiş tarihli işlem girebilirsiniz.

**S: KDV oranlarını nasıl güncelleyebilirim?**
C: Hizmet tanımlarken veya düzenlerken KDV oranını belirleyebilirsiniz.

**S: Kasa raporunu nasıl alabilirim?**
C: İşletmem > Kasa Raporu sayfasından tarih aralığı seçerek detaylı rapor alabilirsiniz.

### Müşteri Yönetimi

**S: Müşteri bilgilerini dışa aktarabilir miyim?**
C: Müşteri listesi sayfasında "Dışa Aktar" butonu ile Excel formatında indirebilirsiniz.

**S: Müşteri bilgileri güvenli mi?**
C: Tüm veriler şifrelenmiş olarak saklanır ve KVKK uyumlu olarak işlenir.

**S: Toplu müşteri ekleme yapabilir miyim?**
C: Excel şablonu kullanarak toplu müşteri aktarımı yapabilirsiniz.

### Teknik Sorunlar

**S: Sistem yavaş çalışıyor, ne yapmalıyım?**
C: Tarayıcı önbelleğini temizleyin ve sayfayı yenileyin. Sorun devam ederse sistem yöneticisine bildirin.

**S: "Oturum süreniz doldu" hatası alıyorum.**
C: Güvenlik nedeniyle 30 dakika işlem yapılmadığında oturum sonlanır. Tekrar giriş yapmanız gerekir.

**S: Mobil cihazdan kullanabilir miyim?**
C: Evet, sistem responsive tasarıma sahiptir ve tüm mobil cihazlardan kullanılabilir.

## 📞 Destek

### İletişim Kanalları

- 📧 E-posta: destek@webkeller.com
- 📱 WhatsApp: +90 555 123 4567
- ☎️ Telefon: 0212 123 45 67
- 💬 Canlı Destek: Panel içinden 7/24

### Destek Saatleri

- Hafta içi: 09:00 - 18:00
- Cumartesi: 10:00 - 14:00
- Pazar: Kapalı

### Uzaktan Destek

Teknik sorunlar için uzaktan bağlantı desteği sağlanmaktadır:
1. Destek ekibiyle iletişime geçin
2. Size özel bağlantı kodu paylaşılacaktır
3. TeamViewer veya AnyDesk üzerinden destek alabilirsiniz

## 🔄 Güncellemeler

### Otomatik Güncellemeler

Sistem güncellemeleri otomatik olarak yapılır:
- Küçük güncellemeler: Gece saatlerinde
- Büyük güncellemeler: Önceden bildirim ile

### Yenilikler

Son güncellemeler ve yeni özellikler:
- Panel içi bildirimler
- Gelişmiş raporlama
- Mobil uygulama entegrasyonu
- WhatsApp bildirimleri

### Versiyon Notları

Güncel versiyon: v2.1.0
- Performans iyileştirmeleri
- Yeni rapor şablonları
- Hata düzeltmeleri
- UI/UX iyileştirmeleri

## 📝 Notlar

### Önemli Bilgiler

```
⚠️ Güvenlik Uyarıları:
- Şifrenizi kimseyle paylaşmayın
- Düzenli olarak şifrenizi değiştirin
- Ortak bilgisayarlarda "Beni Hatırla" seçeneğini kullanmayın
- Çıkış yapmayı unutmayın
```

### Veri Güvenliği

- Tüm veriler SSL ile şifrelenir
- Günlük otomatik yedekleme
- KVKK uyumlu veri işleme
- ISO 27001 sertifikalı altyapı

### Kullanım İpuçları

1. **Kısayollar:**
   - `Ctrl + N`: Yeni kayıt
   - `Ctrl + S`: Kaydet
   - `Ctrl + F`: Arama
   - `Esc`: İptal/Kapat

2. **Hızlı Erişim:**
   - Sık kullanılan sayfaları favorilere ekleyin
   - Dashboard'ı özelleştirin
   - Hızlı işlemler menüsünü kullanın

3. **Verimlilik:**
   - Toplu işlemler için Excel import/export kullanın
   - Tekrarlayan işlemler için şablonlar oluşturun
   - Raporları zamanlanmış olarak alın

---

**WebKeller Panel** - Kullanıcı Kılavuzu v2.1.0

© 2024 WebKeller. Tüm hakları saklıdır.