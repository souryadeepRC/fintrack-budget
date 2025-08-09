import { ExpenseState } from "@/types/expense";
import { ID } from "appwrite";
import { mockExpenses } from "./mockExpense";

class ExpenseService {
  constructor() {}

  async addExpense(data: any): Promise<ExpenseState> {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: ID.unique() }), 1000)
    );
  }
  async getAllExpenses(): Promise<ExpenseState[]> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(mockExpenses);
      }, 200)
    );
  }
  async updateExpense(data: ExpenseState): Promise<ExpenseState> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
  }
  async storeExpense(data: any): Promise<ExpenseState> {
    if (data?.id) {
      return this.updateExpense(data);
    }
    if (data.title == "Error") throw new Error("Test Error ");
    return this.addExpense(data);
  }
  async deleteExpense(_documentId: string) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
const expenseService = new ExpenseService();
export default expenseService;
