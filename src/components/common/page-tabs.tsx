'use client';

import React from 'react';

export interface TabItem {
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

interface PageTabsProps {
  tabs: TabItem[];
  children?: React.ReactNode;
}

export function PageTabs({ tabs, children }: PageTabsProps) {
  return (
    <div className='flex items-center justify-between border-b border-slate-200'>
      <div className='flex'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={tab.onClick}
            className={`pb-3 px-2 text-sm font-semibold transition-colors border-b-2 ${
              index !== tabs.length - 1 ? 'mr-6' : ''
            } ${
              tab.isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {children && <div className='mb-2'>{children}</div>}
    </div>
  );
}