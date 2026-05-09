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

export function RegisterForm() {
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setIsLoading(true);
      try {
        await auth.registerAsync(value.name, value.email, value.password);
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="relative w-full max-w-md">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-400/20 via-transparent to-teal-400/20 blur-3xl" />

      <div className="relative rounded-3xl overflow-hidden">
        {/* Glass effect container */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60" />

        {/* Content */}
        <div className="relative px-8 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200/50 mb-6">
              <span className="text-xl">🚀</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Start Your Journey
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-900 to-teal-900 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-cyan-700/60 text-sm">
              Join thousands managing finances with AI insights
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup>
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Name is required"
                      : value.length < 2
                      ? "Name must be at least 2 characters"
                      : value.length > 50
                      ? "Name must be less than 50 characters"
                      : undefined,
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="name" className="text-cyan-900 font-semibold">
                      Full Name
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white/70 border-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-200 rounded-xl transition-all"
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
                    <FieldLabel htmlFor="email" className="text-cyan-900 font-semibold">
                      Email Address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white/70 border-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-200 rounded-xl transition-all"
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
                    <FieldLabel htmlFor="password" className="text-cyan-900 font-semibold">
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white/70 border-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-200 rounded-xl transition-all"
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
                name="confirmPassword"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Please confirm your password"
                      : undefined,
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="confirmPassword" className="text-cyan-900 font-semibold">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white/70 border-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-200 rounded-xl transition-all"
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
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 disabled:opacity-70 shadow-lg hover:shadow-xl mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cyan-200/30" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gradient-to-br from-white/40 to-white/60 text-cyan-600/70 font-medium">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link href="/auth/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-cyan-200/50 text-cyan-600 hover:bg-cyan-50/50 font-semibold py-3 rounded-xl transition-all"
                >
                  Sign In
                </Button>
              </Link>

              <div className="text-center pt-3">
                <Link
                  href="/"
                  className="text-sm text-cyan-600/60 hover:text-cyan-600 font-medium inline-flex items-center gap-2 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-300/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-300/10 rounded-full blur-3xl" />
    </div>
  );
}