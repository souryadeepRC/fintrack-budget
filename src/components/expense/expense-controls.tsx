"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { RootState } from "@/store";
import { setExpenseFilters, openAddExpenseModal } from "@/store/slices/uiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ArrowUpDown } from "lucide-react";

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

export function ExpenseControls() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.ui.expenseFilters);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setExpenseFilters({ search: debouncedSearch }));
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, dispatch]);

  const handleMonthChange = (month: string) => {
    dispatch(setExpenseFilters({ month }));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setExpenseFilters({ category: category === "all" ? "" : category }));
  };

  const handlePaymentMethodChange = (paymentMethod: string) => {
    dispatch(setExpenseFilters({ paymentMethod: paymentMethod === "all" ? "" : paymentMethod }));
  };

  const handleSortChange = (sortBy: string) => {
    const newSortBy = sortBy as "date" | "amount";
    // If clicking same sort, toggle order
    if (filters.sortBy === newSortBy) {
      dispatch(setExpenseFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" }));
    } else {
      dispatch(setExpenseFilters({ sortBy: newSortBy, sortOrder: "desc" }));
    }
  };

  const handleAddExpense = () => {
    dispatch(openAddExpenseModal());
  };

  const monthOptions = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = format(date, "yyyy-MM");
    const label = format(date, "MMMM yyyy");
    monthOptions.push({ value, label });
  }

  const getSortLabel = () => {
    const baseLabel = filters.sortBy === "date" ? "Date" : "Amount";
    const arrow = filters.sortOrder === "desc" ? "↓" : "↑";
    return `${baseLabel} ${arrow}`;
  };

  return (
    <div className="rounded-2xl border border-emerald-200/30 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 p-6 shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col gap-6">
        {/* Row 1: Month, Search, Category, Payment Method */}
        <div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="month-select" className="text-sm font-semibold text-slate-700">
              Month
            </Label>
            <Select value={filters.month} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-full border-emerald-200/50 bg-white/70 hover:bg-white hover:border-emerald-300/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-input" className="text-sm font-semibold text-slate-700">
              Search Title
            </Label>
            <Input
              id="search-input"
              placeholder="Search expenses..."
              value={debouncedSearch}
              onChange={(e) => setDebouncedSearch(e.target.value)}
              className="w-full border-emerald-200/50 bg-white/70 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-select" className="text-sm font-semibold text-slate-700">
              Category
            </Label>
            <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full border-emerald-200/50 bg-white/70 hover:bg-white hover:border-emerald-300/70">
                <SelectValue />
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

          <div className="space-y-2">
            <Label htmlFor="payment-select" className="text-sm font-semibold text-slate-700">
              Payment Method
            </Label>
            <Select value={filters.paymentMethod || "all"} onValueChange={handlePaymentMethodChange}>
              <SelectTrigger className="w-full border-emerald-200/50 bg-white/70 hover:bg-white hover:border-emerald-300/70">
                <SelectValue />
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
        </div>

        {/* Row 2: Sort Buttons and Add Expense */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
          <Button
            variant="outline"
            onClick={() => handleSortChange("date")}
            className={`flex items-center gap-2 border-emerald-200/50 ${
              filters.sortBy === "date"
                ? "bg-emerald-100/80 text-emerald-700 border-emerald-400/70"
                : "bg-white/70 text-slate-700 hover:bg-emerald-50/50"
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Date {filters.sortBy === "date" ? (filters.sortOrder === "desc" ? "↓" : "↑") : ""}
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSortChange("amount")}
            className={`flex items-center gap-2 border-emerald-200/50 ${
              filters.sortBy === "amount"
                ? "bg-teal-100/80 text-teal-700 border-teal-400/70"
                : "bg-white/70 text-slate-700 hover:bg-teal-50/50"
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            Amount {filters.sortBy === "amount" ? (filters.sortOrder === "desc" ? "↓" : "↑") : ""}
          </Button>

          <Button
            onClick={handleAddExpense}
            className="ml-auto flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </div>
      </div>
    </div>
  );
}
