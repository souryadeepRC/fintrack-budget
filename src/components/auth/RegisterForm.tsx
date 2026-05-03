"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="glass-effect border border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl">
      <CardHeader className="text-center px-6 pt-6">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-emerald-300/80" />
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription className="text-slate-600">
          Start tracking your spending and reach your goals faster.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-4">
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
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-red-500">
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
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-red-500">
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-red-500">
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
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <FieldDescription className="text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </FieldDescription>
                  )}
                </Field>
              )}
            </form.Field>

            <Field>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Sign in
              </Link>
            </FieldDescription>

            <FieldDescription className="text-center mt-4 pt-4 border-t border-emerald-200/50">
              <Link
                href="/"
                className="text-slate-600 hover:text-emerald-600 font-medium inline-flex items-center gap-1"
              >
                ← Back to Home
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}