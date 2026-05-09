import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDebt } from "@/services/debt.service";
import { Debt } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface DebtCardProps {
  debt: Debt;
}

export function DebtCard({ debt }: DebtCardProps) {
  return (
    <div className="py-3 px-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-slate-800 text-md">{debt.title}</h4>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {new Date(debt.date).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`text-md font-bold ${debt.isRepayment ? "text-emerald-600" : "text-red-600"}`}
        >
          {debt.isRepayment ? "+" : "-"}
          {formatCurrency(debt.amount)}
        </span>
      </div>
      

    </div>
  );
}
