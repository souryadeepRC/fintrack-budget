"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LogOut, 
  User, 
  Settings,
  Bell,
  Wallet,
  TrendingDown,
} from "lucide-react";

export function AuthenticatedHeader() {
  const pathname = usePathname();
  const { user, logoutAsync } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navLinks = [
    { href: "/expenses", label: "Expenses", icon: Wallet },
    { href: "/debts", label: "Debts", icon: TrendingDown },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/30 bg-gradient-to-r from-white via-emerald-50/30 to-teal-50/30 backdrop-blur-xl shadow-sm animate-in fade-in duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/expenses" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
              FT
            </div>
            <span className="hidden sm:inline-block text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FinTrack
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant={isActive(href) ? "default" : "ghost"}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive(href)
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg"
                      : "text-slate-700 hover:bg-emerald-100/50 hover:text-emerald-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-emerald-200/50 hover:bg-emerald-100/50"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.full_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-slate-700">
                    {user?.full_name?.split(" ")[0] || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <div className="px-4 py-3 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.full_name || "User"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {user?.email}
                  </p>
                </div>

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2 mt-4 pt-4 border-t border-emerald-200/20 overflow-x-auto">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex-shrink-0">
              <Button
                variant={isActive(href) ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-1 text-xs ${
                  isActive(href)
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0"
                    : "border-emerald-200/50 hover:bg-emerald-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
