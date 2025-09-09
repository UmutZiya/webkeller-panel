'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ComposedChart, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

type Range = 'day' | 'week' | 'month' | 'year';

export default function KasaRaporuPage() {
  const { cashTransactions } = useApp();
  const [range, setRange] = useState<Range>('month');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const filtered = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return cashTransactions.filter(t => {
      const d = new Date(t.date);
      if (start && d < start) return false;
      if (end) {
        const e = new Date(end);
        e.setHours(23,59,59,999);
        if (d > e) return false;
      }
      return true;
    });
  }, [cashTransactions, startDate, endDate]);

  const buckets = useMemo(() => {
    const map = new Map<string, { date: string; income: number; expense: number }>();
    const add = (key: string, dateLabel: string, type: 'income' | 'expense', amount: number) => {
      const prev = map.get(key) || { date: dateLabel, income: 0, expense: 0 };
      prev[type] += amount;
      map.set(key, prev);
    };
    filtered.forEach(t => {
      const d = new Date(t.date);
      let key = '';
      let label = '';
      if (range === 'day') {
        key = format(d, 'yyyy-MM-dd');
        label = format(d, 'dd MMM');
      } else if (range === 'week') {
        // Use ISO week number
        const year = format(d, 'yyyy');
        const week = format(d, "I");
        key = `${year}-W${week}`;
        label = `Hafta ${week}`;
      } else if (range === 'month') {
        key = format(d, 'yyyy-MM');
        label = format(d, 'MMM yyyy');
      } else {
        key = format(d, 'yyyy');
        label = key;
      }
      add(key, label, t.type, t.amount);
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [filtered, range]);

  const totals = useMemo(() => {
    const income = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kasa Raporu</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Gelir/Gider grafikleri ve özetler</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aralık</label>
          <select value={range} onChange={(e) => setRange(e.target.value as Range)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100">
            <option value="day">Gün</option>
            <option value="week">Hafta</option>
            <option value="month">Ay</option>
            <option value="year">Yıl</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Başlangıç Tarihi</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bitiş Tarihi</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
        </div>
        <div className="flex items-end gap-2">
          <button onClick={() => { setStartDate(''); setEndDate(''); }} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full">Temizle</button>
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">Toplam Gelir</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">₺{totals.income.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">Toplam Gider</div>
          <div className="text-2xl font-semibold text-red-600 dark:text-red-400 mt-1">₺{totals.expense.toFixed(2)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <ChartContainer
          config={{
            income: { label: 'Gelir', color: 'hsl(142.1 76.2% 36.3%)' },
            expense: { label: 'Gider', color: 'hsl(0 72.2% 50.6%)' },
            balance: { label: 'Bakiye', color: 'hsl(221.2 83.2% 53.3%)' },
          }}
          className="h-80"
        >
          <ComposedChart data={buckets} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillIncome" x1="0" x2="0" y1="0" y2="1">
                <stop offset="10%" stopColor="var(--color-income)" stopOpacity={0.7} />
                <stop offset="90%" stopColor="var(--color-income)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" x2="0" y1="0" y2="1">
                <stop offset="10%" stopColor="var(--color-expense)" stopOpacity={0.7} />
                <stop offset="90%" stopColor="var(--color-expense)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="expense" fill="url(#fillExpense)" stroke="var(--color-expense)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="income" fill="url(#fillIncome)" stroke="var(--color-income)" radius={[6, 6, 0, 0]} />
            <Line type="monotone" dataKey="balance" stroke="var(--color-balance)" strokeWidth={2} dot={false} />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </div>
    </div>
  );
}


