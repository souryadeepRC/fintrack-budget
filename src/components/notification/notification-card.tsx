import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import { deleteNotification } from '@/services/notification.service';
import { Notification } from '@/types';

import { PayNowModal } from '../../services/pay-now-modal';

interface NotificationCardProps {
  notification: Notification;
  onEdit: (notification: Notification) => void;
  showPayNow?: boolean;
}

export function NotificationCard({ notification, onEdit, showPayNow = false }: NotificationCardProps) {
  const queryClient = useQueryClient();
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  });

  return (
    <div className='p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3'>
      <div className='flex justify-between items-start'>
        <div>
          <h4 className='font-bold text-slate-800 text-lg'>{notification.title}</h4>
          <p className='text-sm font-medium text-slate-500 mt-0.5'>Due: {new Date(notification.expiryDate).toLocaleDateString()}</p>
        </div>
        <span className='text-lg font-bold text-emerald-600'>{formatCurrency(notification.amount)}</span>
      </div>
      
      <div className='flex justify-between items-center mt-2 pb-3 border-b border-slate-100'>
        <span className='text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md'>{notification.category} • {notification.mode}</span>
        <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>{notification.period} {notification.isMonthly ? 'Month(s)' : 'Day(s)'}</span>
      </div>
      
      <div className='flex justify-between items-center pt-1'>
        <div className='flex gap-3'>
          <button onClick={() => onEdit(notification)} className='text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors'>Edit</button>
          <button onClick={() => setIsDeleteDialogOpen(true)} disabled={deleteMutation.isPending} className='text-sm text-slate-500 hover:text-red-600 font-medium transition-colors'>Delete</button>
        </div>
        {showPayNow && (
          <button onClick={() => setIsPayNowOpen(true)} className='text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg font-semibold transition-colors'>
            Pay Now
          </button>
        )}
      </div>

      {isPayNowOpen && <PayNowModal notification={notification} onClose={() => setIsPayNowOpen(false)} />}
      
      {isDeleteDialogOpen && (
        <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 flex flex-col gap-4'>
            <h3 className='text-lg font-bold text-slate-800'>Confirm Deletion</h3>
            <p className='text-sm text-slate-600'>Are you sure you want to delete this notification? This action cannot be undone.</p>
            <div className='flex justify-end gap-3 mt-2'>
              <button onClick={() => setIsDeleteDialogOpen(false)} className='px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors'>Cancel</button>
              <button onClick={() => { deleteMutation.mutate(notification.id); setIsDeleteDialogOpen(false); }} className='px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors'>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}