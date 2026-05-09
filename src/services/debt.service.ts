/**
 * Debt Service
 * Handles CRUD operations for debts and repayments
 */

import { databases } from "@/lib/appwrite";
import { DATABASE_ID, COLLECTIONS } from "@/config/appwrite";
import { Debt, DebtCreatePayload } from "@/types";
import { Query, ID } from "appwrite";

export interface DebtFilter {
  limit?: number; // Default: 50
  offset?: number; // Default: 0
  isRepayment?: boolean; // Filter by repayment status
  category?: string; // Filter by category
  sortBy?: "date_asc" | "date_desc" | "amount_asc" | "amount_desc"; // Default: "date_desc"
}

/**
 * Create a new debt or repayment record
 * @param data - Debt data (name, amount, category, isRepayment, date)
 * @returns Promise with created debt
 */
export async function createDebt(data: DebtCreatePayload): Promise<Debt> {
  try {
    const debtId = ID.unique();
    const response = await databases.createRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      rowId: debtId,
      data: { ...data, debtId: data.debtId || Date.now() },
    });

    return formatDebtResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to create debt: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get all debts with optional filters
 * @param filters - Filter options
 * @returns Promise with array of debts
 */
export async function getDebts(filters?: DebtFilter): Promise<Debt[]> {
  try {
    const queries: string[] = [];

    // Add filters
    if (filters?.isRepayment !== undefined) {
      queries.push(Query.equal("is_repayment", filters.isRepayment));
    }

    if (filters?.category) {
      queries.push(Query.equal("category", filters.category));
    }

    // Sorting
    if (filters?.sortBy === "date_asc") {
      queries.push(Query.orderAsc("date"));
    } else if (filters?.sortBy === "amount_asc") {
      queries.push(Query.orderAsc("amount"));
    } else if (filters?.sortBy === "amount_desc") {
      queries.push(Query.orderDesc("amount"));
    } else {
      // Default: sort by date descending
      queries.push(Query.orderDesc("date"));
    }

    // Pagination
    const limit = filters?.limit || 100;
    const offset = filters?.offset || 0;
    queries.push(Query.limit(limit));
    queries.push(Query.offset(offset));

    const response = await databases.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      queries,
    });

    return response.rows.map(formatDebtResponse);
  } catch (error) {
    throw new Error(
      `Failed to fetch debts: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get a single debt by ID
 * @param debtId - Debt document ID
 * @returns Promise with debt data
 */
export async function getDebtById(debtId: string): Promise<Debt> {
  try {
    const response = await databases.getRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      rowId: debtId,
    });

    return formatDebtResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to fetch debt: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Update an existing debt
 * @param debtId - Debt document ID
 * @param updates - Fields to update (partial)
 * @returns Promise with updated debt
 */
export async function updateDebt(
  debtId: string,
  updates: Partial<Omit<Debt, "id">>,
): Promise<Debt> {
  try {
    const response = await databases.updateRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      rowId: debtId,
      data: updates,
    });

    return formatDebtResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to update debt: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Delete a debt record
 * @param debtId - Debt document ID
 * @returns Promise that resolves when debt is deleted
 */
export async function deleteDebt(debtId: string): Promise<void> {
  try {
    await databases.deleteRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      rowId: debtId,
    });
  } catch (error) {
    throw new Error(
      `Failed to delete debt: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get total debt amount across all debt records
 * @returns Promise with total debt amount
 */
export async function getTotalDebt(): Promise<number> {
  try {
    const response = await databases.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      queries: [Query.equal("isRepayment", false)], // Only count actual debts, not repayments
    });

    return response.rows.reduce((sum, doc) => sum + (doc.amount || 0), 0);
  } catch (error) {
    throw new Error(
      `Failed to calculate total debt: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get total repayment amount
 * @returns Promise with total repayment amount
 */
export async function getTotalRepayment(): Promise<number> {
  try {
    const response = await databases.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.DEBTS,
      queries: [Query.equal("isRepayment", true)],
    });

    return response.rows.reduce((sum, doc) => sum + (doc.amount || 0), 0);
  } catch (error) {
    throw new Error(
      `Failed to calculate total repayment: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Helper function to format debt response from Appwrite
 */
function formatDebtResponse(doc: Record<string, unknown>): Debt {
  return {
    id: doc.$id as string,
    name: doc.name as string,
    title: doc.title as string,
    amount: doc.amount as number,
    category: doc.category as string,
    mode: doc.mode as string,
    isRepayment: doc.isRepayment as boolean,
    date: doc.date as string,
    debtId: doc.debtId as number,
  };
}
