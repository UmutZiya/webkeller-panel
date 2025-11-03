'use client';

import React from 'react';
import { Settings, Link as LinkIcon, Hash, Globe } from 'lucide-react';

export default function WebsitemAyarlarPage() {
  const [subdomain, setSubdomain] = React.useState('benimsitem');
  const [social, setSocial] = React.useState({ facebook: '', instagram: '', twitter: '', linkedin: '' });
  const [seo, setSeo] = React.useState({ keywords: '', title: '', description: '' });
  const [saved, setSaved] = React.useState(false);

  const fullDomain = `${subdomain || 'demo'}.webkeller.com`;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" /> Ayarlar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Subdomain, sosyal medya ve SEO ayarları</p>
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">Kaydet</button>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">Ayarlar kaydedildi</div>
      )}

      {/* Subdomain */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><Globe className="w-5 h-5" /> Subdomain</h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
          <div className="flex">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.replace(/[^a-z0-9-]/g, ''))}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="subdomain"
            />
            <span className="px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">.webkeller.com</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Önizleme: <span className="font-medium text-blue-600 dark:text-blue-400">{fullDomain}</span></div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><LinkIcon className="w-5 h-5" /> Sosyal Medya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook URL</label>
            <input type="url" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instagram URL</label>
            <input type="url" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter (X) URL</label>
            <input type="url" value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="https://twitter.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
            <input type="url" value={social.linkedin} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><Hash className="w-5 h-5" /> SEO</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Anahtar Kelimeler (virgülle)</label>
            <input type="text" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" placeholder="kuaför, güzellik, saç kesim" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Başlık</label>
            <input type="text" value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Açıklama</label>
            <input type="text" value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}


