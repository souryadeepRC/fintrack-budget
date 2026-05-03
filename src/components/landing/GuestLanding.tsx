"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  PieChart,
  Lock,
  BarChart3,
  Zap,
} from "lucide-react";

export default function GuestLanding() {
  return (
    <div className="min-h-screen bg-gradient-ai">
      {/* Animated AI background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/60 rounded-full text-sm font-medium text-emerald-700">
              <Zap className="w-4 h-4" />
              AI-Powered Financial Intelligence
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Smart Money{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Harness the power of intelligent financial tracking. FinTrack
              combines AI-driven insights with intuitive design to help you
              master your finances.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="cursor-pointer px-10 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl  h-15 text-xl"
                >
                  Sign up for free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer px-10 w-full sm:w-auto border-emerald-200 hover:bg-emerald-50 h-15 text-xl"
                >
                  Already a user? Login
                </Button>
              </Link>
            </div>
          </div>

          {/* AI Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-400/20 rounded-2xl blur-3xl"></div>
            <div className="relative glass-effect rounded-2xl p-8 border border-emerald-200/70">
              {/* Dashboard Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-24"></div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/80 rounded-lg p-3 border border-emerald-100">
                  <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded w-12 mb-2"></div>
                  <div className="h-3 bg-slate-300 rounded w-16"></div>
                </div>
                <div className="bg-teal-50/80 rounded-lg p-3 border border-teal-100">
                  <div className="h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded w-12 mb-2"></div>
                  <div className="h-3 bg-slate-300 rounded w-16"></div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-slate-100 rounded"></div>
                <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                <div className="h-2 bg-slate-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20 border-t border-emerald-100 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Intelligent Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced AI-powered tools designed for modern financial management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group card-ai p-6 hover:bg-emerald-50/50">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                AI-Driven Insights
              </h3>
              <p className="text-slate-600 text-sm">
                Intelligent analysis of your spending patterns with predictive
                recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group card-ai p-6 hover:bg-teal-50/50">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-teal-200 group-hover:to-teal-300 transition-all">
                <PieChart className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Smart Analytics
              </h3>
              <p className="text-slate-600 text-sm">
                Beautiful visualizations that reveal where your money goes at a
                glance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group card-ai p-6 hover:bg-cyan-50/50">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-cyan-200 group-hover:to-cyan-300 transition-all">
                <BarChart3 className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Debt Management
              </h3>
              <p className="text-slate-600 text-sm">
                Intelligent tracking of debts with smart settlement
                recommendations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group card-ai p-6 hover:bg-emerald-50/50">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Bank-Level Security
              </h3>
              <p className="text-slate-600 text-sm">
                Enterprise-grade encryption keeping your financial data
                completely secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-slate-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                $2B+
              </div>
              <p className="text-slate-600">Tracked Transactions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <p className="text-slate-600">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready for smarter finances?
            </h2>
            <p className="text-lg mb-8 text-emerald-100 max-w-2xl mx-auto">
              Join thousands of users leveraging AI-powered insights to take
              control of their finances.
            </p>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold hover:bg-white/90"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/50 backdrop-blur py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
                <h3 className="font-bold text-lg text-slate-900">FinTrack</h3>
              </div>
              <p className="text-slate-600 text-sm">
                AI-powered intelligent financial management for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-100 pt-8 text-center text-sm text-slate-600">
            <p>
              &copy; 2026 FinTrack. All rights reserved. Powered by intelligent
              AI.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
