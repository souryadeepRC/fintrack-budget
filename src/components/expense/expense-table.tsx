﻿"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { format } from "date-fns";

import {
  ChevronLeft,
  ChevronRight,
  Edit,
  MoreVertical,
  Trash2,
} from "lucide-react";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatCurrency } from "@/lib/utils";

import { Expense } from "@/types";

import { LoadingTable } from "../loader/LoadingSpinner";

interface ExpenseTableProps {
  expenses: Expense[];
  isLoading: boolean;
  totalCount: number;
  totalAmount: number;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expenseId: string) => void;
}

export function ExpenseTable({
  expenses,
  isLoading,
  totalCount,
  totalAmount,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  const ActionMenu = ({ expense }: { expense: Expense }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:ring-1 focus-visible:ring-emerald-500 outline-none data-[state=open]:bg-slate-100 transition-colors"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-slate-100 p-1.5 animate-in zoom-in-95 bg-white">
        <DropdownMenuItem
          onClick={() => onEdit?.(expense)}
          className="cursor-pointer flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 focus:text-emerald-700 rounded-md transition-colors outline-none"
        >
          <Edit className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <div className="h-px bg-slate-100 my-1 mx-1" />
        <DropdownMenuItem
          onClick={() => onDelete?.(expense.id)}
          className="cursor-pointer flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 rounded-md transition-colors outline-none"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const columns = useMemo<ColumnDef<Expense>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ getValue }) => (
          <span className="font-medium text-slate-900 text-sm md:text-base">
            {format(new Date(getValue<string>()), "MMM dd, yyyy")}
          </span>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ getValue }) => (
          <span className="font-medium text-slate-900 text-sm md:text-base line-clamp-2">
            {getValue<string>()}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <span className="inline-block rounded-full bg-emerald-100/70 px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-emerald-700 whitespace-nowrap">
            {getValue<string>()}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "mode",
        header: "Payment",
        cell: ({ getValue }) => (
          <span className="text-xs md:text-sm text-slate-600 hidden sm:inline whitespace-nowrap">
            {getValue<string>()}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => (
          <span className="font-bold text-emerald-600 text-sm md:text-base whitespace-nowrap">
            {formatCurrency(getValue<number>())}
          </span>
        ),
        enableSorting: true,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <ActionMenu expense={row.original} />,
        enableSorting: false,
      },
    ],
    [],
  );
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: expenses,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), // 👈 REQUIRED
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-emerald-200/30 bg-linear-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 md:p-8 shadow-md">
        <div className="text-center text-slate-500 text-sm md:text-base">
          <LoadingTable count={9} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200/30 bg-linear-to-br
     from-emerald-50/40 via-white to-teal-50/30 shadow-md overflow-hidden 
     hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Header with Stats */}
      <div className="flex flex-col gap-3 px-4 md:px-6 py-4 border-b border-emerald-200/30 bg-white/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base md:text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Recent Expenses
          </h3>
          <span className="text-xs md:text-sm font-semibold text-slate-600">
            {totalCount} transaction{totalCount !== 1 ? "s" : ""} •{" "}
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="py-12 md:py-16 text-center px-4">
          <p className="text-slate-500 font-medium text-sm md:text-base">
            No expenses found for this period.
          </p>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Add your first expense to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="md:hidden space-y-2 py-2">
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="bg-white rounded-xl border border-emerald-100 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 line-clamp-2">
                      {row.original.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {format(new Date(row.original.date), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <ActionMenu expense={row.original} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-emerald-50">
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block rounded-full bg-emerald-100/70 px-2 py-1 text-xs font-medium text-emerald-700">
                      {row.original.category}
                    </span>
                    <span className="inline-block text-xs text-slate-600 bg-slate-100/70 rounded-full px-2 py-1">
                      {row.original.mode}
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm">
                    {formatCurrency(row.original.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead className="bg-linear-to-r from-emerald-100/60 to-teal-100/60">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-6 py-4 text-left font-bold text-slate-700 text-sm cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-emerald-100/40 transition-colors ${
                      idx % 2 === 0 ? "bg-white/50" : "bg-emerald-50/20"
                    } hover:bg-emerald-100/20`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-emerald-200/30 bg-emerald-50/30 px-4 md:px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs md:text-sm font-medium text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border-emerald-200/50 hover:bg-emerald-50 text-xs md:text-sm flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border-emerald-200/50 hover:bg-emerald-50 text-xs md:text-sm flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
