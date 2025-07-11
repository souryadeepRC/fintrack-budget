export type NotificationState = {
  id: string; // Unique identifier for expense
  title: string;
  note: string;
  amount?: number;
  registerDate: string;
  lastAlertDate: string;
  expiryDate: string;
  documentLocation: string;
};
