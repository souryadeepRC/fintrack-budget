"use client";

import React from "react";
import clsx from "clsx";

/* ----------------------------- */
/* 🔹 Loading Spinner */
/* ----------------------------- */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  description?: string;
  fullPage?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 border-2",
  md: "w-12 h-12 border-4",
  lg: "w-16 h-16 border-[5px]",
  xl: "w-20 h-20 border-[6px]",
};

export function LoadingSpinner({
  size = "md",
  text,
  description,
  fullPage = false,
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={clsx(
          "rounded-full border-emerald-200 border-t-emerald-600 animate-spin",
          sizeMap[size],
        )}
      />
      {text && <p className="text-md text-slate-600 font-medium">{text}</p>}
      {description && (
        <p className="text-sm text-slate-600 font-medium">{description}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className={clsx("flex justify-center", className)}>{spinner}</div>
  );
}

/* ----------------------------- */
/* 🔹 Loading Card */
/* ----------------------------- */

export function LoadingCard() {
  return (
    <div className="rounded-2xl border border-emerald-200/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 shadow-md animate-pulse space-y-4">
      <div className="h-4 w-1/3 bg-emerald-200/50 rounded" />
      <div className="h-3 w-1/2 bg-emerald-100 rounded" />
      <div className="h-3 w-full bg-emerald-100 rounded" />
      <div className="h-3 w-5/6 bg-emerald-100 rounded" />
    </div>
  );
}

/* ----------------------------- */
/* 🔹 Loading Table */
/* ----------------------------- */

export function LoadingTable({ count = 6 }: { count?: number }) {
  return (
    <div className="rounded-2xl border border-emerald-200/30 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 shadow-md overflow-hidden animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 border-b border-emerald-200/30 bg-white/50">
        <div className="h-5 w-40 bg-emerald-200/50 rounded" />
      </div>

      {/* Desktop */}
      <div className="hidden md:block p-4 space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 items-center">
            <div className="h-5 bg-emerald-200 rounded col-span-1" />
            <div className="h-5 bg-emerald-200 rounded col-span-2" />
            <div className="h-5 bg-emerald-200 rounded col-span-1" />
            <div className="h-5 bg-emerald-200 rounded col-span-1" />
            <div className="h-5 bg-emerald-200 rounded col-span-1" />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden p-4 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-emerald-100 p-3 space-y-2"
          >
            <div className="h-3 w-3/4 bg-emerald-200 rounded" />
            <div className="h-3 w-1/2 bg-emerald-100 rounded" />
            <div className="h-3 w-full bg-emerald-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- */
/* 🔹 Loading Overview Card */
/* ----------------------------- */

export function LoadingOverviewCard() {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200/30 shadow-md animate-pulse space-y-4">
      <div className="h-4 w-1/3 bg-emerald-200/50 rounded" />
      <div className="h-8 w-1/2 bg-emerald-300/50 rounded" />
      <div className="h-3 w-1/4 bg-emerald-100 rounded" />
    </div>
  );
}
