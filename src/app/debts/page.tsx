"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDebts } from "@/services/debt.service";
import { LoadingSpinner } from "@/components/loader/LoadingSpinner";
import { DebtForm } from "@/components/debt/debt-form";
import { DebtHistoryModal } from "@/components/debt/debt-history-modal";
import { formatCurrency } from "@/lib/utils";
import { DebtCreatePayload, Debt } from "@/types";
import { QUERY_CONFIG } from "@/constants/query-constants";

export default function DebtsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "settled">("active");
  const [selectedHistoryGroup, setSelectedHistoryGroup] = useState<{
    name: string;
    records: Debt[];
  } | null>(null);
  const [prefillData, setPrefillData] = useState<
    Partial<DebtCreatePayload> | undefined
  >(undefined);

  // Fetch all debts
  const { data: debts, isLoading } = useQuery({
    queryKey: ["debts", "all"],
    queryFn: () => getDebts(),
    ...QUERY_CONFIG,
  });

  const debtGroups = useMemo(() => {
    if (!debts) return [];

    const groups: Record<
      number,
      {
        debtId: number;
        name: string;
        totalBorrowed: number;
        totalRepaid: number;
        remaining: number;
        records: Debt[];
        borrows: Debt[];
        repayments: Debt[];
      }
    > = {};

    debts.forEach((debt) => {
      if (!groups[debt.debtId]) {
        groups[debt.debtId] = {
          debtId: debt.debtId,
          name: debt.name,
          totalBorrowed: 0,
          totalRepaid: 0,
          remaining: 0,
          records: [],
          borrows: [],
          repayments: [],
        };
      }

      groups[debt.debtId].records.push(debt);

      // Filter records into distinct arrays based on isRepayment
      if (debt.isRepayment) {
        groups[debt.debtId].repayments.push(debt);
        groups[debt.debtId].totalRepaid += debt.amount;
      } else {
        groups[debt.debtId].borrows.push(debt);
        groups[debt.debtId].totalBorrowed += debt.amount;
      }
    });

    return Object.values(groups)
      .map((group) => {
        group.remaining = group.totalBorrowed - group.totalRepaid;
        return group;
      })
      .sort((a, b) => b.remaining - a.remaining);
  }, [debts]);

  const { totalActiveDebts, totalActiveBorrowed } = useMemo(() => {
    let activeDebts = 0;
    let activeBorrowed = 0;

    debtGroups.forEach((group) => {
      if (group.remaining > 0) {
        const category =
          group.borrows[0]?.category || group.records[0]?.category;
        if (category === "Lend") {
          activeDebts += group.remaining;
        } else if (category === "Borrow") {
          activeBorrowed += group.remaining;
        }
      }
    });

    return {
      totalActiveDebts: activeDebts,
      totalActiveBorrowed: activeBorrowed,
    };
  }, [debtGroups]);

  const filteredGroups = useMemo(() => {
    return debtGroups.filter((group) =>
      activeTab === "active" ? group.remaining > 0 : group.remaining <= 0,
    );
  }, [debtGroups, activeTab]);

  const handleAddPayment = (group: any) => {
    setPrefillData({
      debtId: group.debtId,
      name: group.name,
      category:
        group.borrows[0]?.category || group.records[0]?.category || "Lend",
      isRepayment: true,
    });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading debts..." />;
  }

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Loans & Debts
          </h1>
          <p className="text-slate-600 mt-1">
            Track your borrowing, lending, and settlement history.
          </p>
        </div>
        <button
          onClick={() => {
            setPrefillData(undefined);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          + Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Total Active Debts
          </h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {formatCurrency(totalActiveDebts)}
          </p>
        </div>
        <div className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Total Active Borrowed
          </h3>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {formatCurrency(totalActiveBorrowed)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-3 px-2 mr-6 text-sm font-semibold transition-colors border-b-2 ${activeTab === "active" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("settled")}
          className={`pb-3 px-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === "settled" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Settled
        </button>
      </div>

      {/* Loans List by Person */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Records by Person</h2>
        {filteredGroups.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-xl bg-slate-50 text-slate-500">
            {activeTab === "active"
              ? "No active loan records found. You're all settled up! 🎉"
              : "No settled loan records found yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => {
              const category =
                group.borrows[0]?.category ||
                group.records[0]?.category ||
                "Lend";
              const isBorrow = category === "Borrow";

              return (
                <div
                  key={group.debtId}
                  className={`p-6 border ${isBorrow ? "border-amber-300" : "border-blue-200"} rounded-xl bg-white shadow-sm flex flex-col gap-5`}
                >
                  <div
                    className="flex justify-between items-start border-b
                
                 border-slate-100
                
                 pb-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {group.name}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">
                        {group.borrows.length} Borrows •{" "}
                        {group.repayments.length} Repayments
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${group.remaining <= 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                      >
                        {group.remaining <= 0 ? "Settled" : "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {isBorrow ? "Borrowed" : "Lent"}
                      </p>
                      <p className="text-lg font-bold text-slate-800 mt-1">
                        {formatCurrency(group.totalBorrowed)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Repaid
                      </p>
                      <p className="text-lg font-bold text-emerald-600 mt-1">
                        {formatCurrency(group.totalRepaid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Remaining
                      </p>
                      <p
                        className={`text-lg font-bold mt-1 ${group.remaining > 0 ? (isBorrow ? "text-red-600" : "text-emerald-600") : group.remaining < 0 ? (isBorrow ? "text-emerald-600" : "text-red-600") : "text-slate-800"}`}
                      >
                        {formatCurrency(group.remaining)}
                      </p>
                    </div>
                  </div>

                  {activeTab === "active" && (
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div className="flex gap-3 sm:gap-4">
                        <button
                          onClick={() => handleAddPayment(group)}
                          className="cursor-pointer text-sm font-semibold bg-emerald-600 text-white hover:text-white-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-color"
                        >
                          Add Payment
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedHistoryGroup({
                            name: group.name,
                            records: group.records,
                          })
                        }
                        className="cursor-pointer text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors"
                      >
                        History
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Form Modal */}
      {isModalOpen && (
        <DebtForm
          initialData={prefillData}
          onClose={() => {
            setIsModalOpen(false);
            setPrefillData(undefined);
          }}
        />
      )}

      {/* History Modal */}
      {selectedHistoryGroup && (
        <DebtHistoryModal
          groupName={selectedHistoryGroup.name}
          records={selectedHistoryGroup.records}
          onClose={() => setSelectedHistoryGroup(null)}
        />
      )}
    </main>
  );
}
