export type NotificationState = {
  id: string; // Unique identifier for expense
  title: string;
  note: string;
  amount?: number;
  category: string; // e.g. Food, entertainment
  mode: string; // Payment Mode e.g. creditCard, cash
  expiryDate: string;
  period: number;
};
