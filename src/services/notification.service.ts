/**
 * Notification Service
 * Handles CRUD operations for notifications
 */

import { ID,Query } from 'appwrite';

import { COLLECTIONS,DATABASE_ID } from '@/config/appwrite';
import { databases } from '@/lib/appwrite';
import { Notification } from '@/types';

export type NotificationCreatePayload = Omit<Notification, 'id'>;

/**
 * Create a new notification
 * @param data - Notification payload
 * @returns Promise with created notification
 */
export async function createNotification(data: NotificationCreatePayload): Promise<Notification> {
  try {
    const notificationId = ID.unique();
    const response = await databases.createRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.NOTIFICATIONS,
      rowId: notificationId,
      data,
    });

    return formatNotificationResponse(response);
  } catch (error) {
    throw new Error(
      `Failed to create notification: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Get all notifications
 * @returns Promise with array of notifications
 */
export async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await databases.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.NOTIFICATIONS,
      queries: [Query.orderAsc('expiryDate'), Query.limit(100)],
    });

    return response.rows.map(formatNotificationResponse);
  } catch (error) {
    throw new Error(
      `Failed to fetch notifications: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export async function updateNotification(
  notificationId: string,
  updates: Partial<NotificationCreatePayload>,
): Promise<Notification> {
  try {
    const response = await databases.updateRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.NOTIFICATIONS,
      rowId: notificationId,
      data: updates,
    });
    return formatNotificationResponse(response);
  } catch (error) {
    throw new Error(`Failed to update notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deleteNotification(notificationId: string): Promise<void> {
  try {
    await databases.deleteRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTIONS.NOTIFICATIONS,
      rowId: notificationId,
    });
  } catch (error) {
    throw new Error(`Failed to delete notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function formatNotificationResponse(doc: Record<string, unknown>): Notification {
  return {
    id: doc.$id as string,
    title: doc.title as string,
    amount: doc.amount as number,
    category: doc.category as string,
    expiryDate: doc.expiryDate as string,
    mode: doc.mode as string,
    isMonthly: doc.isMonthly as boolean,
    period: doc.period as number,
  };
}