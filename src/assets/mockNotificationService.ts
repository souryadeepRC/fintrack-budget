import { NotificationState } from "@/types/notification";
import { ID } from "appwrite";
import { mockNotifications } from "./mockNotification";

class NotificationService {
  constructor() {}

  async addNotification(data: any): Promise<NotificationState> {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...data, id: ID.unique() }), 1000)
    );
  }
  async getAllNotifications(): Promise<NotificationState[]> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(mockNotifications);
      }, 3000)
    );
  }
  async updateNotification(
    data: NotificationState
  ): Promise<NotificationState> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
  }
  async storeNotification(data: any): Promise<NotificationState> {
    if (data?.id) {
      return this.updateNotification(data);
    }
    return this.addNotification(data);
  }
  async deleteNotification(_documentId: string) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
const notificationService = new NotificationService();
export default notificationService;
