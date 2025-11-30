import { DebtCategory, DebtStatus } from "@/components/Debt/DebtConfig";
import { DebtAnalyticsReport, DebtState } from "@/types/debt";

export function getDebtAnalytics(debts: DebtState[]): DebtAnalyticsReport {
  let totalActiveLend = 0;
  let totalActiveBorrow = 0;

  const lenderMap = new Map<string, number>();
  const borrowerMap = new Map<string, number>();

  debts.forEach((debt) => {
    const isActive = debt.status !== DebtStatus.PAID;
    const outstanding = debt.amount - (debt.clearedAmount || 0);
    if (!isActive) return;
    // Accumulate active debts

    if (debt.category === DebtCategory.LEND) {
      totalActiveLend += outstanding;
    } else if (debt.category === DebtCategory.BORROW) {
      totalActiveBorrow += outstanding;
    }

    // Map totals by name
    const name = debt.name;
    const currentTotal = debt.amount - (debt.clearedAmount || 0);

    if (debt.category === DebtCategory.LEND) {
      lenderMap.set(name, (lenderMap.get(name) || 0) + currentTotal);
    } else if (debt.category === DebtCategory.BORROW) {
      borrowerMap.set(name, (borrowerMap.get(name) || 0) + currentTotal);
    }
  });

  // Get top 5 from each category
  const topLenders = Array.from(lenderMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));

  const topBorrowers = Array.from(borrowerMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));

  return {
    totalActiveLend: Number(totalActiveLend.toFixed(2)),
    totalActiveBorrow: Number(totalActiveBorrow.toFixed(2)),
    topLenders,
    topBorrowers,
  };
}
