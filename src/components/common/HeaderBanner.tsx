'use client';

import { Plus, Sparkles } from 'lucide-react';
import React from 'react';

import { Button } from './Button';

interface HeaderBannerProps {
  title: string;
  description: string;
  aiLabel?: string;
  actionLabel?: string;
  actionIcon?: React.ElementType;
  onAction?: () => void;
}

export function HeaderBanner({
  title,
  description,
  aiLabel,
  actionLabel,
  actionIcon: ActionIcon = Plus,
  onAction,
}: HeaderBannerProps) {
  return (
    <section className='relative overflow-hidden rounded-3xl bg-slate-950 p-4 md:p-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700'>
      {/* Animated Background Gradients */}
      <div className='absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse' />
      <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700' />

      <div className='relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-6'>
        <div className='space-y-1 md:space-y-3'>
          {aiLabel && (
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20'>
              <Sparkles className='w-3 md:w-4 h-3 md:h-4 text-emerald-400 animate-pulse' />
              <span className='text-xs font-semibold camelcase tracking-wider text-emerald-400'>
                {aiLabel}
              </span>
            </div>
          )}
          <h1 className='text-2xl md:text-4xl font-bold text-white tracking-tight'>
            {title}
          </h1>
          <p className='hidden md:block text-slate-400 max-w-xl text-sm md:text-base leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        {actionLabel && onAction && (
          <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0'>
            <Button onClick={onAction} variant='contained'>
              {ActionIcon && (
                <ActionIcon className='w-5 h-5 transition-transform group-hover:rotate-90' />
              )}
              <span>{actionLabel}</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
