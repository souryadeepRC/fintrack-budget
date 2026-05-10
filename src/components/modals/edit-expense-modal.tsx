'use client';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription,DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateExpense } from '@/services/expense.service';
import { RootState } from '@/store';
import { closeEditExpenseModal } from '@/store/slices/uiSlice';

const CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Health',
  'Travel',
  'Other',
];

const PAYMENT_METHODS = [
  'Credit Card',
  'Debit Card',
  'Cash',
  'Bank Transfer',
  'Google Pay',
  'PhonePe',
];

interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
  mode: string;
  date: string;
}

export function EditExpenseModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isEditExpenseModalOpen);
  const editingId = useSelector((state: RootState) => state.ui.editingExpenseId);
  
  // Get expense data from React Query cache
  const queryClient = useQueryClient();
  const expenseData = useMemo(() => {
    if (!editingId) return null;
    // Get all cached expenses and find the matching one
    const cachedExpenses = queryClient.getQueryData<any[]>(['expenses']);
    return cachedExpenses?.find((exp) => exp.id === editingId) || null;
  }, [editingId, queryClient]);

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      updateExpense(id, {
        title: updates.title,
        amount: updates.amount,
        category: updates.category,
        mode: updates.mode,
        date: new Date(updates.date).toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      dispatch(closeEditExpenseModal());
      toast.success('Expense updated successfully');
      form.reset();
    },
    onError: (error) => {
      toast.error(`Failed to update expense: ${error.message}`);
    },
  });

  const form = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      mode: '',
      date: '',
    } as ExpenseFormData,
    onSubmit: async ({ value }) => {
      if (!editingId) return;

      const amount = parseFloat(value.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Amount must be a valid positive number');
        return;
      }

      await updateMutation.mutateAsync({
        id: editingId,
        updates: {
          title: value.title.trim(),
          amount,
          category: value.category,
          mode: value.mode,
          date: value.date,
        },
      });
    },
  });

  // Update form values when expense data changes
  useEffect(() => {
    if (expenseData) {
      const expenseDate = new Date(expenseData.date);
      form.setFieldValue('title', expenseData.title);
      form.setFieldValue('amount', expenseData.amount.toString());
      form.setFieldValue('category', expenseData.category);
      form.setFieldValue('mode', expenseData.mode);
      form.setFieldValue('date', expenseDate.toISOString().split('T')[0]);
    }
  }, [expenseData, form]);

  const handleClose = () => {
    dispatch(closeEditExpenseModal());
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='max-w-75 md:max-w-125 rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
            Edit Expense
          </DialogTitle>
          <DialogDescription className='text-slate-600'>
            Update the expense details and keep your records current.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className='space-y-5'
        >
          {/* Title Field */}
          <form.Field
            name='title'
            validators={{
              onChange: ({ value }) => {
                if (!value || !value.trim()) return 'Title is required';
                if (value.length > 20) return 'Title must be 20 characters or less';
                return undefined;
              },
              onBlur: ({ value }) => {
                if (!value || !value.trim()) return 'Title is required';
                if (value.length > 20) return 'Title must be 20 characters or less';
                return undefined;
              },
            }}
            children={(field) => (
              <div className='space-y-2'>
                <Label htmlFor='title' className='text-sm font-semibold text-slate-700'>
                  Title <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='title'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder='e.g., Dinner at restaurant'
                  maxLength={20}
                  className={`border-emerald-200/50 bg-white/70 focus:border-emerald-400 ${
                    field.state.meta.errors.length > 0 ? 'border-red-500' : ''
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className='flex items-center gap-1 text-sm text-red-600'>
                    <AlertCircle className='w-4 h-4' />
                    {field.state.meta.errors[0]}
                  </p>
                )}
                <p className='text-xs text-slate-500'>
                  {field.state.value.length}/20 characters
                </p>
              </div>
            )}
          />

          {/* Amount Field */}
          <form.Field
            name='amount'
            validators={{
              onChange: ({ value }) => {
                if (!value || !value.trim()) return 'Amount is required';
                const num = parseFloat(value);
                if (isNaN(num)) return 'Amount must be a valid number';
                if (num <= 0) return 'Amount must be greater than 0';
                return undefined;
              },
              onBlur: ({ value }) => {
                if (!value || !value.trim()) return 'Amount is required';
                const num = parseFloat(value);
                if (isNaN(num)) return 'Amount must be a valid number';
                if (num <= 0) return 'Amount must be greater than 0';
                return undefined;
              },
            }}
            children={(field) => (
              <div className='space-y-2'>
                <Label htmlFor='amount' className='text-sm font-semibold text-slate-700'>
                  Amount <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='amount'
                  type='number'
                  step='0.01'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder='0.00'
                  min='0.01'
                  className={`border-emerald-200/50 bg-white/70 focus:border-emerald-400 ${
                    field.state.meta.errors.length > 0 ? 'border-red-500' : ''
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className='flex items-center gap-1 text-sm text-red-600'>
                    <AlertCircle className='w-4 h-4' />
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          {/* Category and Payment Method Row */}
          <div className='grid grid-cols-2 gap-4'>
            {/* Category Field */}
            <form.Field
              name='category'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Category is required' : undefined,
                onBlur: ({ value }) =>
                  !value ? 'Category is required' : undefined,
              }}
              children={(field) => (
                <div className='space-y-2'>
                  <Label htmlFor='category' className='text-sm font-semibold text-slate-700'>
                    Category <span className='text-red-500'>*</span>
                  </Label>
                  <Select  value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger
                      className={`border-emerald-200/50 bg-white/70 ${
                        field.state.meta.errors.length > 0 ? 'border-red-500' : ''
                      }`}
                    >
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className='flex items-center gap-1 text-xs text-red-600'>
                      <AlertCircle className='w-3 h-3' />
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Payment Method Field */}
            <form.Field
              name='mode'
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Payment method is required' : undefined,
                onBlur: ({ value }) =>
                  !value ? 'Payment method is required' : undefined,
              }}
              children={(field) => (
                <div className='space-y-2'>
                  <Label htmlFor='mode' className='text-sm font-semibold text-slate-700'>
                    Payment <span className='text-red-500'>*</span>
                  </Label>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger
                      className={`border-emerald-200/50 bg-white/70 ${
                        field.state.meta.errors.length > 0 ? 'border-red-500' : ''
                      }`}
                    >
                      <SelectValue placeholder='Select method' />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className='flex items-center gap-1 text-xs text-red-600'>
                      <AlertCircle className='w-3 h-3' />
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Date Field */}
          <form.Field
            name='date'
            validators={{
              onChange: ({ value }) =>
                !value ? 'Date is required' : undefined,
              onBlur: ({ value }) =>
                !value ? 'Date is required' : undefined,
            }}
            children={(field) => (
              <div className='space-y-2'>
                <Label htmlFor='date' className='text-sm font-semibold text-slate-700'>
                  Date <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='date'
                  type='date'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={`border-emerald-200/50 bg-white/70 focus:border-emerald-400 ${
                    field.state.meta.errors.length > 0 ? 'border-red-500' : ''
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className='flex items-center gap-1 text-sm text-red-600'>
                    <AlertCircle className='w-4 h-4' />
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          {/* Action Buttons */}
          <div className='flex flex-col gap-3 sm:flex-row sm:justify-end pt-6 border-t border-emerald-100'>
            <Button
              type='button'
              variant='outline'
              onClick={handleClose}
              disabled={updateMutation.isPending}
              className='border-emerald-200/50 text-slate-700 hover:bg-emerald-50'
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type='submit'
                  disabled={!canSubmit || isSubmitting || updateMutation.isPending}
                  className='bg-linear-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg'
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update Expense'}
                </Button>
              )}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
