import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { createNotification, updateNotification } from '@/services/notification.service';
import { Notification } from '@/types';

interface NotificationFormProps {
  initialData?: Notification;
  onClose: () => void;
}

export function NotificationForm({ initialData, onClose }: NotificationFormProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    amount: initialData?.amount || 0,
    category: initialData?.category || 'Bills & Utilities',
    mode: initialData?.mode || 'Credit Card',
    expiryDate: initialData?.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    isMonthly: initialData?.isMonthly ?? true,
    period: initialData?.period || 1,
  });

  const isEditMode = !!initialData;

  const mutation = useMutation({
    mutationFn: (data: any) => isEditMode ? updateNotification(initialData.id, data) : createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      onClose();
    },
    onError: (err: Error) => setError(err.message || 'Failed to save notification')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || formData.amount <= 0 || (!formData.isMonthly && formData.period <= 0)) {
      setError('Please verify all fields are valid positive values.');
      return;
    }

    mutation.mutate({
      ...formData,
      period: formData.isMonthly ? 30 : formData.period,
      expiryDate: new Date(formData.expiryDate).toISOString()
    });
  };

  return (
    <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <form onSubmit={handleSubmit} className='bg-white w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col gap-4 overflow-y-auto max-h-[90vh]'>
        <div className='flex justify-between items-center pb-2 border-b border-slate-100'>
          <h2 className='text-xl font-bold text-slate-800'>{isEditMode ? 'Edit Notification' : 'Add Notification'}</h2>
          <button type='button' onClick={onClose} className='text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors'>✕</button>
        </div>

        {error && <div className='p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm'>{error}</div>}

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Title</label>
          <input type='text' required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600' placeholder='e.g. Netflix Subscription' />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Amount</label>
          <input type='number' required min='0.01' step='0.01' value={formData.amount || ''} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })} className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600' placeholder='0.00' />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1 flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-slate-700'>Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 bg-white'>
              <option value='Bills & Utilities'>Bills & Utilities</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Health'>Health</option>
              <option value='Transport'>Transport</option>
              <option value='Shopping'>Shopping</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='flex-1 flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-slate-700'>Mode</label>
            <select value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })} className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 bg-white'>
              <option value='Credit Card'>Credit Card</option>
              <option value='Debit Card'>Debit Card</option>
              <option value='Bank Transfer'>Bank Transfer</option>
              <option value='Google Pay'>Google Pay</option>
              <option value='PhonePe'>PhonePe</option>
              <option value='Cash'>Cash</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Frequency Type</label>
          <div className='flex gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
            <label className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${formData.isMonthly ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-semibold' : 'text-slate-500'}`}><input type='radio' className='hidden' checked={formData.isMonthly} onChange={() => setFormData({ ...formData, isMonthly: true })} />Monthly</label>
            <label className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${!formData.isMonthly ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-semibold' : 'text-slate-500'}`}><input type='radio' className='hidden' checked={!formData.isMonthly} onChange={() => setFormData({ ...formData, isMonthly: false })} />Days</label>
          </div>
        </div>

        {!formData.isMonthly && (
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-slate-700'>Period Interval (Days)</label>
            <input type='number' required min='1' value={formData.period} onChange={(e) => setFormData({ ...formData, period: parseInt(e.target.value) })} className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600' />
          </div>
        )}

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Next Expiry Date</label>
          <input type='date' required value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600' />
        </div>

        <div className='mt-2 flex gap-3 pt-4 border-t border-slate-100'>
          <button type='button' onClick={onClose} className='flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg font-bold transition-colors'>Cancel</button>
          <button type='submit' disabled={mutation.isPending} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold disabled:opacity-50 transition-colors shadow-sm'>
            {mutation.isPending ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </form>
    </div>
  );
}