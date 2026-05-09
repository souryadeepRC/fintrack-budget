"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setExpenseFilters } from "@/store/slices/uiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface ExpenseControlsProps {
  isMobilePanel?: boolean;
  onCloseMobilePanel?: () => void;
}

export function ExpenseControls({
  isMobilePanel = false,
  onCloseMobilePanel,
}: ExpenseControlsProps) {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setExpenseFilters({ search: debouncedSearch }));
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, dispatch]);

  const handleCategoryChange = (category: string) => {
    const newCategory = category === "all" ? "" : category;
    dispatch(setExpenseFilters({ category: newCategory }));
  };

  const handlePaymentMethodChange = (paymentMethod: string) => {
    const newMethod = paymentMethod === "all" ? "" : paymentMethod;
    dispatch(setExpenseFilters({ paymentMethod: newMethod }));
  };


  const hasActiveFilters = !!(
    filters.search ||
    filters.category ||
    filters.paymentMethod
  );

  const filterContent = (
    <div className="flex flex-col md:flex-row items-end gap-4 w-full">
      {/* Category */}
      <div className="w-full md:w-56 space-y-1.5 shrink-0">
        <Label
          htmlFor="category-select"
          className="text-sm font-semibold text-slate-700"
        >
          Category
        </Label>
        <Select
          value={filters.category || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full border-emerald-200/50 bg-white/70 hover:bg-white hover:border-emerald-300/70 h-10">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Payment Method */}
      <div className="w-full md:w-56 space-y-1.5 shrink-0">
        <Label
          htmlFor="payment-select"
          className="text-sm font-semibold text-slate-700"
        >
          Payment Method
        </Label>
        <Select
          value={filters.paymentMethod || "all"}
          onValueChange={handlePaymentMethodChange}
        >
          <SelectTrigger className="w-full border-emerald-200/50 bg-white/70 hover:bg-white hover:border-emerald-300/70 h-10">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {PAYMENT_METHODS.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="w-full md:flex-1 space-y-1.5 min-w-0">
        <Label
          htmlFor="search-input"
          className="text-sm font-semibold text-slate-700"
        >
          Search by title
        </Label>
        <Input
          id="search-input"
          placeholder="Search expenses..."
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          className="w-full border-emerald-200/50 bg-white/70 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white h-10"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="w-full md:w-auto pt-2 md:pt-0 shrink-0">
          <Button
            variant="outline"
            onClick={() => {
              dispatch(
                setExpenseFilters({
                  search: "",
                  category: "",
                  paymentMethod: "",
                }),
              );
              setDebouncedSearch("");
            }}
            className="w-full text-sm text-red-600 border-red-200/50 hover:bg-red-50 hover:text-red-700 h-10 px-6"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile Panel View
  if (isMobilePanel) {
    return (
      <div className="space-y-4">
        {/* Filters */}
        <div className="pt-2">{filterContent}</div>

        {/* Close Button */}
        {onCloseMobilePanel && (
          <div className="pt-4 border-t border-emerald-200/20">
            <Button
              onClick={onCloseMobilePanel}
              className="w-full bg-slate-900 text-white hover:bg-slate-800"
            >
              Close Filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Desktop/Sidebar View
  return filterContent;
}
