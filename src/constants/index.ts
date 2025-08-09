import {
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
  FaCar,
  FaShoppingCart,
} from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { CiGift, CiNoWaitingSign } from "react-icons/ci";
import { BsBank } from "react-icons/bs";
import { GiMedicines, GiPartyPopper } from "react-icons/gi";
import { TbGridDots } from "react-icons/tb";
import { IoFastFoodOutline, IoFastFoodSharp } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";

const appTitle: string = import.meta.env.VITE_APP_TITLE || "Financial Tracking";

const PaymentModeMap = new Map([
  ["Cash", { value: "Cash", Icon: FaMoneyBillWave }],
  ["GPay", { value: "GPay", Icon: FaGooglePay }],
  ["PhonePe", { value: "PhonePe", Icon: SiPhonepe }],
  ["Debit Card", { value: "Debit Card", Icon: MdCreditCard }],
  ["Credit Card", { value: "Credit Card", Icon: FaCreditCard }],
  ["Others", { value: "Others", Icon: FaWallet }],
]);

const ExpenseCategoryMap = new Map([
  ["EMI", { value: "EMI", Icon: BsBank }],
  ["Groceries & Food", { value: "Groceries & Food", Icon: IoFastFoodOutline }],
  ["Food", { value: "Food", Icon: IoFastFoodSharp }],
  ["Transport", { value: "Transport", Icon: FaCar }],
  ["Medical", { value: "Medical", Icon: GiMedicines }],
  ["Utilities", { value: "Utilities", Icon: RiBillLine }],
  ["Entertainment", { value: "Entertainment", Icon: GiPartyPopper }],
  ["Shopping", { value: "Shopping", Icon: FaShoppingCart }],
  ["Gifts", { value: "Gifts", Icon: CiGift }],
  ["Miscellaneous", { value: "Miscellaneous", Icon: TbGridDots }],
]);
const DebtStatusMap = new Map([
  ["Paid", { value: "Paid", Icon: FaCheckCircle }],
  ["Unpaid", { value: "Unpaid", Icon: CiNoWaitingSign }],
]);

export const paymentOptions = [
  { label: "Cash", value: "Cash" },
  { label: "GPay", value: "GPay" },
  { label: "PhonePe", value: "PhonePe" },
  { label: "Debit Card", value: "Debit Card" },
  { label: "Credit Card", value: "Credit Card" },
  { label: "Others", value: "Others" },
];
export const expenseCategories = [
  { label: "EMI", value: "EMI", Icon: BsBank },
  { label: "Groceries & Food", value: "Groceries & Food" },
  { label: "Transport", value: "Transport" },
  { label: "Medical", value: "Medical" },
  { label: "Utilities", value: "Utilities" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Shopping", value: "Shopping" },
  { label: "Gifts", value: "Gifts" },
  { label: "Miscellaneous", value: "Miscellaneous", Icon: TbGridDots },
];
export default {
  title: appTitle,
  paymentMode: PaymentModeMap,
  paymentOptions,
  expenseCategory: ExpenseCategoryMap,
  expenseCategories,
  debtStatus: DebtStatusMap,
};
