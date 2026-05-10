"use client";

import React from "react";

import { formatCurrency } from "@/lib/utils";
import { Debt } from "@/types";
import { ChipTag } from "../common/Chip";

export interface DebtGroup {
  debtId: number;
  name: string;
  totalBorrowed: number;
  totalRepaid: number;
  remaining: number;
  records: Debt[];
  borrows: Debt[];
  repayments: Debt[];
}

interface DebtCardProps {
  group: DebtGroup;
  activeTab: "active" | "settled";
  onAddPayment: (group: DebtGroup) => void;
  onViewHistory: (group: DebtGroup) => void;
}

export function DebtCard({
  group,
  activeTab,
  onAddPayment,
  onViewHistory,
}: DebtCardProps) {
  const category =
    group.borrows[0]?.category || group.records[0]?.category || "Lend";
  const isBorrow = category === "Borrow";

  return (
    <div
      className={`p-3 md:p-6 border ${isBorrow ? "border-amber-300" : "border-blue-200"} rounded-xl bg-white shadow-sm flex flex-col gap-5`}
    >
      <div className="flex justify-between items-start border-b border-slate-100 pb-2 md:pb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-slate-800">
            {group.name}
          </h3>
          <p className="text-xs md:text-sm font-medium text-slate-500 mt-0.5">
            {group.borrows.length} {category}s • {group.repayments.length}{" "}
            Repayments
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <ChipTag
            variant="primary"
            label={group.remaining <= 0 ? "Settled" : "Active"}
          />
        </div>
      </div>

      <div className="grid  grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 text-center divide-x divide-slate-100">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {isBorrow ? "Borrowed" : "Lent"}
          </p>
          <p className="text-base md:text-lg font-bold text-slate-800 mt-1">
            {formatCurrency(group.totalBorrowed)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Repaid
          </p>
          <p className="text-base md:text-lg font-bold text-emerald-600 mt-1">
            {formatCurrency(group.totalRepaid)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Remaining
          </p>
          <p
            className={`text-base md:text-lg font-bold mt-1 ${group.remaining > 0 ? (isBorrow ? "text-red-600" : "text-emerald-600") : group.remaining < 0 ? (isBorrow ? "text-emerald-600" : "text-red-600") : "text-slate-800"}`}
          >
            {formatCurrency(group.remaining)}
          </p>
        </div>
      </div>

      {activeTab === "active" && (
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={() => onAddPayment(group)}
              className="cursor-pointer text-sm font-semibold bg-emerald-600 text-white hover:text-white-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-color"
            >
              Add Payment
            </button>
          </div>
          <button
            onClick={() => onViewHistory(group)}
            className="cursor-pointer text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors"
          >
            History
          </button>
        </div>
      )}
    </div>
  );
}
