'use client';

import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Sparkles } from 'lucide-react';
import { format, startOfWeek, startOfMonth, startOfYear, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, endOfMonth, endOfYear } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Transaction {
  date: Date;
  amount: number;
  type: 'income' | 'expense';
}

interface IncomeChartProps {
  transactions: Transaction[];
}

type Period = 'week' | 'month' | 'year';

export function IncomeChart({ transactions }: IncomeChartProps) {
  const [period, setPeriod] = React.useState<Period>('month');

  const chartData = useMemo(() => {
    console.log('Transactions:', transactions.length, transactions);
    const now = new Date();
    let intervals: Date[] = [];
    let formatStr = '';

    if (period === 'week') {
      const start = startOfWeek(now, { locale: tr });
      intervals = eachDayOfInterval({ start, end: now });
      formatStr = 'EEE';
    } else if (period === 'month') {
      const start = startOfMonth(now);
      intervals = eachDayOfInterval({ start, end: now });
      formatStr = 'dd';
    } else {
      const start = startOfYear(now);
      intervals = eachMonthOfInterval({ start, end: now });
      formatStr = 'MMM';
    }

    return intervals.map(date => {
      const dayTransactions = transactions.filter(t => {
        const txDate = new Date(t.date);
        
        if (period === 'year') {
          return txDate.getMonth() === date.getMonth() && txDate.getFullYear() === date.getFullYear();
        }
        
        // Günlük karşılaştırma için sadece yıl, ay, gün kontrolü
        return txDate.getFullYear() === date.getFullYear() &&
               txDate.getMonth() === date.getMonth() &&
               txDate.getDate() === date.getDate();
      });

      const income = dayTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expense = dayTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

      const result = {
        label: format(date, formatStr, { locale: tr }),
        income,
        expense,
        net: income - expense,
      };
      
      if (income > 0 || expense > 0) {
        console.log('Data point:', result, 'from', dayTransactions.length, 'transactions');
      }
      
      return result;
    });
  }, [transactions, period]);

  const stats = useMemo(() => {
    const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0);
    const totalExpense = chartData.reduce((sum, d) => sum + d.expense, 0);
    const net = totalIncome - totalExpense;
    const avgIncome = totalIncome / chartData.length;
    
    const prevPeriodIncome = chartData.slice(0, Math.floor(chartData.length / 2)).reduce((sum, d) => sum + d.income, 0);
    const currentPeriodIncome = chartData.slice(Math.floor(chartData.length / 2)).reduce((sum, d) => sum + d.income, 0);
    const growth = prevPeriodIncome > 0 ? ((currentPeriodIncome - prevPeriodIncome) / prevPeriodIncome) * 100 : 0;

    return { totalIncome, totalExpense, net, avgIncome, growth };
  }, [chartData]);

  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expense)), 1);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl blur-lg opacity-30" />
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Gelir Analizi</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Finansal performans özeti</p>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 dark:border-gray-700/50">
            {(['week', 'month', 'year'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  period === p
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {p === 'week' ? 'Haftalık' : p === 'month' ? 'Aylık' : 'Yıllık'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <p className="text-sm font-medium opacity-90">Toplam Gelir</p>
              <p className="text-2xl font-bold mt-1">₺{stats.totalIncome.toLocaleString('tr-TR')}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-pink-600 p-4 text-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <p className="text-sm font-medium opacity-90">Toplam Gider</p>
              <p className="text-2xl font-bold mt-1">₺{stats.totalExpense.toLocaleString('tr-TR')}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <p className="text-sm font-medium opacity-90">Net Kar</p>
              <p className="text-2xl font-bold mt-1">₺{stats.net.toLocaleString('tr-TR')}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-4 text-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <p className="text-sm font-medium opacity-90">Büyüme</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold">{stats.growth.toFixed(1)}%</p>
                {stats.growth >= 0 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-end justify-between h-64 gap-2">
            {chartData.map((data, index) => {
              const incomeHeight = maxValue > 0 ? (data.income / maxValue) * 100 : 0;
              const expenseHeight = maxValue > 0 ? (data.expense / maxValue) * 100 : 0;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Bars Container */}
                  <div className="relative w-full flex items-end justify-center gap-1 h-full">
                    {/* Income Bar */}
                    <div className="relative flex-1 flex flex-col justify-end h-full">
                      <div
                        className="relative w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer group/bar"
                        style={{ height: `${Math.max(incomeHeight, data.income > 0 ? 5 : 0)}%`, minHeight: data.income > 0 ? '8px' : '0' }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                            <p className="font-semibold">Gelir</p>
                            <p>₺{data.income.toLocaleString('tr-TR')}</p>
                          </div>
                        </div>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-t-lg" />
                      </div>
                    </div>

                    {/* Expense Bar */}
                    <div className="relative flex-1 flex flex-col justify-end h-full">
                      <div
                        className="relative w-full bg-gradient-to-t from-red-500 to-pink-400 rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer group/bar"
                        style={{ height: `${Math.max(expenseHeight, data.expense > 0 ? 5 : 0)}%`, minHeight: data.expense > 0 ? '8px' : '0' }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                            <p className="font-semibold">Gider</p>
                            <p>₺{data.expense.toLocaleString('tr-TR')}</p>
                          </div>
                        </div>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-t-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {data.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gelir</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-pink-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gider</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Toplam {transactions.length} işlem
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
