'use client';

import React from 'react';
import { type LucideIcon } from 'lucide-react';


interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const colorMap = {
  blue: {
    bg: 'bg-blue-500',
    light: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400'
  },
  green: {
    bg: 'bg-green-500',
    light: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400'
  },
  purple: {
    bg: 'bg-purple-500',
    light: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400'
  },
  orange: {
    bg: 'bg-orange-500',
    light: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400'
  },
  red: {
    bg: 'bg-red-500',
    light: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400'
  }
};

export function StatsCard({ title, value, icon: Icon, color, change, changeType }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          {change && (
            <p className={`text-xs mt-1 ${
              changeType === 'positive' 
                ? 'text-green-600 dark:text-green-400' 
                : changeType === 'negative'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
}