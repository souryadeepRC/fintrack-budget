import { RootState } from "@/store";
import { DebtState } from "@/types/debt";

export const selectAllDebts = (store: RootState): DebtState[] =>
  store.debt.debts;
export const selectIsDebtLoaded = (store: RootState): boolean =>
  store.debt.isLoaded;

export const selectDebt = (
  store: RootState,
  debtId: string
): DebtState | undefined => store.debt.debts.find((debt) => debt.id === debtId);
