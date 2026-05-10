import React from 'react';

import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  isMandatory?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  isMandatory = false,
  children,
  className = 'space-y-2',
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className='text-sm font-semibold text-slate-700'>
        {label} {isMandatory && <span className='text-red-500'>*</span>}
      </Label>
      {children}
    </div>
  );
}