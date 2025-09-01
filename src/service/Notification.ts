import { Client, ID, Databases } from "appwrite";
import APIConfig from "./api-config";
import { NotificationState } from "@/types/notification";
// utils
import { isDevelopment } from "./service-utils";
// mocks
import mockNotificationService from "@/assets/mockNotificationService";

class NotificationService {
  client: Client = new Client();
  database: Databases;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.database = new Databases(this.client);
  }

  async addNotification(data: object): Promise<NotificationState> {
    const notification = await this.database.createDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.notifications,
      ID.unique(),
      data
    );
    return {
      id: notification.$id,
      title: notification.title,
      note: notification.note,
      amount: notification.amount,
      expiryDate: notification.expiryDate,
      category: notification.category,
      mode: notification.mode,
      period: notification.period,
    };
  }
  async getAllNotifications(): Promise<NotificationState[]> {
    const notifications = await this.database.listDocuments(
      APIConfig.databaseId,
      APIConfig.collectionId.notifications,
      []
    );
    return notifications.documents.map((notification) => {
      return {
        id: notification.$id,
        title: notification.title,
        note: notification.note,
        amount: notification.amount,
        expiryDate: notification.expiryDate,
        category: notification.category,
        mode: notification.mode,
        period: notification.period,
      };
    });
  }
  async updateNotification(
    data: object & { id: string }
  ): Promise<NotificationState> {
    const { id, ...updatedValue } = data || {};
    const notification = await this.database.updateDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.notifications,
      id,
      updatedValue
    );
    return {
      id: notification.$id,
      title: notification.title,
      note: notification.note,
      amount: notification.amount,
      expiryDate: notification.expiryDate,
      category: notification.category,
      mode: notification.mode,
      period: notification.period,
    };
  }
  async storeNotification(data: any): Promise<NotificationState> {
    if (!data?.id) {
      const { id, ...rest } = data;
      return this.addNotification(rest);
    }
    return this.updateNotification(data);
  }
  async deleteNotification(documentId: string) {
    return await this.database.deleteDocument(
      APIConfig.databaseId,
      APIConfig.collectionId.notifications,
      documentId
    );
  }
}

export default isDevelopment()
  ? mockNotificationService
  : new NotificationService();
