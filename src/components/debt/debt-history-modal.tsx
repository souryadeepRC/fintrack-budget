import React, { useState } from "react";
import { format } from "date-fns";

import { Debt } from "@/types";
import { formatCurrency } from "@/lib/utils";

import { DebtCard } from "./debt-card";

interface DebtHistoryModalProps {
  groupName: string;
  records: Debt[];
  onClose: () => void;
}

export function DebtHistoryModal({
  groupName,
  records,
  onClose,
}: DebtHistoryModalProps) {
  const [activeTab, setActiveTab] = useState<"payment" | "repayment">(
    "payment",
  );
  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const displayedRecords = sortedRecords.filter((record) =>
    activeTab === "payment" ? !record.isRepayment : record.isRepayment,
  ); 

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            Transaction History: {groupName}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pt-4 border-b border-slate-100 flex gap-6">
          <button
            onClick={() => setActiveTab("payment")}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === "payment" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Loans
          </button>
          <button
            onClick={() => setActiveTab("repayment")}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === "repayment" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Repayments
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[40vh] space-y-2 bg-slate-50 rounded-b-2xl">
          {displayedRecords.length === 0 ? (
            <p className="text-center text-slate-500 py-8">
              No records found for this category.
            </p>
          ) : (
            displayedRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl border border-slate-200 p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-1.5">
                  <p className="font-semibold text-sm text-slate-900 line-clamp-1">
                    {record.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </span>
                    <span className="inline-block text-[10px] font-semibold text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-full">
                      {record.mode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-base ${record.isRepayment ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {formatCurrency(record.amount)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
