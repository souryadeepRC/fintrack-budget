'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-700 border border-slate-200',
        success: 'bg-emerald-100/70 text-emerald-700 border border-emerald-200/50',
        warning: 'bg-amber-100/70 text-amber-700 border border-amber-200/50',
        error: 'bg-red-100/70 text-red-700 border border-red-200/50',
        info: 'bg-cyan-100/70 text-cyan-700 border border-cyan-200/50',
        primary: 'bg-blue-100/70 text-blue-700 border border-blue-200/50',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-3 py-1 text-xs md:text-sm',
        lg: 'px-4 py-1.5 text-sm md:text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  label: string;
}

export function ChipTag({ className, variant, size, label, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant, size }), className)} {...props}>
      {label}
    </div>
  );
}