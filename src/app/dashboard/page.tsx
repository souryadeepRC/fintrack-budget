'use client';

import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { Bot, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {  useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { HeaderBanner } from '@/components/common/HeaderBanner';
import { ExpenseChatbot } from '@/components/expense/expense-chatbot';
import {
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from '@/constants/query-constants';
import { useAuth } from '@/providers/auth-provider';
import { getExpenses } from '@/services/expense.service';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Protect route: Redirect unauthenticated users to home
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Memoize date calculations to avoid recalculating on every render
  const currentMonthStart = useMemo(() => startOfMonth(new Date()), []);
  const currentMonthEnd = useMemo(
    () => endOfMonth(currentMonthStart),
    [currentMonthStart],
  );

  // Fetch current month expenses with strict query keys
  const { data: currentMonthExpenses = [] } = useQuery({
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

  // Memoize total calculation
  const totalCurrentMonth = useMemo(() => {
    return currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
  }, [currentMonthExpenses]);

  // Calculate expenses by category for the bar chart
  const categoryData = useMemo(() => {
    const data: Record<string, number> = {};
    currentMonthExpenses.forEach((exp) => {
      data[exp.category] = (data[exp.category] || 0) + exp.amount;
    });

    // Sort by amount descending
    return Object.entries(data)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [currentMonthExpenses]);

  const maxCategoryAmount =
    categoryData.length > 0
      ? Math.max(...categoryData.map((d) => d.amount))
      : 0;

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
      <div className='container mx-auto px-4 py-6 md:py-10 space-y-8'>
        {/* 1. Shared AI Header */}
        <HeaderBanner
          title='Your Financial Command Center'
          description="I am constantly analyzing your spending patterns. Let's make smart, data-driven decisions today to reach your financial goals faster."
          aiLabel='Fintract AI Engine Active'
        />

        {/* 2. Dashboard Grid Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
          {/* Main Analytics Column */}
          <section className='col-span-1 lg:col-span-2 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150'>
            <div className='flex items-center gap-2 px-1'>
              <TrendingUp className='w-5 h-5 text-emerald-600' />
              <h2 className='text-xl font-bold text-slate-800'>
                Monthly Analytics
              </h2>
            </div>

            {/* Custom Bar Chart for Categories */}
            <div className='bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-6 shadow-sm'>
              <div className='mb-6'>
                <p className='text-sm font-medium text-slate-500 uppercase tracking-wider'>
                  {format(currentMonthStart, 'MMMM yyyy')} Breakdown
                </p>
                <p className='text-3xl font-bold text-slate-900 mt-1'>
                  ₹{totalCurrentMonth.toLocaleString('en-IN')}
                </p>
              </div>

              {categoryData.length > 0 ? (
                <div className='space-y-4'>
                  {categoryData.map((category) => (
                    <div
                      key={category.name}
                      className='flex flex-col gap-1.5 group'
                    >
                      <div className='flex justify-between items-center text-sm'>
                        <span className='font-medium text-slate-700 transition-colors group-hover:text-emerald-700'>
                          {category.name}
                        </span>
                        <span className='font-semibold text-slate-900'>
                          ₹{category.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className='h-2.5 w-full bg-slate-100 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out'
                          style={{
                            width: `${(category.amount / maxCategoryAmount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='py-10 text-center text-sm text-slate-500'>
                  No expenses recorded this month yet.
                </div>
              )}
            </div>
          </section>

          {/* 3. AI Insights & Motivation Column (Dummy Data) */}
          <section className='col-span-1 space-y-4 animate-in fade-in slide-in-from-right-4 duration-700 delay-300'>
            <div className='flex items-center gap-2 px-1'>
              <Lightbulb className='w-5 h-5 text-amber-500' />
              <h2 className='text-xl font-bold text-slate-800'>
                AI Suggestions
              </h2>
            </div>

            <div className='bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-6 shadow-sm flex flex-col gap-4 h-[calc(100%-2.5rem)]'>
              {/* Insight Card */}
              <div className='p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100/50 relative overflow-hidden'>
                <Sparkles className='absolute top-2 right-2 w-16 h-16 text-amber-500/5 rotate-12' />
                <p className='text-sm text-amber-900 font-medium leading-relaxed relative z-10'>
                  You&apos;ve saved{' '}
                  <span className='font-bold text-amber-600'>15% more</span> on
                  Food &quot; Dining compared to last month. Keep cooking at
                  home to maintain this incredible streak!
                </p>
              </div>

              {/* Motivation Card */}
              <div className='p-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100/50 relative overflow-hidden flex-1'>
                <Bot className='absolute bottom-2 right-2 w-20 h-20 text-emerald-500/5 -rotate-12' />
                <h3 className='text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2'>
                  Daily Motivation
                </h3>
                <p className='text-sm text-emerald-900 font-medium leading-relaxed relative z-10 italic'>
                  A budget is telling your money where to go instead of
                  wondering where it went. Every expense tracked is a step
                  closer to financial freedom.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 4. Global Chatbot (includes the floating action button) */}
      <ExpenseChatbot expenses={currentMonthExpenses} />
    </div>
  );
}
