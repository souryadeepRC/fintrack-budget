const APIConfig = {
  appUrl: import.meta.env.VITE_APP_WRITE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_ID,
  collectionId: {
    expenses: import.meta.env.VITE_COLLECTION_EXPENSE_ID,
    notifications: import.meta.env.VITE_COLLECTION_NOTIFICATION_ID,
    debts: import.meta.env.VITE_COLLECTION_DEBT_ID,
  },
  bucketId: "",
};
export default APIConfig;
