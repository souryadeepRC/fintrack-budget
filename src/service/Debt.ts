import { Client, ID, Databases, Query } from "appwrite";
import APIConfig from "./api-config";
import { DebtState } from "@/types/debt";
// utils
import { isDevelopment } from "./service-utils";
// mocks
import mockDebtService from "@/assets/mockDebtService";

class DebtService {
  client: Client = new Client();
  database: Databases;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.database = new Databases(this.client);
  }

  async addDebt(data: object): Promise<DebtState> {
    const debt = await this.database.createDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.debts,
      ID.unique(),
      data
    );
    return {
      id: debt.$id,
      title: debt.title,
      amount: debt.amount,
      category: debt.category,
      date: debt.date,
      mode: debt.mode,
      note: debt.note,
      name: debt.name,
      dueDate: debt.dueDate,
      status: debt.status,
      clearedAmount: debt.clearedAmount,
      clearanceDate: debt.clearanceDate,
    };
  }
  async getAllDebts(): Promise<DebtState[]> {
    const debts = await this.database.listDocuments(
      APIConfig.databaseId,
      APIConfig.collectionId.debts,
      [Query.orderDesc("status")]
    );
    return debts.documents.map((debt) => {
      return {
        id: debt.$id,
        title: debt.title,
        amount: debt.amount,
        category: debt.category,
        date: debt.date,
        mode: debt.mode,
        note: debt.note,
        name: debt.name,
        dueDate: debt.dueDate,
        status: debt.status,
        clearedAmount: debt.clearedAmount,
        clearanceDate: debt.clearanceDate,
      };
    });
  }
  async updateDebt(data: object & { id: string }): Promise<DebtState> {
    const { id, ...updatedValue } = data || {};
    const debt = await this.database.updateDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.debts,
      id,
      updatedValue
    );
    return {
      id: debt.$id,
      title: debt.title,
      amount: debt.amount,
      category: debt.category,
      date: debt.date,
      mode: debt.mode,
      note: debt.note,
      name: debt.name,
      dueDate: debt.dueDate,
      status: debt.status,
      clearedAmount: debt.clearedAmount,
      clearanceDate: debt.clearanceDate,
    };
  }
  async storeDebt(data: any): Promise<DebtState> {
    if (!data?.id) {
      const { id, ...rest } = data;
      return this.addDebt(rest);
    }
    return this.updateDebt(data);
  }
  async deleteDebt(documentId: string) {
    return await this.database.deleteDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.debts,
      documentId
    );
  }
}

export default isDevelopment() ? mockDebtService : new DebtService();
