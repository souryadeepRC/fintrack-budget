'use client';

import { AlertTriangle } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/common/Button';

interface DeleteConfirmationProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmation({
  title = 'Are you sure?',
  description = 'This action cannot be undone. This will permanently delete the record.',
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmationProps) {
  return (
    <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white w-full max-w-[400px] rounded-xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
        <div className='p-6 flex flex-col items-center text-center space-y-4'>
          <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
            <AlertTriangle className='w-6 h-6 text-red-600' />
          </div>
          <div>
            <h2 className='text-xl font-bold text-slate-800'>{title}</h2>
            <p className='text-sm text-slate-500 mt-2 leading-relaxed'>
              {description}
            </p>
          </div>
        </div>
        <div className='flex gap-3 p-4 border-t border-slate-100 bg-slate-50'>
          <Button
            variant='outlined'
            onClick={onCancel}
            disabled={isDeleting}
            className='flex-1 border-slate-200 text-slate-700 hover:bg-white'
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            type='button'
            onClick={onConfirm}
            disabled={isDeleting}
            className='flex-1 border-0 bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors'
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
