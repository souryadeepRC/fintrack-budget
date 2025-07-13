import { DebtState } from "@/types/debt";
import { ID } from "appwrite";
import { mockDebts } from "./mockDebt";

class DebtService {
  constructor() {}

  async addDebt(data: any): Promise<DebtState> {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: ID.unique() }), 1000)
    );
  }
  async getAllDebts(): Promise<DebtState[]> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(mockDebts);
      }, 8000)
    );
  }
  async updateDebt(data: DebtState): Promise<DebtState> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
  }
  async storeDebt(data: any): Promise<DebtState> {
    if (data?.id) {
      return this.updateDebt(data);
    }
    return this.addDebt(data);
  }
  async deleteDebt(_documentId: string) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
const expenseService = new DebtService();
export default expenseService;
