import React, { useState } from 'react';

import { Debt } from '@/types';

import { DebtCard } from './debt-card';

interface DebtHistoryModalProps {
  groupName: string;
  records: Debt[];
  onClose: () => void;
}

export function DebtHistoryModal({ groupName, records, onClose }: DebtHistoryModalProps) {
  const [activeTab, setActiveTab] = useState<'payment' | 'repayment'>('payment');
  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedRecords = sortedRecords.filter((record) =>
    activeTab === 'payment' ? !record.isRepayment : record.isRepayment
  );

  return (
    <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]'>
        <div className='flex justify-between items-center p-6 border-b border-slate-100'>
          <h2 className='text-xl font-bold text-slate-800'>Transaction History: {groupName}</h2>
          <button onClick={onClose} className='text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors'>✕</button>
        </div>
        
        <div className='px-6 pt-4 border-b border-slate-100 flex gap-6'>
          <button
            onClick={() => setActiveTab('payment')}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'payment' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Loans
          </button>
          <button
            onClick={() => setActiveTab('repayment')}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'repayment' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Repayments
          </button>
        </div>
        
        <div className='p-6 overflow-y-auto max-h-[40vh] space-y-2 bg-slate-50 rounded-b-2xl'>
          {displayedRecords.length === 0 ? (
            <p className='text-center text-slate-500 py-8'>No records found for this category.</p>
          ) : (
             displayedRecords.map(record => <DebtCard key={record.id} debt={record} />)
          )}
        </div>
      </div>
    </div>
  );
}