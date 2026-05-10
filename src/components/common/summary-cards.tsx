'use client';

import React from 'react';

import { formatCurrency } from '@/lib/utils';

export interface SummaryCardItem {
  title: string;
  amount: number;
  amountClassName?: string;
}

interface SummaryCardsProps {
  items: SummaryCardItem[];
  columns?: 1 | 2 | 3 | 4;
}

const colClasses = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function SummaryCards({ items, columns = 2 }: SummaryCardsProps) {
  return (
    <div className={`grid grid-cols-1 ${colClasses[columns] || 'md:grid-cols-2'} gap-6`}>
      {items.map((item, index) => (
        <div key={index} className='p-6 border border-slate-200 rounded-xl bg-white shadow-sm'>
          <h3 className='text-sm font-semibold text-slate-500 uppercase tracking-wider'>
            {item.title}
          </h3>
          <p className={`text-3xl font-bold mt-2 ${item.amountClassName || 'text-slate-800'}`}>
            {formatCurrency(item.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}