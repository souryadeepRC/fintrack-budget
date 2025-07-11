import { DebtCategoryType, DebtStatusType } from "@/types/debt";

type CategoryType = Record<Uppercase<DebtCategoryType>, DebtCategoryType>;
type CategoryOption = { label: DebtCategoryType; value: DebtCategoryType };

export const DebtCategory: CategoryType = {
  LEND: "Lend",
  BORROW: "Borrow",
};
export const DebtCategoryMap = new Map([
  [DebtCategory.LEND, DebtCategory.LEND],
  [DebtCategory.BORROW, DebtCategory.BORROW],
]);
export const debtCategoryOptions: CategoryOption[] = [
  {
    label: DebtCategory.LEND,
    value: DebtCategory.LEND,
  },
  {
    label: DebtCategory.BORROW,
    value: DebtCategory.BORROW,
  },
];

type StatusType = Record<Uppercase<DebtStatusType>, DebtStatusType>;
type StatusOption = { label: DebtStatusType; value: DebtStatusType };

export const DebtStatus: StatusType = {
  PAID: "Paid",
  UNPAID: "Unpaid",
};
export const DebtStatusMap = new Map([
  [DebtStatus.PAID, DebtStatus.PAID],
  [DebtStatus.UNPAID, DebtStatus.UNPAID],
]);
export const debtStatusOptions: StatusOption[] = [
  {
    label: DebtStatus.PAID,
    value: DebtStatus.PAID,
  },
  {
    label: DebtStatus.UNPAID,
    value: DebtStatus.UNPAID,
  },
];
