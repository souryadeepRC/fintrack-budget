"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { DeleteConfirmation } from "@/components/common/DeleteConfirmation";
import { HeaderBanner } from "@/components/common/HeaderBanner";
import { SummaryCards } from "@/components/common/SummaryCards";
import { ExpenseControls } from "@/components/expense/expense-controls";
import { ExpenseForm } from "@/components/expense/expense-form";
import { ExpenseTable } from "@/components/expense/expense-table";
import { LoadingSpinner } from "@/components/loader/LoadingSpinner";
import {
  EXPENSE_QUERY_CONSTANTS,
  QUERY_CONFIG,
} from "@/constants/query-constants";
import { useAuth } from "@/providers/auth-provider";
import { deleteExpense, getExpenses } from "@/services/expense.service";
import { RootState } from "@/store";
import { Expense } from "@/types";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common";

export default function ExpensesPage() {
  const queryClient = useQueryClient();
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(
    null,
  );

  // Protect route: Redirect unauthenticated users to home
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Calculate date range for current month
  const currentMonthStart = useMemo(() => {
    return startOfMonth(new Date());
  }, []);

  const currentMonthEnd = useMemo(() => {
    return endOfMonth(currentMonthStart);
  }, [currentMonthStart]);

  const { data: currentMonthExpenses = [], isLoading: isLoadingCurrent } =
    useQuery({
      queryKey: [
        EXPENSE_QUERY_CONSTANTS.ALL,
        currentMonthStart.toISOString(),
        currentMonthEnd.toISOString(),
      ],
      queryFn: () =>
        getExpenses({
          startDate: currentMonthStart.toISOString(),
          endDate: currentMonthEnd.toISOString(),
        }),
      enabled: !!isAuthenticated,
      ...QUERY_CONFIG,
    });

  const filteredExpenses = useMemo(() => {
    // Clone the array to avoid mutating React Query's cached data
    let filtered = [...currentMonthExpenses];

    if (filters.search) {
      filtered = filtered.filter((expense) =>
        expense.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (expense) => expense.category === filters.category,
      );
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter(
        (expense) => expense.mode === filters.paymentMethod,
      );
    }

    filtered.sort((a, b) => {
      const aValue =
        filters.sortBy === "date" ? new Date(a.date).getTime() : a.amount;
      const bValue =
        filters.sortBy === "date" ? new Date(b.date).getTime() : b.amount;

      return filters.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [currentMonthExpenses, filters]);

  // Memoize total calculation to prevent unnecessary re-renders
  const totalCurrentMonth = useMemo(() => {
    return currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
  }, [currentMonthExpenses]);

  const totalFilteredAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted successfully");
      setDeletingExpenseId(null);
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete expense: ${error.message}`);
    },
  });

  const handleOpenAddExpense = useCallback(() => {
    setEditingExpense(null);
    setIsFormOpen(true);
  }, []);

  const handleEditExpense = useCallback((expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  }, []);

  // Show loading state while verifying auth
  if (isAuthLoading || !isAuthenticated) {
    return <LoadingSpinner size="lg" text="Loading expenses..." />;
  }

  return (
    <>
      <HeaderBanner
        title="Manage your spending"
        description="Track, filter, and organize your expenses. Use monthly insights to understand where your money goes and build better spending habits."
        aiLabel="Expense Tracking Active"
        actionLabel="Add Expense"
        actionIcon={Plus}
        onAction={handleOpenAddExpense}
      />

      {/* Main Content Section */}
      <div className="space-y-6 md:space-y-8">
        {/* Overview Card */}
        <SummaryCards
          items={[
            {
              title: format(currentMonthStart, "MMMM yyyy"),
              amount: totalCurrentMonth,
              amountClassName: "text-emerald-600",
            },
          ]}
        />

        {/* Layout: Top Filters + Content */}
        <div className="flex flex-col gap-6">
          {/* Top Filter Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <ExpenseControls isMobilePanel={false} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-4 md:space-y-6 min-w-0">
            {/* Table Section */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
              <ExpenseTable
                expenses={filteredExpenses}
                isLoading={isLoadingCurrent}
                totalCount={filteredExpenses.length}
                totalAmount={totalFilteredAmount}
                onEdit={handleEditExpense}
                onDelete={setDeletingExpenseId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {deletingExpenseId && (
        <DeleteConfirmation
          title="Delete Expense"
          description="Are you sure you want to delete this expense? The data will be permanently removed."
          isDeleting={deleteMutation.isPending}
          onConfirm={() => deleteMutation.mutate(deletingExpenseId)}
          onCancel={() => setDeletingExpenseId(null)}
        />
      )}

      {isFormOpen && (
        <Modal
          isOpen={isFormOpen}
          title={!!editingExpense ? "Edit Expense" : "Add New Expense"}
          description={
            !!editingExpense
              ? "Update the expense details."
              : "Enter the details of your expense."
          }
          onClose={() => {
            setIsFormOpen(false);
            setEditingExpense(null);
          }}
           
        >
          <ExpenseForm
            initialData={editingExpense}
            onClose={() => {
              setIsFormOpen(false);
              setEditingExpense(null);
            }}
          />
        </Modal>
      )}

    </>
  );
}
