"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await auth.loginAsync(value.email, value.password);
        toast.success("Login successful!");
        router.push("/dashboard");
      } catch (error) {
        toast.error("Login failed. Please check your credentials.");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="relative w-full max-w-md">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/20 via-transparent to-cyan-400/20 blur-3xl" />

      <div className="relative rounded-3xl overflow-hidden">
        {/* Glass effect container */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60" />

        {/* Content */}
        <div className="relative px-8 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 mb-6">
              <span className="text-xl">✨</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                AI-Powered Finance
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-900 to-cyan-900 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-teal-700/60 text-sm">
              Sign in to manage your finances intelligently
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <FieldGroup>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email is required"
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? "Please enter a valid email"
                      : undefined,
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="email" className="text-teal-900 font-semibold">
                      Email Address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white/70 border-teal-200/50 focus:border-teal-400 focus:ring-teal-200 rounded-xl transition-all"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-red-500 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 8
                      ? "Password must be at least 8 characters"
                      : undefined,
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="password" className="text-teal-900 font-semibold">
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white/70 border-teal-200/50 focus:border-teal-400 focus:ring-teal-200 rounded-xl transition-all"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-red-500 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 disabled:opacity-70 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-teal-200/30" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gradient-to-br from-white/40 to-white/60 text-teal-600/70 font-medium">
                    New to Fintrack?
                  </span>
                </div>
              </div>

              <Link href="/auth/register">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-teal-200/50 text-teal-600 hover:bg-teal-50/50 font-semibold py-3 rounded-xl transition-all"
                >
                  Create Account
                </Button>
              </Link>

              <div className="text-center pt-4">
                <Link
                  href="/"
                  className="text-sm text-teal-600/60 hover:text-teal-600 font-medium inline-flex items-center gap-2 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-300/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-300/10 rounded-full blur-3xl" />
    </div>
  );
}