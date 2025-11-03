'use client';

import React from 'react';
import Image from 'next/image';
import { Palette, CheckCircle, Sparkles } from 'lucide-react';

const themes = [
  { id: 'lawyer-1', name: 'Lawyer 1', image: '/lawyer-1.png' },
  { id: 'logistic-1', name: 'Logistic 1', image: '/logistic-1.png' },
  { id: 'startup-1', name: 'Startup 1', image: '/startup-1.png' }
];

export default function TemalarimPage() {
  const [selected, setSelected] = React.useState<string>('startup-1');
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Palette className="w-6 h-6 text-purple-600" /> Temalarım
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Web siteniz için bir tema seçin</p>
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">Temayı Kaydet</button>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center text-sm">
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
          <span className="text-green-700 dark:text-green-400">Tema kaydedildi</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {themes.map(theme => {
          const isActive = selected === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setSelected(theme.id)}
              type="button"
              className={`group text-left rounded-2xl overflow-hidden border transition-all relative border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image src={theme.image} alt={theme.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-white/90 dark:bg-black/50 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">{theme.name}</span>
                </div>
                {isActive && (
                  <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 rounded-full p-2 shadow-md">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{theme.name}</div>
                    <div className="text-sm text-gray-500">Modern ve hızlı</div>
                  </div>
                  <div className={`px-3 py-1 text-xs rounded-full ${isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
                    {isActive ? 'Seçili' : 'Seç'}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


