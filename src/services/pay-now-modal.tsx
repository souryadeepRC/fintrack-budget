import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateNotification } from "@/services/notification.service";
import { createExpense } from "@/services/expense.service";
import { Notification } from "@/types";
import { addDays, addMonths, format } from "date-fns";

interface PayNowModalProps {
  notification: Notification;
  onClose: () => void;
}

export function PayNowModal({ notification, onClose }: PayNowModalProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skipExpense, setSkipExpense] = useState(false);

  const [paymentDate, setPaymentDate] = useState(format(new Date(notification.expiryDate), "yyyy-MM-dd"));
  const [period, setPeriod] = useState<number>(notification.isMonthly ? 30: notification.period); 
  
  // Dynamically calculate the updated expiry date
  const modifiedExpiryDate = notification.isMonthly
    ? addMonths(new Date(notification.expiryDate), 1)
    : addDays(new Date(paymentDate), period);

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (period <= 0) {
      setError("Period must be a positive number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const latestDate = new Date(paymentDate);
      const newIsoDate = latestDate.toISOString();
      
      // 1. Create an Expense entry (if not skipped)
      if (!skipExpense) {
        await createExpense({
          title: notification.title,
          amount: notification.amount,
          category: notification.category,
          mode: notification.mode,
          date: newIsoDate,
        });
      }

      // 2. Update the existing Notification's expiry date and period
      await updateNotification(notification.id, {
        expiryDate: modifiedExpiryDate.toISOString(),
        period: period,
      });

      // Refresh queries natively
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      
      if (!skipExpense) {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      }
      
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to process payment.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form onSubmit={handlePayNow} className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Pay Now: {notification.title}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">✕</button>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">{error}</div>}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Payment Date</label>
          <input type="date" required value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
        </div>

        {!notification.isMonthly && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Update Period (Days)</label>
            <input type="number" required min="1" value={period} onChange={(e) => setPeriod(parseInt(e.target.value))} className="border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
          </div>
        )}

        <div className="flex flex-col gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Expiry Date</span>
          <span className="text-lg font-bold text-slate-800">{format(modifiedExpiryDate, "MMM dd, yyyy")}</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <input 
            type="checkbox" 
            id="skipExpense" 
            checked={skipExpense} 
            onChange={(e) => setSkipExpense(e.target.checked)} 
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 cursor-pointer"
          />
          <label htmlFor="skipExpense" className="text-sm font-semibold text-slate-700 cursor-pointer">
            Want to skip from expense
          </label>
        </div>

        <div className="mt-2 flex gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onClose} className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg font-bold transition-colors">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold disabled:opacity-50 transition-colors">
            {isSubmitting ? "Processing..." : "Pay & Reschedule"}
          </button>
        </div>
      </form>
    </div>
  );
}