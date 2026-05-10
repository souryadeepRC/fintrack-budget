"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { HeaderBanner } from "@/components/common/HeaderBanner";
import { PageTabs } from "@/components/common/PageTabs";
import { SummaryCards } from "@/components/common/SummaryCards";
import { DebtCard, DebtGroup } from "@/components/debt/debt-card";
import { DebtForm } from "@/components/debt/debt-form";
import { DebtHistoryModal } from "@/components/debt/debt-history-modal";
import { LoadingSpinner } from "@/components/loader/LoadingSpinner";
import { QUERY_CONFIG } from "@/constants/query-constants";
import { getDebts } from "@/services/debt.service";
import { Debt, DebtCreatePayload } from "@/types";
import { Modal } from "@/components/common/Modal";

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

    const groups: Record<number, DebtGroup> = {};

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
  const handleOpenAddTransaction = () => {
    setPrefillData(undefined);
    setIsModalOpen(true);
  };
  const onDebtFormClose = () => {
    setIsModalOpen(false);
    setPrefillData(undefined);
  };
  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading debts..." />;
  }

  return (
    <>
      <HeaderBanner
        title="Loans & Debts"
        description="Track your borrowing, lending, and settlement history."
        aiLabel="Debts Tracking Active"
        actionLabel="Add Transaction"
        onAction={handleOpenAddTransaction}
      />

      {/* Summary Cards */}
      <SummaryCards
        items={[
          {
            title: "Total Active Debts",
            amount: totalActiveDebts,
            amountClassName: "text-emerald-600",
          },
          {
            title: "Total Active Borrowed",
            amount: totalActiveBorrowed,
            amountClassName: "text-red-600",
          },
        ]}
      />

      {/* Tabs */}
      <PageTabs
        tabs={[
          {
            title: "Active",
            onClick: () => setActiveTab("active"),
            isActive: activeTab === "active",
          },
          {
            title: "Settled",
            onClick: () => setActiveTab("settled"),
            isActive: activeTab === "settled",
          },
        ]}
      />

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
              return (
                <DebtCard
                  key={group.debtId}
                  group={group}
                  activeTab={activeTab}
                  onAddPayment={handleAddPayment}
                  onViewHistory={(g) =>
                    setSelectedHistoryGroup({
                      name: g.name,
                      records: g.records,
                    })
                  }
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Form Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={
            !!prefillData?.debtId
              ? `Add Payment for ${prefillData?.name}`
              : "Add Transaction"
          }
          onClose={onDebtFormClose}
        >
          <DebtForm initialData={prefillData} onClose={onDebtFormClose} />
        </Modal>
      )}

      {/* History Modal */}
      {selectedHistoryGroup && (
        <DebtHistoryModal
          groupName={selectedHistoryGroup.name}
          records={selectedHistoryGroup.records}
          onClose={() => setSelectedHistoryGroup(null)}
        />
      )}
    </>
  );
}
