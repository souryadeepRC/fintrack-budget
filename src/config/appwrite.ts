/**
 * Appwrite Configuration
 * Database and Collection constants for FinTrack application
 */

// Get values from environment variables
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "";
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";

// Database configuration
// Update these IDs after creating collections in Appwrite dashboard
const DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "fintrack_db";

// Collection IDs
const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "users",
  EXPENSES:
    process.env.NEXT_PUBLIC_APPWRITE_EXPENSES_COLLECTION_ID || "expenses",
  DEBTS: process.env.NEXT_PUBLIC_APPWRITE_DEBT_COLLECTION_ID || "debts",
  EXPENSE_CATEGORIES:
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_EXP_CATEGORY_ID || "categories",
  PAYMENT_METHODS:
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PAYMENT_ID || "payment",
};

// Validation: Ensure required environment variables are set
if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
  console.warn(
    "Appwrite environment variables are not fully configured. " +
      "Please set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  );
}

export { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, DATABASE_ID, COLLECTIONS };
