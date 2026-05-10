import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createDebt } from "@/services/debt.service";
import { DebtCreatePayload } from "@/types";
import { PAYMENT_METHODS } from "@/constants/app-constants";
import { Button, DropDown, RadioOption, TextInput } from "@/components/common";

interface DebtFormProps {
  onClose: () => void;
  initialData?: Partial<DebtCreatePayload>;
}

export function DebtForm({ onClose, initialData }: DebtFormProps) {
  const queryClient = useQueryClient();
  const isPaymentMode = !!initialData?.debtId;

  const mutation = useMutation({
    mutationFn: createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
      toast.success("Record saved successfully");
      onClose();
    },
    onError: (error: any) => {
      toast.error(`Failed to save record: ${error.message}`);
    },
  });

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      name: initialData?.name || "",
      amount: initialData?.amount?.toString() || "",
      category: initialData?.category || "Lend",
      isRepayment: initialData?.isRepayment ? "true" : "false",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      mode: initialData?.mode || "Cash",
      debtId: initialData?.debtId || undefined,
    },
    onSubmit: async ({ value }) => {
      const amount = parseFloat(value.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Amount must be a valid positive number");
        return;
      }

      await mutation.mutateAsync({
        ...value,
        amount,
        isRepayment: isPaymentMode ? value.isRepayment === "true" : false,
        date: new Date(value.date).toISOString(), // Appwrite expects ISO
      } as DebtCreatePayload);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {!isPaymentMode && (
        <>
          <form.Field name="category">
            {(field) => (
              <RadioOption
                label="Transaction Type"
                options={[
                  { label: "Lend", value: "Lend" },
                  { label: "Borrow", value: "Borrow" },
                ]}
                name="category"
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                required
              />
            )}
          </form.Field>

          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "Person name is required" : undefined,
              onBlur: ({ value }) =>
                !value.trim() ? "Person name is required" : undefined,
            }}
          >
            {(field) => (
              <TextInput
                label="Person Name"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="e.g. John Doe"
                error={field.state.meta.errors[0]}
                enterKeyHint="next"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementById("debt-title")?.focus();
                  }
                }}
              />
            )}
          </form.Field>
        </>
      )}

      {isPaymentMode && (
        <form.Field name="isRepayment">
          {(field) => (
            <RadioOption
              label="Record Type"
              options={[
                { label: "Repayment", value: "true" },
                { label: "Additional Amount", value: "false" },
              ]}
              name="isRepayment"
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              required
            />
          )}
        </form.Field>
      )}

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
            id="debt-title"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="e.g. Dinner bill split"
            error={field.state.meta.errors[0]}
            enterKeyHint="next"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("debt-amount")?.focus();
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
            min="0.01"
            id="debt-amount"
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
                document.getElementById("debt-mode-trigger")?.focus();
              }
            }}
          />
        )}
      </form.Field>

      <form.Field name="mode">
        {(field) => (
          <DropDown
            label="Payment Mode"
            id="debt-mode-trigger"
            value={field.state.value}
            options={PAYMENT_METHODS.map((mode) => ({
              label: mode,
              value: mode,
            }))}
            onValueChange={(value: string) => field.handleChange(value)}
            required
            error={field.state.meta.errors[0]}
          />
        )}
      </form.Field>

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
