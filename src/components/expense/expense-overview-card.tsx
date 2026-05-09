"use client";

import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { openAddExpenseModal } from "@/store/slices/uiSlice";

interface ExpenseOverviewCardProps {
  currentMonth: string;
  totalAmount: number;
}

export function ExpenseOverviewCard({
  currentMonth,
  totalAmount,
}: ExpenseOverviewCardProps) {
  const dispatch = useDispatch();

  const handleAddExpense = () => {
    dispatch(openAddExpenseModal());
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Main Overview Card */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-emerald-200/40 bg-linear-to-br from-emerald-50/80 via-white to-teal-50/60 p-4 md:p-8 shadow-lg backdrop-blur-xl hover:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center sm:justify-between">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-widest font-semibold text-emerald-600/70">
              {currentMonth}
            </p>
            <p className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {formatCurrency(totalAmount)}
            </p>
          </div>
          <Button
            onClick={handleAddExpense}
            className="w-full sm:w-auto h-auto text-base md:text-lg flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold"
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
            <span>Add Expense</span>
          </Button>
        </div>
      </div>
    </div>
  );
}