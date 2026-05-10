import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

import {
  createNotification,
  updateNotification,
} from "@/services/notification.service";
import { Notification } from "@/types";
import { Button, DropDown, RadioOption, TextInput } from "@/components/common";
import { CATEGORIES, PAYMENT_METHODS } from "@/constants/app-constants";

interface NotificationFormProps {
  initialData?: Notification;
  onClose: () => void;
}

export function NotificationForm({
  initialData,
  onClose,
}: NotificationFormProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!initialData;

  const mutation = useMutation({
    mutationFn: async (data: any) =>
      isEditMode
        ? updateNotification(initialData.id, data)
        : createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(
        `Notification ${isEditMode ? "updated" : "added"} successfully`
      );
      onClose();
    },
    onError: (error: any) => {
      toast.error(
        `Failed to ${isEditMode ? "update" : "add"} notification: ${error.message}`
      );
    },
  });

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      amount: initialData?.amount?.toString() || "",
      category: initialData?.category || "Bills & Utilities",
      mode: initialData?.mode || "Credit Card",
      expiryDate: initialData?.expiryDate
        ? new Date(initialData.expiryDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      isMonthly: initialData?.isMonthly !== false ? "true" : "false",
      period: initialData?.period?.toString() || "1",
    },
    onSubmit: async ({ value }) => {
      const amount = parseFloat(value.amount);
      const isMonthly = value.isMonthly === "true";
      const period = parseInt(value.period);

      if (isNaN(amount) || amount <= 0) {
        toast.error("Amount must be a valid positive number");
        return;
      }

      if (!isMonthly && (isNaN(period) || period <= 0)) {
        toast.error("Period interval must be at least 1 day");
        return;
      }

      await mutation.mutateAsync({
        ...value,
        amount,
        isMonthly,
        period: isMonthly ? 30 : period,
        expiryDate: new Date(value.expiryDate).toISOString(),
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
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            !value.trim() ? "Title is required" : undefined,
          onBlur: ({ value }) =>
            !value.trim() ? "Title is required" : undefined,
        }}
      >
        {(field) => (
          <TextInput
            label="Title"
            required
            id="notification-title"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="e.g. Netflix Subscription"
            error={field.state.meta.errors[0]}
            enterKeyHint="next"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("notification-amount")?.focus();
              }
            }}
          />
        )}
      </form.Field>

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
            type="number"
            required
            id="notification-amount"
            min="0.01"
            step="0.01"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="0.00"
            error={field.state.meta.errors[0]}
            enterKeyHint="next"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("category-trigger")?.focus();
              }
            }}
          />
        )}
      </form.Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="category">
          {(field) => (
            <DropDown
              label="Category"
              required
              id="category-trigger"
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
              options={CATEGORIES.map((category) => ({
                label: category,
                value: category,
              }))}
              error={field.state.meta.errors[0]}
            />
          )}
        </form.Field>

        <form.Field name="mode">
          {(field) => (
            <DropDown
              label="Mode"
              required
              id="mode-trigger"
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
              options={PAYMENT_METHODS.map((method) => ({
                label: method,
                value: method,
              }))}
              error={field.state.meta.errors[0]}
            />
          )}
        </form.Field>
      </div>

      <form.Field name="isMonthly">
        {(field) => (
          <RadioOption
            label="Frequency Type"
            name="isMonthly"
            required
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            options={[
              { label: "Monthly", value: "true" },
              { label: "Days", value: "false" },
            ]}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.isMonthly}>
        {(isMonthly) =>
          isMonthly === "false" ? (
            <form.Field
              name="period"
              validators={{
                onChange: ({ value }) => {
                  const num = parseInt(value);
                  if (isNaN(num) || num < 1) return "Period must be at least 1 day";
                  return undefined;
                },
                onBlur: ({ value }) => {
                  const num = parseInt(value);
                  if (isNaN(num) || num < 1) return "Period must be at least 1 day";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <TextInput
                  label="Period Interval (Days)"
                  type="number"
                  required
                  min="1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
          ) : null
        }
      </form.Subscribe>

      <form.Field
        name="expiryDate"
        validators={{
          onChange: ({ value }) => (!value ? "Date is required" : undefined),
          onBlur: ({ value }) => (!value ? "Date is required" : undefined),
        }}
      >
        {(field) => (
          <TextInput
            label="Next Expiry Date"
            type="date"
            required
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            error={field.state.meta.errors[0]}
          />
        )}
      </form.Field>

      <div className="flex gap-3 pt-4 border-t border-slate-100">
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
              {mutation.isPending ? "Saving..." : "Save Record"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
