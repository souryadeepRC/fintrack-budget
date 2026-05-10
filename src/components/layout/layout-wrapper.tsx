'use client';

import { usePathname } from 'next/navigation';

import { NavigationHeader } from '@/components/header/navigation-header';
import { useAuth } from '@/providers/auth-provider';

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/register'];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const shouldShowHeader = isAuthenticated && !PUBLIC_ROUTES.includes(pathname);

  return (
    <>
      {shouldShowHeader && <NavigationHeader />}
      <main className="max-w-6xl md:mx-auto py-2 px-4 md:p-8  space-y-3 md:space-y-8">{children}</main>
    </>
  );
}
