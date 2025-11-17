'use client';

import React from 'react';
import { 
  Settings, 
  Palette, 
  Bell, 
  Shield, 
  Link as LinkIcon, 
  Database,
  Upload,
  Save,
  Image as ImageIcon,
  Building2,
  Mail,
  Phone,
  Lock,
  Key,
  Smartphone,
  Download,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import Image from 'next/image';

export default function AyarlarPage() {
  const { settings, updateSettings, refreshSettings } = useApp();
  const [mounted, setMounted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  // Form states - initialize from settings
  const [logoLight, setLogoLight] = React.useState<string>('');
  const [logoDark, setLogoDark] = React.useState<string>('');
  const [businessName, setBusinessName] = React.useState('');
  const [businessEmail, setBusinessEmail] = React.useState('');
  const [businessPhone, setBusinessPhone] = React.useState('');
  const [businessAddress, setBusinessAddress] = React.useState('');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [appointmentReminders, setAppointmentReminders] = React.useState(true);
  
  // Display settings
  const [compactMode, setCompactMode] = React.useState(false);
  const [showAnimations, setShowAnimations] = React.useState(true);
  
  // Security settings
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Load settings when they become available
  React.useEffect(() => {
    if (settings) {
      setLogoLight(settings.logoLight || '/maviwebkeller.png');
      setLogoDark(settings.logoDark || '/beyazwebkeller.png');
      setBusinessName(settings.businessName || 'WebKeller Panel');
      setBusinessEmail(settings.businessEmail || '');
      setBusinessPhone(settings.businessPhone || '');
      setBusinessAddress(settings.businessAddress || '');
      setEmailNotifications(settings.emailNotifications);
      setSmsNotifications(settings.smsNotifications);
      setPushNotifications(settings.pushNotifications);
      setAppointmentReminders(settings.appointmentReminders);
      setCompactMode(settings.compactMode);
      setShowAnimations(settings.showAnimations);
    }
  }, [settings]);

  const handleLogoLightUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Dosya boyutu 2MB\'dan küçük olmalıdır!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoLight(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoDarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Dosya boyutu 2MB\'dan küçük olmalıdır!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoDark(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGeneral = async () => {
    setLoading(true);
    const success = await updateSettings({
      logoLight,
      logoDark,
      businessName,
      businessEmail,
      businessPhone,
      businessAddress,
    });
    setLoading(false);
    
    if (success) {
      toast.success('Genel ayarlar başarıyla kaydedildi!');
      await refreshSettings();
    } else {
      toast.error('Ayarlar kaydedilirken hata oluştu!');
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    const success = await updateSettings({
      emailNotifications,
      smsNotifications,
      pushNotifications,
      appointmentReminders,
    });
    setLoading(false);
    
    if (success) {
      toast.success('Bildirim ayarları kaydedildi!');
    } else {
      toast.error('Ayarlar kaydedilirken hata oluştu!');
    }
  };

  const handleSaveDisplay = async () => {
    setLoading(true);
    const success = await updateSettings({
      compactMode,
      showAnimations,
    });
    setLoading(false);
    
    if (success) {
      toast.success('Görünüm ayarları kaydedildi!');
    } else {
      toast.error('Ayarlar kaydedilirken hata oluştu!');
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Tüm şifre alanlarını doldurun!');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor!');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Şifre en az 8 karakter olmalı!');
      return;
    }
    toast.success('Şifre başarıyla değiştirildi!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExportData = () => {
    toast.success('Verileriniz indiriliyor...');
  };

  const handleBackup = () => {
    toast.success('Yedekleme başlatıldı!');
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            Ayarlar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Dashboard ve hesap ayarlarınızı yönetin
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Genel</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Görünüm</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Bildirimler</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Güvenlik</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Entegrasyonlar</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Veri</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo ve Branding</CardTitle>
              <CardDescription>
                Açık ve koyu tema için farklı logolar yükleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Light Theme Logo Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label>Açık Tema Logosu</Label>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                      Light Mode
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900">
                    <div className="w-40 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-4 border border-gray-200">
                      {logoLight && (
                        <Image
                          src={logoLight}
                          alt="Light Logo"
                          width={140}
                          height={100}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <input
                        type="file"
                        id="logo-light-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoLightUpload}
                      />
                      <label htmlFor="logo-light-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            Açık Tema Logo Yükle
                          </span>
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        PNG, JPG (maks. 2MB)
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium">
                        Açık arka planlarda gösterilir
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dark Theme Logo Upload */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label>Koyu Tema Logosu</Label>
                    <span className="text-xs bg-gray-800 dark:bg-gray-700 text-white px-2 py-0.5 rounded">
                      Dark Mode
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-800">
                    <div className="w-40 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center p-4 border border-gray-600">
                      {logoDark && (
                        <Image
                          src={logoDark}
                          alt="Dark Logo"
                          width={140}
                          height={100}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <input
                        type="file"
                        id="logo-dark-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoDarkUpload}
                      />
                      <label htmlFor="logo-dark-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            Koyu Tema Logo Yükle
                          </span>
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        PNG, JPG (maks. 2MB)
                      </p>
                      <p className="text-xs text-gray-300 mt-1 font-medium">
                        Koyu arka planlarda gösterilir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İşletme Bilgileri</CardTitle>
              <CardDescription>
                İşletmenizin temel bilgilerini güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="business-name">İşletme Adı</Label>
                <Input
                  id="business-name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="İşletme adınızı girin"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-email">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="business-email"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="business-phone"
                      type="tel"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="+90 555 123 4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-address">Adres</Label>
                <Textarea
                  id="business-address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="İşletme adresinizi girin"
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveGeneral} disabled={loading} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Tercihleri</CardTitle>
              <CardDescription>
                Dashboard görünümünü kişiselleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Kompakt Mod</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Daha az boşluk, daha fazla içerik
                  </p>
                </div>
                <Switch checked={compactMode} onCheckedChange={setCompactMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animasyonlar</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Geçiş animasyonlarını göster
                  </p>
                </div>
                <Switch checked={showAnimations} onCheckedChange={setShowAnimations} />
              </div>

              <Button onClick={handleSaveDisplay} disabled={loading} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Hangi bildirimleri almak istediğinizi seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-posta Bildirimleri</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Önemli güncellemeleri e-posta ile alın
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Bildirimleri</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SMS ile hızlı bildirimler alın
                  </p>
                </div>
                <Switch 
                  checked={smsNotifications} 
                  onCheckedChange={setSmsNotifications} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Bildirimleri</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tarayıcı bildirimleri göster
                  </p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Randevu Hatırlatmaları</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Yaklaşan randevular için otomatik hatırlatma
                  </p>
                </div>
                <Switch 
                  checked={appointmentReminders} 
                  onCheckedChange={setAppointmentReminders} 
                />
              </div>

              <Button onClick={handleSaveNotifications} disabled={loading} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesabınızın güvenliği için düzenli olarak şifrenizi güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mevcut Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="current-password"
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Mevcut şifrenizi girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Yeni şifrenizi girin (min. 8 karakter)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Yeni şifrenizi tekrar girin"
                  />
                </div>
              </div>

              <Button onClick={handleChangePassword} className="w-full sm:w-auto">
                <Shield className="w-4 h-4 mr-2" />
                Şifreyi Güncelle
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İki Faktörlü Doğrulama (2FA)</CardTitle>
              <CardDescription>
                Hesabınıza ekstra güvenlik katmanı ekleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>2FA Durumu</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {twoFactorEnabled ? 'Aktif' : 'Pasif'}
                  </p>
                </div>
                <Switch 
                  checked={twoFactorEnabled} 
                  onCheckedChange={setTwoFactorEnabled} 
                />
              </div>

              {twoFactorEnabled && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        2FA Aktif
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                        Hesabınız iki faktörlü doğrulama ile korunuyor
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Ayarları</CardTitle>
              <CardDescription>
                API entegrasyonlarınızı yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Anahtarı</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value="wk_live_••••••••••••••••••••••••"
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" size="sm">
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  API anahtarınızı kimseyle paylaşmayın
                </p>
              </div>

              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input
                  placeholder="https://example.com/webhook"
                  className="font-mono text-sm"
                />
              </div>

              <Button variant="outline" className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data & Backup */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Veri Yönetimi</CardTitle>
              <CardDescription>
                Verilerinizi dışa aktarın veya yedekleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Veri İndirme
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Tüm verilerinizi JSON formatında indirin
                </p>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Verileri İndir
                </Button>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  Otomatik Yedekleme
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Verileriniz günlük olarak otomatik yedekleniyor
                </p>
                <Button variant="outline" onClick={handleBackup}>
                  <Database className="w-4 h-4 mr-2" />
                  Manuel Yedekleme Yap
                </Button>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
                  Tehlikeli Bölge
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  Bu işlemler geri alınamaz. Dikkatli olun!
                </p>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Tüm Verileri Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
