"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { AuthenticatedHeader } from "@/components/header/authenticated-header";

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const shouldShowHeader = isAuthenticated && !PUBLIC_ROUTES.includes(pathname);

  return (
    <>
      {shouldShowHeader && <AuthenticatedHeader />}
      <main className="flex-1">{children}</main>
    </>
  );
}
