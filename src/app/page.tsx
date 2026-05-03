"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
/* import { useAuth } from "@/providers/auth-provider"; */
import GuestLanding from "@/components/landing/GuestLanding";
import { useAuth } from "@/providers/auth-provider";

export default function Home() {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return <GuestLanding />;
}
