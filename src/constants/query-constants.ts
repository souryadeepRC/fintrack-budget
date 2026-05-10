export const EXPENSE_QUERY_CONSTANTS = {
  ALL: ['expenses'],
};
export const DEBT_QUERY_CONSTANTS = {
  ALL: ['debts'],
};
export const PAYMENT_MODES_QUERY_CONSTANTS = {
  ALL: ['paymentMethods'],
};

export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  retry: 0,
  refetchOnWindowFocus: false,
};
