const useSettings = () => {
  const paymentModes = [
    { id: "1", label: "Cash", value: "Cash" },
    { id: "2", label: "Gpay", value: "Gpay" },
    { id: "3", label: "PhonePe", value: "PhonePe" },
    { id: "4", label: "ATM Card", value: "ATM Card" },
    { id: "5", label: "Credit Card", value: "Credit Card" },
    { id: "6", label: "Others", value: "Others" },
  ];
  const expenseCategories = [
    { id: "1", label: "EMI", value: "EMI" },
    { id: "2", label: "Groceries & Food", value: "Groceries & Food" },
    { id: "3", label: "Transport", value: "Transport" },
    { id: "4", label: "Medical", value: "Medical" },
    { id: "5", label: "Utilities", value: "Utilities" },
    { id: "6", label: "Entertainment", value: "Entertainment" },
    { id: "7", label: "Shopping", value: "Shopping" },
    { id: "8", label: "Gifts", value: "Gifts" },
    { id: "9", label: "Miscellaneous", value: "Miscellaneous" },
  ];
  const PaymentModeMap = new Map([
    ["Cash", "Cash"],
    ["Gpay", "Gpay"],
    ["PhonePe", "PhonePe"],
    ["ATM Card", "ATM Card"],
    ["Credit Card", "Credit Card"],
    ["Others", "Others"],
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
  return {
    paymentModes,
    expenseCategories,
    PaymentModeMap,
    ExpenseCategoryMap,
  };
};

export default useSettings;
