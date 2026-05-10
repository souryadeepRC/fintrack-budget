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
      <main className='flex-1'>{children}</main>
    </>
  );
}
