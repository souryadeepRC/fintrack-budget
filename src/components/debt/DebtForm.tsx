'use client';

import { useActionState } from 'react';

import { addDebt } from './debt-actions';

export function DebtForm() {
  const [state, formAction, pending] = useActionState(addDebt, null);

  return (
    <form action={formAction} className='flex flex-col gap-4 p-6 border rounded-xl shadow-sm bg-white border-slate-200'>
      <h3 className='text-lg font-bold text-slate-800'>Add New Debt</h3>
      
      <div className='flex flex-col gap-1'>
        <label htmlFor='name' className='text-sm font-medium text-slate-600'>Debt Name</label>
        <input id='name' name='name' placeholder='e.g., Car Loan' className='border p-2 rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none' required />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='amount' className='text-sm font-medium text-slate-600'>Amount</label>
        <input id='amount' name='amount' type='number' placeholder='$0.00' className='border p-2 rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none' required />
      </div>

      {state?.error && <p className='text-sm text-red-500'>{state.error}</p>}
      {state?.success && <p className='text-sm text-emerald-600'>Debt added successfully!</p>}

      <button 
        type='submit' 
        disabled={pending} 
        className='mt-2 bg-blue-600 text-white p-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors'
      >
        {pending ? 'Adding...' : 'Add Debt'}
      </button>
    </form>
  );
}