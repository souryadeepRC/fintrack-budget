import { FaMoneyBillWave, FaCreditCard, FaWallet } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";

const appTitle: string = import.meta.env.VITE_APP_TITLE || "Financial Tracking";

const PaymentModeMap = new Map([
  ["Cash", { value: "Cash", Icon: FaMoneyBillWave }],
  ["GPay", { value: "GPay", Icon: FaGooglePay }],
  ["PhonePe", { value: "PhonePe", Icon: SiPhonepe }],
  ["Debit Card", { value: "ATM Card", Icon: MdCreditCard }],
  ["Credit Card", { value: "Credit Card", Icon: FaCreditCard }],
  ["Others", { value: "Others", Icon: FaWallet }],
]);

const ExpenseCategoryMap = new Map([
  ["EMI", "EMI"],
  ["Groceries & Food", "Groceries & Food"],
  ["Transport", "Transport"],
  ["Medical", "Medical"],
  ["Utilities", "Utilities"],
  ["Entertainment", "Entertainment"],
  ["Shopping", "Shopping"],
  ["Gifts", "Gifts"],
  ["Miscellaneous", "Miscellaneous"],
]);
const DebtStatusMap = new Map([
  ["Paid", { value: "Paid", Icon: FaCheckCircle }],
  ["Unpaid", { value: "Unpaid", Icon: CiNoWaitingSign }],
]);
export default {
  title: appTitle,
  paymentMode: PaymentModeMap,
  expenseCategory: ExpenseCategoryMap,
  debtStatus: DebtStatusMap,
};
