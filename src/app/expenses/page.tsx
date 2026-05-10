'use client';

import { useQuery } from '@tanstack/react-query';
import { endOfMonth,format, startOfMonth } from 'date-fns';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect,useMemo } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { HeaderBanner } from '@/components/common/header-banner';
import { SummaryCards } from '@/components/common/summary-cards';
import { ExpenseChatbot } from '@/components/expense/expense-chatbot';
import { ExpenseControls } from '@/components/expense/expense-controls';
import { ExpenseTable } from '@/components/expense/expense-table';
import { AddExpenseModal } from '@/components/modals/add-expense-modal';
import { DeleteExpenseModal } from '@/components/modals/delete-expense-modal';
import { EditExpenseModal } from '@/components/modals/edit-expense-modal';
import {
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from '@/constants/query-constants';
import { useAuth } from '@/providers/auth-provider';
import { getExpenses } from '@/services/expense.service';
import { RootState } from '@/store';

export default function ExpensesPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Protect route: Redirect unauthenticated users to home
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Calculate date range for current month
  const currentMonthStart = useMemo(() => {
    return startOfMonth(new Date());
  }, []);

  const currentMonthEnd = useMemo(() => {
    return endOfMonth(currentMonthStart);
  }, [currentMonthStart]);

  const { data: currentMonthExpenses = [], isLoading: isLoadingCurrent } =
    useQuery({
      queryKey: [
        EXPENSE_QUERY_CONSTANTS.ALL,
        currentMonthStart.toISOString(),
        currentMonthEnd.toISOString(),
      ],
      queryFn: () =>
        getExpenses({
          startDate: currentMonthStart.toISOString(),
          endDate: currentMonthEnd.toISOString(),
        }),
      ...QUERY_CONFIG,
    });

  const filteredExpenses = useMemo(() => {
    // Clone the array to avoid mutating React Query's cached data
    let filtered = [...currentMonthExpenses];

    if (filters.search) {
      filtered = filtered.filter((expense) =>
        expense.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (expense) => expense.category === filters.category,
      );
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter(
        (expense) => expense.mode === filters.paymentMethod,
      );
    }

    filtered.sort((a, b) => {
      const aValue =
        filters.sortBy === 'date' ? new Date(a.date).getTime() : a.amount;
      const bValue =
        filters.sortBy === 'date' ? new Date(b.date).getTime() : b.amount;

      return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [currentMonthExpenses, filters]);

  // Memoize total calculation to prevent unnecessary re-renders
  const totalCurrentMonth = useMemo(() => {
    return currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
  }, [currentMonthExpenses]);

  const totalFilteredAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  // Handler for opening the Add Expense modal
  const handleOpenAddExpense = () => {
    console.log('Trigger Add Expense Modal via Redux');
  };

  // Show loading state while verifying auth
  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30'>
      {/* Main Content */}
      <div className='container mx-auto px-4 py-6 md:py-10 space-y-8'>
        <HeaderBanner
          title='Manage your spending'
          description='Track, filter, and organize your expenses. Use monthly insights to understand where your money goes and build better spending habits.'
          aiLabel='Expense Tracking Active'
          actionLabel='Add Expense'
          actionIcon={Plus}
          onAction={handleOpenAddExpense}
        />

        {/* Main Content Section */}
        <div className='space-y-6 md:space-y-8'>
          {/* Overview Card */}
          <SummaryCards
            items={[
              {
                title: format(currentMonthStart, 'MMMM yyyy'),
                amount: totalCurrentMonth,
                amountClassName: 'text-emerald-600',
              },
            ]}
          />

          {/* Layout: Top Filters + Content */}
          <div className='flex flex-col gap-6'>
            {/* Top Filter Panel */}
            <div className='rounded-2xl border border-emerald-200/30 bg-linear-to-br from-emerald-50/60 via-white to-teal-50/40 p-4 md:p-6 shadow-md backdrop-blur-sm'>
              <ExpenseControls isMobilePanel={false} />
            </div>

            {/* Main Content Area */}
            <div className='flex-1 space-y-4 md:space-y-6 min-w-0'>
              {/* Table Section */}
              <div className='animate-in fade-in slide-in-from-left-4 duration-500 delay-300'>
                <ExpenseTable
                  expenses={filteredExpenses}
                  isLoading={isLoadingCurrent}
                  totalCount={filteredExpenses.length}
                  totalAmount={totalFilteredAmount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddExpenseModal />
      <EditExpenseModal />
      <DeleteExpenseModal />

      {/* AI Assistant Chatbot */}
      <ExpenseChatbot expenses={currentMonthExpenses} />
    </div>
  );
}
