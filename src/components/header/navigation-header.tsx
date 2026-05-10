'use client';

import { 
  ArrowRightLeft, 
  BellDot,
  LayoutDashboard, 
  LogOut,
  Menu, 
  Receipt, 
  Sparkles, 
  X} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect,useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/auth-provider';

export function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const { user, logoutAsync } = useAuth();

  // Handle glassmorphism blur effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAsync();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const navLinks = [
    { name: 'Dashboard', href: '/', icon: <LayoutDashboard className='w-4 h-4' /> },
    { name: 'Expenses', href: '/expenses', icon: <Receipt className='w-4 h-4' /> },
    { name: 'Loans & Debts', href: '/debts', icon: <ArrowRightLeft className='w-4 h-4' /> },
    { name: 'Notifications', href: '/notifications', icon: <BellDot className='w-4 h-4' /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_4px_30px_rgba(16,185,129,0.1)]' 
          : 'bg-slate-950 border-b border-white/5'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          
          {/* Branding / Logo */}
          <Link href='/' className='flex-shrink-0 flex items-center gap-2 group'>
            <div className='w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.4)] group-hover:shadow-[0_0_25px_rgba(52,211,153,0.6)] transition-all'>
              <Sparkles className='w-5 h-5 text-slate-950' />
            </div>
            <span className='font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'>
              Fintract<span className='text-emerald-400'>.ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className='hidden md:flex items-center gap-4'>
            <button className='relative group overflow-hidden rounded-full p-[1px]'>
              <span className='absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-full animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity'></span>
              <div className='relative flex items-center gap-2 px-4 py-1.5 bg-slate-950 rounded-full text-sm font-semibold text-emerald-400 transition-all group-hover:bg-slate-900'>
                <Sparkles className='w-4 h-4' />
                Ask AI
              </div>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold cursor-pointer hover:border-emerald-500/50 transition-colors'>
                  {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56 bg-slate-900 border-slate-800 text-slate-200 mt-2'>
                <div className='px-4 py-3 border-b border-slate-800'>
                  <p className='text-sm font-semibold text-white'>{user?.full_name || 'User'}</p>
                  <p className='text-xs text-slate-400 mt-0.5 truncate'>{user?.email}</p>
                </div>
                <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)} className='cursor-pointer flex items-center gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400 p-3 mt-1 rounded-md'>
                  <LogOut className='w-4 h-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setIsOpen(!isOpen)} className='text-slate-400 hover:text-emerald-400 focus:outline-none p-2 transition-colors'>
              {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Off-canvas / Dropdown Menu */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='px-4 pt-2 pb-6 space-y-2'>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-2 py-1 rounded-xl text-base font-medium transition-all ${pathname === link.href ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {link.icon} {link.name}
            </Link>
          ))}
          <div className='pt-1 mt-2 border-t border-white/10'>
            <div className='flex items-center gap-3 px-2 py-2 mb-2 bg-white/5 rounded-xl border border-white/10'>
              <div className='w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold shrink-0'>
                {user?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className='flex flex-col overflow-hidden'>
                <span className='text-sm font-bold text-white truncate'>{user?.full_name || 'User'}</span>
                <span className='text-xs text-slate-400 truncate'>{user?.email}</span>
              </div>
            </div>
            <button onClick={() => { setIsOpen(false); setShowLogoutConfirm(true); }} className='w-full flex items-center justify-center gap-2 px-4 py-2 mb-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-base font-semibold transition-colors'>
              <LogOut className='w-4 h-4' /> Logout
            </button>
            <button className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white rounded-xl text-base font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)]'>
              <Sparkles className='w-5 h-5' /> Ask Fintract AI
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className='fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4'>
          <div className='bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 flex flex-col gap-4'>
            <h3 className='text-xl font-bold text-white'>Confirm Logout</h3>
            <p className='text-sm text-slate-400 leading-relaxed'>Are you sure you want to log out of your Fintract account? You'll need to sign in again to access your dashboard.</p>
            <div className='flex justify-end gap-3 mt-4'>
              <button onClick={() => setShowLogoutConfirm(false)} disabled={isLoggingOut} className='px-5 py-2.5 text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors'>
                Cancel
              </button>
              <button onClick={handleLogout} disabled={isLoggingOut} className='px-5 py-2.5 text-sm font-semibold text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center min-w-[90px]'>
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}