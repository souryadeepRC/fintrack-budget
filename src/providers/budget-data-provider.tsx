"use client";

import React, { createContext, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getExpenses } from "@/services/expense.service";
import { getDebts } from "@/services/debt.service";
import { Expense, Debt } from "@/types";
import {
  DEBT_QUERY_CONSTANTS,
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from "@/constants/query-constants";
import { useAuth } from "./auth-provider";
import { LoadingSpinner } from "@/components/loader/LoadingSpinner";

interface BudgetDataContextType {
  expensesQuery: UseQueryResult<Array<Expense>, Error>;
  debtsQuery: UseQueryResult<Array<Debt>, Error>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const BudgetDataContext = createContext<BudgetDataContextType | undefined>(
  undefined
);

interface BudgetDataProviderProps {
  children: React.ReactNode;
}

export function BudgetDataProvider({ children }: BudgetDataProviderProps) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const now = new Date();
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth()- 1, 1),
  );

  const startOfNextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth()  , 1),
  );

  const expensesQuery = useQuery<Array<Expense>>({
    queryKey: EXPENSE_QUERY_CONSTANTS.ALL,
    queryFn: () =>
      getExpenses({
        limit: 50,
        offset: 0,
        startDate: startOfMonth.toISOString(),
        endDate: startOfNextMonth.toISOString(),
      }),
    enabled: isAuthenticated,
    ...QUERY_CONFIG,
  });

  // Fetch expense categories
  const debtsQuery = useQuery({
    queryKey: DEBT_QUERY_CONSTANTS.ALL,
    queryFn: () => getDebts(),
    enabled: isAuthenticated,
    ...QUERY_CONFIG,
  });

  const isLoading = expensesQuery.isPending || debtsQuery.isPending;
  const isError = expensesQuery.isError || debtsQuery.isError;
  const error = expensesQuery.error || debtsQuery.error || null;

  /* ----------------------------- */
  /* 🚦 Render control (clean) */
  /* ----------------------------- */

  // Auth loading
  if (isAuthLoading) {
    return (
      <LoadingSpinner
        size="xl"
        text="Fintrack Budget"
        description="Manage your budget and expenses"
        fullPage
      />
    );
  }

  // Not logged in → just render app (login page etc.)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Data loading
  if (isLoading) {
    return (
      <LoadingSpinner
        size="xl"
        text="Loading your finances..."
        fullPage
      />
    );
  }

  return (
    <BudgetDataContext.Provider
      value={{
        expensesQuery,
        debtsQuery,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </BudgetDataContext.Provider>
  );
}
