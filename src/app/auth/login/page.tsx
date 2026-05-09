"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-teal-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render form if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-300/20 to-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-b from-emerald-300/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}