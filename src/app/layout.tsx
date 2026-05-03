import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { BudgetDataProvider } from "@/providers/budget-data-provider";
import { StoreProvider } from "@/providers/store-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Toaster } from "sonner";

const poppins = Poppins({ weight: "400" });

export const metadata: Metadata = {
  title: "Fintrack Budget",
  description: "Personal finance tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.style} ${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30">
        <QueryProvider>
          <StoreProvider>
            <Toaster richColors position="top-right" />
            <AuthProvider>
              <BudgetDataProvider>
                <LayoutWrapper>{children}</LayoutWrapper>
              </BudgetDataProvider>
            </AuthProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
