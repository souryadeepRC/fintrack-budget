import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { createDebt } from '@/services/debt.service';
import { DebtCreatePayload } from '@/types';

interface DebtFormProps {
  onClose: () => void;
  initialData?: Partial<DebtCreatePayload>;
}

export function DebtForm({ onClose, initialData }: DebtFormProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<any>({
    title: initialData?.title || '',
    name: initialData?.name || '',
    amount: initialData?.amount || 0,
    category: initialData?.category || 'Lend',
    isRepayment: initialData?.isRepayment ?? false,
    date: new Date().toISOString().split('T')[0],
    mode: initialData?.mode || 'Cash',
    debtId: initialData?.debtId || undefined
  });

  const isPaymentMode = !!formData.debtId;

  const mutation = useMutation({
    mutationFn: createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      onClose();
    },
    onError: (err: Error) => setError(err.message || 'Failed to save record')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !formData.name || formData.amount <= 0) {
      setError('Please provide a valid title, name, and amount greater than 0.');
      return;
    }
    
    mutation.mutate({
      ...formData,
      isRepayment: isPaymentMode ? formData.isRepayment : false,
      date: new Date(formData.date).toISOString() // Appwrite expects ISO
    } as DebtCreatePayload);
  };

  return (
    <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <form onSubmit={handleSubmit} className='bg-white w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col gap-5 overflow-y-auto max-h-[90vh]'>
        
        <div className='flex justify-between items-center pb-2 border-b border-slate-100'>
          <h2 className='text-xl font-bold text-slate-800'>
            {isPaymentMode ? `Add Payment for ${formData.name}` : 'Add Transaction'}
          </h2>
          <button type='button' onClick={onClose} className='text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors'>✕</button>
        </div>

        {error && <div className='p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm'>{error}</div>}

        {!isPaymentMode && (
          <>
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-semibold text-slate-700'>Transaction Type</label>
              <div className='flex gap-4 mt-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                <label className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${formData.category === 'Lend' ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-semibold' : 'text-slate-500'}`}>
                  <input type='radio' className='hidden' checked={formData.category === 'Lend'} onChange={() => setFormData({ ...formData, category: 'Lend' })} />
                  Lend
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${formData.category === 'Borrow' ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-semibold' : 'text-slate-500'}`}>
                  <input type='radio' className='hidden' checked={formData.category === 'Borrow'} onChange={() => setFormData({ ...formData, category: 'Borrow' })} />
                  Borrow
                </label>
              </div>
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-semibold text-slate-700'>Person Name</label>
              <input 
                type='text' required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow'
                placeholder='e.g. John Doe'
              />
            </div>
          </>
        )}

        {isPaymentMode && (
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-slate-700'>Record Type</label>
            <div className='flex gap-4 mt-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
              <label className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${formData.isRepayment ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-semibold' : 'text-slate-500'}`}>
                <input type='radio' className='hidden' checked={formData.isRepayment} onChange={() => setFormData({ ...formData, isRepayment: true })} />
                Repayment
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${!formData.isRepayment ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-semibold' : 'text-slate-500'}`}>
                <input type='radio' className='hidden' checked={!formData.isRepayment} onChange={() => setFormData({ ...formData, isRepayment: false })} />
                Additional Amount
              </label>
            </div>
          </div>
        )}

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Title</label>
          <input 
            type='text' required value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow'
            placeholder='e.g. Dinner bill split'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Amount</label>
          <input 
            type='number' required min='0.01' step='0.01' value={formData.amount || ''}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow'
            placeholder='0.00'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Payment Mode</label>
          <select 
            value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
            className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white'
          >
            <option value='Cash'>Cash</option>
            <option value='Google Pay'>Google Pay</option>
            <option value='PhonePe'>PhonePe</option>
            <option value='Bank Transfer'>Bank Transfer</option>
            <option value='Credit Card'>Credit Card</option>
            <option value='Debit Card'>Debit Card</option>
          </select>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-semibold text-slate-700'>Date</label>
          <input 
            type='date' required value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className='border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
          />
        </div>

        <div className='mt-2 flex gap-3 pt-4 border-t border-slate-100'>
          <button type='button' onClick={onClose} className='flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg font-bold transition-colors'>
            Cancel
          </button>
          <button type='submit' disabled={mutation.isPending} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold disabled:opacity-50 transition-colors shadow-sm'>
            {mutation.isPending ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </form>
    </div>
  );
}