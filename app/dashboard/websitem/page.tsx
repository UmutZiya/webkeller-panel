'use client';

import React from 'react';
import { Globe, Image as ImageIcon, Layout, Heading1, Rows3, PanelsTopLeft, CheckCircle, ChevronRight } from 'lucide-react';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
    {children}
  </div>
);

export default function WebsitemIcerikPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [saved, setSaved] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    header: { title: '', logoUrl: '', navLinks: '' },
    slider: { imageUrl: '', headline: '', ctaText: '', ctaUrl: '' },
    section1: { title: '', content: '', imageUrl: '' },
    section2: { title: '', content: '', imageUrl: '' },
    footer: { copyright: '', phone: '', email: '' }
  });

  const steps = [
    { id: 1, title: 'Header', icon: Heading1 },
    { id: 2, title: 'Slider', icon: ImageIcon },
    { id: 3, title: 'Section 1', icon: PanelsTopLeft },
    { id: 4, title: 'Section 2', icon: Rows3 },
    { id: 5, title: 'Footer', icon: Layout }
  ];

  const handleSave = () => {
    setSaved(`${steps.find(s => s.id === currentStep)?.title} kaydedildi`);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" /> Websitem
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Header → Slider → Section-1 → Section-2 → Footer sırasıyla içeriği düzenleyin</p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center text-sm">
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
          <span className="text-green-700 dark:text-green-400">{saved}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    currentStep === step.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <step.icon className="w-4 h-4" /> {step.title}
                </button>
                {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
              </div>
            ))}
          </div>
          <button type="button" onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">Kaydet</button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={currentStep === 1 ? '' : 'hidden'}>
                <Field label="Site Başlığı">
                  <input
                    type="text"
                    value={formData.header.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, header: { ...prev.header, title: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Örn. WebKeller Kliniği"
                  />
                </Field>
                <Field label="Logo URL">
                  <input
                    type="url"
                    value={formData.header.logoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, header: { ...prev.header, logoUrl: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="https://..."
                  />
                </Field>
                <Field label="Navigasyon Linkleri (virgülle)">
                  <input
                    type="text"
                    value={formData.header.navLinks}
                    onChange={(e) => setFormData(prev => ({ ...prev, header: { ...prev.header, navLinks: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Hakkımızda, Hizmetler, İletişim"
                  />
                </Field>
            </div>

            <div className={currentStep === 2 ? '' : 'hidden'}>
                <Field label="Slider Görsel URL">
                  <input
                    type="url"
                    value={formData.slider.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, slider: { ...prev.slider, imageUrl: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="https://..."
                  />
                </Field>
                <Field label="Başlık">
                  <input
                    type="text"
                    value={formData.slider.headline}
                    onChange={(e) => setFormData(prev => ({ ...prev, slider: { ...prev.slider, headline: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Örn. Modern ve hızlı çözüm"
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="CTA Metni">
                    <input
                      type="text"
                      value={formData.slider.ctaText}
                      onChange={(e) => setFormData(prev => ({ ...prev, slider: { ...prev.slider, ctaText: e.target.value } }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Hemen Başla"
                    />
                  </Field>
                  <Field label="CTA URL">
                    <input
                      type="url"
                      value={formData.slider.ctaUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, slider: { ...prev.slider, ctaUrl: e.target.value } }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="https://..."
                    />
                  </Field>
                </div>
            </div>

            <div className={currentStep === 3 ? '' : 'hidden'}>
                <Field label="Section 1 Başlık">
                  <input
                    type="text"
                    value={formData.section1.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, section1: { ...prev.section1, title: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </Field>
                <Field label="Section 1 İçerik">
                  <textarea
                    rows={4}
                    value={formData.section1.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, section1: { ...prev.section1, content: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </Field>
                <Field label="Görsel URL">
                  <input
                    type="url"
                    value={formData.section1.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, section1: { ...prev.section1, imageUrl: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </Field>
            </div>

            <div className={currentStep === 4 ? '' : 'hidden'}>
                <Field label="Section 2 Başlık">
                  <input
                    type="text"
                    value={formData.section2.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, section2: { ...prev.section2, title: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </Field>
                <Field label="Section 2 İçerik">
                  <textarea
                    rows={4}
                    value={formData.section2.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, section2: { ...prev.section2, content: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </Field>
                <Field label="Görsel URL">
                  <input
                    type="url"
                    value={formData.section2.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, section2: { ...prev.section2, imageUrl: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </Field>
            </div>

            <div className={currentStep === 5 ? '' : 'hidden'}>
                <Field label="Copyright">
                  <input
                    type="text"
                    value={formData.footer.copyright}
                    onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, copyright: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="© 2025 Tüm hakları saklıdır."
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Telefon">
                    <input
                      type="tel"
                      value={formData.footer.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, phone: e.target.value } }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </Field>
                  <Field label="E-posta">
                    <input
                      type="email"
                      value={formData.footer.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, footer: { ...prev.footer, email: e.target.value } }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </Field>
                </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900/40">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Önizleme</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">{formData.header.title || 'Site Başlığı'}</div>
                  <div className="text-xs text-gray-500">{formData.header.navLinks || 'Menü 1, Menü 2, Menü 3'}</div>
                </div>
              </div>
              <div className="p-4">
                <div className={currentStep === 2 ? '' : 'hidden'}>
                  <div className="rounded-lg h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">Slider Önizleme</div>
                </div>
                <div className={currentStep === 3 ? '' : 'hidden'}>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formData.section1.title || 'Section 1 Başlık'}</div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{formData.section1.content || 'Kısa bir açıklama...'}</p>
                  </div>
                </div>
                <div className={currentStep === 4 ? '' : 'hidden'}>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formData.section2.title || 'Section 2 Başlık'}</div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{formData.section2.content || 'Kısa bir açıklama...'}</p>
                  </div>
                </div>
                <div className={currentStep === 5 ? '' : 'hidden'}>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} {formData.footer.copyright || 'Tüm hakları saklıdır.'}
                  </div>
                </div>
                <div className={currentStep === 1 ? '' : 'hidden'}>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Düzenlemek istediğiniz bölümü seçin.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


