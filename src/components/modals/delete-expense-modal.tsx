"use client";

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "@/services/expense.service";
import { closeDeleteExpenseModal } from "@/store/slices/uiSlice";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export function DeleteExpenseModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isDeleteExpenseModalOpen);
  const deletingId = useSelector((state: RootState) => state.ui.deletingExpenseId);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      dispatch(closeDeleteExpenseModal());
      toast.success("Expense deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete expense: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId);
    }
  };

  const handleClose = () => {
    dispatch(closeDeleteExpenseModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[300px] md:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100/80">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="md:flex-1">
              <DialogTitle className="text-xl font-bold text-slate-900">
                Delete Expense
              </DialogTitle>
              <DialogDescription className="text-slate-600 mt-1 hidden md:block">
                This action cannot be undone. The expense will be permanently removed from your records.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-red-50/50 border border-red-200/50 rounded-lg p-2 md:p-4 md:my-4">
          <p className="text-xs md:text-sm text-center md:text-left text-red-800 font-medium">
            Are you sure you want to delete this expense? This cannot be reversed.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end pt-4 border-t border-emerald-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={deleteMutation.isPending}
            className="border-emerald-200/50 text-slate-700 hover:bg-emerald-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-800 text-white hover:bg-red-700 shadow-md hover:shadow-lg h-10"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}