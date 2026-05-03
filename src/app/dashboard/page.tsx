"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to expenses page by default
    router.replace("/expenses");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div> */}
        <p className="text-slate-600">Redirecting to expenses...</p>
      </div>
    </div>
  );
}