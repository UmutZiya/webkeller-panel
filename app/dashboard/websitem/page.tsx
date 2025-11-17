'use client';

import React from 'react';
import {
  Globe,
  Layout,
  Image as ImageIcon,
  Type,
  Menu,
  Link as LinkIcon,
  Image as ImageUpload,
  FileText,
  Layers,
  Navigation,
  Save,
  Eye,
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Palette,
  Code,
  Settings,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function WebsitemPage() {
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Header Settings
  const [siteLogo, setSiteLogo] = React.useState('');
  const [siteTitle, setSiteTitle] = React.useState('WebKeller');
  const [headerMenuItems, setHeaderMenuItems] = React.useState([
    { id: '1', label: 'Ana Sayfa', url: '/', order: 1 },
    { id: '2', label: 'Hakkımızda', url: '/hakkimizda', order: 2 },
    { id: '3', label: 'Hizmetler', url: '/hizmetler', order: 3 },
    { id: '4', label: 'İletişim', url: '/iletisim', order: 4 },
  ]);

  // Slider Settings
  const [sliderImages, setSliderImages] = React.useState([
    { id: '1', image: '', title: 'Slider 1', subtitle: 'Alt başlık 1', buttonText: 'Detay', buttonLink: '#' },
    { id: '2', image: '', title: 'Slider 2', subtitle: 'Alt başlık 2', buttonText: 'Detay', buttonLink: '#' },
  ]);

  // Sections
  const [section1Title, setSection1Title] = React.useState('Hizmetlerimiz');
  const [section1Description, setSection1Description] = React.useState('Profesyonel çözümler sunuyoruz');
  const [section1Cards, setSection1Cards] = React.useState([
    { id: '1', icon: '🎯', title: 'Hizmet 1', description: 'Açıklama 1' },
    { id: '2', icon: '🚀', title: 'Hizmet 2', description: 'Açıklama 2' },
    { id: '3', icon: '⚡', title: 'Hizmet 3', description: 'Açıklama 3' },
  ]);

  const [section2Title, setSection2Title] = React.useState('Neden Biz?');
  const [section2Description, setSection2Description] = React.useState('Fark yaratan özelliklerimiz');
  const [section2Features, setSection2Features] = React.useState([
    { id: '1', title: 'Özellik 1', description: 'Detaylı açıklama 1' },
    { id: '2', title: 'Özellik 2', description: 'Detaylı açıklama 2' },
  ]);

  // Footer Settings
  const [footerAbout, setFooterAbout] = React.useState('');
  const [footerEmail, setFooterEmail] = React.useState('info@webkeller.com');
  const [footerPhone, setFooterPhone] = React.useState('+90 555 123 4567');
  const [footerAddress, setFooterAddress] = React.useState('');
  const [footerSocialMedia, setFooterSocialMedia] = React.useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  });

  // SEO Settings
  const [seoTitle, setSeoTitle] = React.useState('');
  const [seoDescription, setSeoDescription] = React.useState('');
  const [seoKeywords, setSeoKeywords] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSaveHeader = () => {
    setLoading(true);
    // API call will be here
    setTimeout(() => {
      setLoading(false);
      toast.success('Header ayarları kaydedildi!');
    }, 500);
  };

  const handleSaveSlider = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Slider ayarları kaydedildi!');
    }, 500);
  };

  const handleSaveSection = (section: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${section} ayarları kaydedildi!`);
    }, 500);
  };

  const handleSaveFooter = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Footer ayarları kaydedildi!');
    }, 500);
  };

  const handleSaveSEO = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('SEO ayarları kaydedildi!');
    }, 500);
  };

  const addMenuItem = () => {
    const newItem = {
      id: Date.now().toString(),
      label: 'Yeni Menü',
      url: '#',
      order: headerMenuItems.length + 1
    };
    setHeaderMenuItems([...headerMenuItems, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setHeaderMenuItems(headerMenuItems.filter(item => item.id !== id));
  };

  const addSliderImage = () => {
    const newSlide = {
      id: Date.now().toString(),
      image: '',
      title: `Slider ${sliderImages.length + 1}`,
      subtitle: `Alt başlık ${sliderImages.length + 1}`,
      buttonText: 'Detay',
      buttonLink: '#'
    };
    setSliderImages([...sliderImages, newSlide]);
  };

  const removeSliderImage = (id: string) => {
    setSliderImages(sliderImages.filter(item => item.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            Websitem
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Website içeriğinizi yönetin ve özelleştirin
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Önizleme
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="header" className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          <TabsTrigger value="header" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            <span className="hidden sm:inline">Header</span>
          </TabsTrigger>
          <TabsTrigger value="slider" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Slider</span>
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Bölümler</span>
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Footer</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Genel</span>
          </TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Ayarları</CardTitle>
              <CardDescription>
                Website başlık bölümünü ve menüyü düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Başlığı</Label>
                  <Input
                    id="site-title"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="WebKeller"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-logo">Logo URL</Label>
                  <Input
                    id="site-logo"
                    value={siteLogo}
                    onChange={(e) => setSiteLogo(e.target.value)}
                    placeholder="/logo.png"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Menü Öğeleri</Label>
                  <Button size="sm" onClick={addMenuItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Menü Ekle
                  </Button>
                </div>

                <div className="space-y-3">
                  {headerMenuItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Menü Adı"
                          value={item.label}
                          onChange={(e) => {
                            const updated = headerMenuItems.map(i =>
                              i.id === item.id ? { ...i, label: e.target.value } : i
                            );
                            setHeaderMenuItems(updated);
                          }}
                        />
                        <Input
                          placeholder="URL"
                          value={item.url}
                          onChange={(e) => {
                            const updated = headerMenuItems.map(i =>
                              i.id === item.id ? { ...i, url: e.target.value } : i
                            );
                            setHeaderMenuItems(updated);
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMenuItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveHeader} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Slider Tab */}
        <TabsContent value="slider" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Slider Ayarları</CardTitle>
              <CardDescription>
                Ana sayfa slider görselleri ve içeriklerini yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Slider Görselleri</Label>
                <Button size="sm" onClick={addSliderImage}>
                  <Plus className="w-4 h-4 mr-2" />
                  Slider Ekle
                </Button>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {sliderImages.map((slide, index) => (
                  <AccordionItem key={slide.id} value={slide.id} className="border border-gray-200 dark:border-gray-700 rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Slider {index + 1}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Görsel URL</Label>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={slide.image}
                          onChange={(e) => {
                            const updated = sliderImages.map(s =>
                              s.id === slide.id ? { ...s, image: e.target.value } : s
                            );
                            setSliderImages(updated);
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Başlık</Label>
                          <Input
                            placeholder="Slider Başlığı"
                            value={slide.title}
                            onChange={(e) => {
                              const updated = sliderImages.map(s =>
                                s.id === slide.id ? { ...s, title: e.target.value } : s
                              );
                              setSliderImages(updated);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Alt Başlık</Label>
                          <Input
                            placeholder="Alt Başlık"
                            value={slide.subtitle}
                            onChange={(e) => {
                              const updated = sliderImages.map(s =>
                                s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                              );
                              setSliderImages(updated);
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Buton Metni</Label>
                          <Input
                            placeholder="Detay"
                            value={slide.buttonText}
                            onChange={(e) => {
                              const updated = sliderImages.map(s =>
                                s.id === slide.id ? { ...s, buttonText: e.target.value } : s
                              );
                              setSliderImages(updated);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Buton Linki</Label>
                          <Input
                            placeholder="#"
                            value={slide.buttonLink}
                            onChange={(e) => {
                              const updated = sliderImages.map(s =>
                                s.id === slide.id ? { ...s, buttonLink: e.target.value } : s
                              );
                              setSliderImages(updated);
                            }}
                          />
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSliderImage(slide.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sil
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button onClick={handleSaveSlider} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections" className="space-y-6">
          {/* Section 1 - Hizmetler */}
          <Card>
            <CardHeader>
              <CardTitle>Bölüm 1 - Hizmetler</CardTitle>
              <CardDescription>
                Hizmetlerinizi kartlar halinde gösterin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bölüm Başlığı</Label>
                  <Input
                    placeholder="Hizmetlerimiz"
                    value={section1Title}
                    onChange={(e) => setSection1Title(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bölüm Açıklaması</Label>
                  <Input
                    placeholder="Profesyonel çözümler"
                    value={section1Description}
                    onChange={(e) => setSection1Description(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Hizmet Kartları</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section1Cards.map((card) => (
                    <div key={card.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                      <Input
                        placeholder="🎯"
                        value={card.icon}
                        onChange={(e) => {
                          const updated = section1Cards.map(c =>
                            c.id === card.id ? { ...c, icon: e.target.value } : c
                          );
                          setSection1Cards(updated);
                        }}
                        className="text-center text-2xl"
                      />
                      <Input
                        placeholder="Hizmet Adı"
                        value={card.title}
                        onChange={(e) => {
                          const updated = section1Cards.map(c =>
                            c.id === card.id ? { ...c, title: e.target.value } : c
                          );
                          setSection1Cards(updated);
                        }}
                      />
                      <Textarea
                        placeholder="Açıklama"
                        value={card.description}
                        onChange={(e) => {
                          const updated = section1Cards.map(c =>
                            c.id === card.id ? { ...c, description: e.target.value } : c
                          );
                          setSection1Cards(updated);
                        }}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={() => handleSaveSection('Bölüm 1')} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>

          {/* Section 2 - Neden Biz */}
          <Card>
            <CardHeader>
              <CardTitle>Bölüm 2 - Neden Biz?</CardTitle>
              <CardDescription>
                Fark yaratan özelliklerinizi vurgulayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bölüm Başlığı</Label>
                  <Input
                    placeholder="Neden Biz?"
                    value={section2Title}
                    onChange={(e) => setSection2Title(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bölüm Açıklaması</Label>
                  <Input
                    placeholder="Fark yaratan özelliklerimiz"
                    value={section2Description}
                    onChange={(e) => setSection2Description(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Özellikler</Label>
                {section2Features.map((feature) => (
                  <div key={feature.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                    <Input
                      placeholder="Özellik Başlığı"
                      value={feature.title}
                      onChange={(e) => {
                        const updated = section2Features.map(f =>
                          f.id === feature.id ? { ...f, title: e.target.value } : f
                        );
                        setSection2Features(updated);
                      }}
                    />
                    <Textarea
                      placeholder="Detaylı açıklama"
                      value={feature.description}
                      onChange={(e) => {
                        const updated = section2Features.map(f =>
                          f.id === feature.id ? { ...f, description: e.target.value } : f
                        );
                        setSection2Features(updated);
                      }}
                      rows={3}
                    />
                  </div>
                ))}
              </div>

              <Button onClick={() => handleSaveSection('Bölüm 2')} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Tab */}
        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Ayarları</CardTitle>
              <CardDescription>
                Website alt bilgi bölümünü düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hakkımızda Metni</Label>
                <Textarea
                  placeholder="Şirketiniz hakkında kısa bilgi"
                  value={footerAbout}
                  onChange={(e) => setFooterAbout(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="info@example.com"
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="+90 555 123 4567"
                      value={footerPhone}
                      onChange={(e) => setFooterPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Adres</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="İstanbul, Türkiye"
                      value={footerAddress}
                      onChange={(e) => setFooterAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Sosyal Medya Linkleri</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Facebook URL"
                        value={footerSocialMedia.facebook}
                        onChange={(e) => setFooterSocialMedia({ ...footerSocialMedia, facebook: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Twitter URL"
                        value={footerSocialMedia.twitter}
                        onChange={(e) => setFooterSocialMedia({ ...footerSocialMedia, twitter: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Instagram URL"
                        value={footerSocialMedia.instagram}
                        onChange={(e) => setFooterSocialMedia({ ...footerSocialMedia, instagram: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="LinkedIn URL"
                        value={footerSocialMedia.linkedin}
                        onChange={(e) => setFooterSocialMedia({ ...footerSocialMedia, linkedin: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="YouTube URL"
                        value={footerSocialMedia.youtube}
                        onChange={(e) => setFooterSocialMedia({ ...footerSocialMedia, youtube: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveFooter} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>
                Arama motoru optimizasyonu için meta bilgilerini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Site Başlığı (Title)</Label>
                <Input
                  placeholder="WebKeller - Profesyonel Web Çözümleri"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Google'da görünecek başlık (max 60 karakter)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Meta Açıklama (Description)</Label>
                <Textarea
                  placeholder="WebKeller ile işletmenizi dijitale taşıyın..."
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Google'da görünecek açıklama (max 160 karakter)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Anahtar Kelimeler</Label>
                <Input
                  placeholder="web tasarım, kurumsal web, e-ticaret"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Virgül ile ayırarak yazın
                </p>
              </div>

              <Button onClick={handleSaveSEO} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Genel Website Ayarları</CardTitle>
              <CardDescription>
                Website genel ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Website Yayında</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Website'yi yayına al veya kapat
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bakım Modu</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bakım modunda "Yakında" mesajı göster
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mobil Uyumlu</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Responsive tasarımı aktif et
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

