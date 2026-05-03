"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { RootState } from "@/store";
import { getExpenses } from "@/services/expense.service";
import { ExpenseOverviewCard } from "@/components/expense/expense-overview-card";
import { ExpenseControls } from "@/components/expense/expense-controls";
import { ExpenseTable } from "@/components/expense/expense-table";
import { AddExpenseModal } from "@/components/modals/add-expense-modal";
import { EditExpenseModal } from "@/components/modals/edit-expense-modal";
import { DeleteExpenseModal } from "@/components/modals/delete-expense-modal";
import {
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from "@/constants/query-constants";

export default function ExpensesPage() {
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);

  // Calculate date range for current month
  const currentMonthStart = useMemo(() => {
    const [year, month] = filters.month.split("-").map(Number);
    return startOfMonth(new Date(year, month - 1));
  }, [filters.month]);

  const currentMonthEnd = useMemo(() => {
    return endOfMonth(currentMonthStart);
  }, [currentMonthStart]);



  const {
    data: currentMonthExpenses = [],
    isLoading: isLoadingCurrent,
  } = useQuery({
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
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30">
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
          <p className="text-sm uppercase tracking-wider font-semibold text-emerald-600/70">
            💰 Expense Dashboard
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-900 to-teal-900 bg-clip-text text-transparent">
            Manage your spending
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 text-lg">
            Track, filter, and organize your expenses. Use monthly insights to understand where your money goes and build better spending habits.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="space-y-8">
          {/* Overview Card */}
          <ExpenseOverviewCard
            currentMonth={format(currentMonthStart, "MMMM yyyy")}
            totalAmount={totalCurrentMonth}
          />

          {/* Controls Section */}
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
            <p className="text-sm font-semibold text-slate-700 mb-4">
              Filter & Search
            </p>
            <ExpenseControls />
          </div>

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

      {/* Modals */}
      <AddExpenseModal />
      <EditExpenseModal />
      <DeleteExpenseModal />
    </div>
  );
}
