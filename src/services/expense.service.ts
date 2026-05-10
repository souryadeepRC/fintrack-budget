/**
 * Expense Service
 * Handles CRUD operations for expenses
 */

import { ID,Query } from 'appwrite';

import { COLLECTIONS,DATABASE_ID } from '@/config/appwrite';
import { databases } from '@/lib/appwrite';
import {
  Expense,
  ExpenseCreatePayload,
  ExpenseFilter,
} from '@/types';

/**
 * Create a new expense
 * @param userId - User ID who created the expense
 * @param categoryId - Category ID for the expense
 * @param amount - Expense amount
 * @param description - Description of the expense
 * @param date - Date of the expense (ISO DateTime)
 * @returns Promise with created expense
 */
export async function createExpense(
  data: ExpenseCreatePayload,
): Promise<Expense> {
  try {
    const expenseId = ID.unique();
    const response = await databases.createRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.EXPENSES,
      rowId: expenseId,
      data,
    });

    return formatExpenseResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Get expenses for a user with optional filters
 * @param filters - Filter options (userId required, others optional)
 * @returns Promise with paginated expenses
 */
export async function getExpenses(
  filters: ExpenseFilter,
): Promise<Array<Expense>> {
  try {
    const queries: string[] = []; 
    
    if (filters.startDate) {
      queries.push(Query.greaterThanEqual('date', filters.startDate));
    }

    if (filters.endDate) {
      queries.push(Query.lessThan('date', filters.endDate));
    }

    if (filters.minAmount !== undefined) {
      queries.push(Query.greaterThanEqual('amount', filters.minAmount));
    }

    if (filters.maxAmount !== undefined) {
      queries.push(Query.lessThanEqual('amount', filters.maxAmount));
    }

    // Pagination
    const limit = filters.limit || 50;
    const offset = filters.offset || 0;

    queries.push(Query.limit(limit));
    queries.push(Query.offset(offset));
    queries.push(Query.orderDesc('date'));
 
    
    const response = await databases.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.EXPENSES,
      queries,
    });

    return response.rows.map(formatExpenseResponse);
  } catch (error) {
    throw new Error(
      `Failed to fetch expenses: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Get a single expense by ID
 * @param expenseId - Expense document ID
 * @returns Promise with expense data
 */
export async function getExpenseById(expenseId: string): Promise<Expense> {
  try {
    const response = await databases.getRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.EXPENSES,
      rowId: expenseId,
    });

    return formatExpenseResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to fetch expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Update an existing expense
 * @param expenseId - Expense document ID
 * @param updates - Fields to update (partial)
 * @returns Promise with updated expense
 */
export async function updateExpense(
  expenseId: string,
  updates: Partial<Omit<Expense, '$id' | '$createdAt' | '$updatedAt'>>,
): Promise<Expense> {
  try {
    const response = await databases.updateRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.EXPENSES,
      rowId: expenseId,
      data: updates,
    });

    return formatExpenseResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to update expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Delete an expense
 * @param expenseId - Expense document ID
 * @returns Promise that resolves when expense is deleted
 */
export async function deleteExpense(expenseId: string): Promise<void> {
  try {
    await databases.deleteRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.EXPENSES,
      rowId: expenseId,
    });
  } catch (error) {
    throw new Error(
      `Failed to delete expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Get total spending for a user in a date range
 * @param userId - User ID
 * @param startDate - Start date (ISO DateTime)
 * @param endDate - End date (ISO DateTime)
 * @returns Promise with total amount spent
 */
export async function getTotalSpending(
  userId: string,
  startDate: string,
  endDate: string,
): Promise<number> {
  try {
    const response = await databases.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.EXPENSES,
      queries: [
        Query.equal('user_id', userId),
        Query.greaterThanEqual('date', startDate),
        Query.lessThanEqual('date', endDate),
      ],
    });

    return response.rows.reduce((sum, doc) => sum + (doc.amount || 0), 0);
  } catch (error) {
    throw new Error(
      `Failed to calculate total spending: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Helper function to format expense response from Appwrite
 */
function formatExpenseResponse(doc: Record<string, unknown>): Expense {
  return {
    id: doc.$id as string,
    title: doc.title as string,
    category: doc.category as string,
    amount: doc.amount as number,
    date: doc.date as string,
    mode: doc.mode as string,
  };
}
