const APIConfig = {
  appUrl: import.meta.env.VITE_APP_WRITE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_ID,
  collectionId: {
    categorySettings: import.meta.env.VITE_COLLECTION_CATEGORY_SETTINGS_ID,
    expenses: import.meta.env.VITE_COLLECTION_EXPENSE_ID,
    debts: import.meta.env.VITE_COLLECTION_DEBT_ID,
  },
  bucketId: "",
};
export default APIConfig;
