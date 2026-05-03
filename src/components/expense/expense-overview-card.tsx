"use client";

import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ExpenseOverviewCardProps {
  currentMonth: string;
  totalAmount: number;
}

export function ExpenseOverviewCard({
  currentMonth,
  totalAmount,
}: ExpenseOverviewCardProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Main Overview Card */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/40 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-8 shadow-lg backdrop-blur-xl hover:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest font-semibold text-emerald-600/70">
                {currentMonth}
              </p>
              <p className="mt-4 text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
