'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, List, Plus, Info } from 'lucide-react';
import { DragDropCalendar } from '@/components/Calendar/DragDropCalendar';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RandevuPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Randevu Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Randevuları görüntüleyin ve yönetin
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Takvim
            </button>
            <Link
              href="/dashboard/randevu/liste"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
              Liste
            </Link>
          </div>

          {/* Add Button */}
          <Link
            href="/dashboard/randevu/yeni"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Yeni Randevu
          </Link>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-l-4 border-l-blue-500">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>💡 İpucu:</strong> Randevuları fareyle sürükleyerek farklı saatlere veya günlere taşıyabilirsiniz. 
          Çakışma durumunda sistem sizi uyaracaktır.
        </AlertDescription>
      </Alert>

      {/* Calendar View */}
      {viewMode === 'calendar' && <DragDropCalendar />}
    </div>
  );
}