"use client";

import { AlertCircle } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  headerEnd?: React.ReactNode;
  required?: boolean;
  error?: string;
  helperText?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      type = "text",
      id,
      required,
      headerEnd,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <div className="flex justify-between items-center ">
            <Label
              htmlFor={inputId}
              className="text-sm font-semibold text-slate-700"
            >
              {label}&nbsp;{required && <span className="text-red-500">*</span>}
            </Label>
            {headerEnd}
          </div>
        )}
        <Input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "border-slate-200 bg-white focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-colors",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500">{helperText}</p>
        )}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";
