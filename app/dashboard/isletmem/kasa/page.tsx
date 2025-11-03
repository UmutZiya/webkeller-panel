'use client';

import React, { useMemo, useState } from 'react';
import { useApp, CashTransaction } from '@/contexts/AppContext';
import { Building2, Plus, Trash2, Edit2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function KasaPage() {
  const { businesses, cashTransactions, addCashTransaction, updateCashTransaction, deleteCashTransaction } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTx, setEditingTx] = useState<CashTransaction | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [formData, setFormData] = useState({
    businessId: '',
    type: 'income' as 'income' | 'expense',
    amount: '' as any,
    paymentType: 'cash' as 'cash' | 'card' | 'bank' | 'other',
    taxRate: 0,
    company: '',
    documentNo: '',
    date: '',
    description: ''
  });
  const [success, setSuccess] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return cashTransactions.filter(t => {
      const d = new Date(t.date);
      if (start && d < start) return false;
      if (end) {
        const endInclusive = new Date(end);
        endInclusive.setHours(23, 59, 59, 999);
        if (d > endInclusive) return false;
      }
      return true;
    });
  }, [cashTransactions, startDate, endDate]);

  const totals = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  }, [filteredTransactions]);

  const resetForm = () => {
    setEditingTx(null);
    setFormData({ businessId: '', type: 'income', amount: '', paymentType: 'cash', taxRate: 0, company: '', documentNo: '', date: '', description: '' });
  };

  const handleOpenNew = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (tx: CashTransaction) => {
    setEditingTx(tx);
    setFormData({
      businessId: tx.businessId,
      type: tx.type,
      amount: String(tx.amount),
      paymentType: tx.paymentType,
      taxRate: tx.taxRate,
      company: tx.company || '',
      documentNo: tx.documentNo || '',
      date: format(new Date(tx.date), 'yyyy-MM-dd'),
      description: tx.description || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      businessId: formData.businessId,
      type: formData.type,
      amount: parseFloat(String(formData.amount)) || 0,
      paymentType: formData.paymentType,
      taxRate: Number(formData.taxRate) || 0,
      company: formData.company || undefined,
      documentNo: formData.documentNo || undefined,
      date: new Date(formData.date),
      description: formData.description || undefined
    } as Omit<CashTransaction, 'id' | 'createdAt'>;

    if (editingTx) {
      updateCashTransaction(editingTx.id, payload);
      setSuccess('Kasa işlemi güncellendi');
    } else {
      addCashTransaction(payload);
      setSuccess('Kasa işlemi eklendi');
    }

    setShowModal(false);
    resetForm();
    setTimeout(() => setSuccess(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kasa</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gelir ve giderlerinizi yönetin</p>
        </div>
        <button onClick={handleOpenNew} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Yeni Kasa İşlemi
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Başlangıç Tarihi</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bitiş Tarihi</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
        </div>
        <div className="flex items-end gap-2">
          <button onClick={() => { setStartDate(''); setEndDate(''); }} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full">Filtreyi Temizle</button>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
          <span className="text-green-800 dark:text-green-400 font-medium">{success}</span>
        </div>
      )}

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">Toplam Gelir</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">₺{totals.income.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">Toplam Gider</div>
          <div className="text-2xl font-semibold text-red-600 dark:text-red-400 mt-1">₺{totals.expense.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">Bakiye</div>
          <div className={`text-2xl font-semibold mt-1 ${totals.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>₺{totals.balance.toFixed(2)}</div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Kasa İşlemleri</h3>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2">Tarih</th>
                <th className="px-4 py-2">Şube</th>
                <th className="px-4 py-2">Tür</th>
                <th className="px-4 py-2">Tutar</th>
                <th className="px-4 py-2">Ödeme Türü</th>
                <th className="px-4 py-2">Vergi</th>
                <th className="px-4 py-2">Firma</th>
                <th className="px-4 py-2">Belge/Fiş</th>
                <th className="px-4 py-2">Açıklama</th>
                <th className="px-4 py-2 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{format(new Date(tx.date), 'dd MMM yyyy', { locale: tr })}</td>
                  <td className="px-4 py-3">{businesses.find(b => b.id === tx.businessId)?.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${tx.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                      {tx.type === 'income' ? 'Gelir' : 'Gider'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium {tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">₺{tx.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 capitalize">{tx.paymentType}</td>
                  <td className="px-4 py-3">%{tx.taxRate}</td>
                  <td className="px-4 py-3">{tx.company}</td>
                  <td className="px-4 py-3">{tx.documentNo}</td>
                  <td className="px-4 py-3">{tx.description}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(tx)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => { if (confirm('Bu kasa işlemini silmek istediğinize emin misiniz?')) { deleteCashTransaction(tx.id); } }} className="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {editingTx ? 'Kasa İşlemi Düzenle' : 'Yeni Kasa İşlemi'}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Şube</label>
                <select
                  required
                  value={formData.businessId}
                  onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="">Seçiniz</option>
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kasa Türü</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="income">Gelir</option>
                  <option value="expense">Gider</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tutar</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="0.00"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ödeme Türü</label>
                <select
                  value={formData.paymentType}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="cash">Nakit</option>
                  <option value="card">Kart</option>
                  <option value="bank">Banka</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vergi Oranı (%)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Firma</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Firma adı"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Belge/Fiş No</label>
                <input
                  type="text"
                  value={formData.documentNo}
                  onChange={(e) => setFormData({ ...formData, documentNo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Belge/Fiş Numarası"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tarih</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Opsiyonel açıklama"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="w-full sm:w-auto flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  {editingTx ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


