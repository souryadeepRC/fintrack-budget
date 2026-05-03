"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { createExpense } from "@/services/expense.service";
import { closeAddExpenseModal } from "@/store/slices/uiSlice";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const CATEGORIES = [
  "Food & Dining",
  "Groceries",
  "Transport",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Health",
  "Travel",
  "Other",
];

const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Bank Transfer",
  "Google Pay",
  "PhonePe",
];

interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
  mode: string;
  date: string;
}

export function AddExpenseModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isAddExpenseModalOpen);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      dispatch(closeAddExpenseModal());
      toast.success("Expense added successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(`Failed to add expense: ${error.message}`);
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      mode: "",
      date: new Date().toISOString().split("T")[0],
    } as ExpenseFormData,
    onSubmit: async ({ value }) => {
      const amount = parseFloat(value.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Amount must be a valid positive number");
        return;
      }

      await createMutation.mutateAsync({
        title: value.title.trim(),
        amount,
        category: value.category,
        mode: value.mode,
        date: new Date(value.date).toISOString(),
      });
    },
  });

  const handleClose = () => {
    dispatch(closeAddExpenseModal());
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Add New Expense
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Enter the details of your expense. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Title Field */}
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) => {
                if (!value || !value.trim()) return "Title is required";
                if (value.length > 20) return "Title must be 20 characters or less";
                return undefined;
              },
              onBlur: ({ value }) => {
                if (!value || !value.trim()) return "Title is required";
                if (value.length > 20) return "Title must be 20 characters or less";
                return undefined;
              },
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g., Dinner at restaurant"
                  maxLength={20}
                  className={`border-emerald-200/50 bg-white/70 focus:border-emerald-400 ${
                    field.state.meta.errors.length > 0 ? "border-red-500" : ""
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {field.state.meta.errors[0]}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  {field.state.value.length}/20 characters
                </p>
              </div>
            )}
          />

          {/* Amount Field */}
          <form.Field
            name="amount"
            validators={{
              onChange: ({ value }) => {
                if (!value || !value.trim()) return "Amount is required";
                const num = parseFloat(value);
                if (isNaN(num)) return "Amount must be a valid number";
                if (num <= 0) return "Amount must be greater than 0";
                return undefined;
              },
              onBlur: ({ value }) => {
                if (!value || !value.trim()) return "Amount is required";
                const num = parseFloat(value);
                if (isNaN(num)) return "Amount must be a valid number";
                if (num <= 0) return "Amount must be greater than 0";
                return undefined;
              },
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-semibold text-slate-700">
                  Amount <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="0.00"
                  min="0.01"
                  className={`border-emerald-200/50 bg-white/70 focus:border-emerald-400 ${
                    field.state.meta.errors.length > 0 ? "border-red-500" : ""
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          {/* Category and Payment Method Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category Field */}
            <form.Field
              name="category"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Category is required" : undefined,
                onBlur: ({ value }) =>
                  !value ? "Category is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold text-slate-700">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger
                      className={`border-emerald-200/50 bg-white/70 ${
                        field.state.meta.errors.length > 0 ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Payment Method Field */}
            <form.Field
              name="mode"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Payment method is required" : undefined,
                onBlur: ({ value }) =>
                  !value ? "Payment method is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="mode" className="text-sm font-semibold text-slate-700">
                    Payment <span className="text-red-500">*</span>
                  </Label>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger
                      className={`border-emerald-200/50 bg-white/70 ${
                        field.state.meta.errors.length > 0 ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Date Field */}
          <form.Field
            name="date"
            validators={{
              onChange: ({ value }) =>
                !value ? "Date is required" : undefined,
              onBlur: ({ value }) =>
                !value ? "Date is required" : undefined,
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold text-slate-700">
                  Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={`border-emerald-200/50 bg-white/70 focus:border-emerald-400 ${
                    field.state.meta.errors.length > 0 ? "border-red-500" : ""
                  }`}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end pt-6 border-t border-emerald-100">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createMutation.isPending}
              className="border-emerald-200/50 text-slate-700 hover:bg-emerald-50"
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || createMutation.isPending}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg"
                >
                  {createMutation.isPending ? "Adding..." : "Add Expense"}
                </Button>
              )}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}