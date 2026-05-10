'use client';

import { AlertCircle } from 'lucide-react';
import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface RadioChoice {
  label: string;
  value: string;
  description?: string;
}

export interface RadioOptionProps {
  label?: string;
  options: RadioChoice[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  direction?: 'row' | 'column';
}

export function RadioOption({
  label,
  options,
  name,
  value,
  onChange,
  error,
  required,
  className,
  direction = 'row',
}: RadioOptionProps) {
  return (
    <div className={cn('space-y-3 w-full', className)}>
      {label && (
        <Label className='text-sm font-semibold text-slate-700'>
          {label} {required && <span className='text-red-500'>*</span>}
        </Label>
      )}
      <div className={cn('flex gap-4 w-full', direction === 'column' ? 'flex-col' : 'flex-row')}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const isChecked = value === option.value;

          return (
            <div
              key={option.value}
              onClick={() => onChange?.(option.value)}
              className={cn(
                'relative flex items-start p-4 border rounded-xl cursor-pointer transition-all duration-200',
                direction === 'column' ? 'w-full' : 'flex-1',
                isChecked ? 'border-emerald-600 bg-emerald-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-300',
                error && 'border-red-500'
              )}
            >
              <div className='flex items-center h-5'>
                <input
                  id={id}
                  name={name}
                  type='radio'
                  value={option.value}
                  checked={isChecked}
                  onChange={(e) => onChange?.(e.target.value)}
                  className='w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-600 cursor-pointer'
                />
              </div>
              <div className='ml-3 flex flex-col'>
                <Label htmlFor={id} className='text-sm font-medium text-slate-900 cursor-pointer'>{option.label}</Label>
                {option.description && <p className='text-xs text-slate-500 mt-1'>{option.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
      {error && <p className='flex items-center gap-1 text-xs text-red-600 mt-1'><AlertCircle className='w-3 h-3' />{error}</p>}
    </div>
  );
}