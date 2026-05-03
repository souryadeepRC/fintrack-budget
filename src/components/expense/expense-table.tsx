"use client";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Expense } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { openEditExpenseModal, openDeleteExpenseModal } from "@/store/slices/uiSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, MoreVertical } from "lucide-react";

interface ExpenseTableProps {
  expenses: Expense[];
  isLoading: boolean;
  totalCount: number;
  totalAmount: number;
}

export function ExpenseTable({ expenses, isLoading, totalCount, totalAmount }: ExpenseTableProps) {
  const dispatch = useDispatch();

  const ActionMenu = ({ expenseId }: { expenseId: string }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => dispatch(openEditExpenseModal(expenseId))}
          className="cursor-pointer flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => dispatch(openDeleteExpenseModal(expenseId))}
          className="cursor-pointer flex items-center gap-2 text-red-600"
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
          <span className="font-medium text-slate-900">
            {format(new Date(getValue<string>()), "MMM dd, yyyy")}
          </span>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ getValue }) => (
          <span className="font-medium text-slate-900">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <span className="inline-block rounded-full bg-emerald-100/70 px-3 py-1 text-sm font-medium text-emerald-700">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "mode",
        header: "Payment Method",
        cell: ({ getValue }) => (
          <span className="text-sm text-slate-600">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => (
          <span className="font-bold text-emerald-600">
            {formatCurrency(getValue<number>())}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <ActionMenu expenseId={row.original.id} />,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: expenses,
    columns,
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
      <div className="rounded-2xl border border-emerald-200/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-8 shadow-md">
        <div className="text-center text-slate-500">Loading expenses...</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col gap-2 px-6 py-4 border-b border-emerald-200/30">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Recent Expenses
          </h3>
          <span className="text-sm font-semibold text-slate-600">
            {totalCount} transaction{totalCount !== 1 ? "s" : ""} • {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-500 font-medium">No expenses found for this period.</p>
          <p className="text-slate-400 text-sm mt-1">Add your first expense to get started.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead className="bg-gradient-to-r from-emerald-100/60 to-teal-100/60">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-6 py-4 text-left font-bold text-slate-700"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
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
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-emerald-200/30 bg-emerald-50/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border-emerald-200/50 hover:bg-emerald-50"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border-emerald-200/50 hover:bg-emerald-50"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
