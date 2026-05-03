"use client";

import { useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from "@/constants/query-constants";

export default function ExpensesPage() {
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
        expense.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (expense) => expense.category === filters.category
      );
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter(
        (expense) => expense.mode === filters.paymentMethod
      );
    }
    console.log({filtered});
    
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
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30">
      {/* Mobile Filter Panel Overlay */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Panel */}
      <div
        className={`fixed left-0 top-0 h-screen w-[70%] md:w-[50%] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 overflow-y-auto ${
          isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 border-b border-emerald-200/30 bg-white">
          <h3 className="font-bold text-lg text-slate-900">Filters</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 hover:bg-emerald-100/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-4 space-y-4">
          <ExpenseControls
            isMobilePanel={true}
            onCloseMobilePanel={() => setIsMobileFilterOpen(false)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Header Section */}
        <div className="mb-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <p className="text-xs md:text-sm uppercase tracking-wider font-semibold text-emerald-600/70">
            💰 Expense Dashboard
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-900 to-teal-900 bg-clip-text text-transparent">
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

          {/* Layout: Filter Panel + Content */}
          <div className="flex gap-6 relative">
            {/* Filter Panel (Desktop Only) */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 rounded-2xl border border-emerald-200/30 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 p-6 shadow-md backdrop-blur-sm max-h-[calc(100vh-120px)] overflow-y-auto">
                <h3 className="font-bold text-lg text-slate-900 mb-6">Filters</h3>
                <ExpenseControls isMobilePanel={false} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-4 md:space-y-6 min-w-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex gap-2">
                <Button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="flex-1 h-10 flex items-center justify-center gap-2 border-emerald-200 bg-white text-slate-700 hover:bg-emerald-50 border"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </Button>
              </div>

              {/* Table Section */}
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
                <ExpenseTable
                  expenses={filteredExpenses}
                  isLoading={isLoadingCurrent}
                  totalCount={filteredExpenses.length}
                  totalAmount={filteredExpenses.reduce(
                    (sum, expense) => sum + expense.amount,
                    0
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
    </div>
  );
}