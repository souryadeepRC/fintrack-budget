import { Client, ID, Databases, Query } from "appwrite";
import APIConfig from "./api-config";
import { ExpenseState } from "@/types/expense";
// utils
import { isDevelopment } from "./service-utils";
// mocks
import mockExpenseService from "@/assets/mockExpenseService";

class ExpenseService {
  client: Client = new Client();
  database: Databases;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.database = new Databases(this.client);
  }

  async addExpense(data: object): Promise<ExpenseState> {
    const expense = await this.database.createDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.expenses,
      ID.unique(),
      data
    );
    return {
      id: expense.$id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      mode: expense.mode,
      note: expense.note,
    };
  }
  async getAllExpenses(expenseDate?: Date): Promise<ExpenseState[]> {
    const now = expenseDate ? expenseDate : new Date();

    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
    );

    const startOfNextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
    );
    const expenses = await this.database.listDocuments(
      APIConfig.databaseId,
      APIConfig.collectionId.expenses,
      [
        Query.greaterThanEqual("date", startOfMonth.toISOString()),
        Query.lessThan("date", startOfNextMonth.toISOString()),
        Query.limit(100),
        Query.offset(0),
        Query.orderDesc("date"),
      ]
    );
    return expenses.documents.map((expense) => {
      return {
        id: expense.$id,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        mode: expense.mode,
        note: expense.note,
      };
    });
  }
  async updateExpense(data: object & { id: string }): Promise<ExpenseState> {
    const { id, ...updatedValue } = data || {};
    const expense = await this.database.updateDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.expenses,
      id,
      updatedValue
    );
    return {
      id: expense.$id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      mode: expense.mode,
      note: expense.note,
    };
  }
  async storeExpense(data: any): Promise<ExpenseState> {
    if (!data?.id) {
      const { id, ...rest } = data;
      return this.addExpense(rest);
    }
    return this.updateExpense(data);
  }
  async deleteExpense(documentId: string) {
    return await this.database.deleteDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.expenses,
      documentId
    );
  }
}

export default isDevelopment() ? mockExpenseService : new ExpenseService();
