import { DebtCategoryType, DebtStatusType } from "@/types";

const appTitle: string = import.meta.env.VITE_APP_TITLE || "Financial Tracking";

const debtStatus: { [key: string]: DebtStatusType } = {
  UN_PAID: "Unpaid",
  PARTIAL: "Partially Paid",
  SETTLED: "Settled",
};
const debtCategory: { [key: string]: DebtCategoryType } = {
  LEND: "Lend",
  BORROW: "Borrow",
};
export default {
  title: appTitle,
  debtStatus,
  debtCategory,
};
