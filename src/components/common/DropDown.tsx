'use client';

import { AlertCircle } from 'lucide-react';
import * as React from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface DropDownOption {
  label: string;
  value: string;
}

export interface DropDownProps {
  label?: string;
  options: DropDownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export function DropDown({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  error,
  required,
  className,
  disabled,
  id,
}: DropDownProps) {
  return (
    <div className='space-y-1 w-full'>
      {label && (
        <Label className='text-sm font-semibold text-slate-700'>
          {label} {required && <span className='text-red-500'>*</span>}
        </Label>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id} className={cn('w-full border-slate-200 bg-white focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-colors', error && 'border-red-500 focus:ring-red-500 focus:border-red-500', className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className='flex items-center gap-1 text-sm text-red-600'>
          <AlertCircle className='w-4 h-4' />{error}
        </p>
      )}
    </div>
  );
}