"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
 

import { createExpense, updateExpense } from "@/services/expense.service";

import { Button, DropDown, TextInput } from "@/components/common";
import { CATEGORIES, PAYMENT_METHODS } from "@/constants/app-constants";

interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
  mode: string;
  date: string;
}

interface ExpenseFormProps {
  initialData?: any; // Pass existing expense data to edit
  onClose: () => void;
}

export function ExpenseForm({ initialData, onClose }: ExpenseFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (isEditing) {
        return updateExpense(initialData.id, data);
      }
      return createExpense(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(`Expense ${isEditing ? "updated" : "added"} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(
        `Failed to ${isEditing ? "update" : "add"} expense: ${error.message}`,
      );
    },
  });

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      amount: initialData?.amount?.toString() || "",
      category: initialData?.category || "",
      mode: initialData?.mode || "",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    } as ExpenseFormData,
    onSubmit: async ({ value }) => {
      const amount = parseFloat(value.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Amount must be a valid positive number");
        return;
      }

      await mutation.mutateAsync({
        title: value.title.trim(),
        amount,
        category: value.category,
        mode: value.mode,
        date: new Date(value.date).toISOString(),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-3"
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
      >
        {(field) => (
          <TextInput
            label="Title"
            required
            id="title"
            autoFocus={!isEditing}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            enterKeyHint="next"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('amount')?.focus();
              }
            }}
            placeholder="e.g., Dinner at restaurant"
            maxLength={20}
            className={`border-slate-200 bg-white focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 ${
              field.state.meta.errors.length > 0 ? "border-red-500" : ""
            }`}
            error={field.state.meta.errors[0]}
            headerEnd={
              <p className="text-xs text-slate-500 flex justify-end">
                <span
                  className={
                    field.state.value.length === 20
                      ? "text-amber-500 font-medium"
                      : ""
                  }
                >
                  {field.state.value.length}
                </span>
                /20 characters
              </p>
            }
          />
        )}
      </form.Field>

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
      >
        {(field) => (
          <TextInput
            label="Amount"
            required
            id="amount"
            type="number"
            step="0.01"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            enterKeyHint="next"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('category-trigger')?.focus();
              }
            }}
            placeholder="0.00"
            min="0.01"
            error={field.state.meta.errors[0]}
            className={`border-slate-200 bg-white focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 ${
              field.state.meta.errors.length > 0 ? "border-red-500" : ""
            }`}
          />
        )}
      </form.Field>

      {/* Category and Payment Method Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Field */}
        <form.Field
          name="category"
          validators={{
            onChange: ({ value }) =>
              !value ? "Category is required" : undefined,
            onBlur: ({ value }) =>
              !value ? "Category is required" : undefined,
          }}
        >
          {(field) => (
            <DropDown
              label="Category"
              required
            id="category-trigger"
              options={CATEGORIES.map((category) => ({
                label: category,
                value: category,
              }))}
              value={field.state.value}
              onValueChange={(value)=>field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        </form.Field>

        {/* Payment Method Field */}
        <form.Field
          name="mode"
          validators={{
            onChange: ({ value }) =>
              !value ? "Payment method is required" : undefined,
            onBlur: ({ value }) =>
              !value ? "Payment method is required" : undefined,
          }}
        >
          {(field) => (
            <DropDown
              label="Payment"
              required
            id="mode-trigger"
              options={PAYMENT_METHODS.map((method) => ({
                label: method,
                value: method,
              }))}
              value={field.state.value}
              onValueChange={(value)=>field.handleChange(value)}
              error={field.state.meta.errors[0]}
            />
          )}
        </form.Field>
      </div>

      {/* Date Field */}
      <form.Field
        name="date"
        validators={{
          onChange: ({ value }) => (!value ? "Date is required" : undefined),
          onBlur: ({ value }) => (!value ? "Date is required" : undefined),
        }}
      >
        {(field) => (
          <TextInput
            label="Date"
            required
            id="date"
            type="date"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            className={`border-slate-200 bg-white focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 ${
              field.state.meta.errors.length > 0 ? "border-red-500" : ""
            }`}
            error={field.state.meta.errors[0]}
          />
        )}
      </form.Field>

      {/* Action Buttons */}
      <div className="flex gap-2 md:gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="outlined" 
          onClick={onClose}
          disabled={mutation.isPending}
          className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting || mutation.isPending}
              className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              {mutation.isPending
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                  ? "Update"
                  : "Add Expense"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
