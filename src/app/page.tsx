'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import GuestLanding from '@/components/landing/GuestLanding';
import { LoadingSpinner } from '@/components/loader/LoadingSpinner';
import { useAuth } from '@/providers/auth-provider';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth, or while waiting to redirect an authenticated user
  if (isLoading || isAuthenticated) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return <GuestLanding />;
}
