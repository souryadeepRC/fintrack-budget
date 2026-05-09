"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { RootState } from "@/store";
import { getExpenses } from "@/services/expense.service";
import { ExpenseOverviewCard } from "@/components/expense/expense-overview-card";
import { ExpenseControls } from "@/components/expense/expense-controls";
import { ExpenseTable } from "@/components/expense/expense-table";
import { AddExpenseModal } from "@/components/modals/add-expense-modal";
import { EditExpenseModal } from "@/components/modals/edit-expense-modal";
import { DeleteExpenseModal } from "@/components/modals/delete-expense-modal";
import { ExpenseChatbot } from "@/components/expense/expense-chatbot";
import {
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from "@/constants/query-constants";

export default function ExpensesPage() {
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);

  // Calculate date range for current month
  const currentMonthStart = useMemo(() => {
    return startOfMonth(new Date());
  }, []); 

  const currentMonthEnd = useMemo(() => {
    return endOfMonth(currentMonthStart);
  }, [currentMonthStart]); 

  const { data: currentMonthExpenses = [], isLoading: isLoadingCurrent } =
    useQuery({
      queryKey: EXPENSE_QUERY_CONSTANTS.ALL,
      queryFn: () =>
        getExpenses({
          startDate: currentMonthStart.toISOString(),
          endDate: currentMonthEnd.toISOString(),
        }),
      ...QUERY_CONFIG,
    });

  const filteredExpenses = useMemo(() => {
    let filtered = currentMonthExpenses;

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
        filters.sortBy === "date" ? new Date(a.date).getTime() : a.amount;
      const bValue =
        filters.sortBy === "date" ? new Date(b.date).getTime() : b.amount;

      return filters.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [currentMonthExpenses, filters]);

  const totalCurrentMonth = currentMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-emerald-50/30 to-teal-50/30">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Header Section */}
        <div className="mb-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <p className="text-xs md:text-sm uppercase tracking-wider font-semibold text-emerald-600/70">
            💰 Expense Dashboard
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold bg-linear-to-r from-emerald-900 to-teal-900 bg-clip-text text-transparent">
            Manage your spending
          </h1>
          <p className="mt-3 md:mt-1 max-w-4xl text-slate-600  text-xs  ">
            Track, filter, and organize your expenses. Use monthly insights to
            understand where your money goes and build better spending habits.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="space-y-6 md:space-y-8">
          {/* Overview Card */}
          <ExpenseOverviewCard
            currentMonth={format(currentMonthStart, "MMMM yyyy")}
            totalAmount={totalCurrentMonth}
          />

          {/* Layout: Top Filters + Content */}
          <div className="flex flex-col gap-6">
            {/* Top Filter Panel */}
            <div className="rounded-2xl border border-emerald-200/30 bg-linear-to-br from-emerald-50/60 via-white to-teal-50/40 p-4 md:p-6 shadow-md backdrop-blur-sm">
              <ExpenseControls isMobilePanel={false} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-4 md:space-y-6 min-w-0">
              {/* Table Section */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
                <ExpenseTable
                  expenses={filteredExpenses}
                  isLoading={isLoadingCurrent}
                  totalCount={filteredExpenses.length}
                  totalAmount={filteredExpenses.reduce(
                    (sum, expense) => sum + expense.amount,
                    0,
                  )}
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
