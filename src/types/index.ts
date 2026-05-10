/**
 * TypeScript Type Definitions for FinTrack Application
 */

/**
 * User type - represents a user in the system
 */
export interface User {
  $id: string; // Appwrite document ID
  user_id: string; // Appwrite User ID
  email: string;
  full_name: string;
  monthly_budget?: number; // Optional, can be null
  preferred_currency: string; // Default: "USD"
  created_at: string; // ISO DateTime
  $createdAt?: string; // Appwrite metadata
  $updatedAt?: string; // Appwrite metadata
}

/**
 * Expense Category type - represents expense categories
 */
export interface ExpenseCategory {
  id: string; // Appwrite document ID
  name: string; // e.g., "Food", "Transport", "Utilities"
}

/**
 * Payment method - represents payment methods
 */
export interface PaymentMethod {
  id: string; // Appwrite document ID
  name: string; // e.g., "Google Pay", "Cash"
}

/**
 * Expense type - represents a spending transaction
 */
export interface Expense {
  id: string; // Appwrite document ID
  title: string;
  category: string; // Foreign key to Categories
  amount: number; // Spending amount
  mode: string;
  date: string; // ISO DateTime of the expense
}

export type ExpenseCreatePayload = Omit<Expense, 'id'>;
/**
 * ExpenseFilter type - used for filtering expenses in queries
 */
export interface ExpenseFilter {
  userId?: string; // Required: filter by user
  categoryId?: string; // Optional: filter by specific category
  startDate?: string; // Optional: filter from date (ISO DateTime)
  endDate?: string; // Optional: filter to date (ISO DateTime)
  minAmount?: number; // Optional: minimum amount
  maxAmount?: number; // Optional: maximum amount
  sortBy?: 'date_asc' | 'date_desc' | 'amount_asc' | 'amount_desc'; // Default: "date_desc"
  limit?: number; // Default: 50
  offset?: number; // Default: 0
}

/**
 * API Response wrapper type for paginated results
 */
export interface PaginatedResponse<T> {
  documents: T[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Error response type
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Authentication state type
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: ApiError | null;
}

/**
 * Monthly spending summary
 */
export interface MonthlySummary {
  month: string; // YYYY-MM format
  totalSpent: number;
  totalBudget?: number;
  percentageUsed?: number;
  categoryBreakdown: Record<string, number>; // categoryName -> amount
}

/**
 * Dashboard overview data
 */
export interface DashboardData {
  currentMonth: MonthlySummary;
  previousMonth?: MonthlySummary;
  topExpenses: Expense[]; // Top 5-10 recent expenses
  categories: ExpenseCategory[];
  recentExpenses: Expense[]; // Latest 10 expenses
}

export type Debt = {
  id: string;
  title: string;
  name: string;
  amount: number;
  category: string;
  isRepayment: boolean;
  mode: string;
  date: string;
  debtId: number;
};

export type DebtCreatePayload = Omit<Debt, 'id'>;
export type DebtPersonData = {
  name: string;
  title: string;
  category: string;
  totalPaid: number;
  totalRepaid: number;
  netBalance: number;
  transactions: Array<Debt>;
};

export type Notification = {
  id: string;
  title: string;
  amount: number;
  category: string;
  expiryDate: string;
  mode: string;
  isMonthly: boolean;
  period: number;
};
