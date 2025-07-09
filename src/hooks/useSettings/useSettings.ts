const useSettings = () => {
  const paymentModes = [
    { id: "1", label: "Cash", value: "cash" },
    { id: "2", label: "Gpay", value: "gpay" },
    { id: "3", label: "PhonePe", value: "phonepe" },
    { id: "4", label: "ATM Card", value: "atm_card" },
    { id: "5", label: "Credit Card", value: "credit_card" },
    { id: "6", label: "Others", value: "others" },
  ];
  const expenseCategories = [
    { id: "1", label: "EMI", value: "emi" },
    { id: "2", label: "Groceries & Food", value: "groceries_food" },
    { id: "3", label: "Transport", value: "transport" },
    { id: "4", label: "Medical", value: "medical" },
    { id: "5", label: "Utilities", value: "utilities" },
    { id: "6", label: "Entertainment", value: "entertainment" },
    { id: "7", label: "Shopping", value: "shopping" },
    { id: "8", label: "Gifts", value: "gifts" },
    { id: "9", label: "Miscellaneous", value: "miscellaneous" },
  ];

  return {
    paymentModes,
    expenseCategories,
  };
};

export default useSettings;
